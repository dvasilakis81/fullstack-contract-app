var reservationsMethods = require('../../Reservations/Account/Methods');
var accountMethods = require('../../Accounts/Methods');

async function sync(req, res, next) {

  const reservations = await reservationsMethods.get(req, res, next);
  if (reservations && reservations.length > 0) {
    await reservationsMethods.remove(req, res, next);
    await reservationsMethods.insert(req, res, next);
  }
  else
    await reservationsMethods.insert(req, res, next);

  try {
    const { rows } = await accountMethods.getAccountById(req, res, next);
    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sync
}