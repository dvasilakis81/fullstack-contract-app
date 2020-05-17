const helper = require('../../HelperMethods/helpermethods')
const util = require('util');

// import { getWord } from '../../../HelperMethods/helpermethods'

module.exports = {

	//Τεχνοπολις 2)  1)	Την με ΑΠ 162990/11.06.2019 Προγραμματική Σύμβαση και ειδικότερα το άρθρο 9 Πόροι - Εκταμίευση, αυτής
	getAttachment1: function (body) {

		var contractProtocolNumber = body.Contract[0].Protocol[0].Number
		var contractProtocolDate = body.Contract[0].Protocol[0].Date
		var DownpaymentLawArticle = body.Contract[0].DownpaymentLawArticle
		var contractId = body.Contract[0].ContractId;
		var contractTypeLabel = (contractId == 1 ? 'Δημόσια Σύμβαση Ανάθεσης' : 'Προγραμματική Σύμβαση')
		var rText = '';
		if (contractId == 1)
			rText = util.format('Τη με Α.Π. %s/%s %s', contractProtocolNumber, contractProtocolDate, contractTypeLabel)
		else {
			if (DownpaymentLawArticle)
				rText = util.format('Τη με Α.Π. %s/%s %s και ειδικότερα το άρθρο %s αυτής.', contractProtocolNumber, contractProtocolDate, contractTypeLabel, DownpaymentLawArticle)
			else
				rText = util.format('Τη με Α.Π. %s/%s %s', contractProtocolNumber, contractProtocolDate, contractTypeLabel)
		}

		return '<w:p w:rsidR="00057639" w:rsidRDefault="00262B9D" w:rsidP="00057639">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			// '<w:tabs>' +
			// '<w:tab w:val="left" w:pos="142"/>' +
			// '<w:tab w:val="left" w:pos="284"/>' +
			// '<w:tab w:val="left" w:pos="6195"/>' +
			// '</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:ind w:left="-142" w:hanging="426" />' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:sz w:val="28" />' +
			'<w:szCs w:val="28" />' +
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
				var text = '';
				if (index === 0) {
					text = util.format('Τη με αρ. %s/%s Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων ', element.ProtocolNumber, element.ProtocolDate)
					if (element.ADA)
						text += util.format('(ΑΔΑ %s) ', element.ADA)
					text += util.format(' με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. ')
				}
				else {
					text = util.format('Τη με αρ. %s/%s Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων ', element.ProtocolNumber, element.ProtocolDate)
					if (element.ADA)
						text += util.format('(ΑΔΑ %s) ', element.ADA)
					text += util.format(' με την οποία διορθώθηκε η ανωτέρω Α.Δ.Σ. “%s”. ', element.Content)
				}

				ret += '<w:p w:rsidR="0067614F" w:rsidRPr="0067614F" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
					'<w:pPr>' +
					'<w:numPr>' +
					'<w:ilvl w:val="0"/>' +
					'<w:numId w:val="2"/>' +
					'</w:numPr>' +
					// '<w:tabs>' +
					// '<w:tab w:val="left" w:pos="142"/>' +
					// '<w:tab w:val="left" w:pos="284"/>' +
					// '<w:tab w:val="left" w:pos="6195"/>' +
					// '</w:tabs>' +
					'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:ind w:left="-142" w:hanging="426" />' +
					'<w:jc w:val="both"/>' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'</w:rPr>' +
					'</w:pPr>' +
					'<w:r w:rsidRPr="00F871E2">' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'<w:sz w:val="28" />' +
					'<w:szCs w:val="28" />' +
					'</w:rPr>' +
					util.format('<w:t>%s</w:t>', text) +
					'</w:r>' +
					'</w:p>'
			}
		}
		return ret;
	},
	getAttachment3: function (body) {
		var ret = '';
		if (body.DecisionCoordinatorDecentrilizedAdministration) {
			for (let index = 0; index < body.DecisionCoordinatorDecentrilizedAdministration.length; index++) {
				const element = body.DecisionCoordinatorDecentrilizedAdministration[index];
				var rText = util.format('Τη με Α.Π. %s/%s Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής', element.ProtocolNumber, element.ProtocolDate);
				if (element.ADA)
					rText = util.format('(ΑΔΑ %s)', element.ADA)
				if (body.DecisionBoard && body.DecisionBoard[index])
					rText += util.format(' για τη νόμιμη λήψη της %s/%s Α.Δ.Σ. .', body.DecisionBoard[index].ProtocolNumber, body.DecisionBoard[index].ProtocolDate)

				ret += '<w:p w:rsidR="00057639" w:rsidRPr="00840235" w:rsidRDefault="00262B9D" w:rsidP="0067614F">' +
					'<w:pPr>' +
					'<w:numPr>' +
					'<w:ilvl w:val="0"/>' +
					'<w:numId w:val="2"/>' +
					'</w:numPr>' +
					// '<w:tabs>' +
					// '<w:tab w:val="left" w:pos="142"/>' +
					// '<w:tab w:val="left" w:pos="284"/>' +
					// '<w:tab w:val="left" w:pos="6195"/>' +
					// '</w:tabs>' +
					'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:ind w:left="-142" w:hanging="426" />' +
					'<w:jc w:val="both"/>' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'</w:rPr>' +
					'</w:pPr>' +
					'<w:r w:rsidRPr="00840235">' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'<w:sz w:val="28" />' +
					'<w:szCs w:val="28" />' +
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
				var text = util.format('Τη με αρ. %s/%s Πράξη του %s Κλιμακίου του Ελεγκτικού Συνεδρίου περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης.',
					element.ProtocolNumber,
					element.ProtocolYear,
					element.ScaleNumber)

				ret += '<w:p w:rsidR="00212912" w:rsidRPr="00DB37DE" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
					'<w:pPr>' +
					'<w:numPr>' +
					'<w:ilvl w:val="0"/>' +
					'<w:numId w:val="2"/>' +
					'</w:numPr>' +
					// '<w:tabs>' +
					// '<w:tab w:val="left" w:pos="142"/>' +
					// '<w:tab w:val="left" w:pos="6195"/>' +
					// '</w:tabs>' +
					'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:ind w:left="-142" w:hanging="426" />' +
					'<w:jc w:val="both"/>' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'</w:rPr>' +
					'</w:pPr>' +
					'<w:r w:rsidRPr="00DB37DE">' +
					'<w:rPr>' +
					'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
					'<w:sz w:val="28" />' +
					'<w:szCs w:val="28" />' +
					'</w:rPr>' +
					util.format('<w:t>%s</w:t>', text) +
					'</w:r>' +
					'</w:p>'
			}
		}
		return ret;
	},
	getAttachment5: function (body) {
		var rText = util.format('<w:t>Τη με αρ. %s/%s (Αριθμός ΑΑΥ) με ΕΑΔ %s (Α.Π. %s/%s) και ΑΔΑ %s Απόφαση Ανάληψης Υποχρέωσης.</w:t>',
			body.Account[0].AAY[0].Value,
			body.Account[0].AAY[0].Year,
			body.Account[0].AAY[0].EADNumber,
			body.Account[0].AAY[0].ProtocolNumber,
			body.Account[0].AAY[0].ProtocolDate,
			body.Account[0].AAY[0].ADA);
		return '<w:p w:rsidR="00212912" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			// '<w:tabs>' +
			// '<w:tab w:val="left" w:pos="142"/>' +
			// '<w:tab w:val="left" w:pos="6195"/>' +
			// '</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:ind w:left="-142" w:hanging="426" />' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00DB37DE">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:sz w:val="28" />' +
			'<w:szCs w:val="28" />' +
			'</w:rPr>' +
			util.format('<w:t>%s</w:t>', rText) +
			'</w:r>' +
			'</w:p>'
	},
	getAttachment6: function (body) {

		if (body.Account[0].Invoice) {
			var text = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s στης %s.',
				body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
				body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
				body.Account[0].Invoice[0].Number,
				body.Account[0].Invoice[0].Date,
				body.Contract[0].Concessionaire[0].Name,
				body.Account[0].Invoice[0].DeliveredDate
			)

			return '<w:p w:rsidR="00F871E2" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				// '<w:tabs>' +
				// '<w:tab w:val="left" w:pos="142"/>' +
				// '<w:tab w:val="left" w:pos="284"/>' +
				// '<w:tab w:val="left" w:pos="6195"/>' +
				// '</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', text) +
				'</w:r>' +
				'</w:p>';
		}
	},
	getAttachment7: function (body) {
		//'Tην από 29-3-2019 Βεβαίωση Έργου του Τμήματος Τεχνολογίας, Πληροφορικής και Επικοινωνιών της Διεύθυνσης Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, 
		// Καινοτομίας και Τεκμηρίωσης περί της ορθής υλοποίησης της εν λόγω Σύμβασης κατά το χρονικό διάστημα από 1-12-2018 έως και 29-3-2019'
		if (body.WorkConfirmationDate) {
			var workConfirmationDate = body.WorkConfirmationDate;
			var directionNameLower = body.Direction[0].NameInLower;
			var departmentNameLower = body.Direction[0].Department[0].NameInLower;
			var start = body.Account[0].Start;
			var end = body.Account[0].End;

			var rText = util.format('Την από %s Βεβαίωση Έργου του Τμήματος %s της Διεύθυνσης %s ', workConfirmationDate, departmentNameLower, directionNameLower)
			rText += util.format('περί της ορθής υλοποίησης της εν λόγω Σύμβασης κατά το χρονικό διάστημα από %s έως και %s', start, end)

			return '<w:p w:rsidR="00F871E2" w:rsidRPr="00F871E2" w:rsidRDefault="00395F84" w:rsidP="00F871E2">' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				// '<w:tabs>' +
				// '<w:tab w:val="left" w:pos="142"/>' +
				// '<w:tab w:val="left" w:pos="284"/>' +
				// '<w:tab w:val="left" w:pos="6195"/>' +
				// '</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r w:rsidRPr="00395F84">' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', rText) +
				'</w:r>' +
				'</w:p>'
		}
	},
	getAttachment8: function (body) {
		// Το από 29-3-2019 Πρωτόκολλο Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής

		var DeliveryGoodsDate = body.DeliveryGoodsDate;
		var rText = util.format('Δύο (2) πρωτότυπα του από %s Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.',
			DeliveryGoodsDate)

		return '<w:p w:rsidR="00F871E2" w:rsidRPr="00F871E2" w:rsidRDefault="00395F84" w:rsidP="00F871E2">' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			// '<w:tabs>' +
			// '<w:tab w:val="left" w:pos="142"/>' +
			// '<w:tab w:val="left" w:pos="284"/>' +
			// '<w:tab w:val="left" w:pos="6195"/>' +
			// '</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:ind w:left="-142" w:hanging="426" />' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00395F84">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:sz w:val="28" />' +
			'<w:szCs w:val="28" />' +
			'</w:rPr>' +
			util.format('<w:t>%s</w:t>', rText) +
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
			// '<w:tabs>' +
			// '<w:tab w:val="left" w:pos="142"/>' +
			// '<w:tab w:val="left" w:pos="284"/>' +
			// '<w:tab w:val="left" w:pos="6195"/>' +
			// '</w:tabs>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:ind w:left="-142" w:hanging="426" />' +
			'<w:jc w:val="both"/>' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'</w:rPr>' +
			'</w:pPr>' +
			'<w:r w:rsidRPr="00395F84">' +
			'<w:rPr>' +
			'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
			'<w:sz w:val="28" />' +
			'<w:szCs w:val="28" />' +
			'</w:rPr>' +
			util.format('<w:t>%s (%s) %s του 1ου Λογαριασμού.</w:t>', helper.getWord(body.PrototypeNumber), body.PrototypeNumber, prototypesPhrase) +
			'</w:r>' +
			'</w:p>';
	},
	getAttachment10: function (body) {
		if (body.Contract && body.Contract[0].Protocol[0]) {
			return '<w:p w:rsidR="00212912" w:rsidRPr="00F871E2" w:rsidRDefault="00262B9D" w:rsidP="00F871E2">' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				// '<w:tabs>' +
				// '<w:tab w:val="left" w:pos="142"/>' +
				// '<w:tab w:val="left" w:pos="284"/>' +
				// '<w:tab w:val="left" w:pos="6195"/>' +
				// '</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r w:rsidRPr="00F871E2">' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t>Ενημερωτικός Πίνακας της με Α.Π. %s/%s Προγραμματικής Σύμβασης.</w:t>', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date) +
				'</w:r>' +
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
				//'<w:tabs>' +
				// '<w:tab w:val="left" w:pos="142"/>' +
				// '<w:tab w:val="left" w:pos="284"/>' +
				// '<w:tab w:val="left" w:pos="6195"/>' +
				// '</w:tabs>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +				
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', rText) +
				'</w:r>' +
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
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +				
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', rText) +
				'</w:r>' +
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
				'<w:ind w:left="-142" w:hanging="426" />' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', rText) +
				'</w:r>' +
				'</w:p>' +
				'<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="1"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				//'<w:ind w:left="-142" w:hanging="426" />' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +				
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', s1_1) +
				'</w:r>' +
				'<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ης</w:t></w:r>' +
				'<w:r>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				util.format('<w:t xml:space="preserve">%s</w:t>', s1_2) +
				'</w:r>' +
				'</w:p>' +
				'<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="1"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				//'<w:ind w:left="100" w:hanging="426" />' +
				'<w:jc w:val="both"/>' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +
				'</w:rPr>' +
				'</w:pPr>' +
				'<w:r w:rsidRPr="00F871E2">' +
				'<w:rPr>' +
				'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
				'<w:sz w:val="28" />' +
				'<w:szCs w:val="28" />' +				
				'</w:rPr>' +
				util.format('<w:t>%s</w:t>', s2) +
				'</w:r>' +
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
		// var ret = '<w:p w:rsidR="00A44D6F" w:rsidRDefault="00262B9D" w:rsidP="00CB4B70">' +
		// 	'<w:pPr>' +
		// 	'<w:spacing w:before="240"/>' +
		// 	'<w:jc w:val="both"/>' +
		// 	'<w:rPr>' +
		// 	'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
		// 	'<w:b/>' +
		// 	'<w:color w:val="000000"/>' +
		// 	'<w:u w:val="single"/>' +
		// 	'</w:rPr>' +
		// 	'</w:pPr>' +
		// 	'<w:r w:rsidRPr="00812A45">' +
		// 	'<w:rPr>' +
		// 	'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
		// 	'<w:b/>' +
		// 	'<w:color w:val="000000"/>' +
		// 	'<w:u w:val="single"/>' +
		// 	'</w:rPr>' +
		// 	'<w:t>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</w:t>' +
		// 	'</w:r>' +
		// 	'</w:p>' +
		// 	'<w:p w:rsidR="009344B1" w:rsidRDefault="009344B1" w:rsidP="009344B1">' +
		// 	'<w:pPr>' +
		// 	'<w:spacing w:before="240"/>' +
		// 	'<w:ind w:hanging="567"/>' +
		// 	'<w:jc w:val="both"/>' +
		// 	'<w:rPr>' +
		// 	'<w:rFonts w:ascii="Garamond" w:hAnsi="Garamond"/>' +
		// 	'<w:b/>' +
		// 	'<w:color w:val="000000"/>' +
		// 	'<w:u w:val="single"/>' +
		// 	'</w:rPr>' +
		// 	'</w:pPr>' +
		// 	'</w:p>' +
		return this.getAttachment1(body) +
			this.getAttachment2(body) +
			this.getAttachment3(body) +
			this.getAttachment4(body) +
			this.getAttachment5(body) +
			this.getAttachment6(body) +
			this.getAttachment7(body) +
			this.getAttachment8(body) +
			this.getAttachment9(body) +
			this.getAttachment10(body) +
			this.getAttachmentsForMonitoringCommittee(body)
	}

}