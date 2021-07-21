//var pool = require('../../dbConfig').pool
var queries = require('./Queries');
const db = require('../../dbConfig');

async function getContracts(req, res, next) {

  try {
    const { rows } = await db.query(queries.query_getcontracts(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getContractById(req, res, next, contractId) {

  try {
    const { rows } = await db.query(queries.query_getcontractbyid(req, contractId));
    return rows[0];
  } catch (error) {
    next(error);
  }
}

async function getContractTypes(req, res, next) {

  try {
    const { rows } = await db.query(queries.query_getcontracttypes(req));
    return rows[0];
  } catch (error) {
    next(error);
  }
}

async function searchContracts(req, res, next) {

  try {
    const { rows } = await db.query(queries.query_searchcontracts(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function contractExists(req, res, next) {

  try {
    const { rows } = await db.query(queries.query_contractexists(req));
    return rows;
  } catch (error) {
    next(error);
  }
}
async function insertInfoToContractTable(req, res, next, client) {

  const { rows } = await client.query(queries.query_insertcontract(req, res, next));
  return rows[0].Id;
}
async function insertContractUsers(req, res, next, contractId, client) {

  const { rows } = await client.query(queries.query_insertcontractusers(req, contractId));
  //return rows[0].Id;
}

async function insertContractOwnerInfo(req, res, next, contractId, client) {

  const { rows } = await client.query(queries.query_insertcontractowner(req, contractId));
  return rows[0].Id;
}

async function updateContract(req, res, next, client) {

  try {
    const { rows } = await client.query(queries.query_updatecontract(req));
    return rows[0].Id;
  } catch (error) {
    next(error);
  }
}

async function updateContractUsers(req, res, next, client) {

  try {
    await client.query(queries.query_deletecontractusers(req));
    if (req.body.contractInfo.contractStuff.length > 0 )
      await client.query(queries.query_insertcontractusers(req, req.body.contractInfo.ContractId));
  } catch (error) {
    next(error);
  }
}

async function deleteContract(req, res, next) {

  try {
    const { rows } = await db.query(queries.query_deletecontract(req));
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
  insertContractUsers,
  deleteContract,
  contractExists,
  updateContract,
  updateContractUsers  
}
