const helper = require('../../HelperMethods/helpermethods')
const util = require('util');
const common = require('./common');
const align = 'both';

function addArrayItem(inputDates, item, label) {
	if (item) {
		for (let index = 0; index < item.length; index++) {
			var protocolDate = item[index].ProtocolDate;

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
function getAttachmentsInOrder(body) {
	var ret = '';
	var inputDates = setArrayWithProtocolDates(body);

	for (let index = 0; index < inputDates.length; index++) {
		const element = inputDates[index];
		if (element[0] === 'AAY')
			ret += getAttachmentAAY(body, element[1]);
		else if (element[0] === 'Invoice')
			ret += getAttachmentInvoice(body, element[1]);
		else if (element[0] === 'WorkConfirmationDate')
			ret += getAttachmentWorkConfirmationDate(body, element[1]);
		else if (element[0] === 'DeliveryGoodsDate')
			ret += getAttachmentDeliveryGoodsDate(body, element[1]);
		else if (element[0] === 'ADR')
			ret += getAuthorDocumentedRequest(body, element[1]);
		else if (element[0] === 'SnippetPractical')
			ret += getSnippetPracticalAttachment(body, element[1]);
		else if (element[0] === 'EconomicalCommittee')
			ret += getAttachmentsForEconomicalCommittee(body, element[1]);
	}

	return ret;
}
function getAttachment1(body) {

	// gdpr first --> Πρωτότυπο και φωτοαντίγραφο της με Α.Π. 260100/17-10-2018 Προγραμματικής Σύμβασης
	// 6ος) Δύο (2) φωτ/φα της με Α.Π. 93942/30-3-2017 Δημόσιας Σύμβασης Ανάθεσης.   
	// τεχνοπολις --> 1)	Δύο (2) φωτοαντίγραφα της Προγραμματικής Σύμβασης με ΑΠ 162990/11.06.2019

	var contractProtocolNumber = body.Contract[0].Protocol[0].Number;
	var contractProtocolDate = body.Contract[0].Protocol[0].Date;
	var contractId = body.Contract[0].ContractId;
	var contractTypeLabel = (contractId == 1 ? 'Δημόσιας Σύμβασης Ανάθεσης' : 'Προγραμματικής Σύμβασης');
	var accountNo = body.Account[0].No;

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
		'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
		util.format('<w:jc w:val="%s"/>', align) +
		'</w:pPr>' +
		common.getrElement(rText) +
		common.enterLine() +
		'</w:p>'
}
function getAttachmentDecisionBoard(body) {
	var ret = '';

	if (body.DecisionBoard) {
		for (let index = 0; index < body.DecisionBoard.length; index++) {
			const element = body.DecisionBoard[index];
			var rText = util.format("%s της υπ' αριθ. %s/%s ", helper.getCopiesPhrase(element), element.ProtocolNumber, element.ProtocolDate);
			var lText = util.format('Απόφασης του Δημοτικού Συμβουλίου %s', (element.ContentTransmission ? element.ContentTransmission : ''));

			ret += '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.getADAXml(element.ADA) +
				common.getrElement(lText) +
				common.enterLine() +
				'</w:p>'
		}
	}

	return ret
}
function getAttachmentDecisionCoordinatorDecentrilizedAdministration(body) {
	var ret = '';
	if (body.DecisionCoordinatorDecentrilizedAdministration) {
		for (let index = 0; index < body.DecisionCoordinatorDecentrilizedAdministration.length; index++) {
			const element = body.DecisionCoordinatorDecentrilizedAdministration[index];

			var rText = util.format('%s της με Α.Π. %s/%s Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής ',
				helper.getCopiesPhrase(element),
				element.ProtocolNumber, element.ProtocolDate);
			var lText = util.format('%s %s Α.Δ.Σ.', element.ActionTransmission, element.DecisionBoardProtocol);
			if (element.APDA_ProtocolNumber)
				lText += util.format('(Α.Π.Δ.Α. %s/%s)', element.APDA_ProtocolNumber, element.APDA_ProtocolDate);

			ret += '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.getADAXml(element.ADA) +
				common.getrElement(lText) +
				common.enterLine() +
				'</w:p>'
		}
	}
	return ret;
}
function getAttachmentCourtOfAuditors(body) {
	var ret = '';
	if (body.CourtOfAuditors) {
		for (let index = 0; index < body.CourtOfAuditors.length; index++) {
			const element = body.CourtOfAuditors[index];
			var rText = util.format('%s της Κοινοποίησης της με αρ. %s/%s Πράξης του %s Κλιμακίου του Ελεγκτικού Συνεδρίου',
				helper.getCopiesPhrase(element),
				element.ProtocolNumber,
				element.ProtocolYear,
				element.ScaleNumber)

			if (element.APDA_ProtocolNumber)
				rText += util.format('(Α.Π.Δ.Α. %s/%s)', element.APDA_ProtocolNumber, element.APDA_ProtocolDate);

			ret += '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.enterLine() +
				'</w:p>'
		}
	}

	return ret;
}
function getAttachmentAAY(body, protocolDate) {

	// Πρωτότυπο και φωτοαντίγραφο της με αριθμ. Α01197/254432/08-10-2019 ΕΑΔ 1196 (ΑΔΑ 6ΡΗ5Ω6Μ-ΨΗΚ) Απόφασης Ανάληψης Υποχρέωσης 
	// Πρωτότυπο και φωτοαντίγραφο της υπ΄ αριθμ. 333293/31-12-2019 (ΑΔΑ ΨΘΡΨΩ6Μ-Λ3Υ) ΑΠΟΦΑΣΗΣ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ (παρ.2 άρθρο 4 ΠΔ 80/2016), της Α01197/2019 Α.Α.Υ. 
	var ret = '';
	if (body.AAY) {
		var element;
		for (let index = 0; index < body.AAY.length; index++) {
			if (body.AAY[index].ProtocolDate === protocolDate)
				element = body.AAY[index]
		}

		if (element.Type == 0) {
			var rText = util.format("Πρωτότυπο και φωτοαντίγραφο με %s/%s Πρότασης Ανάληψης Υποχρεώσης", element.ProtocolNumber, element.ProtocolDate);
			ret += '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				'</w:p>'
		} else if (element.Type == 1 || element.Type == 2) {
			var rText = util.format("Πρωτότυπο και φωτοαντίγραφο της με αριθμ. %s/%s/%s ΕΑΔ %s ", element.Value, element.ProtocolNumber, element.ProtocolDate, element.EadNumber);
			var lText = 'Απόφασης Ανάληψης Υποχρέωσης.'
			ret += '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.getADAXml(element.ADA) +
				common.getrElement(lText) +
				common.enterLine() +
				'</w:p>'
		} else if (element.Type == 3) {
			var rText = util.format("Πρωτότυπο και φωτοαντίγραφο της υπ΄ αριθμ. %s/%s ", element.Value, element.ProtocolNumber, element.ProtocolDate);
			var lText = util.format('(παρ.2 άρθρο 4 ΠΔ 80/2016), της %s Α.Α.Υ. ', element.Overthrow)
			ret += '<w:p>' +
				'<w:pPr>' +
				'<w:numPr>' +
				'<w:ilvl w:val="0"/>' +
				'<w:numId w:val="2"/>' +
				'</w:numPr>' +
				'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
				util.format('<w:jc w:val="%s"/>', align) +
				'</w:pPr>' +
				common.getrElement(rText) +
				common.getADAXml(element.ADA) +
				common.getBoldText('ΑΠΟΦΑΣΗ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ ') +
				common.getrElement(lText) +
				common.enterLine() +
				'</w:p>'
		}
		// }
		return ret;
	}
}
function getAttachmentInvoice(body) {
	// 3.	Πρωτότυπο & φωτ/φο του με αριθμ. {a_in}/{a_id} Τιμολογίου Παροχής Υπηρεσιών της {c_conc}
	var ret = ''
	if (body.Account[0].Invoice) {
		var rText = '';
		if (body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number)
			rText = util.format('Το με Α.Π. %s/%s διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. %s/%s Τιμολόγιο της %s %s.',
				body.Account[0].Invoice[0].DeliveredDateProtocol[0].Number,
				body.Account[0].Invoice[0].DeliveredDateProtocol[0].Date,
				body.Account[0].Invoice[0].ProtocolNumber,
				body.Account[0].Invoice[0].ProtocolDate,
				body.Contract[0].Concessionaire[0].Name,
				body.Account[0].Invoice[0].DeliveredDate ? util.format('στης %s', body.Account[0].Invoice[0].DeliveredDate) : '')
		else
			rText = util.format('Το υπ΄ αρίθμ %s/%s τιμολόγιο του δικαιούχου %s και φωτοαντίγραφο του', body.Account[0].Invoice[0].Number,
				body.Account[0].Invoice[0].Date, body.Contract[0].Concessionaire[0].Name)

		ret += '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:spacing w:before="1" w:after="1" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'
	}

	return ret;
}
function getAttachmentWorkConfirmationDate(body) {
	//4.	Δύο (2) πρωτότυπα της από {dcd} Βεβαίωσης Έργου του Τμήματος {dep_name_lower} της Διεύθυνσης {dir_name_lower} αναφορικά με την υλοποίηση της Σύμβασης από την {c_conc} κατά το χρονικό διάστημα από {a_sd} έως και {a_ed}.
	var ret = '';
	var workConfirmationDate = body.WorkConfirmationDate;
	var directionNameLower = body.Direction[0].NameInLower;
	var departmentNameLower = body.Direction[0].Department[0].NameInLower;
	var concessionaireName = body.Contract[0].Concessionaire[0].Name;
	var start = body.Account[0].Start;
	var end = body.Account[0].End;

	if (workConfirmationDate) {
		var rText = util.format('Δύο (2) πρωτότυπα της από %s Βεβαίωσης Έργου του Τμήματος %s της Διεύθυνσης %s αναφορικά με την υλοποίηση της Σύμβασης από την %s κατά το χρονικό διάστημα από %s έως και %s.',
			workConfirmationDate,
			departmentNameLower,
			directionNameLower,
			concessionaireName,
			start,
			end)

		ret += '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'
	}
	return ret;
}
function getAttachmentDeliveryGoodsDate(body) {
	//Δύο (2) πρωτότυπα του από {ddg} Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.
	var ret = '';

	var DeliveryGoodsDate = body.DeliveryGoodsDate;
	if (DeliveryGoodsDate) {
		var rText = util.format('Δύο (2) πρωτότυπα του από %s Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.',
			DeliveryGoodsDate)

		ret += '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'
	}

	return ret
}
function getAuthorDocumentedRequest(body, protocolDate) {
	//Πρωτότυπο και φωτοαντίγραφο του  υπ' αριθ. 245924/27-09-2019 Τεκμηριωμένου Αιτήματος του Διατάκτη		
	var rText = util.format("Πρωτότυπο και φωτοαντίγραφο του  υπ' αριθ. %s/%s Τεκμηριωμένου Αιτήματος του Διατάκτη.", body.ARD)
	var ret = '';

	if (body.ADR) {
		var element;
		for (let index = 0; index < body.ADR.length; index++) {
			if (body.ADR[index].ProtocolDate === protocolDate)
				element = body.ADR[index];
		}

		var rText = util.format("%s της με αριθμ. %s/%s",
			helper.getCopiesPhrase(element),
			element.ProtocolNumber,
			element.ProtocolDate);
		var lText = ' Τεκμηριωμένου Αιτήματος του Διατάκτη';
		ret += '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			//'<w:spacing w:line="276" w:lineRule="auto"/>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.getADAXml(element.ADA) +
			common.getrElement(lText) +
			common.enterLine() +
			'</w:p>'
	}

	return ret;
}
function getAttachmentPrototypes(body) {
	var rText = util.format('Τέσσερα (4) πρωτότυπα του %s', body.Account[0].No)
	return '<w:p>' +
		'<w:pPr>' +
		'<w:numPr>' +
		'<w:ilvl w:val="0"/>' +
		'<w:numId w:val="2"/>' +
		'</w:numPr>' +
		'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
		util.format('<w:jc w:val="%s"/>', align) +
		'</w:pPr>' +
		common.getrElement(rText) +
		'<w:r><w:rPr><w:vertAlign w:val="superscript"/><w:lang w:val="el-GR"/></w:rPr><w:t>ου</w:t></w:r>' +
		common.getrElement(' Λογαριασμού') +
		common.enterLine() +
		'</w:p>';

}
function getSnippetPracticalAttachment(body, protocolDate) {
	// Το από 11 Φεβρουαρίου 2019 Απόσπασμα Πρακτικού ΔΣ 3/11-02-2019 της ΔΑΕΜ Α.Ε. περί έγκρισης σύναψης Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της 108/31-01-2019 ΑΔΣ
	var ret = '';
	if (body.SnippetPractical) {

		var element;
		for (let index = 0; index < body.SnippetPractical.length; index++) {
			if (body.SnippetPractical[index].ProtocolDate === protocolDate)
				element = body.SnippetPractical[index];
		}

		var rText = util.format("Το από %s Απόσπασμα Πρακτικού ΔΣ %s/%s της %s περί έγκρισης σύναψης Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της %s.",
			helper.getDateString(element.ProtocolDate), element.ProtocolNumber, element.ProtocolDate, body.Contract[0].Concessionaire[0].Name, element.DecisionBoardProtocol);
		ret += '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>'
	}

	return ret;
}
function getAttachmentInformativeArray(body) {
	if (body.Contract[0].HasDownpayment && body.Account[0].No) {
		var rText = util.format('<w:t>Ενημερωτικός Πίνακας της με Α.Π. %s/%s Προγραμματικής Σύμβασης.</w:t>', body.Contract[0].Protocol[0].Number, body.Contract[0].Protocol[0].Date);
		return '<w:p>' +
			'<w:pPr>' +
			'<w:numPr>' +
			'<w:ilvl w:val="0"/>' +
			'<w:numId w:val="2"/>' +
			'</w:numPr>' +
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.enterLine() +
			'</w:p>';
	}
}
function getAttachmentsForEconomicalCommittee(body, protocolDate) {
	var ret = '';

	if (body.EconomicalCommittee) {

		var element;
		for (let index = 0; index < body.EconomicalCommittee.length; index++) {
			if (body.EconomicalCommittee[index].ProtocolDate === protocolDate)
				element = body.EconomicalCommittee[index];
		}
		var rText = util.format("%s της υπ' αριθ. %s/%s ",
			helper.getCopiesPhrase(element),
			element.ProtocolNumber,
			element.ProtocolDate);
		var lText = util.format('Πράξης της Οικονομικής Επιτροπής %s.', body.Account[0].EconomicalCommittee[0].Content ? body.Account[0].EconomicalCommittee[0].Content : '');

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
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(rText) +
			common.getADAXml(element.ADA) +
			common.getrElement(lText) +
			common.enterLine() +
			'</w:p>';
	}

	return ret;
}
function getAttachmentsForMonitoringCommittee(body) {
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
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
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
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
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
			'<w:spacing w:line="276" w:lineRule="auto"/>' +
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
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
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
			'<w:spacing w:before="113" w:after="113" w:line="276" w:lineRule="auto" />' +
			util.format('<w:jc w:val="%s"/>', align) +
			'</w:pPr>' +
			common.getrElement(s2) +
			'</w:p>'
	}
	return ret;
}

function getAttachmentsXmlValue(body) {
	var ret = '<w:p>' +
		'<w:pPr>' +
		'<w:spacing w:before="240"/>' +
		'<w:jc w:val="both"/>' +
		'<w:rPr>' +
		'<w:b/>' +
		'<w:color w:val="000000"/>' +
		'<w:u w:val="single"/>' +
		'</w:rPr>' +
		'</w:pPr>' +
		'<w:r>' +
		'<w:rPr>' +
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
		'<w:b/>' +
		'<w:color w:val="000000"/>' +
		'<w:u w:val="single"/>' +
		'</w:rPr>' +
		'</w:pPr>' +
		'</w:p>' +
		getAttachment1(body) +
		getAttachmentDecisionBoard(body) +
		getAttachmentDecisionCoordinatorDecentrilizedAdministration(body) +
		getAttachmentCourtOfAuditors(body) +
		getAttachmentsInOrder(body) +
		getAttachmentPrototypes(body) +
		getAttachmentInformativeArray(body) +
		getAttachmentsForMonitoringCommittee(body)

	return ret;
}

module.exports = {
	getAttachmentsXmlValue
}