const helper = require('../../HelperMethods/helpermethods')
const util = require('util');
const common = require('./common');
const { getrElement } = require('./common');

// import { getWord } from '../../../HelperMethods/helpermethods'
const fontSize = 22
const fontFamily = 'Arial'

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
			rText = util.format('Δύο (2) φωτ/φα της με Α.Π. %s/%s %s', contractProtocolNumber, contractProtocolDate, contractTypeLabel)

		return '<w:p>' +
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
			//'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
			'<w:jc w:val="both"/>' +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'			
	},
	getAttachment2: function (body) {
		var ret = '';
		if (body.DecisionBoard) {
			for (let index = 0; index < body.DecisionBoard.length; index++) {
				const element = body.DecisionBoard[index];
				var rText = util.format("Δύο (2) φωτοαντίγραφα της υπ' αριθ. %s/%s ", element.ProtocolNumber, element.ProtocolDate);
				var lText = util.format(' Απόφασης του Δημοτικού Συμβουλίου %s', element.ContentTransmission);

				ret += '<w:p>' +
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
					//'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
					'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
					'<w:jc w:val="left"/>' +
					'</w:pPr>' +
					common.getrElement(rText) +
					common.getADAXml(element.ADA) +
					common.getrElement(lText) +
					common.enterLine() +
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


				var rText = util.format('Δύο (2) φωτοαντίγραφα της με Α.Π. %s/%s Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής ', element.ProtocolNumber, element.ProtocolDate)
				var lText = util.format(' %s %s Α.Δ.Σ.', element.ActionTransmission, element.DecisionBoardProtocol);
				if (element.APDA_ProtocolNumber)
					lText += util.format('(Α.Π.Δ.Α. %s/%s)', element.APDA_ProtocolNumber, element.APDA_ProtocolDate);

				ret += '<w:p>' +
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
					//'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
					'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
					'<w:jc w:val="left"/>' +
					'</w:pPr>' +
					common.getrElement(rText) +
					common.getADAXml(element.ADA) +
					common.getrElement(lText) +
					common.enterLine() +
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
				var rText = util.format('Δύο (2) φωτοαντίγραφα της Κοινοποίησης της με αρ. %s/%s Πράξης του %s Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. %s/%s).',
					element.ProtocolNumber,
					element.ProtocolYear,
					element.ScaleNumber,
					element.APDA_ProtocolNumber,
					element.APDA_ProtocolDate)

				ret += '<w:p>' +
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
					//'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
					'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
					'<w:jc w:val="left"/>' +
					'</w:pPr>' +
					common.getrElement(rText) +
					common.enterLine() +
					'</w:p>'
			}
		}

		return ret;
	},
	getAttachment5: function (body) {

		// Πρωτότυπο και φωτοαντίγραφο της με αριθμ. Α01197/254432/08-10-2019 ΕΑΔ 1196 (ΑΔΑ 6ΡΗ5Ω6Μ-ΨΗΚ) Απόφασης Ανάληψης Υποχρέωσης 
		// Πρωτότυπο και φωτοαντίγραφο της υπ΄ αριθμ. 333293/31-12-2019 (ΑΔΑ ΨΘΡΨΩ6Μ-Λ3Υ) ΑΠΟΦΑΣΗΣ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ (παρ.2 άρθρο 4 ΠΔ 80/2016), της Α01197/2019 Α.Α.Υ. 
		var ret = '';
		if (body.AAY) {
			for (let index = 0; index < body.AAY.length; index++) {
				const element = body.AAY[index];
				if (element.Type == 0 || element.Type == 1) {
					var rText = util.format("Πρωτότυπο και φωτοαντίγραφο της με αριθμ. %s/%s/%s ΕΑΔ %s ", element.AayValue, element.ProtocolNumber, element.ProtocolYear, element.EadNumber);
					var lText = 'Απόφασης Ανάληψης Υποχρέωσης.'
					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						//'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
						'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
						'<w:jc w:val="left"/>' +
						'</w:pPr>' +
						common.getrElement(rText) +
						common.getADAXml(element.ADA) +
						common.getrElement(lText) +
						common.enterLine() +
						'</w:p>'
				} else if (element.Type == 2) {
					var rText = util.format("Πρωτότυπο και φωτοαντίγραφο της υπ΄ αριθμ. %s/%s ", element.AayValue, element.ProtocolNumber, element.ProtocolDate);
					var lText = util.format('(παρ.2 άρθρο 4 ΠΔ 80/2016), της %s/%s Α.Α.Υ. ', element.AayValue, helper.extractYearFromDate(element.ProtocolDate))
					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						//'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
						'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
						'<w:jc w:val="left"/>' +
						'</w:pPr>' +
						common.getrElement(rText) +
						common.getADAXml(element.ADA) +
						common.getBoldText('ΑΠΟΦΑΣΗ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ ') +
						common.getrElement(lText) +
						common.enterLine() +
						'</w:p>'
				}
			}
			return ret;
		}

		// var AYYValue = body.Account[0].AYY[0].Value;
		// var AYYYear = body.Account[0].AYY[0].Year;
		// var AAYProtocolNumber = body.Account[0].AYY[0].ProtocolNumber;
		// var AAYProtocolDate = body.Account[0].AYY[0].ProtocolDate;
		// var AAYADA = body.Account[0].AYY[0].ADA;
		// var isFirstOfTheYear = body.Account[0].IsFirstOfTheYear
		// var startPhrase = (isFirstOfTheYear === true ? 'Πρωτότυπο και φωτοαντίγραφο' : 'Δύο (2) φωτ/φα');

		// var rText = util.format('<w:t>%s της με αρ. %s/%s (Α.Π. %s/%s) και ΑΔΑ %s Απόφασης Ανάληψης Υποχρέωσης.</w:t>', startPhrase, AYYValue, AYYYear, AAYProtocolNumber, AAYProtocolDate, AAYADA);
		// return '<w:p w:rsidR="00212912" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
		// 	'<w:pPr>' +
		// 	'<w:numPr>' +
		// 	'<w:ilvl w:val="0"/>' +
		// 	'<w:numId w:val="2"/>' +
		// 	'</w:numPr>' +
		// 	'<w:tabs>' +
		// 	'<w:tab w:val="left" w:pos="142"/>' +
		// 	'<w:tab w:val="left" w:pos="284"/>' +
		// 	'<w:tab w:val="left" w:pos="6195"/>' +
		// 	'</w:tabs>' +
		// 	'<w:spacing w:line="276" w:lineRule="auto"/>' +
		//  '<w:jc w:val="left"/>' +
		// 	'<w:rPr>' +
		// 	'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
		// 	'</w:rPr>' +
		// 	'</w:pPr>' +
		// 	'<w:r w:rsidRPr="00DB37DE">' +
		// 	'<w:rPr>' +
		// 	'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
		// 	'</w:rPr>' +
		// 	util.format('<w:t>%s</w:t>', rText) +
		// 	'</w:r>' +
		// 	'</w:p>'
	},
	getAttachment6: function (body) {
		// 3.	Πρωτότυπο & φωτ/φο του με αριθμ. {a_in}/{a_id} Τιμολογίου Παροχής Υπηρεσιών της {c_conc}
		if (body.Account[0].Invoice) {
			var rText = '';
			if (body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number)
				rText = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s %s.',
					body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
					body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
					body.Account[0].Invoice[0].Number,
					body.Account[0].Invoice[0].Date,
					body.Contract[0].Concessionaire[0].Name,
					util.format('στης %s', body.Account[0].Invoice[0].DeliveredDate))
			else
				rText = util.format('Το υπ΄ αρίθμ %s/%s τιμολόγιο του δικαιούχου %s και φωτοαντίγραφο του', body.Account[0].Invoice[0].Number,
					body.Account[0].Invoice[0].Date, body.Contract[0].Concessionaire[0].Name)

			return '<w:p>' +
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
				// '<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.enterLine() +
				'</w:p>'
		};
	},
	getAttachment7: function (body) {
		//4.	Δύο (2) πρωτότυπα της από {dcd} Βεβαίωσης Έργου του Τμήματος {dep_name_lower} της Διεύθυνσης {dir_name_lower} αναφορικά με την υλοποίηση της Σύμβασης από την {c_conc} κατά το χρονικό διάστημα από {a_sd} έως και {a_ed}.

		var workConfirmationDate = body.WorkConfirmationDate;
		var directionNameLower = body.Direction[0].NameInLower;
		var departmentNameLower = body.Direction[0].Department[0].NameInLower;
		var concessionaireName = body.Contract[0].Concessionaire[0].Name;
		var start = body.Account[0].Start;
		var end = body.Account[0].End;

		var rText = util.format('Δύο (2) πρωτότυπα της από %s Βεβαίωσης Έργου του Τμήματος %s της Διεύθυνσης %s αναφορικά με την υλοποίηση της Σύμβασης από την %s κατά το χρονικό διάστημα από %s έως και %s.',
			workConfirmationDate,
			departmentNameLower,
			directionNameLower,
			concessionaireName,
			start,
			end)

		return '<w:p>' +
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
			// '<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
			'<w:jc w:val="left"/>' +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'
	},
	getAttachment8: function (body) {
		//Δύο (2) πρωτότυπα του από {ddg} Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.

		var DeliveryGoodsDate = body.DeliveryGoodsDate;
		var rText = util.format('Δύο (2) πρωτότυπα του από %s Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.',
			DeliveryGoodsDate)

		return '<w:p>' +
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
			//'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
			'<w:jc w:val="left"/>' +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'
	},
	getAuthorDocumentedRequest: function (body) {
		//Πρωτότυπο και φωτοαντίγραφο του  υπ' αριθ. 245924/27-09-2019 Τεκμηριωμένου Αιτήματος του Διατάκτη		
		var rText = util.format("Πρωτότυπο και φωτοαντίγραφο του  υπ' αριθ. %s/%s Τεκμηριωμένου Αιτήματος του Διατάκτη", body.ARD)

		var ret = '';
		if (body.ARD) {
			for (let index = 0; index < body.ARD.length; index++) {
				const element = body.ARD[index];
				if (element.Type == 0 || element.Type == 1) {
					var rText = util.format("Πρωτότυπο και φωτοαντίγραφο της με αριθμ. %s/%s", element.ProtocolNumber, element.ProtocolYear);
					var lText = ' Τεκμηριωμένου Αιτήματος του Διατάκτη'
					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						//'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
						'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
						'<w:jc w:val="left"/>' +
						'</w:pPr>' +
						common.getrElement(rText) +
						common.getADAXml(element.ADA) +
						common.getrElement(lText) +
						common.enterLine() +
						'</w:p>'
				}
			}
		}
		return ret;
	},
	getAttachment9: function (body) {
		var rText = util.format('Τέσσερα (4) πρωτότυπα του %s', body.Account[0].No)
		return '<w:p>' +
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
			// '<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
			'<w:jc w:val="left"/>' +
			'</w:pPr>' +
			common.getrElement(rText) +
			'<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ου</w:t></w:r>' +
			common.getrElement(' Λογαριασμού') +
			common.enterLine() +
			'</w:p>';

	},
	getSnippetPracticalAttachment: function (body) {
		// Το από 11 Φεβρουαρίου 2019 Απόσπασμα Πρακτικού ΔΣ 3/11-02-2019 της ΔΑΕΜ Α.Ε. περί έγκρισης σύναψης Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της 108/31-01-2019 ΑΔΣ
		var ret = '';
		if (body.SnippetPractical) {
			for (let index = 0; index < body.SnippetPractical.length; index++) {
				const element = body.SnippetPractical[index];

				var rText = util.format("Το από %s Απόσπασμα Πρακτικού ΔΣ %s/%s της %s περί έγκρισης σύναψης Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της %s",
					helper.getDateString(element.ProtocolDate), element.ProtocolNumber, element.ProtocolDate, body.Contract[0].Concessionaire[0].Name, element.DecisionBoardProtocol);
				var lText = '  '
				ret += '<w:p>' +
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
					// '<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
					'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
					'<w:jc w:val="left"/>' +
					'</w:pPr>' +
					common.getrElement(rText) +
					common.enterLine() +
					'</w:p>'
			}
		}
		return ret;
	},
	getAttachment10: function (body) {
		if (body.Contract[0].HasDownpayment && body.Account[0].No) {
			var rText = util.format('<w:t>Ενημερωτικός Πίνακας της με Α.Π. %s/%s Προγραμματικής Σύμβασης.</w:t>', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date);
			return '<w:p>' +
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
				// '<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.enterLine() +
				'</w:p>';
		}
	},
	getAttachmentsForMonitoringCommittee: function (body) {
		var ret = '';
		if (body.Account[0].MonitoringCommittee) {
			var rText = '';
			// 		6)	Την Απόφαση Δημάρχου με Α.Π. 312848/06.12.2019 για τον ορισμό των μελών της Επιτροπής Παρακολούθησης. 

			// 8)	Το με ΑΠ. 318192/12.12.2019 έγγραφο της Τεχνόπολις του Δήμου Αθηναίων με το οποίο διαβιβάζονται:
			// 	Το πρακτικό της 2ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος 
			// «Το παιδί, Η πόλη και τα Μνημεία» που πραγματοποιήθηκε στις 06.12.2019.
			// 	Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο πρώτο τετράμηνο, Ιούνιος-Οκτώβριος  2019.

			rText = util.format('Την Απόφαση Δημάρχου με Α.Π. %s/%s για τον ορισμό των μελών της Επιτροπής Παρακολούθησης.',
				body.Account[0].MonitoringCommittee[0].MayorDecisionForMembersProtocolNumber, body.Account[0].MonitoringCommittee[0].MayorDecisionForMembersProtocolDate);
			ret = '<w:p>' +
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
				// '<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.enterLine() +
				'</w:p>'

			// 7)	Το από  06.12.2019 πρακτικό της (2ης) δεύτερης συνεδρίασης Επιτροπής Παρακολούθησης της Προγραμματικής Σύμβασης
			rText = util.format('Το από %s πρακτικό της (%sης) %s συνεδρίασης Επιτροπής Παρακολούθησης της Προγραμματικής Σύμβασης',
				body.Account[0].MonitoringCommittee[0].PracticalDate, body.Account[0].No, helper.getNumberLectical(body.Account[0].No))

			ret += '<w:p>' +
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
				// '<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.enterLine() +
				'</w:p>'

			rText = util.format('Δύο (2) φωτοαντίγραφα του με Α.Π. %s/%s εγγράφου της %s του Δήμου Αθηναίων με το οποίο διαβιβάζονται:',
				body.Account[0].MonitoringCommittee[0].TransmissionDocumentProtocolNumber,
				body.Account[0].MonitoringCommittee[0].TransmissionDocumentProtocolDate,
				body.Contract[0].Concessionaire[0].Name);
			var s1_1 = util.format('Το πρακτικό της %s', body.Account[0].No);
			var s1_2 = util.format(' συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος «%s» που πραγματοποιήθηκε στις %s.', body.Contract[0].Title[0].Value, body.Account[0].MonitoringCommittee[0].PracticalDate);
			var s2 = util.format('Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο %s', body.Account[0].MonitoringCommittee[0].GivenPhysicalObjectContentTime);

			ret += '<w:p>' +
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
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(rText) +
				'</w:p>' +
				'<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="1"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				//'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(s1_1) +
				'<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ης</w:t></w:r>' +
				common.getrElement(s1_2) +
				'</w:p>' +
				'<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="1"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				//'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				'<w:ind w:left="0" w:right="0" w:firstLine="0" />' +
				'<w:jc w:val="left"/>' +
				'</w:pPr>' +
				common.getrElement(s2) +
				'</w:p>'

			// 	'<w:p><w:pPr><w:pStyle w:val="ae"/>' +
			// 	'<w:numPr><w:ilvl w:val="0"/><w:numId w:val="5"/></w:numPr><w:tabs><w:tab w:val="left" w:pos="5670"/></w:tabs>' +
			// 	'<w:ind w:left="851" w:hanging="142"/><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr>' +
			// 	'<w:r><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t>Το πρακτικό της 2</w:t></w:r>' +
			// 	'<w:r><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/><w:vertAlign w:val="superscript"/></w:rPr><w:t>ης</w:t></w:r>' +
			// 	'<w:r><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t xml:space="preserve"> συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος «Το παιδί, Η πόλη και τα Μνημεία» που πραγματοποιήθηκε στις 06.12.2019.</w:t></w:r>' +
			// 	'<w:p><w:pPr><w:pStyle w:val="ae"/>' +
			// 	'<w:numPr><w:ilvl w:val="0"/><w:numId w:val="5"/></w:numPr>' +
			// 	'<w:tabs><w:tab w:val="left" w:pos="5670"/></w:tabs>' +
			// 	'<w:ind w:left="851" w:hanging="142"/>' +
			// 	'<w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr>' +
			// 	'<w:r><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:t xml:space="preserve">Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο πρώτο τετράμηνο, Ιούνιος-Οκτώβριος  2019.</w:t></w:r>' +
			// 	'<w:r><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr><w:tab/></w:r>' +
			// 	'</w:p>' +
			// 	'<w:p><w:pPr><w:tabs><w:tab w:val="left" w:pos="5670"/></w:tabs><w:jc w:val="center"/><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr></w:p>' +
			// 	'<w:p><w:pPr><w:tabs><w:tab w:val="left" w:pos="5670"/></w:tabs><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr></w:p>' +
			// 	'<w:p><w:pPr><w:tabs><w:tab w:val="left" w:pos="5670"/></w:tabs><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:pPr></w:p>'
		}
		return ret;
	},
	getAttachmentsXmlValue: function (body) {
		var ret = '<w:p>' +
			'<w:pPr>' +
			'<w:spacing w:before="240"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily) +
			'<w:b/>' +
			'<w:color w:val="000000"/>' +
			'<w:u w:val="single"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r>' +
			'<w:rPr>' +
			util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily) +
			'<w:b/>' +
			'<w:color w:val="000000"/>' +
			'<w:u w:val="single"/>' +
			'</w:rPr>' +
			'<w:t>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</w:t>' +
			'</w:r>' +
			'</w:p>' +
			'<w:p>' +
			'<w:pPr>' +
			'<w:spacing w:before="240"/>' +
			'<w:ind w:hanging="567"/>' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			util.format('<w:rFonts w:ascii="%s" w:hAnsi="%s"/>', fontFamily) +
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
			this.getAttachment10(body) +
			this.getSnippetPracticalAttachment(body) +
			this.getAttachmentsForMonitoringCommittee(body)

		return ret;
	}

}


