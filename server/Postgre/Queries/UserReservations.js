const helper = require('../../HelperMethods/helpermethods')
const pool = require('../dbConfig').pool
const util = require('util')

const createUserReservationForLoginUser = (response, token, userLoginInfo, reservations, jwt, secretKey) => {

  var sqlQuery = util.format('INSERT INTO "Ordering"."UserReservations"("UserId", "Name","Percentage","Stamp","StampOGA", "IsReservation", "Order") VALUES ');
  for (var i = 0; i < reservations.length; i++) {
    sqlQuery += util.format('(%s,%s,%s,%s,%s,%s,%s)', 
    helper.addQuotes(userLoginInfo.Id), 
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
    else {
      sqlQuery = util.format('Select * From "Ordering"."UserReservations" as ur Where ur."UserId"=%s', userLoginInfo.Id);
      pool.query(sqlQuery, (error, results) => {
        if (error)
          next(error);
        else {
          response.status(200).json({
            success: true,
            id: userLoginInfo.Id,
            username: userLoginInfo.Username,
            role: userLoginInfo.Role,
            token: token,
            expiresAt: helper.getExpiresAt(token, jwt, secretKey),
            reservations: results.rows
          });
        }
      })
    }
  })
}

const createUserReservation = (req, res, next) => {
  var ret = ''

  const Name = req.body.Name;
  const Percentage = req.body.Percentage;
  const Stamp = req.body.Stamp;
  const StampOGA = req.body.StampOGA;
  const IsReservation = req.body.IsReservation === 'Ναι' ? true : false;
  const Order = req.body.Order;

  var sqlQuery = util.format('INSERT INTO "Ordering"."UserReservations"("Name","Percentage","Stamp","StampOGA", "IsReservation", "Order") ' +
    'VALUES(%s,%s,%s,%s,%s,%s) ' +
    'RETURNING * ',
    helper.addQuotes(Name),
    helper.addQuotes(Percentage),
    helper.addQuotes(Stamp),
    helper.addQuotes(StampOGA),
    IsReservation,
    helper.addQuotes(Order))

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0]);
  })

  return ret;
}

const updateUserReservation = (req, res, next) => {

  var Id = req.body.Id;
  const Name = req.body.Name;
  const Percentage = req.body.Percentage;
  const Stamp = req.body.Stamp;
  const StampOGA = req.body.StampOGA;
  const IsReservation = req.body.IsReservation === 'Ναι' ? true : false;
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

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}

const deleteUserReservation = (req, res, next) => {

  var Id = req.body.Id;
  var sqlQuery = util.format('DELETE FROM "Ordering"."UserReservations" WHERE "Id"=%s RETURNING * ', Id);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else
      res.status(200).json(results.rows[0])
  })
}


module.exports = {
  createUserReservationForLoginUser,
  createUserReservation,
  updateUserReservation,
  deleteUserReservation
}