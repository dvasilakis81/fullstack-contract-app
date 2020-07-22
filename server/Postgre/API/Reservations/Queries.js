const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')


function query_getreservations() {
  return 'SELECT * FROM "Ordering"."Reservations" as r ORDER BY r."Order" ASC';
}

function query_getuserreservations(userId) {
  return 'SELECT * ' +
    'FROM "Ordering"."UserReservations" as u ' +
    'WHERE u."UserId"=' + helper.addQuotes(userId) + 
    ' ORDER BY u."Order" ASC';
}

function query_insert(reservations, userId) {
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

function query_update(req) {
  return util.format('UPDATE "Ordering"."Invoice" ' +
    'SET "Number"=%s,"Date"=%s,"DeliveredDateProtocolNumber"=%s,"DeliveredDateProtocolDate"=%s,"DeliveredDate"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(req.body.InvoiceNumber),
    helper.addQuotes(req.body.InvoiceDate),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolNumber),
    helper.addQuotes(req.body.InvoiceDeliveredDateProtocolDate),
    helper.addQuotes(req.body.InvoiceDeliveredDate),
    req.body.AccountId);
}

module.exports = {
  query_getreservations,
  query_getuserreservations,
  query_insert
}