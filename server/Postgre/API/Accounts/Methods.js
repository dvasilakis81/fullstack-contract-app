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

async function getAccountById(req, res, next) {
  try {
    return await pool.query(queries.query_getaccountbyid(req));    
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

async function insertAccount(req, res, next) {
  try {
    const { rows } = await pool.query(queries.query_insertaccount(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function updateAccount(req, res, next) {
  try {
    const { rows } = await pool.query(queries.query_updateaccount(req));
    return rows;
  } catch (error) {
    next(error);
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