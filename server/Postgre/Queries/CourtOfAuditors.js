const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const contractMethods = require('./Contract')

const insert = (req, res, next) => {
  var contractId = req.body.contractId;
  var sqlQuery = util.format('INSERT INTO "Ordering"."CourtOfAuditors"("ContractId","ProtocolNumber","ProtocolYear","ScaleNumber","APDA_ProtocolNumber","APDA_ProtocolDate") ' +
    'VALUES(%s,%s,%s,%s,%s,%s) ' +
    'RETURNING "Id"',
    helper.addQuotes(contractId),
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolYear),
    helper.addQuotes(req.body.ScaleNumber),
    helper.addQuotes(req.body.APDANumber),
    helper.addQuotes(req.body.APDADate))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("Insert in Court of Auditors \n");
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
  
}

const update = (req, res, next) => {
  var contractId = req.body.contractId;
  var sqlQuery = 
  util.format('UPDATE "Ordering"."CourtOfAuditors" ' +
    'SET "ProtocolNumber"=%s,"ProtocolYear"=%s,"ScaleNumber"=%s,"APDA_ProtocolNumber"=%s,"APDA_ProtocolDate"=%s,"ContentAccount"=%s ' +
    'WHERE "Id"=%s AND "ContractId"=%s' +
    'RETURNING * ',     
    helper.addQuotes(req.body.ProtocolNumber),
    helper.addQuotes(req.body.ProtocolYear),
    helper.addQuotes(req.body.ScaleNumber),
    helper.addQuotes(req.body.APDANumber),
    helper.addQuotes(req.body.APDADate),
    helper.addQuotes(req.body.ContentAccount),
    helper.addQuotes(req.body.Id),
    contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog("Update CourtOfAuditors \n");
      contractMethods.getContractById(req, res, next, contractId)
    }
  })

}

const remove = (req, res, next) => {  
  var Id = req.body.Id;
  var contractId = req.body.contractId;
  var sqlQuery = util.format('DELETE FROM "Ordering"."CourtOfAuditors" WHERE "Id"=%s AND "ContractId"=%s', Id, contractId)

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('courtOfAuditors: Delete CourtOfAuditors: Rows affected: ' + results.rowCount + ' ContractId: ' + contractId);
      contractMethods.getContractById(req, res, next, contractId)
    }
  })
}

module.exports = {
  insert,
  update,
  remove
}