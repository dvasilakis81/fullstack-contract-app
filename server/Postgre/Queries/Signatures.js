const pool = require('../dbConfig').pool
const util = require('util')
const helper = require('../../HelperMethods/helpermethods')
const MonitoringCommittee = require('./MonitoringCommittee')

const insertDocumentSignatures = (req, res, next, accountInfo) => {
  var accountId = accountInfo[0].Id
  var sqlQuery = util.format('SELECT * FROM "Ordering"."DocumentSignatory" as ds Where ds."AccountId"=%s', helper.addQuotes(accountId))
  var signatureValues = getSignatureValues(accountId, req);

  ret = pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      if (results.rows.length > 0)
        res.status(200).json(results.rows[0].Id);
      else {

        var sqlQuery = 'INSERT INTO "Ordering"."DocumentSignatory"("AccountId","SignatoryTypeId","SignatoryId","DocumentType","Absense") VALUES ';
        for (var i = 0; i < signatureValues.length; i++) {
          sqlQuery += util.format('(%s,%s,%s,%s,%s)', signatureValues[i][0], signatureValues[i][1], signatureValues[i][2], signatureValues[i][3], signatureValues[i][4])
          if (i < signatureValues.length - 1)
            sqlQuery += ','
        }
        sqlQuery += ' RETURNING "Id"';

        pool.query(sqlQuery, (error, results) => {
          if (error)
            next(error);
          else {
            helper.consoleLog("Insert DocumentSignatures \n");
            if (accountInfo.HasMonitoringCommittee)
              MonitoringCommittee.insertMonitoringCommittee(req, res, next, accountInfo);
            else
              res.status(200).json(accountInfo);
          }
        })
      }
    }
  })
}

const updateSignatory1 = (req, res, next, accountInfo) => {
  var sqlQuery = util.format('UPDATE "Ordering"."DocumentSignatory" ' +
    'SET "SignatoryTypeId"=%s,"SignatoryId"=%s' +
    'WHERE "AccountId"=%s AND "DocumentType"=1 AND "SignatoryTypeId" < 3',
    helper.addQuotes(req.body.SignType1),
    helper.addQuotes(req.body.SignName1),
    req.body.AccountId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateSignatory1: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      updateSignatory2(req, res, next, accountInfo);
    }
  })
}
const updateSignatory2 = (req, res, next, accountInfo) => {
  var sqlQuery = util.format('UPDATE "Ordering"."DocumentSignatory" ' +
    'SET "SignatoryTypeId"=%s,"SignatoryId"=%s' +
    'WHERE "AccountId"=%s AND "DocumentType"=1 AND "SignatoryTypeId">4 AND "SignatoryTypeId"<7',
    req.body.SignType2,
    req.body.SignName2,
    req.body.AccountId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateSignatory2: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      updateSignatory3(req, res, next, accountInfo);
    }
  })
}
const updateSignatory3 = (req, res, next, accountInfo) => {
  var sqlQuery = util.format('UPDATE "Ordering"."DocumentSignatory" ' +
    'SET "SignatoryTypeId"=%s,"SignatoryId"=%s,"Absense"=%s ' +
    'WHERE "AccountId"=%s AND "DocumentType"=1 AND "SignatoryTypeId">2 AND "SignatoryTypeId"<5',
    helper.addQuotes(req.body.SignType3),
    helper.addQuotes(req.body.SignName3),
    req.body.AbsenseOfDirector1,
    req.body.AccountId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateSignatory3:  Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      updateSignatory4(req, res, next, accountInfo);
    }
  })
}
const updateSignatory4 = (req, res, next, accountInfo) => {
  var sqlQuery = util.format('UPDATE "Ordering"."DocumentSignatory" ' +
    'SET "SignatoryTypeId"=%s,"SignatoryId"=%s,"Absense"=%s ' +
    'WHERE "AccountId"=%s AND "DocumentType"=2',
    helper.addQuotes(req.body.SignType4),
    helper.addQuotes(req.body.SignName4),
    req.body.AbsenseOfDirector2,
    req.body.AccountId);

  pool.query(sqlQuery, (error, results) => {
    if (error)
      next(error);
    else {
      helper.consoleLog('UpdateSignatory4: Rows affected: ' + results.rowCount + ' Account Id: ' + req.body.AccountId);
      if (accountInfo.HasMonitoringCommittee)
        MonitoringCommittee.updateMonitoringCommittee(req, res, next);
      else
        MonitoringCommittee.deleteMonitoringCommittee(req, res, next, accountInfo);      
    }
  })
}

function getSignatureValues(accountId, req) {
  var signatureValues = new Array(4);
  for (var i = 0; i < signatureValues.length; i++) {
    signatureValues[i] = new Array(5);
    if (i === 0) {
      signatureValues[i][0] = helper.addQuotes(accountId);
      signatureValues[i][1] = helper.addQuotes(req.body.SignType1);
      signatureValues[i][2] = helper.addQuotes(req.body.SignName1);
      signatureValues[i][3] = helper.addQuotes(1);
      signatureValues[i][4] = false;
    }
    else if (i === 1) {
      signatureValues[i][0] = helper.addQuotes(accountId);
      signatureValues[i][1] = helper.addQuotes(req.body.SignType2);
      signatureValues[i][2] = helper.addQuotes(req.body.SignName2);
      signatureValues[i][3] = helper.addQuotes(1);
      signatureValues[i][4] = false;
    }
    else if (i === 2) {
      signatureValues[i][0] = helper.addQuotes(accountId);
      signatureValues[i][1] = helper.addQuotes(req.body.SignType3);
      signatureValues[i][2] = helper.addQuotes(req.body.SignName3);
      signatureValues[i][3] = helper.addQuotes(1);
      signatureValues[i][4] = req.body.AbsenseOfDirector1;
    }
    else if (i === 3) {
      signatureValues[i][0] = helper.addQuotes(accountId);
      signatureValues[i][1] = helper.addQuotes(req.body.SignType4);
      signatureValues[i][2] = helper.addQuotes(req.body.SignName4);
      signatureValues[i][3] = helper.addQuotes(2);
      signatureValues[i][4] = req.body.AbsenseOfDirector2;
    }
  }

  return signatureValues;
}

module.exports = {
  insertDocumentSignatures,
  updateSignatory1
}