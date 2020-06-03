const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const aayQueries = require('./AAY')

// var types = require('pg').types
// types.setTypeParser(1700, function(val) {
//     return val.replace('.',',');
// });

const getRemainAmountOfContract = (request, response, next) => {
  var ret = ''

  const contractId = parseInt(request.query.ci)
  const accountNumber = parseInt(request.query.an)

  var sqlQuery = 'SELECT COUNT(a."Id") ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."ContractId"=' + helper.addQuotes(contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get account: \n" + error.message);
    }
    else {
      if (results.rows[0].count == accountNumber - 1) {
        sqlQuery = 'SELECT SUM(a."AmountTotal") as AccountsAmount ' +
          'FROM "Ordering"."Account" as a ' +
          'WHERE a."ContractId"=' + helper.addQuotes(contractId)

        pool.query(sqlQuery, (error, results) => {
          if (error) {
            next(error);
            helper.consoleLog("Failed to get account: \n" + error.message);
          }
          else {
            response.status(200).json(results.rows);
          }
        })
      }
      else {
        response.status(200).json('-1');
      }
    }
  })

  return ret;
}

const getFirstAccountProtocolInfo = (request, response, next) => {
  var ret = ''

  const contractId = parseInt(request.query.ci)
  var sqlQuery = util.format('SELECT a."ProtocolNumber", a."ProtocolDate" ' +
    'FROM "Ordering"."Account" as a ' +
    'Where a."ContractId"=%s AND a."Number"=1', helper.addQuotes(contractId))

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get account: \n" + error.message);
    }
    else
      response.status(200).json(results.rows);
  })
  return ret;
}

const getAccountById = (request, response, next) => {
  const contractId = parseInt(request.query.ci)
  const accountNumber = parseInt(request.query.an)

  // try {
  var sqlQuery = util.format('SELECT *, ' +
    '(SELECT json_agg(Account) FROM (SELECT acc."ProtocolNumber" as firstAccountProtocolNumber, acc."ProtocolDate" as firstAccountProtocolDate FROM "Ordering"."Account" as acc WHERE acc."Number"=1 AND acc."ContractId"=%s) Account) AS FirstProtocolInfo, ' +
    '(SELECT json_agg(AAY) FROM (SELECT * FROM "Ordering"."AAY" as b WHERE b."AccountId" = a."Id") AAY) AS AAY, ' +
    '(SELECT json_agg(Invoice) FROM (SELECT * FROM "Ordering"."Invoice" as i WHERE i."AccountId" = a."Id") Invoice) AS Invoice, ' +
    '(SELECT json_agg(CC) FROM (SELECT * FROM "Ordering"."CC" as cc WHERE cc."AccountId" = a."Id") CC) AS CC, ' +
    '(SELECT json_agg(MonitoringCommittee) FROM (SELECT * FROM "Ordering"."MonitoringCommittee" as mm WHERE mm."AccountId" = a."Id") MonitoringCommittee) AS MonitoringCommittee, ' +
    '(SELECT json_agg(DocumentSignatory) FROM ( SELECT *, ( SELECT json_agg(Signatory) FROM ( SELECT * FROM "Ordering"."Signatory" as sg WHERE sg."Id" = ds."SignatoryId") Signatory) AS Signatory, ' +
    '(SELECT json_agg(SignatoryType) FROM ( SELECT * FROM "Ordering"."SignatoryType" as sgt WHERE sgt."Id" = ds."SignatoryTypeId") SignatoryType) AS SignatoryType ' +
    'FROM "Ordering"."DocumentSignatory" as ds WHERE ds."AccountId" = a."Id") DocumentSignatory) AS DocumentSignatory ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."ContractId"=%s AND a."Number"=%s', contractId, contractId, accountNumber);

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get account: \n" + error.message);
    }
    else {
      helper.consoleLog("Account requested\n");
      var ret = results.rows && results.rows.length > 0 ? results.rows[0] : undefined
      response.status(200).json(ret);
    }
  })
  // } catch (error) {
  //   next(error);
  //   helper.consoleLog("Failed to get account: \n" + error.message);
  // }
}
const getAccountsInfo = (request, response, next) => {
  const contractId = parseInt(request.query.ci);
  const accountNumber = parseInt(request.query.an);

  pool.query(util.format('SELECT  a."Number", a."AmountPure", a."AmountFpa", a."AmountTotal" ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."ContractId"=%s AND a."Number"<=%s ' +
    'ORDER BY a."Number" ASC', contractId, accountNumber), (error, results) => {
      if (error)
        next(error);
      else {
        let ret = [];
        for (let index = 0; index < results.rows.length; index++) {
          const element = results.rows[index];
          ret.push({ number: element.Number, AmountPure: element.AmountPure, AmountFpa: element.AmountFpa, AmountTotal: element.AmountTotal })
        }

        response.status(200).json(ret)
      }
    })
}
// const getProtocolOfFirstTransitory = (req, res, next) => {
//   pool.query(util.format('SELECT ProtocolNumber,ProtocolDate FROM "Ordering"."Account" WHERE "ContractId"=%s AND "Number"=%s' , 
//                           helper.addQuotes(req.body.ContractId), helper.addQuotes(1), (error, results) => {
//     if (error)
//       next(error);
//     else
//       response.status(200).json(results.rows)
//   }))
// }
const insertAccount = (req, res, next) => {
  var contractId = req.body.ContractId;
  var sqlQuery = util.format('SELECT * ' +
    'FROM "Ordering"."Account" as acc ' +
    'WHERE acc."ContractId"=%s AND acc."Number"=%s', helper.addQuotes(contractId), helper.addQuotes(req.body.AccountNumber))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = util.format('INSERT INTO "Ordering"."Account"("ContractId","Number","Start","End", ' +
          '"AmountPure","AmountFpa","AmountTotal","ProtocolNumber","ProtocolDate", "AmountFullWritten", "IsFirstOfTheYear",' +
          '"WorkConfirmationDate","DeliveryGoodsDate", "DocumentDate", "FirstAccountProtocolNumber", "FirstAccountProtocolDate", "DateCreated", "DateModified") ' +
          'VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
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
          req.body.IsFirstOfTheYear,
          helper.addQuotes(req.body.WorkConfirmationDate),
          helper.addQuotes(req.body.DeliveryGoodsDate),
          helper.addQuotes(req.body.DocumentDate),
          helper.addQuotes(req.body.FirstAccountProtocolNumber),
          helper.addQuotes(req.body.FirstAccountProtocolDate),
          helper.addQuotes(new Date().toLocaleString()),
          helper.addQuotes(new Date().toLocaleString()))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            if (results.rows.length > 0 && results.rows[0].Id) {
              helper.consoleLog(util.format("Account created with id: %s \n", results.rows[0].Id));

              var accountInfo = [];
              accountInfo.push({
                Id: results.rows[0].Id,
                ContractId: contractId,
                Number: req.body.AccountNumber,
                Start: results.rows[0].Start,
                End: results.rows[0].End,
                AmountPure: results.rows[0].AmountPure,
                AmountFpa: results.rows[0].AmountFpa,
                AmountTotal: results.rows[0].AmountTotal
              })

              aayQueries.insertAAY(req, res, next, accountInfo);
            }
            else
              res.status(408).json('Ο λογαριασμός δεν μπόρεσε να δημιουργηθεί ');
          }
        })
      }
    }
  })
}

