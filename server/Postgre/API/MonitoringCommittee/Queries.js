const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_get(accountId) {
  return util.format('SELECT * FROM "Ordering"."MonitoringCommittee" as mc Where mc."AccountId"=%s', helper.addQuotes(accountId))
}

function query_insert(req) {
  return util.format('INSERT INTO "Ordering"."MonitoringCommittee"("AccountId","MayorDecisionForMembersProtocolNumber","MayorDecisionForMembersProtocolDate","PracticalDate","TransmissionDocumentProtocolNumber","TransmissionDocumentProtocolDate","GivenPhysicalObjectContentTime") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s) ' +
    helper.addQuotes(accountId),
    helper.addQuotes(req.body.MayorDecisionForMembersProtocolNumber),
    helper.addQuotes(req.body.MayorDecisionForMembersProtocolDate),
    helper.addQuotes(req.body.PracticalDate),
    helper.addQuotes(req.body.TransmissionDocumentProtocolNumber),
    helper.addQuotes(req.body.TransmissionDocumentProtocolDate),
    helper.addQuotes(req.body.GivenPhysicalObjectContentTime))
}

function query_update(req) {
  return util.format('UPDATE "Ordering"."MonitoringCommittee" ' +
    'SET "MayorDecisionForMembersProtocolNumber"=%s,"MayorDecisionForMembersProtocolDate"=%s,"PracticalDate"=%s,"TransmissionDocumentProtocolNumber"=%s,"TransmissionDocumentProtocolDate"=%s,"GivenPhysicalObjectContentTime"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(req.body.MayorDecisionForMembersProtocolNumber),
    helper.addQuotes(req.body.MayorDecisionForMembersProtocolDate),
    helper.addQuotes(req.body.PracticalDate),
    helper.addQuotes(req.body.TransmissionDocumentProtocolNumber),
    helper.addQuotes(req.body.TransmissionDocumentProtocolDate),
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