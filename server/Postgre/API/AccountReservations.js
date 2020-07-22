const helper = require('../../HelperMethods/helpermethods')
const pool = require('../dbConfig').pool
const util = require('util')
const accountMethods = require('./Accounts/AccountAPI')

const insert = (req, res, next) => {
  var sqlQuery = util.format('INSERT INTO "Ordering"."AccountReservations"("UserId", "AccountId","Name","Percentage","Stamp","StampOGA", "IsReservation", "Order") VALUES ');
  var userId = req.body.userId;
  var accountId = req.body.accountInfo.Id;
  var reservations = req.body.userreservations;

  for (var i = 0; i < reservations.length; i++) {
    sqlQuery += util.format('(%s,%s,%s,%s,%s,%s,%s,%s)',
      helper.addQuotes(userId),
      helper.addQuotes(accountId),
      helper.addQuotes(reservations[i].Name),
      helper.addQuotes(reservations[i].Percentage),
      helper.addQuotes(reservations[i].Stamp),
      helper.addQuotes(reservations[i].StampOGA),
      helper.addQuotes(reservations[i].IsReservation),
      helper.addQuotes(reservations[i].Order));
    if (i < reservations.length - 1)
      sqlQuery += ','
  }

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      accountMethods.getAccountById(req, res, next);
  })
}
const sync = (req, res, next) => {
  var userId = req.body.userId;
  var accountId = req.body.accountInfo.Id;

  var sqlQuery = util.format('SELECT * FROM "Ordering"."AccountReservations"  as ur WHERE ur."UserId"=%s AND ur."AccountId"=%s',
    helper.addQuotes(userId), helper.addQuotes(accountId));
    
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results && results.rows && results.rows.length > 0) {
        sqlQuery = util.format('DELETE FROM "Ordering"."AccountReservations" as ur WHERE ur."UserId"=%s AND ur."AccountId"=%s',
          helper.addQuotes(userId), helper.addQuotes(accountId));
        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else
            insert(req, res, next);
        })
      } else
        insert(req, res, next);
    }
  })
}

module.exports = {
  sync
}