const updateAccount = (req, res, next) => {
  var sqlQuery = util.format('UPDATE "Ordering"."Account" ' +
    'SET "Start"=%s,"End"=%s,"AmountPure"=%s,"AmountFpa"=%s,"AmountTotal"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"AmountFullWritten"=%s,' +
    '"IsFirstOfTheYear"=%s,"WorkConfirmationDate"=%s,"DeliveryGoodsDate"=%s,"DocumentDate"=%s,"FirstAccountProtocolNumber"=%s,"FirstAccountProtocolDate"=%s, "DateModified"=%s ' +
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
    req.body.IsFirstOfTheYear,
    helper.addQuotes(req.body.WorkConfirmationDate),
    helper.addQuotes(req.body.DeliveryGoodsDate),
    helper.addQuotes(req.body.DocumentDate),
    helper.addQuotes(req.body.FirstAccountProtocolNumber),
    helper.addQuotes(req.body.FirstAccountProtocolDate),    
    helper.addQuotes(new Date().toLocaleDateString()),
    Number(req.body.AccountId));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);

      var accountInfo = [];
      accountInfo.push({
        Id: results.rows[0].Id,
        ContractId: results.rows[0].ContractId,
        Number: req.body.AccountNumber,
        Start: results.rows[0].Start,
        End: results.rows[0].End,
        AmountPure: results.rows[0].AmountPure,
        AmountFpa: results.rows[0].AmountFpa,
        AmountTotal: results.rows[0].AmountTotal
      })

      aayQueries.updateAAY(req, res, next, accountInfo);
    }
  })
}

module.exports = {
  getAccountById,
  getFirstAccountProtocolInfo,
  getRemainAmountOfContract,
  updateAccount,
  insertAccount,
  getAccountsInfo  
}