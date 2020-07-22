const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const accountMethods = require('./AccountQueries')

const processMonitoringCommittee = (req, res, next, accountId) => {

  var accountId = accountInfo[0].Id
  var sqlQuery = util.format('SELECT * FROM "Ordering"."MonitoringCommittee" as mc Where mc."AccountId"=%s', helper.addQuotes(accountId))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length === 0)
        insertMonitoringCommittee(req, res, next, accountId)
      else
        updateMonitoringCommittee(req, res, next)
    }
  })
}

const insertMonitoringCommittee = (request, response, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var sqlQuery = util.format('SELECT * FROM "Ordering"."MonitoringCommittee" as mc Where mc."AccountId"=%s', helper.addQuotes(accountId))

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {
        var sqlQuery = util.format('INSERT INTO "Ordering"."MonitoringCommittee"("AccountId","MayorDecisionForMembersProtocolNumber","MayorDecisionForMembersProtocolDate","PracticalDate","TransmissionDocumentProtocolNumber","TransmissionDocumentProtocolDate","GivenPhysicalObjectContentTime") ' +
          'VALUES(%s,%s,%s,%s,%s,%s,%s) ' +
          helper.addQuotes(accountId),
          helper.addQuotes(req.body.MayorDecisionForMembersProtocolNumber),
          helper.addQuotes(req.body.MayorDecisionForMembersProtocolDate),
          helper.addQuotes(req.body.PracticalDate),
          helper.addQuotes(req.body.TransmissionDocumentProtocolNumber),
          helper.addQuotes(req.body.TransmissionDocumentProtocolDate),
          helper.addQuotes(req.body.GivenPhysicalObjectContentTime))

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("MonitoringCommittee info created \n");
            accountMethods.getAccountById(request, response, next, accountId);
          }
        })
      }
    }
  })
}

const updateMonitoringCommittee = (request, response, next) => {

  var sqlQuery = util.format('UPDATE "Ordering"."MonitoringCommittee" ' +
    'SET "MayorDecisionForMembersProtocolNumber"=%s,"MayorDecisionForMembersProtocolDate"=%s,"PracticalDate"=%s,"TransmissionDocumentProtocolNumber"=%s,"TransmissionDocumentProtocolDate"=%s,"GivenPhysicalObjectContentTime"=%s ' +
    'WHERE "AccountId"=%s',
    helper.addQuotes(request.body.MayorDecisionForMembersProtocolNumber),
    helper.addQuotes(request.body.MayorDecisionForMembersProtocolDate),
    helper.addQuotes(request.body.PracticalDate),
    helper.addQuotes(request.body.TransmissionDocumentProtocolNumber),
    helper.addQuotes(request.body.TransmissionDocumentProtocolDate),
    helper.addQuotes(request.body.GivenPhysicalObjectContentTime),
    Number(request.body.AccountId));

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateMonitoringCommittee: Rows affected: ' + results.rowCount + ' Account Id: ' + request.body.AccountId);      
      accountMethods.getAccountById(request, response, next, request.body.AccountId);      
    }
  })
}

const deleteMonitoringCommittee = (req, res, next, accountInfo) => {

  var sqlQuery = util.format('DELETE FROM "Ordering"."MonitoringCommittee" as mc Where mc."AccountId"=%s', Number(req.body.AccountId));
  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('DeleteMonitoringCommittee: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      accountMethods.getAccountById(req, res, next, req.body.AccountId);
    }
  })
}

module.exports = {
  processMonitoringCommittee,
  deleteMonitoringCommittee
}