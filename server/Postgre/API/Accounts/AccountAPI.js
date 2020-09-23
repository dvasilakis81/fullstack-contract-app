var pool = require('../../dbConfig').pool;

const methods = require('./Methods');
const invoiceMethods = require('../Invoice/Methods');
const ccMethods = require('../CC/Methods');
const signatureMethods = require('../Signatures/Methods');
const monitoringCommitteeMethods = require('../MonitoringCommittee/Methods');
const reservationMethods = require('../../API/Reservations/Account/API');

async function getFirstAccountProtocolInfo(req, res, next) {

  const { rows } = await methods.getFirstAccountProtocolInfo(req, res, next);
  res.status(200).json(rows[0]);
}

async function getAccountById(req, res, next) {
  const rows = await methods.getAccountById(req.body.ContractId, req.body.AccountId, req.body.AccountNumber, next);
  res.status(200).json(rows[0]);
}

async function insertAccount(req, res, next) {

  var rows = await methods.getAccountInfo(req, res, next);
  if (rows && rows.length > 0)
    res.status(200).json(rows);
  else {
    const client = await pool.connect()
    try {

      await client.query('BEGIN');

      var accountRows = await methods.insertAccount(req, res, next, client);
      if (accountRows.length > 0 && accountRows[0].Id) {
        var accountId = accountRows[0].Id;
        var invoiceRows = await invoiceMethods.insertInvoice(req, res, next, accountId, client);
        var ccRows = await ccMethods.insertCC(req, res, next, accountId, client);
        var signatureRows = await signatureMethods.insertSignatures(req, res, next, accountId, client);
        var mcRows = await monitoringCommitteeMethods.insertMonitoringCommittee(req, res, next, accountId, client);
        var syncRows = await reservationMethods.insert_reservations(req, res, next, accountId, client);
        const rows = await methods.getAccountById(req.body.ContractId, req.body.AccountId, req.body.AccountNumber, next, client);
        res.status(200).json(rows);
        await client.query('COMMIT');
      }
      else {
        await client.query('COMMIT');
        res.status(408).json('Ο λογαριασμός δεν μπόρεσε να δημιουργηθεί');
      }
    } catch (error) {
      await client.query('ROLLBACK')
      next(error);
    } finally {
      client.release();
    }
  }
}

async function updateAccount(req, res, next) {

  const client = await pool.connect()
  try {
    await client.query('BEGIN');

    var rows = await methods.updateAccount(req, res, next, client);
    var invoiceRows = await invoiceMethods.updateInvoice(req, res, next, client);
    var ccRows = await ccMethods.updateCC(req, res, next, client);
    var signaturesRows = await signatureMethods.updateSignatures(req, res, next, client);
    var monitoringCommitteeRows = await monitoringCommitteeMethods.processMonitoringCommittee(req, res, next, client);

    await client.query('COMMIT');
    getAccountById(req, res, next);
  } catch (error) {
    await client.query('ROLLBACK')
    next(error);
  } finally {
    client.release();
  }
}

module.exports = {
  getAccountById,
  getFirstAccountProtocolInfo,
  updateAccount,
  insertAccount
}