// return '';	
		// return '<w:p w14:paraId="3988C141" w14:textId="77777777" w:rsidR="00811BA5" w:rsidRDefault="00811BA5" w:rsidP="00811BA5"><w:pPr><w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="4"/></w:numPr></w:pPr><w:proofErr w:type="spellStart"/><w:r><w:t>Sdfsdf</w:t></w:r><w:proofErr w:type="spellEnd"/><w:r><w:t xml:space="preserve"> </w:t></w:r></w:p>' +
		//   '<w:p w14:paraId="3EEC54F5" w14:textId="60490F78" w:rsidR="00811BA5" w:rsidRDefault="00811BA5" w:rsidP="00811BA5">' +
		// 	'<w:pPr>' +
		// 	'<w:pStyle w:val="ListParagraph"/>' +
		// 	'<w:numPr>' +
		// 	'<w:ilvl w:val="1"/>' +
		// 	'<w:numId w:val="4"/>' +
		// 	'</w:numPr>' +
		// 	'</w:pPr>' +
		// 	'<w:r><w:t>11</w:t></w:r></w:p>' +
		// 	'<w:p w14:paraId="68A4EFFB" w14:textId="085A5E7B" w:rsidR="00811BA5" w:rsidRDefault="00811BA5" w:rsidP="00811BA5">' +
		// 	'<w:pPr>' +
		// 	'<w:pStyle w:val="ListParagraph"/>' +
		// 	'<w:numPr>' +
		// 	'<w:ilvl w:val="1"/>' +
		// 	'<w:numId w:val="4"/>' +
		// 	'</w:numPr>' +
		// 	'</w:pPr>' +
		// 	'<w:r>' +
		// 	'<w:t>222</w:t>' +
		// 	'</w:r></w:p>'