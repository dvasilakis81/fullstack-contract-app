const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insertDecisionBoard = (req, res, next) => {
  var contractId = req.body.contractId;
  var sqlQuery = 'INSERT INTO "Ordering"."DecisionBoard"("ContractId","ProtocolNumber","ProtocolDate","Content","ADA") VALUES ';
  sqlQuery += util.format('(%s, %s, %s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.ProtocolNumber), helper.addQuotes(req.body.ProtocolDate), helper.addQuotes(req.body.Content), helper.addQuotes(req.body.ADA));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (error)
        next(error);
      else {
        helper.consoleLog("Insert Decision Board \n");
        contractMethods.getContractById(req, res, next, contractId)
        //res.status(200).json(results.rows[0]);
      }
    }
  })
}

const updateDecisionBoard = (req, res, next) => {
  var contractId = req.body.contractDetails.Id;
  var sqlQuery = util.format('UPDATE "Ordering"."DecisionBoard" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"Content"=%s,"ADA"=%s ' +
    'WHERE "Id"=%s AND "ContractId"=%s' +
    'RETURNING * ', req.body.ProtocolNumber, req.body.ProtocolDate, req.body.Content, req.body.ADA, req.body.Id, contractId)
  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateDownpaymentInfo: Insert DecisionBoard: Rows affected: ' + results.rowCount + ' ContractId: ' + contractId);
      res.status(200).json(results.rows[0]);
    }
  })
}


module.exports = {
  insertDecisionBoard,
  updateDecisionBoard
}