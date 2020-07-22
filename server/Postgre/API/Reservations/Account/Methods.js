var pool = require('../../../dbConfig').pool
var queries = require('./Queries');

async function get(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_getaccountreservations(req));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

async function insert(req, res, next) {

  try {

    const { rows } = await pool.query(queries.query_insert(req));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_remove(req));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  get,  
  insert,  
  remove
}