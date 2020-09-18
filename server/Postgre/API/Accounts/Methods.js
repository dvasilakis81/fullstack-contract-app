var pool = require('../../dbConfig').pool
var queries = require('./Queries');

// async function getContractAccountsNumber(req, res, next) {
//   try {
//     const { results } = await pool.query(queries.query_getnumberofaccounts(req));
//     return results.rows[0].count;
//   } catch (error) {
//     next(error);
//   }
// }

async function getFirstAccountProtocolInfo(req, res, next) {
  try {
    const { rows } = await pool.query(queries.query_getfirstaccountprotocolinfo(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getAccountById(contractId, accountId, accountNumber, next) {
  try {
    const rows = await pool.query(queries.query_getaccountbyid(contractId, accountId, accountNumber));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getAccountsInfo(req, res, next) {
  try {
    const { rows } = await pool.query(queries.query_getaccountsinfo(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getAccountInfo(req, res, next) {
  try {
    const { rows } = await pool.query(queries.query_getaccountinfo(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function insertAccount(req, res, next, client) {
  try {
    const { rows } = await client.query(queries.query_insertaccount(req));
    return rows;
  } catch (e) {
    throw e;
  }
}

async function updateAccount(req, res, next) {
  try {
    const { rows } = await pool.query(queries.query_updateaccount(req));
    return rows;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getFirstAccountProtocolInfo,
  getAccountById,
  getAccountsInfo,
  getAccountInfo,
  insertAccount,
  updateAccount
}