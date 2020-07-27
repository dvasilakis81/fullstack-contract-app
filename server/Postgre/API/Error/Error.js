const jwt = require('jsonwebtoken');
var pool = require('../../dbConfig').pool
var queries = require('./Queries');

const secretKey = process.env.API_SECRET || 'athens_2019';

async function insertError(req, res, next, msg, ret) {
  var username = getLoginUsername(req);
  const { rows } = await pool.query(queries.query_inserterror(username, msg, req));
  if (ret)
    res.status(200).json('Ok');
}

async function logError(req, res, next, err, ret) {

  const { rows } = await pool.query(queries.query_getnumberofregisterederrors());
  if (Number(rows[0].count) > (process.env.NUM_LOG_ERRORS || 5))
    await pool.query(queries.query_deletelogerror());
  await insertError(req, res, next, err, ret);
}

function getLoginUsername(req) {
  var secretKey = process.env.API_SECRET || 'athens_2019';
  var username = '';

  if (req.body.username)
    username = req.body.username;
  else {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer '))
      token = token.slice(7, token.length);

    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (!err)
          username = decoded.username
      });
    }
  }

  return username;
}

module.exports = {
  logError
}