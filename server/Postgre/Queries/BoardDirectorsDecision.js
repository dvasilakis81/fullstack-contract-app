const dbConfig = require('../dbConfig')
const util = require('util')
const Pool = require('pg').Pool
const pool = new Pool(dbConfig.params)

const helper = require('../../HelperMethods/helpermethods')
const DecisionCoordinatorDecentrilizedAdministration = require('./DecisionCoordinatorDecentrilizedAdministration')

const insertDecisionBoard = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var contractId = accountInfo[0].ContractId
  var sqlQuery = util.format('SELECT * FROM "Ordering"."DecisionBoard" as db WHERE db."ContractId"=%s', helper.addQuotes(contractId))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = 'INSERT INTO "Ordering"."DecisionBoard"("ContractId","ProtocolNumber","ProtocolDate","Content","ADA") VALUES ';
        sqlQuery += util.format('(%s, %s, %s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.DecisionDS1Number), helper.addQuotes(req.body.DecisionDS1Date), helper.addQuotes(req.body.DecisionDS1Date), "", helper.addQuotes(req.body.DecisionDS1ADA));
        if (req.body.HasSecondDecisionDS)
          sqlQuery += util.format(',(%s, %s, %s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.DecisionDS2Number), helper.addQuotes(req.body.DecisionDS2Date), helper.addQuotes(req.body.DecisionDS2Content, helper.addQuotes(req.body.DecisionDS2ADA)));

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("Insert Decision Board \n");
            DecisionCoordinatorDecentrilizedAdministration.insertDecisionCoordinatorDecentrilizedAdministration(req, res, next, accountInfo);
          }
        })
      }
    }
  })
}

const updateDecisionBoard = (req, res, next, accountInfo) => {
  var contractId = accountInfo[0].ContractId
  var sqlQuery = util.format('DELETE FROM "Ordering"."DecisionBoard" as d WHERE d."ContractId"=%s ', contractId);
  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      var sqlQuery = 'INSERT INTO "Ordering"."DecisionBoard"("ContractId","ProtocolNumber","ProtocolDate","Content") VALUES ';
      sqlQuery += util.format('(%s, %s, %s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.DecisionDS1Number), helper.addQuotes(req.body.DecisionDS1Date), '', helper.addQuotes(req.body.DecisionDS1ADA));
      if (req.body.HasSecondDecisionDS)
        sqlQuery += util.format(',(%s, %s, %s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.DecisionDS2Number), helper.addQuotes(req.body.DecisionDS2Date), helper.addQuotes(req.body.DecisionDS2Content), helper.addQuotes(req.body.DecisionDS2ADA));

      pool.query(sqlQuery, (error, results) => {
        if (error)
          next(error);
        else {
          helper.consoleLog('UpdateDownpaymentInfo: Insert DecisionBoard: Rows affected: ' + results.rowCount + ' ContractId: ' + contractId);
          DecisionCoordinatorDecentrilizedAdministration.UpdateDecisionCoordinatorDecentrilizedAdministration(req, res, next, accountInfo);
        }
      })
    }
  })
}

module.exports = {
 insertDecisionBoard,
 updateDecisionBoard
}