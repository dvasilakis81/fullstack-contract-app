import {
  getAmountInWords, getDateFormatForDocument, 
  getDateFormatWithDash, extractYearFromDate 
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
  if (number.toString() === '1')
    ret = 'πρώτου'
  else if (number.toString() === '2')
    ret = 'δεύτερου'
  else if (number.toString() === '3')
    ret = 'τρίτου'
  else if (number.toString() === '4')
    ret = 'τέταρου'
  else if (number.toString() === '5')
    ret = 'πέμπτου'
  else if (number.toString() === '6')
    ret = 'έκτου'
  else if (number.toString() === '7')
    ret = 'έβδομου'
  else if (number.toString() === '8')
    ret = 'όγδοου'
  else if (number.toString() === '9')
    ret = 'ένατου'
  else if (number.toString() === '10')
    ret = 'δέκατου'
  else if (number.toString() === '11')
    ret = 'ένδεκατου'
  else if (number.toString() === '12')
    ret = 'δωδέκατου'
  else if (number.toString() === '13')
    ret = 'δέκατου τρίτου'
  else if (number.toString() === '14')
    ret = 'δέκατου τέταρτου'

  return ret;
}

function getReservationsToPost(reservations, Amount) {
  let ret = [];

  if (reservations) {
    for (let index = 0; index < reservations.length; index++) {
      const value = reservations[index];

      if (value.IsReservation) {
        let a1 = (Number(Amount) * Number(value.Percentage / 100)).toFixed(2);
        let a2 = '';
        let a3 = '';
        if (value.Stamp > 0) {
          a2 = (Number(a1) * Number(value.Stamp / 100)).toFixed(2);
          a3 = (Number(a2) * Number(value.StampOGA / 100)).toFixed(2);
        }

        let per = Number(value.Percentage);
        if (value.Stamp > 0)
          ret.push({ name: value.Name, percentage: per, value: a1, stamp: a2, stampPer: value.Stamp, StampOGAPer: value.StampOGA, stampoga: a3 })
        else
          ret.push({ name: value.Name, percentage: per, value: a1 })
      }
    }
  }

  return ret;
}

