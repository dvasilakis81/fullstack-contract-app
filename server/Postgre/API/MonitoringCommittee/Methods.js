const util = require('util')

var pool = require('../../dbConfig').pool
var queries = require('./Queries');

async function insertMonitoringCommittee(req, res, next, accountId) {
  if (req.body.HasMonitoringCommittee === true) {
    const { rows } = await pool.query(queries.query_insert(req, accountId));
    return rows;
  }
}

async function processMonitoringCommittee(req, res, next) {
  if (req.body.HasMonitoringCommittee === true) {
    const { rows } = await pool.query(queries.query_get(req.body.AccountId));
    if (rows && rows.length > 0) {
      if (rows.length === 0) {
        const { rows } = await pool.query(queries.query_insert(req, req.body.AccountId));
        return rows;
      } else {
        const { rows } = await pool.query(queries.query_update(req));
        return rows;
      }
    }
  } else {
    const { rows } = await pool.query(queries.query_delete(req));
    return rows;
  }
}

module.exports = {
  insertMonitoringCommittee,
  processMonitoringCommittee
}