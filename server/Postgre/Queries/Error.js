const dbConfig = require('../dbConfig')
const jwt = require('jsonwebtoken');
const util = require('util')
const Pool = require('pg').Pool
const pool = new Pool(dbConfig.params)

const helper = require('../../HelperMethods/helpermethods')
const secretKey = process.env.API_SECRET || 'athens_2019';

const insertError = (req, res, next, msg, ret) => {
  var username = ''
  if (req.body.username)
    username = req.body.username
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
  
  var sqlQuery = util.format('INSERT INTO "Ordering"."LogError"("Username","ErrorMessage", "DateCreated", "HttpMethod", "HttpPath") ' +
    'VALUES(%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(username),
    helper.addQuotes(msg),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(req.method),
    helper.addQuotes(req.path))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("Insert Error " + msg);
      if (ret)
        res.status(200).json('Ok');
    }
  })
}

const logError = (req, res, next, err, checkToken, ret) => {

  if (checkToken === true) {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer '))
      token = token.slice(7, token.length);

    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (!err)
          username = decoded.username
      });
    }
  }

  var sqlQuery = util.format('SELECT COUNT(*) FROM "Ordering"."LogError" ')
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (Number(results.rows[0].count) > (process.env.NUM_LOG_ERRORS || 5)) {
        var sqlQuery = util.format('DELETE FROM "Ordering"."LogError" as le ' +
          'WHERE le."Id" = (SELECT MIN(le."Id") FROM "Ordering"."LogError" as le)')
        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else
            insertError(req, res, next, err, ret)
        })
      }
      else
        insertError(req, res, next, err, ret)
    }
  })
};

module.exports = {
  logError
}