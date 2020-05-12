const helper = require('../../../HelperMethods/helpermethods')
const util = require('util');

// import { getWord } from '../../../HelperMethods/helpermethods'

module.exports = {
	getAttachment1: function (body) {
		//in1.docx 1.	Δύο (2) φωτ/φα της με Α.Π. {c_pn}/{c_pd} {c_type}.
		// gdpr first --> Πρωτότυπο και φωτοαντίγραφο της με Α.Π. 260100/17-10-2018 Προγραμματικής Σύμβασης
		// 6ος) Δύο (2) φωτ/φα της με Α.Π. 93942/30-3-2017 Δημόσιας Σύμβασης Ανάθεσης.   
		// τεχνοπολις --> 1)	Δύο (2) φωτοαντίγραφα της Προγραμματικής Σύμβασης με ΑΠ 162990/11.06.2019

		var contractProtocolNumber = body.Contract[0].Protocol[0].Number
		var contractProtocolDate = body.Contract[0].Protocol[0].Date
		var contractId = body.Contract[0].ContractId;
		var contractTypeLabel = (contractId == 1 ? 'Δημόσιας Σύμβασης Ανάθεσης' : 'Προγραμματικής Σύμβασης')
		var accountNo = body.Account[0].No

		var rText = '';
		if (accountNo == 1)
			rText = util.format('Πρωτότυπο και φωτοαντίγραφο της με Α.Π. %s/%s %s', contractProtocolNumber, contractProtocolDate, contractTypeLabel)
		else
			rText = util.format('Δύο (2) φωτ/φα της με Α.Π. %s/%s %s', contractProtocolNumber, contractProtocolDate, contractTypeLabel, DownpaymentLawArticle)

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
			util.format('<w:t>%s</w:t>', rText) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment2: function (body) {
		var ret = '';
		if (body.DecisionBoard) {
			for (let index = 0; index < body.DecisionBoard.length; index++) {
				const element = body.DecisionBoard[index];
				var rText = util.format('Δύο (2) φωτοαντίγραφα της με αρ. %s/%s Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.) με Α.Δ.Α.', element.ProtocolNumber, element.ProtocolDate)

				ret += '<w:p w:rsidR="0067614F" w:rsidRPr="0067614F" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
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
					util.format('<w:t xml:space="preserve">%s</w:t>', rText) +
					'</w:r>' +
					'</w:p>'
			}
		}

		return ret
	},
	getAttachment3: function (body) {
		var ret = '';
		if (body.DecisionCoordinatorDecentrilizedAdministration) {
			for (let index = 0; index < body.DecisionCoordinatorDecentrilizedAdministration.length; index++) {
				const element = body.DecisionCoordinatorDecentrilizedAdministration[index];
				var rText = util.format('Δύο (2) φωτοαντίγραφα της με Α.Π. %s/%s Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής.', element.ProtocolNumber, element.ProtocolDate)

				ret += '<w:p w:rsidR="00057639" w:rsidRPr="00840235" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
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
					util.format('<w:t>%s</w:t>', rText) +
					'</w:r>' +
					'</w:p>'
			}
		}
		return ret;
	},
	getAttachment4: function (body) {
		var ret = '';
		if (body.CourtOfAuditors) {
			for (let index = 0; index < body.CourtOfAuditors.length; index++) {
				const element = body.CourtOfAuditors[index];
				var rText = util.format('Πρωτότυπο και φωτοαντίγραφο της Κοινοποίησης της με αρ. %s/%s Πράξης του %s Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. %s/%s).',
					element.ProtocolNumber,
					element.ProtocolYear,
					element.ScaleNumber,
					element.APDA_ProtocolNumber,
					element.APDA_ProtocolDate)

				ret += '<w:p w:rsidR="00212912" w:rsidRPr="00DB37DE" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
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
					'<w:r w:rsidRPr="00DB37DE">' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'</w:rPr>' +
					util.format('<w:t xml:space="preserve">%s</w:t>', rText) +
					'</w:r>' +
					'</w:p>'
			}
		}

		return ret;
	},
	getAttachment5: function (body) {
		var AYYValue = body.Account[0].AYY[0].Value;
		var AYYYear = body.Account[0].AYY[0].Year;
		var AAYProtocolNumber = body.Account[0].AYY[0].ProtocolNumber;
		var AAYProtocolDate = body.Account[0].AYY[0].ProtocolDate;
		var AAYADA = body.Account[0].AYY[0].ADA;
		var isFirstOfTheYear = body.Account[0].IsFirstOfTheYear
		var startPhrase = (isFirstOfTheYear === true ? 'Πρωτότυπο και φωτοαντίγραφο' : 'Δύο (2) φωτ/φα');

		var rText = util.format('<w:t>%s της με αρ. %s/%s (Α.Π. %s/%s) και ΑΔΑ %s Απόφασης Ανάληψης Υποχρέωσης.</w:t>', startPhrase, AYYValue, AYYYear, AAYProtocolNumber, AAYProtocolDate, AAYADA);
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
			'<w:r w:rsidRPr="00DB37DE">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			util.format('<w:t>%s</w:t>', rText) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment6: function (body) {
		// 3.	Πρωτότυπο & φωτ/φο του με αριθμ. {a_in}/{a_id} Τιμολογίου Παροχής Υπηρεσιών της {c_conc}
		if (body.Account[0].Invoice) {
			var text = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s στης %s.',
				body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
				body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
				body.Account[0].Invoice[0].Number,
				body.Account[0].Invoice[0].Date,
				body.Contract[0].Concessionaire[0].Name,
				body.Account[0].Invoice[0].DeliveredDate)

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
				'</w:p>'
		};
	},	
	getAttachment7: function (body) {
		//4.	Δύο (2) πρωτότυπα της από {dcd} Βεβαίωσης Έργου του Τμήματος {dep_name_lower} της Διεύθυνσης {dir_name_lower} αναφορικά με την υλοποίηση της Σύμβασης από την {c_conc} κατά το χρονικό διάστημα από {a_sd} έως και {a_ed}.

		var WorkConfirmationDate = body.WorkConfirmationDate;
		var directionNameLower = body.Direction[0].NameInLower;
		var departmentNameLower = body.Direction[0].Department[0].NameInLower;
		var concessionaireName = body.Contract[0].Concessionaire[0].Name;
		var start = body.Account[0].Start;
		var end = body.Account[0].End;

		var rText = util.format('Δύο (2) πρωτότυπα της από %s Βεβαίωσης Έργου του Τμήματος %s της Διεύθυνσης %s αναφορικά με την υλοποίηση της Σύμβασης από την %s κατά το χρονικό διάστημα από %s έως και %s.',
			WorkConfirmationDate,
			departmentNameLower,
			directionNameLower,
			concessionaireName,
			start,
			end)

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
			util.format('<w:t xml:space="preserve">%s</w:t>', rText) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment8: function (body) {
		//Δύο (2) πρωτότυπα του από {ddg} Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.

		var DeliveryGoodsDate = body.DeliveryGoodsDate;
		var rText = util.format('Δύο (2) πρωτότυπα του από %s Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.',
			DeliveryGoodsDate)

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
			util.format('<w:t xml:space="preserve">%s</w:t>', rText) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment9: function (body) {
		var rText = util.format('Τέσσερα (4) πρωτότυπα του %s', body.Account[0].No)
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
			util.format('<w:t>%s</w:t>', rText) +
			'</w:r>' +
			'<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ου</w:t></w:r>' +
			'<w:r>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'<w:t> Λογαριασμού</w:t>' +
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