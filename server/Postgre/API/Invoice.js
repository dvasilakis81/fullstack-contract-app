const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const cc = require('./CC')

const insertInvoice = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var sqlQuery = util.format('SELECT * FROM "Ordering"."Invoice" as inv WHERE inv."AccountId"=%s', helper.addQuotes(accountId))

  var ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0) {
        res.status(200).json(results.rows[0].Id);
      }
      else {
        var sqlQuery = util.format('INSERT INTO "Ordering"."Invoice"("AccountId","Number","Date","DeliveredDateProtocolNumber","DeliveredDateProtocolDate", "DeliveredDate") ' +
          'VALUES(%s,%s,%s,%s,%s,%s) ' +
          'RETURNING "Id"',
          helper.addQuotes(accountId),
          helper.addQuotes(req.body.InvoiceNumber),
          helper.addQuotes(req.body.InvoiceDate),
          helper.addQuotes(req.body.InvoiceDeliveredDateProtocolNumber),
          helper.addQuotes(req.body.InvoiceDeliveredDateProtocolDate),
          helper.addQuotes(req.body.InvoiceDeliveredDate))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("Insert new invoice \n");
            cc.insertCC(req, res, next, accountInfo);
          }
        })
      }
    }
  })
}

const updateInvoice = (req, res, next, accountInfo) => {
  var sqlQuery = util.format('UPDATE "Ordering"."Invoice" ' +
    'SET "Number"=%s,"Date"=%s,"DeliveredDateProtocolNumber"=%s,"DeliveredDateProtocolDate"=%s,"DeliveredDate"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(req.body.InvoiceNumber),
    helper.addQuotes(req.body.InvoiceDate),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolNumber),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolDate),
    helper.addQuotes(req.body.InvoiceDeliveredDate),
    req.body.AccountId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateInvoice: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      cc.updateCC(req, res, next, accountInfo);
    }
  })
}

module.exports = { 
  insertInvoice,
  updateInvoice
}