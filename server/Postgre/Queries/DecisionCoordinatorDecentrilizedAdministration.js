const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const CourtOfAuditors = require('./CourtOfAuditors')

const insertDecisionCoordinatorDecentrilizedAdministration = (req, res, next, accountInfo) => {
  var contractId = accountInfo[0].ContractId
  var accountId = accountInfo[0].Id
  var sqlQuery = util.format('SELECT * FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" as dc WHERE dc."ContractId"=%s', helper.addQuotes(contractId))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = 'INSERT INTO "Ordering"."DecisionCoordinatorDecentrilizedAdministration"("ContractId","ProtocolNumber","ProtocolDate") VALUES ';
        sqlQuery += util.format('(%s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.Decision1SADANumber), helper.addQuotes(req.body.Decision1SADADate));
        if (req.body.HasSecondDecisionDS)
          sqlQuery += util.format(',(%s, %s, %s)', helper.addQuotes(contractId), helper.addQuotes(req.body.Decision2SADANumber), helper.addQuotes(req.body.Decision1SADADate))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("Insert DecisionCoordinator Decentrilized Administration \n");
            if (req.body.HasCourtOfAuditors === true)
              CourtOfAuditors.insertCourtOfAuditors(req, res, next, accountInfo);
            else
              res.status(200).json(accountInfo);
          }
        })
      }
    }
  })
}

const UpdateDecisionCoordinatorDecentrilizedAdministration = (req, res, next, accountInfo) => {
  var sqlQuery = util.format('DELETE FROM "Ordering"."DecisionCoordinatorDecentrilizedAdministration" as d WHERE d."AccountId"=%s ', req.body.AccountId);
  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      var sqlQuery = 'INSERT INTO "Ordering"."DecisionCoordinatorDecentrilizedAdministration"("AccountId","ProtocolNumber","ProtocolDate") VALUES ';
      sqlQuery += util.format('(%s, %s, %s)', helper.addQuotes(req.body.AccountId), helper.addQuotes(req.body.Decision1SADANumber), helper.addQuotes(req.body.Decision1SADADate));
      if (req.body.HasSecondDecisionDS)
        sqlQuery += util.format(',(%s, %s, %s)', helper.addQuotes(req.body.AccountId), helper.addQuotes(req.body.Decision2SADANumber), helper.addQuotes(req.body.Decision2SADADate));

      pool.query(sqlQuery, (error, results) => {
        if (error)
          next(error);
        else {
          helper.consoleLog("Update Decision Coordinator Decentrilized Administration");
          if (req.body.HasCourtOfAuditors === true)
            CourtOfAuditors.UpdateCourtOfAuditors(req, res, next, accountInfo);
          else
            res.status(200).json(accountInfo);
        }
      })
    }
  })
}


module.exports = {
 insertDecisionCoordinatorDecentrilizedAdministration,
 UpdateDecisionCoordinatorDecentrilizedAdministration
}
