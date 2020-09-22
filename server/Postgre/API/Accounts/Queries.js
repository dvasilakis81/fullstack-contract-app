const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_getfirstaccountprotocolinfo(req) {

  const contractId = parseInt(req.query.ci);

  return util.format('SELECT a."ProtocolNumber", a."ProtocolDate" ' +
    'FROM "Ordering"."Account" as a ' +
    'Where a."ContractId"=%s AND a."Number"=1', helper.addQuotes(contractId))
}


function query_getaccountbyid(contractId, accountId, accountNumber) {

  //const contractId = req.body.ContractId;
  //const accountNumber = req.body.AccountNumber;
  //const aid = accountId ? accountId : req.body.AccountId;

  return getSelectClauseGetAccount(contractId) +
    'FROM "Ordering"."Account" as a ' +
    getWhereClauseGetAccount(contractId, accountNumber, accountId);
}

function query_getaccountsinfo(req) {

  const contractId = req.body.contractId;
  const accountNumber = req.body.accountNumber;

  return util.format('SELECT  a."Number", a."AmountPure", a."AmountFpa", a."AmountTotal" ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."ContractId"=%s AND a."Number"<=%s ' +
    'ORDER BY a."Number" ASC', contractId, accountNumber);
}

function query_getaccountinfo(req) {

  const contractId = req.body.ContractId;
  const accountNumber = req.body.AccountNumber;

  return util.format('SELECT * ' +
    'FROM "Ordering"."Account" as acc ' +
    'WHERE acc."ContractId"=%s AND acc."Number"=%s', helper.addQuotes(contractId), helper.addQuotes(accountNumber));
}

function getWhereClauseGetAccount(contractId, accountNumber, accountId) {
  if (accountId)
    return util.format('WHERE a."Id"=%s', parseInt(accountId));
  else
    return util.format('WHERE a."ContractId"=%s AND a."Number"=%s', contractId, accountNumber);

}

function getSelectClauseGetAccount(contractId) {
  return util.format('SELECT *, ' +
    '(SELECT json_agg(Account) FROM (SELECT acc."ProtocolNumber" as firstAccountProtocolNumber, acc."ProtocolDate" as firstAccountProtocolDate FROM "Ordering"."Account" as acc WHERE acc."Number"=1 AND acc."ContractId"=%s) Account) AS FirstProtocolInfo, ' +
    '(SELECT json_agg(AccountReservations) FROM (SELECT * FROM "Ordering"."AccountReservations" as accres WHERE accres."AccountId" = a."Id" ORDER BY accres."Order" ASC) AccountReservations) AS AccountReservations, ' +
    '(SELECT json_agg(Invoice) FROM (SELECT * FROM "Ordering"."Invoice" as i WHERE i."AccountId" = a."Id") Invoice) AS Invoice, ' +
    '(SELECT json_agg(CC) FROM (SELECT * FROM "Ordering"."CC" as cc WHERE cc."AccountId" = a."Id") CC) AS CC, ' +
    '(SELECT json_agg(MonitoringCommittee) FROM (SELECT * FROM "Ordering"."MonitoringCommittee" as mm WHERE mm."AccountId" = a."Id") MonitoringCommittee) AS MonitoringCommittee, ' +
    '(SELECT json_agg(DocumentSignatory) FROM (SELECT * FROM "Ordering"."DocumentSignatory" as ds WHERE ds."AccountId" = a."Id") DocumentSignatory) AS DocumentSignatory ', 
    contractId);
}

function query_insertaccount(req) {
  return util.format('INSERT INTO "Ordering"."Account"("ContractId","Number","Start","End", ' +
    '"AmountPure","AmountFpa","AmountTotal","ProtocolNumber","ProtocolDate", "AmountFullWritten",' +
    '"WorkConfirmationDate","DeliveryGoodsDate", "DocumentDate", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DateCreated", "DateModified") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(req.body.ContractId),
    helper.addQuotes(req.body.AccountNumber),
    helper.addQuotes(req.body.Start),
    helper.addQuotes(req.body.End),
    helper.addQuotes(req.body.AmountPure),
    helper.addQuotes(req.body.AmountFpa),
    helper.addQuotes(req.body.AmountTotal),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.AmountFullWritten),    
    helper.addQuotes(req.body.WorkConfirmationDate),
    helper.addQuotes(req.body.DeliveryGoodsDate),
    helper.addQuotes(req.body.DocumentDate),
    helper.addQuotes(req.body.FirstAccountProtocolNumber),
    helper.addQuotes(req.body.FirstAccountProtocolDate),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(new Date().toLocaleString()))
}

function query_updateaccount(req) {
  return util.format('UPDATE "Ordering"."Account" ' +
    'SET "Start"=%s,"End"=%s,"AmountPure"=%s,"AmountFpa"=%s,"AmountTotal"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"AmountFullWritten"=%s,' +
    '"WorkConfirmationDate"=%s,"DeliveryGoodsDate"=%s,"DocumentDate"=%s,"FirstAccountProtocolNumber"=%s,"FirstAccountProtocolDate"=%s, "DateModified"=%s ' +
    'WHERE "Id"=%s ' +
    'RETURNING *',
    helper.addQuotes(req.body.Start),
    helper.addQuotes(req.body.End),
    helper.addQuotes(req.body.AmountPure),
    helper.addQuotes(req.body.AmountFpa),
    helper.addQuotes(req.body.AmountTotal),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.AmountFullWritten),    
    helper.addQuotes(req.body.WorkConfirmationDate),
    helper.addQuotes(req.body.DeliveryGoodsDate),
    helper.addQuotes(req.body.DocumentDate),
    helper.addQuotes(req.body.FirstAccountProtocolNumber),
    helper.addQuotes(req.body.FirstAccountProtocolDate),
    helper.addQuotes(new Date().toLocaleDateString()),
    Number(req.body.AccountId));
}

module.exports = {
  query_getfirstaccountprotocolinfo,
  query_getaccountbyid,
  query_getaccountinfo,
  query_insertaccount,
  query_updateaccount
}