const helper = require('../../HelperMethods/helpermethods')
const util = require('util');

const fontSize = 22
const fontFamily = 'Arial'

function addArrayItem(inputDates, item, label) {
	if (item) {
		var length = 1;
		if (Array.isArray(item) === true)
			length = item.length;
		for (let index = 0; index < length; index++) {
			var protocolDate = item;
			if (item[index].ProtocolDate)
				protocolDate = item[index].ProtocolDate;

			if (protocolDate) {
				var row = 0;
				if (inputDates && inputDates.length > 0) {
					for (let j = 0; j < inputDates.length; j++) {
						if (new Date(protocolDate) > new Date(inputDates[j][1]))
							row += 1;
					}
				}

				inputDates.splice(row, 0, [label, protocolDate]);
			}
		}
	}
}
function setArrayWithProtocolDates(body) {
  var inputDates = [];

  addArrayItem(inputDates, body.AAY, 'AAY');
  addArrayItem(inputDates, body.Account[0].Invoice, 'Invoice');
  addArrayItem(inputDates, body.WorkConfirmationDate, 'WorkConfirmationDate');
  addArrayItem(inputDates, body.DeliveryGoodsDate, 'DeliveryGoodsDate');
  addArrayItem(inputDates, body.ADR, 'ADR');
  addArrayItem(inputDates, body.SnippetPractical, 'SnippetPractical');
  addArrayItem(inputDates, body.EconomicalCommittee, 'EconomicalCommittee');

  return inputDates;
}
module.exports = {
  setArrayWithProtocolDates,
  getSuperscriptTag: function (isSuperscript) {
    var ret = '';
    if (isSuperscript === true)
      ret = '<w:vertAlign w:val="superscript"/>';

    return ret;
  },
  getrElement: function (text, isSuperScript) {
    return '<w:r>' +
      '<w:rPr>' +
      util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily, fontFamily) +
      util.format('<w:sz w:val="%s" />', fontSize) +
      util.format('<w:szCs w:val="%s" />', fontSize) +
      this.getSuperscriptTag(isSuperScript) +
      '</w:rPr>' +
      util.format('<w:t xml:space="preserve">%s</w:t>', text) +
      '</w:r>'
  },
  getADAXml: function (ADA) {
    var ret = '';
    if (ADA)
      ret += '<w:r>' +
        '<w:rPr>' +
        util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily, fontFamily) +
        util.format('<w:sz w:val="%s" />', fontSize) +
        util.format('<w:szCs w:val="%s" />', fontSize) +
        '</w:rPr>' +
        '<w:t xml:space="preserve"> (ΑΔΑ: </w:t>' +
        '</w:r>' +
        '<w:r>' +
        '<w:rPr>' +
        util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily, fontFamily) +
        '<w:b />' +
        '<w:bCs />' +
        util.format('<w:sz w:val="%s" />', fontSize) +
        util.format('<w:szCs w:val="%s" />', fontSize) +
        '<w:u w:val="single" />' +
        '</w:rPr>' +
        util.format('<w:t xml:space="preserve">%s</w:t>', ADA) +
        '</w:r>' +
        '<w:r>' +
        '<w:rPr>' +
        util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily, fontFamily) +
        util.format('<w:sz w:val="%s" />', fontSize) +
        util.format('<w:szCs w:val="%s" />', fontSize) +
        '<w:u w:val="single" />' +
        '</w:rPr>' +
        '<w:t xml:space="preserve">) </w:t>' +
        '</w:r>'

    return ret;
  },
  getBoldText: function (text) {
    var ret = '';
    if (text)
      ret += '<w:r>' +
        '<w:rPr>' +
        util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily, fontFamily) +
        util.format('<w:sz w:val="%s" />', fontSize) +
        util.format('<w:szCs w:val="%s" />', fontSize) +
        '<w:b />' +
        '</w:rPr>' +
        util.format('<w:t xml:space="preserve">%s</w:t>', text) +
        '</w:r>'

    return ret;
  },
  enterLine: function () {
    return '<w:r><w:tab /></w:r><w:r><w:br /></w:r>';
  }
}