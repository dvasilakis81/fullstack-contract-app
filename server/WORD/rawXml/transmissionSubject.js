const util = require('util');

module.exports = {

  getSubjectXmlValue: function (body) {
    var ret = '';
    var contractProtocol = util.format('%s/%s', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date)
    if (body.Contract[0].HasDownpayment === true) {

      ret = '<w:p>' +
        '<w:pPr>' +
        '<w:spacing w:line="276" w:lineRule="auto"/>' +        
        '<w:contextualSpacing/>' +
        '</w:pPr>' +
        '<w:r>' +
        '<w:rPr>' +
        '<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
        '<w:color w:val="00000A"/>' +
        '<w:sz w:val="28"/>' +
        '<w:szCs w:val="28"/>' +
        '<w:lang w:val="en-US"/>' +
        '</w:rPr>' +
        util.format("<w:t>Αποστολή δικαιολογητικών για έκδοση 1ου χρηματικού εντάλματος (προκαταβολή της υπ’ αριθμ. πρωτ. %s Προγραμματικής Σύμβασης)</w:t>", contractProtocol) +
        '</w:r>' +
        '</w:p>'
    } else {
      // subject = util.format("Διαβίβαση Τιμολογίου για τον {a_n}ο Λογαριασμό – Προκαταβολή (υπ’ αριθμ. {a_in}/{a_id}) ποσού {a_ta} {c_conc_a} {c_conc} και δικαιολογητικών, αναφορικά με τις εργασίες για τη {c_title} περιόδου {a_sd} έως και {a_ed}, προς έλεγχο και έκδοση χρηματικού εντάλματος.", subject)

      ret = '<w:p>' +
        '<w:pPr>' +
        '<w:spacing w:line="276" w:lineRule="auto"/>' +        
        '<w:contextualSpacing/>' +
        '</w:pPr>' +
        '<w:r>' +
        '<w:rPr>' +
        '<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
        '<w:color w:val="00000A"/>' +
        '<w:sz w:val="28"/>' +
        '<w:szCs w:val="28"/>' +
        '<w:lang w:val="en-US"/>' +
        '</w:rPr>' +
        util.format("<w:t>Διαβίβαση Τιμολογίου για τον %s</w:t>", body.Account[0].No) +
        '</w:r>' +
        '<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ο</w:t></w:r>' +
        '<w:r>' +
        '<w:rPr>' +
        '<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
        '<w:color w:val="00000A"/>' +
        '<w:sz w:val="28"/>' +
        '<w:szCs w:val="28"/>' +
        '<w:lang w:val="en-US"/>' +
        '</w:rPr>' +
        util.format('<w:t xml:space="preserve"> Λογαριασμό (υπ’ αριθμ. %s/%s) ποσού %s %s %s και δικαιολογητικών, αναφορικά με τις εργασίες για τη %s περιόδου %s έως και %s, προς έλεγχο και έκδοση χρηματικού εντάλματος.</w:t>',
          body.Account[0].Invoice[0].Number,
          body.Account[0].Invoice[0].Date,
          body.Account[0].Amount,
          body.Contract[0].Concessionaire[0].Article,
          body.Contract[0].Concessionaire[0].Name,
          body.Contract[0].Title[0].Value,
          body.Account[0].Start,
          body.Account[0].End) +
        '</w:r>' +
        '</w:p>'
    }

    return ret;
  }
}