export function createTransmissionDocument(contractInfo, accountInfo, paidAmount) {

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
    Contract: [{
      ContractTypeId: contractInfo.ContractTypeId,
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
      Balance: currencyFormatter.format(Number(contractInfo.AmountTotal) - (Number(paidAmount.TotalUntilToday) + Number(accountInfo.AmountTotal)), { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      HasDownpayment: contractInfo.HasDownPayment
    }],
    Account: [{
      No: accountInfo.Number,
      NumberWord: getAccountNumberLex(accountInfo.Number),
      LastMessage: (accountInfo.Number.toString() === contractInfo.NumberOfAccounts.toString() ? '(και τελευταίου)' : ''),
      Start: getDateFormatForDocument(accountInfo.Start),
      End: getDateFormatForDocument(accountInfo.End),
      Amount: currencyFormatter.format(accountInfo.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      Invoice: getInvoiceDataToPost(accountInfo),
      AYY: getAAYDataToPost(accountInfo),
      MonitoringCommittee: accountInfo.monitoringcommittee,
      FirstAccountProtocol: firstAccountProtocol,
      IsFirstOfTheYear: accountInfo.IsFirstOfTheYear,
      CC: accountInfo.cc
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

export function createAccountDocument(contractInfo, accountInfo, paidAmount, reservations) {

  var contractTypeValue1 = (contractInfo.ContractTypeId === "1" ? 'Σύμβασης Δημόσιας Ανάθεσης' : 'Προγραμματικής Σύμβασης')
  var contractTypeValue2 = (contractInfo.ContractTypeId === "1" ? 'Δημόσιας' : 'Προγραμματικής')

  var WriterTitle = '';
  var WriterName = '';
  var ForemanDepartmentTitle = '';
  var ForemanDepartmentName = '';
  var ForemanDirectionTitle = '';
  var ForemanDirectionName = '';
  var ForemanDirectionAbsense = '';

  if (accountInfo.documentsignatory) {
    for (let index = 0; index < accountInfo.documentsignatory.length; index++) {
      const element = accountInfo.documentsignatory[index];

      if (element.signatorytype[0].Id === 1 || element.signatorytype[0].Id === 2) {
        WriterTitle = element.signatorytype[0].Name
        WriterName = element.signatory[0].Name;
      } else if (element.signatorytype[0].Id === 3 || element.signatorytype[0].Id === 4) {
        ForemanDirectionAbsense = element.Absense ? 'κ.α.α' : '';
        ForemanDirectionTitle = element.signatorytype[0].Name;
        ForemanDirectionName = element.signatory[0].Name;
      } else if (element.signatorytype[0].Id === 5 || element.signatorytype[0].Id === 6) {
        ForemanDepartmentTitle = element.signatorytype[0].Name
        ForemanDepartmentName = element.signatory[0].Name;
      }
    }
  }

  var dirName = '';
  if (contractInfo.direction && contractInfo.direction[0]) {
    dirName = contractInfo.direction[0].DirectionName;
  }
  var depName = contractInfo.department && contractInfo.department[0] ? contractInfo.department[0].DepartmentName : ''
  var dataToPost = {
    BudgetExpenditureYear: new Date(accountInfo.DocumentDate).getFullYear(),
    DocumentDate: getDateFormatWithDash(accountInfo.DocumentDate),
    WorkConfirmationDate: getDateFormatForDocument(accountInfo.WorkConfirmationDate),
    DeliveryGoodsDate: getDateFormatForDocument(accountInfo.DeliveryGoodsDate),
    Direction: [{
      Name: dirName.toUpperCase(),
      NameInLower: dirName,
      Department: [{ Name: depName.toUpperCase(), NameInLower: depName }]
    }],
    Contract: [{
      ContractTypeValue1: contractTypeValue1,
      ContractTypeValue2: contractTypeValue2,      
      LawArticle: contractInfo.LawArticle,
      Title: [{ Article: 'τη', Value: contractInfo.Title }],
      Protocol: [{ Number: contractInfo.ProtocolNumber, Date: getDateFormatForDocument(contractInfo.ProtocolDate) }],
      Kae: contractInfo.KAE,
      Actor: contractInfo.Actor,
      CodeDirection: contractInfo.CodeDirection,
      Concessionaire: [{ Article: 'της', Name: contractInfo.ConcessionaireName, Afm: contractInfo.ConcessionaireAFM }],
      AmountPure: currencyFormatter.format(contractInfo.AmountPure, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      AmountFpa: currencyFormatter.format(contractInfo.AmountFpa, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      AmountTotal: currencyFormatter.format(contractInfo.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      PaidAmountPureUntilToday: currencyFormatter.format(paidAmount.PureUntilToday, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      PaidAmountFpaUntilToday: currencyFormatter.format(paidAmount.FpaUntilToday, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      PaidAmountTotalUntilToday: currencyFormatter.format(paidAmount.TotalUntilToday, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      FpaValue: format('{}%', contractInfo.FpaValue),
      HasDownpayment: contractInfo.HasDownpayment
    }],
    Account: [{
      No: accountInfo.Number,
      AmountPure: currencyFormatter.format(accountInfo.AmountPure, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      AmountFpa: currencyFormatter.format(accountInfo.AmountFpa, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      AmountTotal: currencyFormatter.format(accountInfo.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      AmountInWords: getAmountInWords(accountInfo.AmountTotal, false),
      AmountInWordsCapital: getAmountInWords(accountInfo.AmountTotal, true),
      Start: getDateFormatForDocument(accountInfo.Start),
      End: getDateFormatForDocument(accountInfo.End),
      Invoice: getInvoiceDataToPost(accountInfo),
      AAY: getAAYDataToPost(accountInfo),
      MonitoringCommittee: accountInfo.monitoringcommittee,
      Reservations: getReservationsToPost(reservations, accountInfo.AmountPure),
      MixedRemainApproval: currencyFormatter.format(Number(contractInfo.AmountTotal) - (Number(paidAmount.TotalUntilToday) + Number(accountInfo.AmountTotal)), { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
      DownpaymentLawArticle: accountInfo.DownpaymentLawArticle
    }],
    Accounts: contractInfo.createdaccounts,
    DecisionBoard: contractInfo.decisionboard,
    DecisionCoordinatorDecentrilizedAdministration: contractInfo.decisioncoordinatordecentrilizedadministration,
    CourtOfAuditors: contractInfo.courtofauditors,
    Signature: [
      {
        Kaa: ForemanDirectionAbsense,
        WriterTitle: WriterTitle,
        WriterName: WriterName,
        ForemanDepartmentTitle: ForemanDepartmentTitle,
        ForemanDepartmentName: ForemanDepartmentName,
        ForemanDirectionTitle: ForemanDirectionTitle,
        ForemanDirectionName: ForemanDirectionName
      }]
  };

  return dataToPost;

  // }).catch(error => {
  // 	var errMsg = 'Αποτυχής προσπάθεια δημιουργίας αρχείου!' + error;
  // 	this.setState({ message: errMsg, openMessage: true, variant: 'error', submitButtonDisabled: false });
  // })
};