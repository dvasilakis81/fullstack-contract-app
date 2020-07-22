const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')

const getAccountById =  (req, res, next, accountId) => {

  var sqlQuery = util.format('SELECT *, ' +
    '(SELECT json_agg(Account) FROM (SELECT acc."ProtocolNumber" as firstAccountProtocolNumber, acc."ProtocolDate" as firstAccountProtocolDate FROM "Ordering"."Account" as acc WHERE acc."Id"=%s) Account) AS FirstProtocolInfo, '   +
    '(SELECT json_agg(AccountReservations) FROM (SELECT * FROM "Ordering"."AccountReservations" as accres WHERE accres."AccountId" = a."Id" ORDER BY accres."Order" ASC) AccountReservations) AS AccountReservations, ' +
    '(SELECT json_agg(Invoice) FROM (SELECT * FROM "Ordering"."Invoice" as i WHERE i."AccountId" = a."Id") Invoice) AS Invoice, ' +
    '(SELECT json_agg(CC) FROM (SELECT * FROM "Ordering"."CC" as cc WHERE cc."AccountId" = a."Id") CC) AS CC, ' +
    '(SELECT json_agg(MonitoringCommittee) FROM (SELECT * FROM "Ordering"."MonitoringCommittee" as mm WHERE mm."AccountId" = a."Id") MonitoringCommittee) AS MonitoringCommittee, ' +
    '(SELECT json_agg(DocumentSignatory) FROM ( SELECT *, ( SELECT json_agg(Signatory) FROM ( SELECT * FROM "Ordering"."Signatory" as sg WHERE sg."Id" = ds."SignatoryId") Signatory) AS Signatory, ' +
    '(SELECT json_agg(SignatoryType) FROM ( SELECT * FROM "Ordering"."SignatoryType" as sgt WHERE sgt."Id" = ds."SignatoryTypeId") SignatoryType) AS SignatoryType ' +
    'FROM "Ordering"."DocumentSignatory" as ds WHERE ds."AccountId" = a."Id") DocumentSignatory) AS DocumentSignatory ' +
    'FROM "Ordering"."Account" as a ' +
    'WHERE a."Id"=%s', parseInt(accountId), parseInt(accountId));

  pool.query(sqlQuery, (error, results) => {
    if (error) {
      next(error);
      helper.consoleLog("Failed to get account: \n" + error.message);
    } else {
      helper.consoleLog("AccountQueries: Account requested\n");
      var ret = results.rows && results.rows.length > 0 ? results.rows[0] : undefined
      res.status(200).json(ret);
    }
  })

}

module.exports = {
  getAccountById
}