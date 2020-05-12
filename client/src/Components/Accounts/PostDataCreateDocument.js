import React from 'react';

import {
  getAmountInWords, getHostUrl, getDateFormat, getDateFormatForDocument, getDateFormatWithDash,
  extractYearFromDate, getValidMaterialDateFormat, getFpaLabel,
  getServerErrorResponseMessage
} from '../../Helper/helpermethods';

const format = require('string-format')
var currencyFormatter = require('currency-formatter');

function getAAYDataToPost(accountDetails) {
  var AAY = (accountDetails.aay && accountDetails.aay.length > 0 ? accountDetails.aay[0] : {});
  var AAYValue = (AAY.Value || '');
  var AAYProtocolNumber = (AAY.ProtocolNumber || '');
  var AAYProtocolDate = (getDateFormatForDocument(AAY.ProtocolDate) || '');
  var AAYYear = extractYearFromDate(AAY.ProtocolDate)
  var AAYEadNumber = (AAY.EadNumber || '')
  var AAYPreviousYear = (AAY.PreviousYear || '')
  var AAYADA = (AAY.ADA || '')

  return [{
    Value: AAYValue,
    Year: AAYYear,
    ProtocolNumber: AAYProtocolNumber,
    ProtocolDate: AAYProtocolDate,
    EADNumber: AAYEadNumber,
    PreviousYearValue: AAYPreviousYear,
    ADA: AAYADA
  }]
}

function getInvoiceDataToPost(accountDetails) {

  var Invoice = (accountDetails.invoice && accountDetails.invoice.length > 0 ? accountDetails.invoice[0] : {})
  var InvoiceNumber = (Invoice.Number || '')
  var InvoiceDate = (getDateFormatForDocument(Invoice.Date) || '')
  var InvoiceDeliveredDate = (getDateFormatForDocument(Invoice.DeliveredDate) || '')
  var InvoiceDeliveredDateProtocolNumber = (Invoice.DeliveredDateProtocolNumber || '')
  var InvoiceDeliveredDateProtocolDate = (getDateFormatForDocument(Invoice.DeliveredDateProtocolDate) || '')

  return [{
    Number: InvoiceNumber,
    Date: InvoiceDate,
    DeliveredDate: InvoiceDeliveredDate,
    DeliveredDateProtocol: [{ Number: InvoiceDeliveredDateProtocolNumber, Date: InvoiceDeliveredDateProtocolDate }]
  }]

}

function getAccountNumberLex(number) {
  var ret = '';
  if (number == 1)
    ret = 'πρώτου'
  else if (number == 2)
    ret = 'δεύτερου'
  else if (number == 3)
    ret = 'τρίτου'
  else if (number == 4)
    ret = 'τέταρου'
  else if (number == 5)
    ret = 'πέμπτου'
  else if (number == 6)
    ret = 'έκτου'
  else if (number == 7)
    ret = 'έβδομου'
  else if (number == 8)
    ret = 'όγδοου'
  else if (number == 9)
    ret = 'ένατου'
  else if (number == 10)
    ret = 'δέκατου'
  else if (number == 11)
    ret = 'ένδεκατου'
  else if (number == 12)
    ret = 'δωδέκατου'
  else if (number == 13)
    ret = 'δέκατου τρίτου'
  else if (number == 14)
    ret = 'δέκατου τέταρτου'

  return ret;
}

function getCCDataToPost(contractDetails, accountDetails) {

  var CC1 = accountDetails.cc[0];
  var CC2 = accountDetails.cc[1];

  var cc1Value = '';
  var cc2Value = '';

  var directionValue = '';
  var departmentValue = '';
  if (CC1 && CC1.cc1value1 && CC1.cc1value1[0])
    directionValue = format('Διεύθυνση {}', CC1.cc1value1[0].DirectionName)
  if (CC1 && CC1.cc1value2 && CC1.cc1value2[0] && CC1.cc1value2[0].DepartmentName)
    departmentValue = '-Τμήμα ' + CC1.cc1value2[0].DepartmentName
  cc1Value = format('{}{}', directionValue, departmentValue)

  directionValue = '';
  departmentValue = '';
  if (contractDetails.ContractTypeId == 1) {
    if (CC2 && CC2.cc2value1 && CC2.cc2value1[0])
      directionValue = format('Διεύθυνση {}', CC2.cc2value1[0].DirectionName)
    if (CC2 && CC2.cc2value2 && CC2.cc2value2[0] && CC2.cc2value2[0].DepartmentName)
      departmentValue = '-Τμήμα ' + CC2.cc2value2[0].DepartmentName
    cc2Value = format('{}{}', directionValue, departmentValue)
  }
  else {
    if (CC2 && CC2.ccagencyvalue && CC2.ccagencyvalue[0])
      cc2Value = CC2.ccagencyvalue[0].Name
  }

  return [{ CC1: cc1Value, CC2: cc2Value }]
}

