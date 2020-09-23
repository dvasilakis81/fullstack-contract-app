const util = require('util')

var pool = require('../../dbConfig').pool
var queries = require('./Queries');

async function insertCC(req, res, next, accountId, client) {

  try {
    const { rows } = await client.query(queries.query_insert(req, accountId));
    return rows;
  } catch (e) {
    next(error);
  }
}

async function updateCC(req, res, next, client) {

  try {
    await client.query(queries.query_delete(req));
    if (req.body.cc && req.body.cc.length > 0) {
      const { rows } = await client.query(queries.query_insert(req));
      return rows;
    }
  } catch (e) {
    next(error);
  }
}

async function getCCFromPreviousAccount(req, res, next) {
  const previousAccount = await getPreviousAccount(req, res, next);
  const rows = await getCCFromAccount(req, res, next, previousAccount);
  if (rows && rows.length > 0)
    res.status(200).json(rows);
  else {
    var cc = [];
    res.status(200).json(cc);
  }
}

async function getPreviousAccount(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_getpreviousaccount(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getCCFromAccount(req, res, next, previousAccount) {

  try {
    const { rows } = await pool.query(queries.query_getccfromaccount(req, previousAccount));
    return rows;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  insertCC,
  updateCC,
  getCCFromPreviousAccount,
  getPreviousAccount,
  getCCFromAccount
}