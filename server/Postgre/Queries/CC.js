const dbConfig = require('../dbConfig')
const util = require('util')
const Pool = require('pg').Pool
const pool = new Pool(dbConfig.params)


const helper = require('../../HelperMethods/helpermethods')
const Signatures = require('./Signatures')

const insertCC = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var ccValues = req.body.cc

  var sqlQuery = util.format('SELECT * FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = 'INSERT INTO "Ordering"."CC"("AccountId","CC","Order") VALUES ';
        for (var i = 0; i < ccValues.length; i++) {
          sqlQuery += util.format('(%s,%s,%s)', accountId, ccValues[i], i);
          if (i < ccValues.length - 1)
            sqlQuery += ',';
        }

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("Insert CC Info\n");
            Signatures.insertDocumentSignatures(req, res, next, accountInfo);
          }
        })
      }
    }
  })
}

const updateCC = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var ccValues = req.body.cc

  var sqlQuery = util.format('DELETE FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (ccValues && ccValues.length > 0) {
        var sqlQuery = 'INSERT INTO "Ordering"."CC"("AccountId","CC","Order") VALUES ';
        for (var i = 0; i < ccValues.length; i++) {
          sqlQuery += util.format('(%s,%s,%s)', accountId, helper.addQuotes(ccValues[i].CC), i);
          if (i < ccValues.length - 1)
            sqlQuery += ',';
        }

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog('UpdateCC: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
            Signatures.updateSignatory1(req, res, next, accountInfo);
          }
        })
      }
      else
        Signatures.updateSignatory1(req, res, next, accountInfo);
    }
  })
}

module.exports = {
  insertCC,
  updateCC
}