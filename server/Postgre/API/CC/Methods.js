const util = require('util')

var helper = require('../../../HelperMethods/helpermethods')
var pool = require('../../dbConfig').pool
var queries = require('./Queries');

async function insertCC(req, res, next, accountId) {

  try {
    const { rows } = await pool.query(queries.query_get(accountId));
    if (rows.length > 0)
      res.status(200).json(results.rows[0].Id);
    else {
      const { rows } = await pool.query(queries.query_insert(req, accountId));
      return rows;
    }
  } catch (error) {
    next(error);
  }
}

async function updateCC(req, res, next) {

  try {
    await pool.query(queries.query_delete(req));
    const { rows } = await pool.query(queries.query_update(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  insertCC,
  updateCC
}