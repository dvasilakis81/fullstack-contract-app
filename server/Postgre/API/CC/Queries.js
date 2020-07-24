const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_get(accountId) {
  return util.format('SELECT * FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
}

function query_insert(req) {
  var contractId = req.body.ContractId;
  var accountId = req.body.AccountId;
  var ccValues = req.body.cc;
  var sqlQuery = '';

  if (ccValues && ccValues.length > 0) {
    sqlQuery = 'INSERT INTO "Ordering"."CC"("ContractId","AccountId","CC","Order") VALUES ';
    for (var i = 0; i < ccValues.length; i++) {
      sqlQuery += util.format('(%s,%s,%s,%s)', contractId, accountId, helper.addQuotes(ccValues[i].CC), i);
      if (i < ccValues.length - 1)
        sqlQuery += ',';
    }
  }

  return sqlQuery;
}

function query_delete(req) {
  var accountId = req.body.AccountId;
  return util.format('DELETE FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
}

function query_getpreviousaccount(req) {
  var contractId = req.body.ContractId;
  var sqlQuery = util.format('SELECT a."Id",MAX(a."Number") ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."ContractId"=%s ' +
    'GROUP BY a."Id"',
    helper.addQuotes(contractId));

  return sqlQuery;
}

function query_getccfromaccount(req, previousAccount) {
  var sqlQuery = util.format('SELECT * FROM "Ordering"."CC" as cc Where cc."ContractId"=%s AND cc."AccountId"=%s ORDER BY cc."Order" ',
    helper.addQuotes(req.body.ContractId), helper.addQuotes(previousAccount[0].Id));
  return sqlQuery;
}

module.exports = {
  query_get,
  query_insert,
  query_delete,
  query_getpreviousaccount,
  query_getccfromaccount
}