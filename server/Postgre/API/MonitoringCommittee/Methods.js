var queries = require('./Queries');

async function insertMonitoringCommittee(req, res, next, accountId, client) {
  if (req.body.HasMonitoringCommittee === true) {
    const { rows } = await client.query(queries.query_insert(req, accountId));
    return rows;
  }
}

async function processMonitoringCommittee(req, res, next, client) {
  if (req.body.HasMonitoringCommittee === true) {
    const { rows } = await client.query(queries.query_get(req.body.AccountId));
    if (rows.length === 0) {
      const { rows } = await client.query(queries.query_insert(req, req.body.AccountId));
      return rows;
    } else {
      const { rows } = await client.query(queries.query_update(req));
      return rows;
    }
  } else {
    const { rows } = await client.query(queries.query_delete(req));
    return rows;
  }
}

module.exports = {
  insertMonitoringCommittee,
  processMonitoringCommittee
}