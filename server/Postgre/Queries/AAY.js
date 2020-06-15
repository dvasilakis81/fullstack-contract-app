const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insert = (req, res, next) => {
  var contractId = req.body.contractId;

  var sqlQuery = util.format('INSERT INTO "Ordering"."AAY"("ContractId","Value","ProtocolNumber","ProtocolDate","EadNumber","ADA","OrderNo","Type","Overthrow") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING "Id" ',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.EadNumber),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.orderNo),
    helper.addQuotes(req.body.Type),
    helper.addQuotes(req.body.Overthrow),
  )

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("ΑΑΥ info created \n");
      contractMethods.getContractById(req, res, next, contractId);
    }
  })
}

const update = (req, res, next, accountInfo) => {

  var sqlQuery = util.format('UPDATE "Ordering"."AAY" ' +
    'SET "Value"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"EadNumber"=%s,ADA"=%s,"Type"=%s,"Overthrow"=%s ' +
    'WHERE "ContractId"=%s',
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.EadNumber),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.Type),
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

  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."AAY" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
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