const helper = require('../../HelperMethods/helpermethods')
const util = require('util');
const common = require('./common')

// import { getWord } from '../../../HelperMethods/helpermethods'
//const align = 'left'
const align = 'both'
module.exports = {

	//Τεχνοπολις 2)  1)	Την με ΑΠ 162990/11.06.2019 Προγραμματική Σύμβαση και ειδικότερα το άρθρο 9 Πόροι - Εκταμίευση, αυτής
	getAttachment1: function (body) {

		var contractProtocolNumber = body.Contract[0].Protocol[0].Number
		var contractProtocolDate = body.Contract[0].Protocol[0].Date
		var DownpaymentLawArticle = body.Contract[0].DownpaymentLawArticle
		var contractTypeLabel = (body.Contract[0].ContractTypeId == 1 ? 'Δημόσια Σύμβαση Ανάθεσης' : 'Προγραμματική Σύμβαση')
		var rText = '';
		if (body.Contract[0].ContractTypeId == 1)
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
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:ind w:left="-142" w:hanging="426" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			'</w:p>'
	},
	getAttachment2: function (body) {
		var ret = '';
		if (body.DecisionBoard) {
			for (let index = 0; index < body.DecisionBoard.length; index++) {
				const element = body.DecisionBoard[index];

				if (element.ContentAccount) {
					var rText = util.format('Τη με αρ. %s/%s Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων ', element.ProtocolNumber, element.ProtocolDate)
					var lText = util.format('%s', element.ContentAccount)

					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:ind w:left="-142" w:hanging="426" />' +
						util.format('<w:jc w:val="%s"/>', align) +
						'</w:pPr>' +
						common.getrElement(rText) +
						common.getADAXml(element.ADA) +
						common.getrElement(lText) +
						'</w:p>'
				}
			}
		}
		return ret;
	},
	getAttachment3: function (body) {
		var ret = '';
		if (body.DecisionCoordinatorDecentrilizedAdministration) {
			for (let index = 0; index < body.DecisionCoordinatorDecentrilizedAdministration.length; index++) {
				const element = body.DecisionCoordinatorDecentrilizedAdministration[index];
				var rText = util.format('Τη με Α.Π. %s/%s Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής ', element.ProtocolNumber, element.ProtocolDate);
				var lText = util.format('%s %s A.Δ.Σ.', element.ActionAccount, element.DecisionBoardProtocol);

				ret += '<w:p>' +
					'<w:pPr>' +
					'<w:numPr>' +
					'<w:ilvl w:val="0"/>' +
					'<w:numId w:val="2"/>' +
					'</w:numPr>' +
					'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:ind w:left="-142" w:hanging="426" />' +
					util.format('<w:jc w:val="%s"/>', align) +
					'</w:pPr>' +
					common.getrElement(rText) +
					common.getADAXml(element.ADA) +
					common.getrElement(lText) +
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
				var rText = util.format('Τη με αρ. %s/%s Πράξη του %s Κλιμακίου του Ελεγκτικού Συνεδρίου %s.',
					element.ProtocolNumber,
					element.ProtocolYear,
					element.ScaleNumber,
					element.ContentAccount ? element.ContentAccount : '')

				ret += '<w:p>' +
					'<w:pPr>' +
					'<w:numPr>' +
					'<w:ilvl w:val="0"/>' +
					'<w:numId w:val="2"/>' +
					'</w:numPr>' +
					'<w:spacing w:line="276" w:lineRule="auto"/>' +
					'<w:ind w:left="-142" w:hanging="426" />' +
					util.format('<w:jc w:val="%s"/>', align) +
					'</w:pPr>' +
					common.getrElement(rText) +
					'</w:p>'
			}
		}
		return ret;
	},
	getAttachment5: function (body) {
		//Tη με αρ. Α01197/254432/08-10-2019 ΕΑΔ 1196 (ΑΔΑ 6ΡΗ5Ω6Μ-ΨΗΚ) Απόφαση Ανάληψης Υποχρέωσης 
		var ret = '';
		if (body.AAY) {
			for (let index = 0; index < body.AAY.length; index++) {
				const element = body.AAY[index];
				if (element.Type == 0) {
					var rText = util.format('Tη με αρ. %s/%s Πρόταση Ανάληψης Υποχρέωσης.', element.ProtocolNumber, element.ProtocolDate);
					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:ind w:left="-142" w:hanging="426" />' +
						util.format('<w:jc w:val="%s"/>', align) +
						'</w:pPr>' +
						common.getrElement(rText) +
						'</w:p>'
				} else if (element.Type == 1 || element.Type == 2) {
					var rText = util.format('Tη με αρ. %s/%s/%s ΕΑΔ %s ', element.Value, element.ProtocolNumber, element.ProtocolDate, element.EadNumber);
					var lText = 'Απόφασης Ανάληψης Υποχρέωσης';
					if (element.Type == 2)
						lText += ' (διάφορα έξοδα ΠΟΕ)';
					lText += '.';

					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:ind w:left="-142" w:hanging="426" />' +
						util.format('<w:jc w:val="%s"/>', align) +
						'</w:pPr>' +
						common.getrElement(rText) +
						common.getADAXml(element.ADA) +
						common.getrElement(lText) +
						'</w:p>'
				} else if (element.Type == 3) {
					var rText = util.format('Tη υπ΄ αριθμ. %s/%s ', element.ProtocolNumber, element.ProtocolDate);
					var lText = util.format('(παρ.2 άρθρο 4 ΠΔ 80/2016), της %s Α.Α.Υ. ', element.Overthrow)
					ret += '<w:p>' +
						'<w:pPr>' +
						'<w:numPr>' +
						'<w:ilvl w:val="0"/>' +
						'<w:numId w:val="2"/>' +
						'</w:numPr>' +
						'<w:spacing w:line="276" w:lineRule="auto"/>' +
						'<w:ind w:left="-142" w:hanging="426" />' +
						util.format('<w:jc w:val="%s"/>', align) +
						'</w:pPr>' +
						common.getrElement(rText) +
						common.getADAXml(element.ADA) +
						common.getBoldText('ΑΠΟΦΑΣΗ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ ') +
						common.getrElement(lText) +
						'</w:p>'
				}
			}
		}

		return ret;
	},
	getAttachment6: function (body) {

		//12.	Το με Α.Π. 071886/1-04-2020 διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. Σειρά Γ 28/31-03-2020 
		//Τιμολόγιο της Δ.Α.Ε.Μ. Α.Ε.,
		if (body.Account[0].Invoice) {
			var rText = '';
			if (body.Account[0].Invoice[0].DeliveredDate) {
				rText = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s στης %s.',
					body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
					body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
					body.Account[0].Invoice[0].Number,
					body.Account[0].Invoice[0].Date,
					body.Contract[0].Concessionaire[0].Name,
					body.Account[0].Invoice[0].DeliveredDate)
			} else {
				rText = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s',
					body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
					body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
					body.Account[0].Invoice[0].Number,
					body.Account[0].Invoice[0].Date,
					body.Contract[0].Concessionaire[0].Name)
			}


			return '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
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

			return '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				'</w:p>'
		}
	},
	getAttachment8: function (body) {
		// Το από 29-3-2019 Πρωτόκολλο Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής

		var DeliveryGoodsDate = body.DeliveryGoodsDate;
		if (DeliveryGoodsDate) {
			var rText = util.format('Δύο (2) πρωτότυπα του από %s Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.',
				DeliveryGoodsDate)

			return '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				'</w:p>';
		}
	},
	getAttachment9: function (body) {

		var prototypesPhrase = 'πρωτότυπα';
		if (body.PrototypeNumber === '1')
			prototypesPhrase = 'πρωτότυπο'
		var rText = 'Τέσσερα (4) πρωτότυπα του 1ου Λογαριασμού.';
		return '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:ind w:left="-142" w:hanging="426" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			'</w:p>';
	},
	getAttachment10: function (body) {
		if (body.Contract && body.Contract[0].Protocol[0]) {
			var rText = util.format('<w:t>Ενημερωτικός Πίνακας της με Α.Π. %s/%s Προγραμματικής Σύμβασης.</w:t>', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date);
			return '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
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
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				'<w:ind w:left="-142" w:hanging="426" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
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
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
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
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				'</w:p>' +
				'<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="1"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				//'<w:ind w:left="-142" w:hanging="426" />' +
				util.format('<w:jc w:val="%s"/>', align) +
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
				'<w:spacing w:line="276" w:lineRule="auto"/>' +
				util.format('<w:jc w:val="%s"/>', align) +
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

// '<w:tabs>' +
			// '<w:tab w:val="left" w:pos="142"/>' +
			// '<w:tab w:val="left" w:pos="284"/>' +
			// '<w:tab w:val="left" w:pos="6195"/>' +
			// '</w:tabs>' +