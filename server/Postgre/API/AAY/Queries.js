const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req) {
  var contractId = req.body.contractId;
  var sqlQuery = util.format('INSERT INTO "Ordering"."AAY"("ContractId","Value","ProtocolNumber","ProtocolDate","EadNumber","ADA","OrderNo","Type","Overthrow") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING "Id" ',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.EadNumber),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.orderNo),
    helper.addQuotes(req.body.Type),
    helper.addQuotes(req.body.Overthrow),
  )

  return sqlQuery
}

function query_update(req) {

  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."AAY" ' +
    'SET "Value"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"EadNumber"=%s,"ADA"=%s,"Type"=%s,"Overthrow"=%s ' +
    'WHERE "ContractId"=%s AND "OrderNo"=%s',
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.EadNumber),
    helper.addQuotes(req.body.ADA),
    req.body.Type,
    helper.addQuotes(req.body.Overthrow),
    Number(contractId),
    req.body.orderNo);

  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."AAY" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)
  return sqlQuery;
}

module.exports = {
  query_insert,
  query_update,
  query_remove
}