const dbConfig = require('../dbConfig')
const util = require('util')
const Pool = require('pg').Pool
const pool = new Pool(dbConfig.params)

const helper = require('../../HelperMethods/helpermethods')

const insertCourtOfAuditors = (req, res, next, accountInfo) => {
  var contractId = accountInfo[0].ContractId
  var sqlQuery = util.format('SELECT * FROM "Ordering"."CourtOfAuditors" as coa WHERE coa."ContractId"=%s', helper.addQuotes(contractId))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = util.format('INSERT INTO "Ordering"."CourtOfAuditors"("ContractId","ProtocolNumber","ProtocolYear","ScaleNumber","APDA_ProtocolNumber","APDA_ProtocolDate") ' +
          'VALUES(%s,%s,%s,%s,%s,%s) ' +
          'RETURNING "Id"',
          helper.addQuotes(contractId),
          helper.addQuotes(req.body.PraxisNumber),
          helper.addQuotes(req.body.PraxisYear),
          helper.addQuotes(req.body.ScaleNumber),
          helper.addQuotes(req.body.APDANumber),
          helper.addQuotes(req.body.APDADate))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("Insert in Court of Auditors \n");
            res.status(200).json(accountInfo);
          }
        })
      }
    }
  })
}

const UpdateCourtOfAuditors = (req, res, next, accountInfo) => {
  var contractId = accountInfo[0].ContractId
  var sqlQuery = util.format('DELETE FROM "Ordering"."CourtOfAuditors" as d WHERE d."ContractId"=%s ', contractId);
  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      var sqlQuery = util.format('INSERT INTO "Ordering"."CourtOfAuditors"("ContractId","ProtocolNumber","ProtocolYear","ScaleNumber","APDA_ProtocolNumber","APDA_ProtocolDate") ' +
        'VALUES(%s,%s,%s,%s,%s,%s) ' +
        'RETURNING "Id"',
        helper.addQuotes(contractId),
        helper.addQuotes(req.body.PraxisNumber),
        helper.addQuotes(req.body.PraxisYear),
        helper.addQuotes(req.body.ScaleNumber),
        helper.addQuotes(req.body.APDANumber),
        helper.addQuotes(req.body.APDADate))

      pool.query(sqlQuery, (error, results) => {
        if (error)
          next(error);
        else {
          helper.consoleLog("Update Decision Board \n");
          res.status(200).json(accountInfo);
        }
      })
    }
  })
}

module.exports = {
 insertCourtOfAuditors,
 UpdateCourtOfAuditors
}