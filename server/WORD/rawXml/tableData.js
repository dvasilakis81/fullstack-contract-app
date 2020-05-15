var helperMethods = require('../../HelperMethods/helpermethods')
var currencyFormatter = require('currency-formatter');

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
    var firstRow = '<w:tr w:rsidR="00400E00" w:rsidRPr="006B6E0A" w:rsidTr="006B658F"><w:trPr><w:trHeight w:val="286"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + accountNumber + '</w:t></w:r><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/><w:vertAlign w:val="superscript"/></w:rPr><w:t>ος</w:t></w:r><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">' + firstRowLabel + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + amountPure + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>'
    var secondRow = '<w:tr w:rsidR="00400E00" w:rsidRPr="006B6E0A" w:rsidTr="006B658F"><w:trPr><w:trHeight w:val="286"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="00400E00" w:rsidRDefault="00400E00" w:rsidP="00400E00"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>Φ.Π.Α. 24%</w:t></w:r><w:r><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/><w:lang w:val="en-US"/></w:rPr><w:t xml:space="preserve"></w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + amountFpa + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>';
    var thirdRow = '<w:tr w:rsidR="00400E00" w:rsidRPr="006B6E0A" w:rsidTr="006B658F"><w:trPr><w:trHeight w:val="286"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="00400E00" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>ΣΥΝΟΛΟ ' + accountNumber + '</w:t></w:r><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/><w:vertAlign w:val="superscript"/></w:rPr><w:t>ου</w:t></w:r><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve"> ΛΟΓΑΡΙΑΣΜΟΥ</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + amountTotal + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>';

    return firstRow + secondRow + thirdRow;
  },
  getReservationTableRow: function (name, percentage, value) {
    return '<w:tr w:rsidR="002843BB" w:rsidRPr="006B6E0A" w:rsidTr="002843BB">' +
      '<w:trPr><w:trHeight w:val="286"/></w:trPr>' +
      '<w:tc><w:tcPr><w:tcW w:w="1044" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="006B6E0A" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:bCs/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">' + name + '</w:t></w:r></w:p></w:tc>' +
      '<w:tc><w:tcPr><w:tcW w:w="522" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="006B6E0A" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:bCs/><w:szCs w:val="24"/></w:rPr><w:t>' + percentage + '</w:t></w:r><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve"></w:t></w:r></w:p></w:tc>' +
      '<w:tc><w:tcPr><w:tcW w:w="2339" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr></w:p></w:tc>' +
      '<w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + value + '</w:t></w:r></w:p></w:tc>' +
      '<w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc>' +
      '</w:tr>'
  },
  createTableDistance: function () {
    var ret = '<w:p w:rsidR="003E28E4" w:rsidRDefault="003E28E4" w:rsidP="00581DC6"><w:pPr><w:ind w:right="-1594"/></w:pPr></w:p>' +
      '<w:p w:rsidR="006B6E0A" w:rsidRPr="006B6E0A" w:rsidRDefault="006B6E0A" w:rsidP="00581DC6"><w:pPr><w:ind w:right="-1594"/></w:pPr></w:p>';

    return ret;
  },
  createTableReservations: function (body) {
    var ret = '<w:tbl><w:tblPr><w:tblW w:w="5353" w:type="pct"/><w:tblInd w:w="-601" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>' +
      '<w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tblBorders><w:tblLook w:val="04A0"/>' +
      '</w:tblPr><w:tblGrid><w:gridCol w:w="1905"/><w:gridCol w:w="953"/><w:gridCol w:w="4086"/><w:gridCol w:w="996"/><w:gridCol w:w="1184"/></w:tblGrid>';

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

    ret += '<w:tr w:rsidR="002843BB" w:rsidRPr="006B6E0A" w:rsidTr="002843BB"><w:trPr><w:trHeight w:val="273"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3805" w:type="pct"/><w:gridSpan w:val="3"/><w:tcBorders><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="006B6E0A" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr><w:lastRenderedPageBreak/><w:t>ΚΡΑΤΗΣΕΙΣ ΕΠΙ ΤΟΥ ΠΟΣΟΥ ΤΩΝ ' + AmountPure + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="546" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="649" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00B2532F" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>'
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
    ret += '<w:tr w:rsidR="002843BB" w:rsidRPr="006B6E0A" w:rsidTr="000D12C7"><w:trPr><w:trHeight w:val="509"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3805" w:type="pct"/><w:gridSpan w:val="3"/><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="006B6E0A" w:rsidRDefault="00CC00CD" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr><w:t>ΣΥΝΟΛΟ ΚΡΑΤΗΣΕΩΝ</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="546" w:type="pct"/><w:tcBorders><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00CC00CD" w:rsidP="003C4C76"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + reservationsTotal + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="649" w:type="pct"/><w:tcBorders><w:left w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00B2532F" w:rsidRPr="002843BB" w:rsidRDefault="00663470" w:rsidP="002843BB"><w:pPr><w:ind w:right="-1594"/><w:jc w:val="center"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>';
    ret += '</w:tbl>'

    return ret;
  },
  createTableTotalPaidAmount: function (body) {
    var ret = '<w:tbl><w:tblPr><w:tblW w:w="5353" w:type="pct"/><w:tblInd w:w="-601" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tblBorders><w:tblLook w:val="04A0"/></w:tblPr><w:tblGrid><w:gridCol w:w="7126"/><w:gridCol w:w="1460"/><w:gridCol w:w="538"/></w:tblGrid>';

    var AmountPure = body.Account[0].AmountPure;
    var AmountFpa = body.Account[0].AmountFpa;
    var AmountTotal = body.Account[0].AmountTotal;
    ret += '<w:tr w:rsidR="000770B3" w:rsidRPr="006B6E0A" w:rsidTr="000770B3"><w:trPr><w:trHeight w:val="286"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="00854CA5"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>Πληρωτέο (Καθαρό ποσό)</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="000770B3"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + AmountPure + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="00854CA5"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>' +
      '<w:tr w:rsidR="000770B3" w:rsidRPr="006B6E0A" w:rsidTr="000770B3"><w:trPr><w:trHeight w:val="286"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="00400E00" w:rsidRDefault="000770B3" w:rsidP="00854CA5"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:lang w:val="en-US"/></w:rPr></w:pPr><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>Φ.Π.Α. 24%</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="000770B3"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + AmountFpa + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="00854CA5"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>' +
      ' <w:tr w:rsidR="000770B3" w:rsidRPr="006B6E0A" w:rsidTr="000770B3"><w:trPr><w:trHeight w:val="614"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="000770B3" w:rsidRDefault="000770B3" w:rsidP="00854CA5"><w:pPr><w:ind w:right="-1594"/></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr><w:t>ΣΥΝΟΛΙΚΟ ΠΛΗΡΩΤΕΟ (χωρίς αφαίρεση κρατήσεων)</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="601" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="nil"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="000770B3"><w:pPr><w:ind w:right="-45"/><w:jc w:val="right"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + AmountTotal + '</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="494" w:type="pct"/><w:tcBorders><w:left w:val="nil"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="000770B3" w:rsidRPr="002843BB" w:rsidRDefault="000770B3" w:rsidP="00854CA5"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>'
    ret += '</w:tbl>'

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
    ret = '<w:tbl><w:tblPr><w:tblW w:w="5353" w:type="pct"/><w:tblInd w:w="-601" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tblBorders><w:tblLook w:val="04A0"/></w:tblPr><w:tblGrid><w:gridCol w:w="7126"/><w:gridCol w:w="1460"/><w:gridCol w:w="538"/></w:tblGrid>' +
      '<w:tr w:rsidR="00400E00" w:rsidRPr="006B6E0A" w:rsidTr="00400E00"><w:trPr><w:trHeight w:val="273"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="006B6E0A" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/></w:pPr><w:r w:rsidRPr="002843BB"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr><w:t>ΕΝΔΕΙΞΕΙΣ ΤΩΝ ΕΡΓΑΣΙΩΝ</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="1095" w:type="pct"/><w:gridSpan w:val="2"/></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00400E00"><w:pPr><w:ind w:right="-57"/><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/><w:b/><w:szCs w:val="24"/></w:rPr><w:t>ΔΑΠΑΝΗ ΜΕΡΙΚΗ</w:t></w:r></w:p></w:tc></w:tr>' +
      '<w:tr w:rsidR="00400E00" w:rsidRPr="006B6E0A" w:rsidTr="006B658F"><w:trPr><w:trHeight w:val="286"/></w:trPr><w:tc><w:tcPr><w:tcW w:w="3905" w:type="pct"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders><w:vAlign w:val="center"/></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="00400E00" w:rsidRDefault="00400E00" w:rsidP="00400E00"><w:pPr><w:snapToGrid w:val="0"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr><w:r w:rsidRPr="005B7549"><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial Unicode MS" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr><w:t>' + secondRowValue + '</w:t></w:r><w:proofErr w:type="spellStart"/></w:p><w:p w:rsidR="00400E00" w:rsidRPr="00400E00" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/></w:pPr></w:p></w:tc><w:tc><w:tcPr><w:tcW w:w="1095" w:type="pct"/><w:gridSpan w:val="2"/><w:tcBorders><w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/></w:tcBorders></w:tcPr><w:p w:rsidR="00400E00" w:rsidRPr="002843BB" w:rsidRDefault="00400E00" w:rsidP="00F334EF"><w:pPr><w:ind w:right="-1594"/><w:rPr><w:rFonts w:ascii="Garamond" w:eastAsia="Arial" w:hAnsi="Garamond"/><w:szCs w:val="24"/></w:rPr></w:pPr></w:p></w:tc></w:tr>' +
      accountsInfoTable +
      '</w:tbl>'

    return ret;
  },
  getRawXmlTableValue: function (body, isDownpayment) {

    return (this.createTableAccountsInfo(body, isDownpayment) +
      this.createTableDistance() +
      this.createTableReservations(body) +
      this.createTableDistance() +
      this.createTableTotalPaidAmount(body))
  }
};