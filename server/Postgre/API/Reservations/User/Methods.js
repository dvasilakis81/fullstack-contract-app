var pool = require('../../../dbConfig').pool
var queries = require('./Queries');

async function getReservations(req, next) {

  try {
    const { rows } = await pool.query(queries.query_getreservations(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getUserReservations(userId, next) {

  try {
    const { rows } = await pool.query(queries.query_getuserreservations(userId));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

async function insert(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_insert(req));    
    res.status(200).json(rows[0]);
  }
  catch (error) {
    next(error);
  }
}

async function update(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_update(req));
    res.status(200).json(rows[0]);
  }
  catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_remove(req));
    res.status(200).json(rows[0]);
  }
  catch (error) {
    next(error);
  }
}

async function initializeUserReservations(reservations, userId, next) {

  try {
    const { rows } = await pool.query(queries.query_initialize(reservations, userId));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  initializeUserReservations,
  getReservations,
  getUserReservations,
  insert,
  update,
  remove
}