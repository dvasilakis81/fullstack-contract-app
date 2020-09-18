const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req) {
  var contractId = req.body.contractId;
  var sqlQuery = util.format('INSERT INTO "Ordering"."CourtOfAuditors"("ContractId","ProtocolNumber","ProtocolYear","ScaleNumber","ContentAccount","APDA_ProtocolNumber","APDA_ProtocolDate") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING "Id"',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolYear),
    helper.addQuotes(req.body.ScaleNumber),
    helper.addQuotes(req.body.ContentAccount),
    helper.addQuotes(req.body.APDANumber),
    helper.addQuotes(req.body.APDADate),
    helper.addQuotes(req.body.NoPrototype),
    helper.addQuotes(req.body.NoPhotocopy))

  return sqlQuery
}

function query_update(req) {

  var contractId = req.body.contractId;
  var sqlQuery =
    util.format('UPDATE "Ordering"."CourtOfAuditors" ' +
      'SET "ProtocolNumber"=%s,"ProtocolYear"=%s,"ScaleNumber"=%s,"ContentAccount"=%s,"APDA_ProtocolNumber"=%s,"APDA_ProtocolDate"=%s,"NoPrototype"=%s,"NoPhotocopy"=%s ' +
      'WHERE "Id"=%s AND "ContractId"=%s' +
      'RETURNING * ',
      helper.addQuotes(req.body.ProtocolNumber),
      helper.addQuotes(req.body.ProtocolYear),
      helper.addQuotes(req.body.ScaleNumber),
      helper.addQuotes(req.body.ContentAccount),
      helper.addQuotes(req.body.APDANumber),
      helper.addQuotes(req.body.APDADate),
      helper.addQuotes(req.body.NoPrototype),
      helper.addQuotes(req.body.NoPhotocopy),
      helper.addQuotes(req.body.Id),
      contractId)


  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."CourtOfAuditors" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId);
  return sqlQuery;
}

module.exports = {
  query_insert,
  query_update,
  query_remove
}