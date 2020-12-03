var queries = require('./Queries');

async function insertActivity(req, res, next, contractId, activityType, client) {

    const { rows } = await client.query(queries.query_insertactivity(req, contractId, activityType));
    return rows[0].Id;
  }

  module.exports = {    
    insertActivity
  }