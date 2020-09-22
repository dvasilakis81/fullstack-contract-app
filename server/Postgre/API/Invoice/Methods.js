
var queries = require('./Queries');
async function insertInvoice(req, res, next, accountId, client) {

  try {
    const { rows } = await client.query(queries.query_insert(req, accountId));
    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateInvoice(req, res, next, client) {

  try {
    const { rows } = await client.query(queries.query_update(req));
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  insertInvoice,
  updateInvoice
}