export default function createTransmissionDocument(contractInfo, accountInfo, paidAmountTotalUntilToday) {

  var firstAccountProtocol = ''
  if (accountInfo.firstprotocolinfo && accountInfo.firstprotocolinfo[0] && accountInfo.firstprotocolinfo[0].firstaccountprotocolnumber)
    firstAccountProtocol = format('{}/{}', accountInfo.firstprotocolinfo[0].firstaccountprotocolnumber, accountInfo.firstprotocolinfo[0].firstaccountprotocoldate)

  // eslint-disable-next-line eqeqeq
  var contractTypeName = (contractInfo.ContractTypeId == 1 ? 'Σύμβασης Δημόσιας Ανάθεσης' : 'Προγραμματικής Σύμβασης')
  var dirName, dirAddress, dirPostalCode, dirCity, depSupervisor, depTelephone, depEmail = '';
  if (contractInfo.direction && contractInfo.direction[0]) {
    dirName = contractInfo.direction[0].DirectionName;
    dirAddress = contractInfo.direction[0].DirectionAddress;
    dirPostalCode = contractInfo.direction[0].DirectionPostCode;
    dirCity = contractInfo.direction[0].DirectionCity;
    depSupervisor = contractInfo.department[0].DepartmentSupervisor;
    depTelephone = contractInfo.department[0].DepartmentTelephone;
    depEmail = contractInfo.department[0].DepartmentEmail;
  }

  var departmentName = contractInfo.department && contractInfo.department[0] ? contractInfo.department[0].DepartmentName : ''
  var dataToPost = {
    DocumentDate: getDateFormatWithDash(accountInfo.DocumentDate),
    WorkConfirmationDate: getDateFormatForDocument(accountInfo.WorkConfirmationDate),
    DeliveryGoodsDate: getDateFormatForDocument(accountInfo.DeliveryGoodsDate),    
    Direction: [{
      Name: dirName ? dirName.toUpperCase() : '',
      NameInLower: dirName,
      Department: [{
        Name: departmentName ? departmentName.toUpperCase() : '',
        NameInLower: departmentName,
        Address: dirAddress,
        PostalCode: dirPostalCode,
        City: dirCity,
        Supervisor: [{ Name: depSupervisor, Tel: depTelephone, Email: depEmail }]
      }]
    }],
    CC: getCCDataToPost(contractInfo, accountInfo),
    Contract: [{
      ContractId: contractInfo.ContractTypeId,
      ContractType: contractTypeName,
      LawArticle: contractInfo.LawArticle,
      Concessionaire: [{ Article: 'της', Name: contractInfo.ConcessionaireName, Afm: contractInfo.ConcessionaireAFM }],
      Title: [{ Article: 'τη', Value: contractInfo.Title }],
      Protocol: [{ Number: contractInfo.ProtocolNumber, Date: getDateFormatForDocument(contractInfo.ProtocolDate) }],
      Kae: contractInfo.KAE,
      Actor: contractInfo.Actor,
      CodeDirection: contractInfo.CodeDirection,
      Date: [{ Start: getDateFormatForDocument(contractInfo.Start), End: getDateFormatForDocument(contractInfo.End) }],
      Award: [{ Number: contractInfo.AwardNumber, Date: getDateFormatForDocument(contractInfo.AwardDate), Ada: contractInfo.AwardAda }],
      CPV: [{ Code: contractInfo.CpvCode, Title: contractInfo.CpvTitle }],
      Balance: currencyFormatter.format(Number(contractInfo.AmountTotal) - (Number(paidAmountTotalUntilToday) + Number(accountInfo.AmountTotal)), { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
    }],
    Account: [{
      No: accountInfo.Number,
      NumberWord: getAccountNumberLex(accountInfo.Number),
      LastMessage: (accountInfo.Number == contractInfo.NumberOfAccounts ? '(και τελευταίου)' : ''),
      Start: getDateFormatForDocument(accountInfo.Start),
      End: getDateFormatForDocument(accountInfo.End),
      Amount: currencyFormatter.format(accountInfo.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      Invoice: getInvoiceDataToPost(accountInfo),
      AYY: getAAYDataToPost(accountInfo),
      MonitoringCommittee: accountInfo.monitoringcommittee,
      FirstAccountProtocol: firstAccountProtocol,
      IsFirstOfTheYear: accountInfo.IsFirstOfTheYear
    }],
    DecisionBoard: contractInfo.decisionboard,
    DecisionCoordinatorDecentrilizedAdministration: contractInfo.decisioncoordinatordecentrilizedadministration,
    CourtOfAuditors: contractInfo.courtofauditors,
    Signature: [{
      SignatoryTitle: accountInfo.documentsignatory[3].signatorytype[0].Name,
      Kaa: accountInfo.documentsignatory[3].Absense ? 'κ.κ.α' : '',
      SignatoryName: accountInfo.documentsignatory[3].signatory[0].Name
    }]
  };

  return dataToPost;
}

export function createAccountDocument(useStyles, state, contractDetails) {
}