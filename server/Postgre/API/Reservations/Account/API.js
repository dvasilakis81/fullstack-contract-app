var accountMethods = require('../../Accounts/Methods');

var accountReservationsMethods = require('../../Reservations/Account/Methods');
var userReservationsMethods = require('../../Reservations/User/Methods');

async function insert_reservations(req, res, next, accountId, client) {

  try {
    var reservations = req.body.reservations ? req.body.reservations : req.body.accountReservations;
    await accountReservationsMethods.insert(req.body.loginUserInfo.uid, accountId, reservations, client, next);
  } catch (error) {
    next(error);
  }

}

async function sync(req, res, next) {

  try {
    var userId = req.body.loginUserInfo.uid;
    var accountId = req.body.AccountInfo.Id;

    // remove the old account reservations
    await accountReservationsMethods.remove(req, res, next);

    // get the user reservations
    const userReservations = await userReservationsMethods.getUserReservations(userId, next);
    
    // insert the new account reservations
    await accountReservationsMethods.insert(userId, accountId, userReservations, null, next);

    // get the new account    
    var rows = await accountMethods.getAccountById(req.body.ContractId, accountId, req.body.AccountNumber, next);
    res.status(200).json(rows[0]);

  } catch (error) {
    next(error);
  }

}

module.exports = {
  insert_reservations,
  sync
}