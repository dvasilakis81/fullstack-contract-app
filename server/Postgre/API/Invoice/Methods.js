const util = require('util')

var helper = require('../../../HelperMethods/helpermethods')
var pool = require('../../dbConfig').pool
var queries = require('./Queries');

async function insertInvoice(req, res, next, accountId) {

  try {
    const { rows } = await pool.query(queries.query_insert(req, accountId));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function updateInvoice(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_update(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  insertInvoice,
  updateInvoice
}