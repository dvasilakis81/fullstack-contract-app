const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insert = (req, res, next) => {
  var contractId = req.body.contractId;
  var orderNo = req.body.orderNo;  
  var sqlQuery = 'INSERT INTO "Ordering"."DecisionBoard"("ContractId","ProtocolNumber","ProtocolDate","Content","ADA", "OrderNo") VALUES ';
  sqlQuery += util.format('(%s, %s, %s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.ProtocolNumber), helper.addQuotes(req.body.ProtocolDate), helper.addQuotes(req.body.Content), helper.addQuotes(req.body.ADA), helper.addQuotes(orderNo));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (error)
        next(error);
      else {
        helper.consoleLog("Insert Decision Board \n");
        contractMethods.getContractById(req, res, next, contractId)        
      }
    }
  })
}

const update = (req, res, next) => {
  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."DecisionBoard" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"Content"=%s,"ADA"=%s ' +
    'WHERE "Id"=%s AND "ContractId"=%s' +
    'RETURNING * ', 
    helper.addQuotes(req.body.ProtocolNumber), 
    helper.addQuotes(req.body.ProtocolDate), 
    helper.addQuotes(req.body.Content), 
    helper.addQuotes(req.body.ADA), 
    helper.addQuotes(req.body.Id),
    contractId)
  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("Update Decision Board \n");
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
}

const remove = (req, res, next) => {  
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."DecisionBoard" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('deleteDecisionBoard: Delete DecisionBoard: Rows affected: ' + results.rowCount + ' ContractId: ' + contractId);
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
}

module.exports = {
  insert,
  update,
  remove
}