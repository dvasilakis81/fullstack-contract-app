const util = require('util')

var helper = require('../../../HelperMethods/helpermethods')
var pool = require('../../dbConfig').pool
var queries = require('./Queries');

async function getContracts(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_getcontracts(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getContractById(req, res, next, contractId) {

  try {    
    const { rows } = await pool.query(queries.query_getcontractbyid(req, contractId));
    return rows[0];
  } catch (error) {
    next(error);
  }
}

async function getContractTypes(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_getcontracttypes(req));
    return rows[0];
  } catch (error) {
    next(error);
  }
}

async function searchContracts(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_searchcontracts(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function contractExists(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_contractexists(req));
    return rows;
  } catch (error) {
    next(error);
  }
}
async function insertInfoToContractTable(req, res, next) {

  try {
    const { rows } = await pool.query(queries.insertContract(req, res, next));
    return rows[0].Id;
  } catch (error) {
    next(error);
  }
}
async function insertContractOwnerInfo(req, res, next, contractId) {
  try {
    const { rows } = await pool.query(queries.insertContractOwner(req, contractId));
    return rows[0].Id;
  } catch (error) {
    next(error);
  }

}
async function updateContract(req, res, next) {

  try {
    const { rows } = await pool.query(queries.updateContract(req, res, next));
    return rows[0].Id;
  } catch (error) {
    next(error);
  }
}

async function updateContract(req, res, next) {
  try {
    const { rows } = await pool.query(queries.updateContract(req, res, next));
    return rows[0].Id;
  } catch (error) {
    next(error);
  }
}

async function deleteContract(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_deletecontract(req));
    return rows[0].Id;
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContracts,
  getContractTypes,
  getContractById,
  searchContracts,
  insertInfoToContractTable,
  insertContractOwnerInfo,
  deleteContract,
  contractExists,
  updateContract
}
