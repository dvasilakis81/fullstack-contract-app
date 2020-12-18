const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_get(accountId) {
  return util.format('SELECT * FROM "Ordering"."MonitoringCommittee" as mc Where mc."AccountId"=%s', helper.addQuotes(accountId))
}

function query_insert(req, accountId) {
  var ret =   util.format('INSERT INTO "Ordering"."MonitoringCommittee"("AccountId","MayorDecisionProtocolNumber","MayorDecisionProtocolDate","PracticalDate","DocumentProtocolNumber","DocumentProtocolDate","GivenPhysicalObjectContentTime") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s) ',
    helper.addQuotes(accountId),
    helper.addQuotes(req.body.MayorDecisionProtocolNumber),
    helper.addQuotes(req.body.MayorDecisionProtocolDate),
    helper.addQuotes(req.body.PracticalDate),
    helper.addQuotes(req.body.DocumentProtocolNumber),
    helper.addQuotes(req.body.DocumentProtocolDate),
    helper.addQuotes(req.body.GivenPhysicalObjectContentTime))

    return ret;
}

function query_update(req) {
  return util.format('UPDATE "Ordering"."MonitoringCommittee" ' +
    'SET "MayorDecisionProtocolNumber"=%s,"MayorDecisionProtocolDate"=%s,"PracticalDate"=%s,"DocumentProtocolNumber"=%s,"DocumentProtocolDate"=%s,"GivenPhysicalObjectContentTime"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(req.body.MayorDecisionProtocolNumber),
    helper.addQuotes(req.body.MayorDecisionProtocolDate),
    helper.addQuotes(req.body.PracticalDate),
    helper.addQuotes(req.body.DocumentProtocolNumber),
    helper.addQuotes(req.body.DocumentProtocolDate),
    helper.addQuotes(req.body.GivenPhysicalObjectContentTime),
    Number(req.body.AccountId));
}

function query_delete(req) {
  return util.format('DELETE FROM "Ordering"."MonitoringCommittee" as mc Where mc."AccountId"=%s', Number(req.body.AccountId));
}

module.exports = {
  query_get,
  query_insert,
  query_update,
  query_delete
}