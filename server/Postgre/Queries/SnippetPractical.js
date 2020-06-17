const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insert = (req, res, next) => {
  var contractId = req.body.contractId;

  var sqlQuery = util.format('INSERT INTO "Ordering"."SnippetPractical"("ContractId","ProtocolNumber","ProtocolDate","DecisionBoardProtocol","OrderNo") ' +
    'VALUES(%s,%s,%s,%s,%s) ' +
    'RETURNING "Id" ',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),    
    helper.addQuotes(req.body.DecisionBoardProtocol),
    helper.addQuotes(req.body.OrderNo))  

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("SnippetPractical info created \n");
      contractMethods.getContractById(req, res, next, contractId);
    }
  })
}

const update = (req, res, next) => {

  var sqlQuery = util.format('UPDATE "Ordering"."SnippetPractical" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"DecisionBoardProtocol"=%s,"OrderNo"=%s' +
    'WHERE "ContractId"=%s',
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),    
    helper.addQuotes(req.body.DecisionBoardProtocol),
    helper.addQuotes(req.body.OrderNo),
    Number(req.body.ContractId));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('Update SnippetPractical: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.ContractId);
      contractMethods.getContractById(req, res, next, contractId);
    }
  })
}

function remove(req, res, next) {

  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."SnippetPractical" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else       
      contractMethods.getContractById(req, res, next, contractId)    
  })
}

module.exports = {
  insert,
  update,
  remove
}