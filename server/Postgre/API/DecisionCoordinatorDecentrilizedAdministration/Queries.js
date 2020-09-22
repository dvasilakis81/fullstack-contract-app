const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req) {
  var contractId = req.body.contractId;

  var sqlQuery = 'INSERT INTO "Ordering"."DecisionCoordinatorDecentrilizedAdministration"("ContractId","ProtocolNumber","ProtocolDate","ADA", "OrderNo", "DecisionBoardProtocol", "APDA_ProtocolNumber", "APDA_ProtocolDate" , "ActionTransmission", "ActionAccount") VALUES ';
  sqlQuery += util.format('(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.ADA ? req.body.ADA : ''),
    helper.addQuotes(req.body.orderNo),
    helper.addQuotes(req.body.DecisionBoardProtocol),
    helper.addQuotes(req.body.APDA_ProtocolNumber),
    helper.addQuotes(req.body.APDA_ProtocolDate),
    helper.addQuotes(req.body.ActionTransmission),
    helper.addQuotes(req.body.ActionAccount),
    helper.addQuotes(req.body.NoPrototype),
    helper.addQuotes(req.body.NoPhotocopy));

  return sqlQuery
}

function query_update(req) {

  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"ADA"=%s,"DecisionBoardProtocol"=%s,"APDA_ProtocolNumber"=%s,"APDA_ProtocolDate"=%s,' +
    '"ActionTransmission"=%s,"ActionAccount"=%s,"NoPrototype"=%s,"NoPhotocopy"=%s ' +
    'WHERE "Id"=%s AND "ContractId"=%s ' +
    'RETURNING * ',
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.DecisionBoardProtocol),
    helper.addQuotes(req.body.APDA_ProtocolNumber),
    helper.addQuotes(req.body.APDA_ProtocolDate),
    helper.addQuotes(req.body.ActionTransmission),
    helper.addQuotes(req.body.ActionAccount),
    helper.addQuotes(req.body.NoPrototype),
    helper.addQuotes(req.body.NoPhotocopy),
    helper.addQuotes(req.body.Id),
    contractId);


  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId);

  return sqlQuery;
}

module.exports = {
  query_insert,
  query_update,
  query_remove
}