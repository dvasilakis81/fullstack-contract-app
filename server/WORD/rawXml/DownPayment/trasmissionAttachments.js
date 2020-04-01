const helper = require('../../../HelperMethods/helpermethods')
const util = require('util');

// import { getWord } from '../../../HelperMethods/helpermethods'

module.exports = {
	getAttachment1: function (body) {
		return '<w:p w:rsidR="00057639" w:rsidRDefault="00262B9D" w:rsidP="00057639">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="284"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t>Πρωτότυπο και φωτοαντίγραφο της με Α.Π. %s/%s  Προγραμματικής Σύμβασης</w:t>', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment2: function (body) {
		return '<w:p w:rsidR="0067614F" w:rsidRPr="0067614F" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="284"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00F871E2">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t xml:space="preserve">Δύο (2) φωτοαντίγραφα της με αρ. %s/%s Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.) με Α.Δ.Α.</w:t>', body.DecisionDS[0].Protocol[0].Number, body.DecisionDS[0].Protocol[0].Date) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment3: function (body) {
		var ret = '';

		if (body.DecisionDS[0].Protocol[1]) {
			ret = '<w:p w:rsidR="00840235" w:rsidRPr="00840235" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:tabs>' +
				'<w:tab w:val="left" w:pos="142"/>' +
				'<w:tab w:val="left" w:pos="284"/>' +
				'<w:tab w:val="left" w:pos="6195"/>' +
				'</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r w:rsidRPr="00840235">' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				util.format('<w:t xml:space="preserve">Δύο (2) φωτοαντίγραφα της με αρ. %s/%s  Α.Δ.Σ. με Α.Δ.Α.</w:t>', body.DecisionDS[0].Protocol[1].Number, body.DecisionDS[0].Protocol[1].Date) +
				'</w:r>' +
				'</w:p>'
		}

		return ret;
	},
	getAttachment4: function (body) {
		return '<w:p w:rsidR="00057639" w:rsidRPr="00840235" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="284"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00840235">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t>Δύο (2) φωτοαντίγραφα της με Α.Π. %s/%s Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής.</w:t>', body.DecisionSADA[0].Protocol[0].Number, body.DecisionSADA[0].Protocol[0].Date) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment5: function (body) {
		var ret = '';

		if (body.DecisionDS[0].Protocol[1]) {
			ret = '<w:p w:rsidR="00057639" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="004D48B8">' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:tabs>' +
				'<w:tab w:val="left" w:pos="142"/>' +
				'<w:tab w:val="left" w:pos="6195"/>' +
				'</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				util.format('<w:t xml:space="preserve">Δύο (2) φωτοαντίγραφα της με Α.Π. %s/%s Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής.</w:t>', body.DecisionSADA[0].Protocol[1].Number, body.DecisionSADA[0].Protocol[1].Date) +
				'</w:r>' +
				'</w:p>'
		}

		return ret;
	},
	getAttachment6: function (body) {
		var ret = '';

		if (body.CourtOfAuditors[0].HasCourtOfAuditors === true) {
			ret = '<w:p w:rsidR="00212912" w:rsidRPr="00DB37DE" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:tabs>' +
				'<w:tab w:val="left" w:pos="142"/>' +
				'<w:tab w:val="left" w:pos="6195"/>' +
				'</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r w:rsidRPr="00DB37DE">' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				util.format('<w:t xml:space="preserve">Πρωτότυπο και φωτοαντίγραφο της Κοινοποίησης της με αρ. %s/%s Πράξης του %s Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. %s/%s).</w:t>',
					body.CourtOfAuditors[0].Action[0].Number, body.CourtOfAuditors[0].Action[0].Year, body.CourtOfAuditors[0].Scale[0].Letter, body.CourtOfAuditors[0].APDA[0].Number, body.CourtOfAuditors[0].APDA[0].Date) +
				'</w:r>' +
				'</w:p>'
		}

		return ret;
	},
	getAttachment7: function (body) {
		return '<w:p w:rsidR="00212912" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00DB37DE">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t>Πρωτότυπο και φωτοαντίγραφο της με αρ. %s/%s (Α.Π. %s/%s) και ΑΔΑ %s Απόφασης Ανάληψης Υποχρέωσης.</w:t>', body.Account[0].AYY[0].Value, body.Account[0].AYY[0].Year, body.Account[0].AYY[0].ProtocolNumber, body.Account[0].AYY[0].ProtocolDate, body.Account[0].AYY[0].ADA) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment8: function (body) {
		var text = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s στης %s.',
			body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
			body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
			body.Account[0].Invoice[0].Number,
			body.Account[0].Invoice[0].Date,
			body.Account[0].Invoice[0].DeliveredDate,
			body.Contract[0].Concessionaire[0].Name)
			
		return '<w:p w:rsidR="00F871E2" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="284"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t xml:space="preserve">%s</w:t>', text) +
			'</w:r>' +
			'</w:p>';
	},
	getAttachment9: function (body) {
		var prototypesPhrase = 'πρωτότυπα';
		if (body.PrototypeNumber === '1') 
			prototypesPhrase = 'πρωτότυπο'
		
		return '<w:p w:rsidR="00F871E2" w:rsidRPr="00F871E2" w:rsidRDefault="00395F84" w:rsidP="00F871E2">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="284"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00395F84">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t>Tέσσερα (4) πρωτότυπα του 1ου Λογαριασμού.</w:t>', helper.getWord(body.PrototypeNumber), body.PrototypeNumber, prototypesPhrase) +
			'</w:r>' +
			'</w:p>';
	},
	getAttachment10: function (body) {
		return '<w:p w:rsidR="00212912" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:tabs>' +
			'<w:tab w:val="left" w:pos="142"/>' +
			'<w:tab w:val="left" w:pos="284"/>' +
			'<w:tab w:val="left" w:pos="6195"/>' +
			'</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00F871E2">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t>Ενημερωτικός Πίνακας της με Α.Π. %s/%s Προγραμματικής Σύμβασης.</w:t>', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date) +
			'</w:r>' +
			'</w:p>';
	},
	getAttachmentsXmlValue: function (body) {
		var ret = '<w:p w:rsidR="00A44D6F" w:rsidRDefault="00262B9D" w:rsidP="00CB4B70">' +
			'<w:pPr>' +
			'<w:spacing w:before="240"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:b/>' +
			'<w:color w:val="000000"/>' +
			'<w:u w:val="single"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00812A45">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:b/>' +
			'<w:color w:val="000000"/>' +
			'<w:u w:val="single"/>' +
			'</w:rPr>' +
			'<w:t>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</w:t>' +
			'</w:r>' +
			'</w:p>' +
			'<w:p w:rsidR="009344B1" w:rsidRDefault="009344B1" w:rsidP="009344B1">' +
			'<w:pPr>' +
			'<w:spacing w:before="240"/>' +
			'<w:ind w:hanging="567"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:b/>' +
			'<w:color w:val="000000"/>' +
			'<w:u w:val="single"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'</w:p>' +
			this.getAttachment1(body) +
			this.getAttachment2(body) +
			this.getAttachment3(body) +
			this.getAttachment4(body) +
			this.getAttachment5(body) +
			this.getAttachment6(body) +
			this.getAttachment7(body) +
			this.getAttachment8(body) +
			this.getAttachment9(body) +
			this.getAttachment10(body)

		return ret;
	}

}