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

async function insert(userId, accountId, reservations, client, next) {

  try {
    var s = client ? client : pool;
    if (reservations && reservations.length > 0) {
      const { rows } = await s.query(queries.query_insert(userId, accountId, reservations));
      return rows;
    }
    else
      return null;
  }
  catch (error) {
    next(error);
  }
}

async function remove(req, res, next, accountId, client) {

  try {
    var s = client ? client : pool;
    const { rows } = await s.query(queries.query_remove(req, accountId));
    return rows;
  }
  catch (error) {
    next(error);
  }
}

async function sync(req, res, next) {

  try {

    const reservations = await get(req, res, next);
    if (reservations && reservations.length > 0)
      await remove(req, res, next);
    await insert(req, res, next);

  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  get,
  insert,
  remove,
  sync
}