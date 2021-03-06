const util = require('util')
const helper = require('../../../../HelperMethods/helpermethods')

function query_getaccountreservations(req) {
  var userId = req.body.loginUserInfo.uid;
  var accountId = req.body.AccountInfo.Id;

  var sqlQuery = util.format('SELECT * FROM "Ordering"."AccountReservations" as ur WHERE ur."UserId"=%s AND ur."AccountId"=%s',
    helper.addQuotes(userId), helper.addQuotes(accountId));

  return sqlQuery;
}

function query_initialize(reservations, userId) {
  var sqlQuery = util.format('INSERT INTO "Ordering"."UserReservations"("UserId", "Name","Percentage","Stamp","StampOGA", "IsReservation", "Order") VALUES ');
  for (var i = 0; i < reservations.length; i++) {
    sqlQuery += util.format('(%s,%s,%s,%s,%s,%s,%s)',
      helper.addQuotes(userId),
      helper.addQuotes(reservations[i].Name),
      helper.addQuotes(reservations[i].Percentage),
      helper.addQuotes(reservations[i].Stamp),
      helper.addQuotes(reservations[i].StampOGA),
      helper.addQuotes(reservations[i].IsReservation),
      helper.addQuotes(reservations[i].Order));
    if (i < reservations.length - 1)
      sqlQuery += ','
  }

  return sqlQuery;
}

function query_insert(userId, accountId, reservations) {

  var sqlQuery = util.format('INSERT INTO "Ordering"."AccountReservations"("UserId", "AccountId","Name","Percentage","Stamp","StampOGA", "IsReservation", "Order") VALUES ');
  for (var i = 0; i < reservations.length; i++) {
    if (reservations[i].IsReservation === true) {
      sqlQuery += util.format('(%s,%s,%s,%s,%s,%s,%s,%s)',
        helper.addQuotes(userId),
        helper.addQuotes(accountId),
        helper.addQuotes(reservations[i].Name),
        helper.addQuotes(reservations[i].Percentage),
        helper.addQuotes(reservations[i].Stamp),
        helper.addQuotes(reservations[i].StampOGA),
        reservations[i].IsReservation,
        helper.addQuotes(reservations[i].Order));
      if (i < reservations.length && reservations[i + 1].IsReservation === true)
        sqlQuery += ','
    }
  }

  return sqlQuery;
}

function query_remove(req, accountId) {
  var userId = req.body.loginUserInfo.uid;
  var accountId = accountId ? accountId : req.body.AccountInfo.Id;

  var sqlQuery = util.format('DELETE FROM "Ordering"."AccountReservations" as ur WHERE ur."UserId"=%s AND ur."AccountId"=%s',
    helper.addQuotes(userId), helper.addQuotes(accountId));
  return sqlQuery;
}

module.exports = {
  query_getaccountreservations,
  query_initialize,
  query_insert,
  query_remove
}