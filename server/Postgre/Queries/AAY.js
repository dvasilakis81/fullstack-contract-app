const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insert = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var sqlQuery = util.format('SELECT * FROM "Ordering"."AAY" as aay Where aay."AccountId"=%s', helper.addQuotes(accountId))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = util.format('INSERT INTO "Ordering"."AAY"("ContractId","Value","ProtocolNumber","ProtocolDate","EadNumber","ADA", "Overthrow", "OrderNo") ' +
          'VALUES(%s,%s,%s,%s,%s,%s,%s) ' +
          'RETURNING "Id" ',
          helper.addQuotes(accountId),
          helper.addQuotes(req.body.AayValue),
          helper.addQuotes(req.body.ProtocolNumber),
          helper.addQuotes(req.body.ProtocolDate),
          helper.addQuotes(req.body.EadNumber),
          helper.addQuotes(req.body.ADA),
          helper.addQuotes(req.body.Overthrow),
          helper.addQuotes(req.body.OrderNo))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("ΑΑΥ info created \n");
            contractMethods.getContractById(req, res, next, contractId);
          }
        })
      }
    }
  })
}

const update = (req, res, next, accountInfo) => {

  var sqlQuery = util.format('UPDATE "Ordering"."AAY" ' +
    'SET "Value"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"EadNumber"=%s,ADA"=%s,"Overthrow"=%s ' +
    'WHERE "ContractId"=%s',
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.EadNumber),    
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.Overthrow),
    Number(req.body.ContractId));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateAAY: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      contractMethods.getContractById(req, res, next, contractId);
    }
  })
}

function remove(req, res, next) {

  var id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."AAY" WHERE "Id"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else{
      res.status(200).json(results.rows[0])
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
}

module.exports = { 
  insert,
  update,
  remove
}