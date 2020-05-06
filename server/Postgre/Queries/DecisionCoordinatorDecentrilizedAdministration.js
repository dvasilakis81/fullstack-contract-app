const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insert = (req, res, next) => {
  var contractId = req.body.contractId;

  var sqlQuery = 'INSERT INTO "Ordering"."DecisionCoordinatorDecentrilizedAdministration"("ContractId","ProtocolNumber","ProtocolDate","ADA", "OrderNo") VALUES ';
  sqlQuery += util.format('(%s, %s, %s, %s, %s)',
  helper.addQuotes(contractId), 
  helper.addQuotes(req.body.ProtocolNumber), 
  helper.addQuotes(req.body.ProtocolDate),   
  helper.addQuotes(req.body.ADA ? req.body.ADA : ''), 
  helper.addQuotes(req.body.orderNo));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (error)
        next(error);
      else {
        helper.consoleLog("Insert Decision Coordinator Decentrilized Administration \n");
        contractMethods.getContractById(req, res, next, contractId)
      }
    }
  })
}

const update = (req, res, next) => {

  var contractId = req.body.contractId;
  var sqlQuery = util.format('UPDATE "Ordering"."DecisionCoordinatorDecentrilizedAdministration" ' +
    'SET "ProtocolNumber"=%s,"ProtocolDate"=%s,"ADA"=%s ' +
    'WHERE "Id"=%s AND "ContractId"=%s' +
    'RETURNING * ',
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolDate),
    helper.addQuotes(req.body.ADA),
    helper.addQuotes(req.body.Id),
    contractId)
  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("Update Decision Coordinator Decentrilized Administration \n");
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
}

const remove = (req, res, next) => {  
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('deleteDecisionCoordinatorDecentrilizedAdministration: Delete DecisionCoordinatorDecentrilizedAdministration: Rows affected: ' + results.rowCount + ' ContractId: ' + contractId);
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
}

module.exports = {
 insert,
 update,
 remove
}
