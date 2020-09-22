const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req) {
  var contractId = req.body.contractId;
  var orderNo = req.body.orderNo;
  var sqlQuery = 'INSERT INTO "Ordering"."DecisionBoard"("ContractId","ProtocolNumber","ProtocolDate","ContentTransmission", "ContentAccount","ADA", "OrderNo", "NoPrototype", "NoPhotocopy") VALUES ';
  sqlQuery += util.format('(%s, %s, %s, %s, %s, %s, %s, %s, %s)',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.ContentTransmission),
    helper.addQuotes(req.body.ContentAccount),
    helper.addQuotes(req.body.ADA ? req.body.ADA : ''),    
    helper.addQuotes(orderNo),
    helper.addQuotes(req.body.NoPrototype),
    helper.addQuotes(req.body.NoPhotocopy));

  return sqlQuery;
}

function query_update(req) {

  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."DecisionBoard" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"ContentTransmission"=%s,"ContentAccount"=%s,"ADA"=%s,"NoPrototype"=%s,"NoPhotocopy"=%s ' +
    'WHERE "Id"=%s AND "ContractId"=%s' +
    'RETURNING * ',
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.ContentTransmission),
    helper.addQuotes(req.body.ContentAccount),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.NoPrototype),
    helper.addQuotes(req.body.NoPhotocopy),
    helper.addQuotes(req.body.Id),
    contractId);

  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."DecisionBoard" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId);
  return sqlQuery;
}

module.exports = {
  query_insert,
  query_update,
  query_remove
}