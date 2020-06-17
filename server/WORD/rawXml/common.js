const helper = require('../../HelperMethods/helpermethods')
const util = require('util');

const fontSize = 22
const fontFamily = 'Arial'
module.exports = {

  getrElement: function (text) {
    return '<w:r>' +
      '<w:rPr>' +
      util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily, fontFamily) +
      util.format('<w:sz w:val="%s" />', fontSize) +
      util.format('<w:szCs w:val="%s" />', fontSize) +
      '</w:rPr>' +
      util.format('<w:t>%s</w:t>', text) +
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
        '</w:rPr>' +
        util.format('<w:t xml:space="preserve">%s</w:t>', text) +
        '</w:r>'

    return ret;
  },
  enterLine: function () {    
      return '<w:r><w:br /></w:r>';
  }
}