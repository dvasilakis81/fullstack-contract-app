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

function query_update(req) {
  return  util.format('UPDATE "Ordering"."Invoice" ' +
    'SET "Number"=%s,"Date"=%s,"DeliveredDateProtocolNumber"=%s,"DeliveredDateProtocolDate"=%s,"DeliveredDate"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(req.body.InvoiceNumber),
    helper.addQuotes(req.body.InvoiceDate),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolNumber),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolDate),
    helper.addQuotes(req.body.InvoiceDeliveredDate),
    req.body.AccountId);
}


module.exports = {
  query_insert,
  query_update
}