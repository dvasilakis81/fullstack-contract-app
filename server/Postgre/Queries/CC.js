const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const Signatures = require('./Signatures')

const insertCC = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id;
  var contractId = req.body.contractId;
  var ccValues = req.body.cc;

  var sqlQuery = util.format('SELECT * FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        if (ccValues && ccValues.length > 0) {
          var sqlQuery = 'INSERT INTO "Ordering"."CC"("ContractId","AccountId","CC","Order") VALUES ';
          for (var i = 0; i < ccValues.length; i++) {
            sqlQuery += util.format('(%s,%s,%s,%s)', contractId, accountId, helper.addQuotes(ccValues[i].CC), i);
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
        } else
          Signatures.insertDocumentSignatures(req, res, next, accountInfo);
      }
    }
  })
}

const updateCC = (req, res, next, accountInfo) => {
  var contractId = req.body.contractId;
  var accountId = accountInfo[0].Id
  var ccValues = req.body.cc

  var sqlQuery = util.format('DELETE FROM "Ordering"."CC" as cc Where cc."AccountId"=%s', helper.addQuotes(accountId));
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (ccValues && ccValues.length > 0) {
        var sqlQuery = 'INSERT INTO "Ordering"."CC"("ContractId","AccountId","CC","Order") VALUES ';
        for (var i = 0; i < ccValues.length; i++) {
          sqlQuery += util.format('(%s,%s,%s,%s)', accountId, helper.addQuotes(ccValues[i].CC), i);
          if (i < ccValues.length - 1)
            sqlQuery += ',';
        }

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog('UpdateCC: Rows affected: ' + results.rowCount);
            Signatures.updateSignatory1(req, res, next, accountInfo);
          }
        })
      }
      else
        Signatures.updateSignatory1(req, res, next, accountInfo);
    }
  })
}

const getccfrompreviousaccount = (req, res, next) => {
  var contractId = req.body.ContractId;
  var sqlQuery = util.format('SELECT a."Id",MAX(a."Number") ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."ContractId"=%s ' +
    'GROUP BY a."Id"',
    helper.addQuotes(contractId));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      if (results && results.rowCount > 0) {
        sqlQuery = util.format('SELECT * FROM "Ordering"."CC" as cc Where cc."ContractId"=%s AND cc."AccountId"=%s ORDER BY cc."Order" ',
          helper.addQuotes(contractId), helper.addQuotes(results.rows[0].Id));
        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else
            if (results && results.rowCount > 0)
              res.status(200).json(results.rows);
            else {
              var cc = []
              res.status(200).json(cc);
            }
        });
      } else {
        var cc = []
        res.status(200).json(cc);
      }
  });


}

module.exports = {
  insertCC,
  updateCC,
  getccfrompreviousaccount
}