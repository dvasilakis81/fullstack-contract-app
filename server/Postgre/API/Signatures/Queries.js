const util = require('util')
const helper = require('../../../HelperMethods/helpermethods')

function query_get(accountId) {
  return util.format('SELECT * FROM "Ordering"."DocumentSignatory" as ds Where ds."AccountId"=%s', helper.addQuotes(accountId))
}

function query_insert(req, accountId) {
  var signatureValues = getSignatureValues(accountId, req);

  var sqlQuery = 'INSERT INTO "Ordering"."DocumentSignatory"("AccountId","SignatoryTypeId","SignatoryId","DocumentType","Absense") VALUES ';
  for (var i = 0; i < signatureValues.length; i++) {
    sqlQuery += util.format('(%s,%s,%s,%s,%s)', signatureValues[i][0], signatureValues[i][1], signatureValues[i][2], signatureValues[i][3], signatureValues[i][4])
    if (i < signatureValues.length - 1)
      sqlQuery += ','
  }
  sqlQuery += ' RETURNING "Id"';

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
  query_get,
  query_insert,
  query_update
}