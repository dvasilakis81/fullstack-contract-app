const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_get(accountId) {
  return util.format('SELECT * FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
}

function query_insert(req, accountId) {  
  var contractId = req.body.contractId;
  var ccValues = req.body.cc;
  var sqlQuery = '';

  if (ccValues && ccValues.length > 0) {
    var sqlQuery = 'INSERT INTO "Ordering"."CC"("ContractId","AccountId","CC","Order") VALUES ';
    for (var i = 0; i < ccValues.length; i++) {
      sqlQuery += util.format('(%s,%s,%s,%s)', contractId, accountId, helper.addQuotes(ccValues[i].CC), i);
      if (i < ccValues.length - 1)
        sqlQuery += ',';
    }
  }

  return sqlQuery;
}

function query_update(req) {
  var accountId = accountInfo[0].Id
  var ccValues = req.body.cc

  if (ccValues && ccValues.length > 0) {
    var sqlQuery = 'INSERT INTO "Ordering"."CC"("ContractId","AccountId","CC","Order") VALUES ';
    for (var i = 0; i < ccValues.length; i++) {
      sqlQuery += util.format('(%s,%s,%s,%s)', contractId, accountId, helper.addQuotes(ccValues[i].CC), i);
      if (i < ccValues.length - 1)
        sqlQuery += ',';
    }
  }
}

function query_delete(req) {
  return util.format('DELETE FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
}

module.exports = {
  query_get,
  query_insert,
  query_update,
  query_delete
}