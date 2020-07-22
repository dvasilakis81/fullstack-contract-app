const util = require('util')

var pool = require('../../dbConfig').pool
var queries = require('./Queries');

async function getReservations(req, res, next) {

  try {
    const { rows } = await pool.query(queries.query_getreservations(req));
    return rows;
  } catch (error) {
    next(error);
  }
}

async function getUserReservations(req, res, next, userId) {

  try {
    const { rows } = await pool.query(queries.query_getuserreservations(userId));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

async function insertUserReservations(reservations, userId) {

  try {
    const { rows } = await pool.query(queries.query_insert(reservations, userId));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getReservations,
  getUserReservations,
  insertUserReservations
}