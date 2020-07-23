const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req) {
  var contractId = req.body.contractId;

  var sqlQuery = util.format('INSERT INTO "Ordering"."SnippetPractical"("ContractId","ProtocolNumber","ProtocolDate","DecisionBoardProtocol","OrderNo") ' +
    'VALUES(%s,%s,%s,%s,%s) ' +
    'RETURNING "Id" ',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.DecisionBoardProtocol),
    helper.addQuotes(req.body.OrderNo));

  return sqlQuery
}

function query_update(req) {

  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."SnippetPractical" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"DecisionBoardProtocol"=%s,"OrderNo"=%s' +
    'WHERE "ContractId"=%s',
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.DecisionBoardProtocol),
    helper.addQuotes(req.body.OrderNo),
    Number(contractId));

  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."SnippetPractical" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  return sqlQuery;
}

module.exports = {
  query_insert,
  query_update,
  query_remove
}