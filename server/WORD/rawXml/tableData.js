var helperMethods = require('../../HelperMethods/helpermethods')
var currencyFormatter = require('currency-formatter');
const common = require('./common');

module.exports = {

  getMaxAccountNumber: function (accounts) {
    let ret = -1;
    for (var i = 0; i < accounts.length; i++) {
      if (ret < accounts[i].Number)
        ret = accounts[i].Number;
    }

    return ret;
  },
  getAccountInfoTableRow: function (accountNumber, amountPure, amountFpa, amountTotal, isDownpayment) {
    var firstRowLabel = isDownpayment ? 'Λογαριασμός - Προκαταβολή' : 'Λογαριασμός'
    
    var firstRow = '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement(accountNumber) +
      common.getrElement('ος', true) +
      common.getrElement(firstRowLabel) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '</w:pPr>' +
      common.getrElement(amountPure) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>'
    
    var secondRow = '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement('Φ.Π.Α. 24%') +
      common.getrElement('') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '</w:pPr>' +
      common.getrElement(amountFpa) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>';
    
    var thirdRow = '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement('ΣΥΝΟΛΟ ' + accountNumber) +
      common.getrElement('ου', true) +
      common.getrElement(' ΛΟΓΑΡΙΑΣΜΟΥ') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '</w:pPr>' +
      common.getrElement(amountTotal) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>';

    return firstRow + secondRow + thirdRow;
  },
  getReservationTableRow: function (name, percentage, value) {
    return '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="1044" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      common.getrElement(name) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="522" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '</w:pPr>' +
      common.getrElement(percentage) +      
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="2339" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '</w:pPr>' +
      common.getrElement(value) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>'
  },
  createTableDistance: function () {
    var ret = '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>';

    return ret;
  },
  createTableReservations: function (body) {
    var ret = '<w:tbl>' +
      '<w:tblPr>' +
      '<w:tblW w:w="5353" w:type="pct"/>' +
      '<w:tblInd w:w="-601" w:type="dxa"/>' +
      '<w:tblBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tblBorders>' +
      '<w:tblLook w:val="04A0"/>' +
      '</w:tblPr>' +
      '<w:tblGrid>' +
      '<w:gridCol w:w="1905"/>' +
      '<w:gridCol w:w="953"/>' +
      '<w:gridCol w:w="4086"/>' +
      '<w:gridCol w:w="996"/>' +
      '<w:gridCol w:w="1184"/>' +
      '</w:tblGrid>';

    var AmountPure = body.Account[0].AmountPure;
    var AmountFpa = body.Account[0].AmountFpa;
    var AmountTotal = body.Account[0].AmountTotal;

    var reservationName = '';
    var reservationPercentage = '';
    var reservationValue = '';
    var reservationStamp = '';
    var reservationStampPer = '';
    var reservationStampOGA = '';
    var reservationStampOGAPer = '';
    var reservationsTotal = 0;

    ret += '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="273"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3805" w:type="pct"/>' +
      '<w:gridSpan w:val="3"/>' +
      '<w:tcBorders>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      common.getBoldText('ΚΡΑΤΗΣΕΙΣ ΕΠΙ ΤΟΥ ΠΟΣΟΥ ΤΩΝ ' + AmountPure) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="546" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="649" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:b/>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>'
    for (var i = 0; i < body.Account[0].Reservations.length; i++) {
      const reservation = body.Account[0].Reservations[i];
      reservationValue = reservation.value;
      reservationName = reservation.name;
      reservationPercentage = currencyFormatter.format(reservation.percentage, { symbol: '%', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });;
      reservationsTotal += Number(reservationValue)
      reservationValue = currencyFormatter.format(reservationValue, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
      ret += this.getReservationTableRow(reservationName, reservationPercentage, reservationValue);
      if (reservation.stamp != undefined) {
        reservationsTotal += Number(reservation.stamp)
        reservationsTotal += Number(reservation.stampoga)
        reservationStamp = currencyFormatter.format(reservation.stamp, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
        reservationStampOGA = currencyFormatter.format(reservation.stampoga, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
        reservationStampPer = currencyFormatter.format(reservation.stampPer, { symbol: '%', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });;
        reservationStampOGAPer = currencyFormatter.format(reservation.StampOGAPer, { symbol: '%', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
        ret += this.getReservationTableRow('ΧΑΡΤΟΣΗΜΟ', reservationStampPer, reservationStamp);
        ret += this.getReservationTableRow('ΧΑΡΤΟΣ. ΟΓΑ', reservationStampOGAPer, reservationStampOGA);
      }
    }

    reservationsTotal = currencyFormatter.format(reservationsTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
    ret += '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="509"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3805" w:type="pct"/>' +
      '<w:gridSpan w:val="3"/>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      common.getBoldText('ΣΥΝΟΛΟ ΚΡΑΤΗΣΕΩΝ') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="546" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '<w:rPr>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement(reservationsTotal) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="649" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:jc w:val="center"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>' +
      '</w:tbl>'

    return ret;
  },
  createTableTotalPaidAmount: function (body) {
    var ret = '<w:tbl>' +
      '<w:tblPr>' +
      '<w:tblW w:w="5353" w:type="pct"/>' +
      '<w:tblInd w:w="-601" w:type="dxa"/>' +
      '<w:tblBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tblBorders><w:tblLook w:val="04A0"/>' +
      '</w:tblPr>' +
      '<w:tblGrid>' +
      '<w:gridCol w:w="7126"/>' +
      '<w:gridCol w:w="1460"/>' +
      '<w:gridCol w:w="538"/>' +
      '</w:tblGrid>';

    var AmountPure = body.Account[0].AmountPure;
    var AmountFpa = body.Account[0].AmountFpa;
    var AmountTotal = body.Account[0].AmountTotal;
    ret += '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement('Πληρωτέο (Καθαρό ποσό)') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '</w:pPr>' +
      common.getrElement(AmountPure) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>' +
      '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:lang w:val="en-US"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement('Φ.Π.Α. 24%') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '<w:rPr>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement(AmountFpa) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>' +
      '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="614"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      common.getBoldText('ΣΥΝΟΛΙΚΟ ΠΛΗΡΩΤΕΟ (χωρίς αφαίρεση κρατήσεων)') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="601" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="nil"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-45"/>' +
      '<w:jc w:val="right"/>' +
      '<w:rPr>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement(AmountTotal) +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="494" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:left w:val="nil"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>' +
      '</w:tbl>'

    return ret;
  },
  createTableAccountsInfo: function (body, isDownpayment) {
    var ret = '';

    var maxAccountNumber = isDownpayment ? 1 : this.getMaxAccountNumber(body.Accounts);
    var accountsInfoTable = '';
    var found;
    for (var an = 1; an <= maxAccountNumber; an++) {
      found = false;
      for (var i = 0; i < body.Accounts.length; i++) {
        if (an === body.Accounts[i].Number) {
          found = true;
          break;
        }
      }
      if (found) {
        var AmountPure = currencyFormatter.format(body.Accounts[i].AmountPure, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
        var AmountFpa = currencyFormatter.format(body.Accounts[i].AmountFpa, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });
        var AmountTotal = currencyFormatter.format(body.Accounts[i].AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' });

        accountsInfoTable += this.getAccountInfoTableRow(body.Accounts[i].Number, AmountPure, AmountFpa, AmountTotal, isDownpayment);
      }
      else
        accountsInfoTable += this.getAccountInfoTableRow(an, '', '', '');
    }

    var Article = helperMethods.fixTextForRawXml(body.Contract[0].Concessionaire[0].Article);
    var ConcessionaireName = helperMethods.fixTextForRawXml(body.Contract[0].Concessionaire[0].Name);
    var TitleValue = helperMethods.fixTextForRawXml('“' + body.Contract[0].Title[0].Value + '”');
    var secondRowValue = isDownpayment ? 'Υλοποίηση της Προγραμματικής Σύμβασης μεταξύ Δήμου Αθηναίων και ' + body.Contract[0].Concessionaire[0].Name + ' για ' : 'Ανάθεση στην ' + ConcessionaireName + ' εκτέλεσης των Εργασιών για: '
    secondRowValue = secondRowValue + TitleValue;

    var AmountPure = body.Account[0].AmountPure;
    var AmountFpa = body.Account[0].AmountFpa;
    var AmountTotal = body.Account[0].AmountTotal;
    ret = '<w:tbl>' +
      '<w:tblPr>' +
      '<w:tblW w:w="5353" w:type="pct"/>' +
      '<w:tblInd w:w="-601" w:type="dxa"/>' +
      '<w:tblBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tblBorders>' +
      '<w:tblLook w:val="04A0"/>' +
      '</w:tblPr>' +
      '<w:tblGrid>' +
      '<w:gridCol w:w="7126"/>' +
      '<w:gridCol w:w="1460"/>' +
      '<w:gridCol w:w="538"/>' +
      '</w:tblGrid>' +
      '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="273"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      common.getBoldText('ΕΝΔΕΙΞΕΙΣ ΤΩΝ ΕΡΓΑΣΙΩΝ') +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="1095" w:type="pct"/>' +
      '<w:gridSpan w:val="2"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-57"/>' +
      '<w:rPr>' +
      '<w:b/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getBoldText('ΔΑΠΑΝΗ ΜΕΡΙΚΗ') +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>' +
      '<w:tr>' +
      '<w:trPr>' +
      '<w:trHeight w:val="286"/>' +
      '</w:trPr>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="3905" w:type="pct"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '<w:vAlign w:val="center"/>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:snapToGrid w:val="0"/>' +
      '<w:rPr>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      common.getrElement(secondRowValue) +
      '</w:p>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '<w:tc>' +
      '<w:tcPr>' +
      '<w:tcW w:w="1095" w:type="pct"/>' +
      '<w:gridSpan w:val="2"/>' +
      '<w:tcBorders>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '</w:tcBorders>' +
      '</w:tcPr>' +
      '<w:p>' +
      '<w:pPr>' +
      '<w:ind w:right="-1594"/>' +
      '<w:rPr>' +
      '<w:szCs w:val="24"/>' +
      '</w:rPr>' +
      '</w:pPr>' +
      '</w:p>' +
      '</w:tc>' +
      '</w:tr>' +
      accountsInfoTable +
      '</w:tbl>'

    return ret;
  },
  getRawXmlTableValue: function (body, isDownpayment) {

    return (
      this.createTableAccountsInfo(body, isDownpayment) +
      this.createTableDistance() +
      this.createTableReservations(body) +
      //this.createTableDistance() +
      this.createTableTotalPaidAmount(body)
    )
  }
};