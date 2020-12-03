const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req) {
  var contractId = req.body.contractId;

  var sqlQuery = util.format('INSERT INTO "Ordering"."EconomicalCommitee"("ContractId","ProtocolNumber","ProtocolDate","Content","ADA","OrderNo", "NoPrototype", "NoPhotocopy") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING "Id" ',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.Content),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.OrderNo),
    req.body.NoPrototype,
    req.body.NoPhotocopy);

  return sqlQuery
}

function query_update(req) {

  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."EconomicalCommitee" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"Content"=%s,"ADA"=%s,"OrderNo"=%s,"NoPrototype"=%s,"NoPhotocopy"=%s ' +
    'WHERE "ContractId"=%s',
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.Content),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.OrderNo),
    req.body.NoPrototype,
    req.body.NoPhotocopy,
    Number(contractId));

  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."EconomicalCommitee" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  return sqlQuery;
}

module.exports = {
  query_insert,
  query_update,
  query_remove
}