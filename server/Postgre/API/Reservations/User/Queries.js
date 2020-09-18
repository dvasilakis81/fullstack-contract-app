const util = require('util')
const helper = require('../../../../HelperMethods/helpermethods')

function query_getreservations() {
  return 'SELECT * FROM "Ordering"."Reservations" as r ORDER BY r."Order" ASC';
}

function query_getuserreservations(userId) {
  return 'SELECT * ' +
    'FROM "Ordering"."UserReservations" as u ' +
    'WHERE u."UserId"=' + helper.addQuotes(userId) +
    ' AND u."IsReservation"=true ' + 
    ' ORDER BY u."Order" ASC';
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

function query_insert(req) {
  const UserId = req.body.loginUserInfo.uid;
  const Name = req.body.Name;
  const Percentage = req.body.Percentage;
  const Stamp = req.body.Stamp;
  const StampOGA = req.body.StampOGA;
  const IsReservation = req.body.IsReservation;
  const Order = req.body.Order;

  var sqlQuery = util.format('INSERT INTO "Ordering"."UserReservations"("UserId","Name","Percentage","Stamp","StampOGA", "IsReservation", "Order") ' +
    'VALUES(%s,%s,%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(UserId),
    helper.addQuotes(Name),
    helper.addQuotes(Percentage),
    helper.addQuotes(Stamp),
    helper.addQuotes(StampOGA),
    IsReservation,
    helper.addQuotes(Order))

  return sqlQuery;
}

function query_update(req) {
  var Id = req.body.Id;
  const Name = req.body.Name;
  const Percentage = req.body.Percentage;
  const Stamp = req.body.Stamp;
  const StampOGA = req.body.StampOGA;
  const IsReservation = req.body.IsReservation;
  const Order = req.body.Order;

  var sqlQuery = util.format('UPDATE "Ordering"."UserReservations" ' +
    'SET "Name"=%s,"Percentage"=%s,"Stamp"=%s,"StampOGA"=%s, "IsReservation"=%s, "Order"=%s ' +
    'WHERE "Id"=%s ' +
    'RETURNING * ',
    helper.addQuotes(Name),
    helper.addQuotes(Percentage),
    helper.addQuotes(Stamp),
    helper.addQuotes(StampOGA),
    IsReservation,
    helper.addQuotes(Order),
    Id);

  return sqlQuery;
}

function query_remove(req) {
  var Id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."UserReservations" WHERE "Id"=%s RETURNING * ', Id);
  return sqlQuery;
}

module.exports = {
  query_getreservations,
  query_getuserreservations,
  query_initialize,
  query_insert,
  query_update,
  query_remove
}