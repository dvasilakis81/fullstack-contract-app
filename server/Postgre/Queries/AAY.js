const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')

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
        var sqlQuery = util.format('INSERT INTO "Ordering"."AAY"("AccountId","Value","ProtocolNumber","ProtocolDate","EadNumber","PreviousYear","ADA") ' +
          'VALUES(%s,%s,%s,%s,%s,%s,%s) ' +
          'RETURNING "Id" ',
          helper.addQuotes(accountId),
          helper.addQuotes(req.body.AayValue),
          helper.addQuotes(req.body.AayProtocolNumber),
          helper.addQuotes(req.body.AayProtocolDate),
          helper.addQuotes(req.body.AayEadNumber),
          helper.addQuotes(req.body.AayPreviousYear),
          helper.addQuotes(req.body.AayADA))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("ΑΑΥ info created \n");            
          }
        })
      }
    }
  })
}

const update = (req, res, next, accountInfo) => {

  var sqlQuery = util.format('UPDATE "Ordering"."AAY" ' +
    'SET "Value"=%s,"ProtocolNumber"=%s,"ProtocolDate"=%s,"EadNumber"=%s,"PreviousYear"=%s,"ADA"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(req.body.AayValue),
    helper.addQuotes(req.body.AayProtocolNumber),
    helper.addQuotes(req.body.AayProtocolDate),
    helper.addQuotes(req.body.AayEadNumber),
    helper.addQuotes(req.body.AayPreviousYear),
    helper.addQuotes(req.body.AayADA),
    Number(req.body.AccountId));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateAAY: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
    }
  })
}

function remove(req, res, next){

  var id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."AAY" WHERE "Id"=%s RETURNING * ', id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

module.exports = { 
  insert,
  update,
  remove
}