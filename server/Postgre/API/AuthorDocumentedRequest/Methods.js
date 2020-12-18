var pool = require('../../dbConfig').pool
var queries = require('./Queries');
var contractMethods = require('../Contracts/ContractAPI');
const activitiesAPI = require('../Activities/Methods');

async function insert(req, res, next) {
  const client = await pool.connect();
  var contractId = req.body.contractId;
  try {
    
    await client.query('BEGIN');

    const { rows } = await client.query(queries.query_insert(req));
    await activitiesAPI.insertActivity(req, res, next, contractId, 'Εισαγωγή Αιτήματος του Διατάκτη', client);

    await client.query('COMMIT');

    contractMethods.getContractById(req, res, next, contractId);
  } catch (error) {
    next(error);
    await client.query('ROLLBACK');    
  } finally {
    client.release();
  }
}

async function update(req, res, next) {
  const client = await pool.connect();
  var contractId = req.body.contractId;

  try {
    await client.query('BEGIN');

    const { rows } = await pool.query(queries.query_update(req));
    await activitiesAPI.insertActivity(req, res, next, contractId, 'Επεργασία Αιτήματος του Διατάκτη', client);

    await client.query('COMMIT');

    contractMethods.getContractById(req, res, next, contractId);
  } catch (error) {
    next(error);
    await client.query('ROLLBACK');    
  } finally {
    client.release();
  }
}

async function remove(req, res, next) {
  const client = await pool.connect();
  try {
    
    await client.query('BEGIN');

    await client.query(queries.query_remove(req));
    await activitiesAPI.insertActivity(req, res, next, req.body.contractId, 'Διαγραφή Αιτήματος του Διατάκτη', client);

    await client.query('COMMIT');

    contractMethods.getContractById(req, res, next);
  } catch (error) {
    next(error);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

module.exports = {
  insert,
  update,
  remove
}