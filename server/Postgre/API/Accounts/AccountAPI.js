const methods = require('./Methods');
const invoiceMethods = require('../Invoice/Methods');
const ccMethods = require('../CC/Methods');
const signatureMethods = require('../Signatures/Methods');
const monitoringCommitteeMethods = require('../MonitoringCommittee/Methods');
const reservationMethods = require('../../API/Reservations/Account/Methods');

// const getRemainAmountOfContract = (request, response, next) => {

//   var numberOfAccounts = await methods.getContractAccountsNumber(req, res, next);


//     var ownerId = await methods.getT(req, res, next, contractId);
//     getContractById(req, res, next, contractId);

//     const contractId = parseInt(request.query.ci)
//     const accountNumber = parseInt(request.query.an)


//     sqlQuery = 'SELECT SUM(a."AmountTotal") as AccountsAmount ' +
//       'FROM "Ordering"."Account" as a ' +
//       'WHERE a."ContractId"=' + helper.addQuotes(contractId)

//     pool.query(sqlQuery, (error, results) => {
//       if (error) {
//         next(error);
//         helper.consoleLog("Failed to get account: \n" + error.message);
//       }
//       else {
//         response.status(200).json(results.rows);
//       }
//     })
//   }  
// }

async function getFirstAccountProtocolInfo(req, res, next) {

  const { rows } = await methods.getFirstAccountProtocolInfo(req, res, next);
  res.status(200).json(rows[0]);
}

async function getAccountById(req, res, next) {

  const { rows } = await methods.getAccountById(req, res, next);
  res.status(200).json(rows[0]);
}

//NOT USED
// async function getAccountsInfo(req, res, next) {
//   var rows = await methods.getAccountsInfo(req, res, next);
//   let ret = [];
//   for (let index = 0; index < rows.length; index++) {
//     const element = results.rows[index];
//     ret.push({ number: element.Number, AmountPure: element.AmountPure, AmountFpa: element.AmountFpa, AmountTotal: element.AmountTotal })
//   }
//   res.status(200).json(ret);
// }

async function insertAccount(req, res, next) {

  var rows = await methods.getAccountInfo(req, res, next);
  if (rows && rows.length > 0)
    res.status(200).json(rows);
  else {
    var rows = await methods.insertAccount(req, res, next);
    if (rows.length > 0 && rows[0].Id) {
      var accountId = rows[0].Id;
      var rows = await invoiceMethods.insertInvoice(req, res, next, accountId);
      var rows = await ccMethods.insertCC(req, res, next, accountId);
      var rows = await signatureMethods.insertSignatures(req, res, next, accountId);
      var rows = await monitoringCommitteeMethods.insertMonitoringCommittee(req, res, next, accountId);
      var rows = await reservationMethods.sync(req, res, next, accountId);

      getAccountById(req, res, next);
    }
    else
      res.status(408).json('Ο λογαριασμός δεν μπόρεσε να δημιουργηθεί ');
  }

}

async function updateAccount(req, res, next) {

  // var accountInfo = [];
  // accountInfo.push({
  //   Id: results.rows[0].Id,
  //   ContractId: results.rows[0].ContractId,
  //   Number: req.body.AccountNumber,
  //   Start: results.rows[0].Start,
  //   End: results.rows[0].End,
  //   AmountPure: results.rows[0].AmountPure,
  //   AmountFpa: results.rows[0].AmountFpa,
  //   AmountTotal: results.rows[0].AmountTotal
  // });

  var invoiceRows = await invoiceMethods.updateInvoice(req, res, next);
  var ccRows = await ccMethods.updateCC(req, res, next);
  var signaturesRows = await signatureMethods.updateSignatures(req, res, next);
  var monitoringCommitteeRows = await monitoringCommitteeMethods.processMonitoringCommittee(req, res, next);  
  getAccountById(req, res, next);
}

module.exports = {
  getAccountById,
  getFirstAccountProtocolInfo,
  updateAccount,
  insertAccount
}