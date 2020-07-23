var pool = require('../../dbConfig').pool
var queries = require('./Queries');
var contractMethods = require('../Contracts/ContractAPI');

async function insert(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_insert(req));
    contractMethods.getContractById(req, res, next);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_update(req));
    contractMethods.getContractById(req, res, next);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {

  try {
    await pool.query(queries.query_remove(req));
    contractMethods.getContractById(req, res, next);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  insert,
  update,
  remove
}