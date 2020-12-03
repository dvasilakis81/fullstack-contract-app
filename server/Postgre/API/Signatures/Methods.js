var queries = require('./Queries');

async function insertSignatures(req, res, next, accountId, client) {

  try {
    const { rows } = await client.query(queries.query_insert(req, accountId));
    return rows;
  } catch (e) {
    throw e;
  }
}

async function updateSignatures(req, res, next, client) {

  try {
    const rows1 = updateSignature1(req, res, next, client);
    const rows2 = updateSignature2(req, res, next, client);
    const rows3 = updateSignature3(req, res, next, client);
    const rows4 = updateSignature4(req, res, next, client);
    return rows1;
  } catch (e) {
    throw e;
  }
}

async function updateSignature1(req, res, next, client) {

  try {
    const { rows } = await client.query(queries.query_update_signature1(req)); 
    return rows;
  } catch (e) {
    throw e;
  }
}

async function updateSignature2(req, res, next, client) {

  try {
    const { rows } = await client.query(queries.query_update_signature2(req));
    return rows;
  } catch (e) {
    throw e;
  }
}

async function updateSignature3(req, res, next, client) {

  try {
    const { rows } = await client.query(queries.query_update_signature3(req));
    return rows;
  } catch (e) {
    throw e;
  }
}

async function updateSignature4(req, res, next, client) {

  try {
    const { rows } = await client.query(queries.query_update_signature4(req));
    return rows;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  insertSignatures,
  updateSignatures
}