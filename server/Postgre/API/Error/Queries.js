const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_insert(req, accountId) {

  return util.format('INSERT INTO "Ordering"."Invoice"("AccountId","Number","Date","DeliveredDateProtocolNumber","DeliveredDateProtocolDate", "DeliveredDate") ' +
    'VALUES(%s,%s,%s,%s,%s,%s) ' +
    'RETURNING "Id"',
    helper.addQuotes(accountId),
    helper.addQuotes(req.body.InvoiceNumber),
    helper.addQuotes(req.body.InvoiceDate),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolNumber),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolDate),
    helper.addQuotes(req.body.InvoiceDeliveredDate))
}

function query_getnumberofregisterederrors(req) {
  return 'SELECT COUNT(*) FROM "Ordering"."LogError"'
}

function query_inserterror(username, msg, req) {
  var sqlQuery = util.format('INSERT INTO "Ordering"."LogError"("Username","ErrorMessage", "DateCreated", "HttpMethod", "HttpPath") ' +
    'VALUES(%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(username),
    helper.addQuotes(msg),
    helper.addQuotes(new Date().toLocaleString()),
    helper.addQuotes(req.method),
    helper.addQuotes(req.path))

  return sqlQuery;
}

function query_deletelogerror() {
  var sqlQuery = util.format('DELETE FROM "Ordering"."LogError" as le ' +
    'WHERE le."Id" = (SELECT MIN(le."Id") FROM "Ordering"."LogError" as le)');

  return sqlQuery;
}
module.exports = {
  query_getnumberofregisterederrors,
  query_inserterror,
  query_deletelogerror  
}