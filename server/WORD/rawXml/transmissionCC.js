const util = require('util');

module.exports = {

  getCCValues: function (body) {
    var ret = '';
    if (body.Account[0].CC) {
      for (let index = 0; index < body.Account[0].CC.length; index++) {
        const ccValue = body.Account[0].CC[index].CC;

        ret += '<w:p>' +
          '<w:pPr>' +
          '<w:numPr>' +
          '<w:ilvl w:val="0"/>' +
          '<w:numId w:val="3"/>' +
          '</w:numPr>' +
          '<w:spacing w:line="276" w:lineRule="auto"/>' +
          '<w:ind w:left="237" w:hanging="237"/>' +
          '<w:contextualSpacing/>' +
          '<w:rPr>' +
          '<w:rFonts w:ascii="Century Gothic" w:hAnsi="Century Gothic" w:cs="Century Gothic"/>' +
          '<w:sz w:val="20"/>' +
          '<w:szCs w:val="20"/>' +
          '</w:rPr>' +
          '</w:pPr>' +
          '<w:r>' +
          '<w:rPr>' +
          '<w:rFonts w:ascii="Century Gothic" w:hAnsi="Century Gothic"/>' +
          '<w:color w:val="00000A"/>' +
          '<w:sz w:val="20"/>' +
          '<w:szCs w:val="20"/>' +
          '<w:lang w:val="en-US"/>' +
          '</w:rPr>' +
          util.format('<w:t>%s</w:t>', ccValue) +
          '</w:r>' +
          '</w:p>'
      }

    }
    return ret;
  }
}