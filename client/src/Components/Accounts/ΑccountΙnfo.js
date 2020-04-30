/* eslint-disable eqeqeq */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import NumberFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay'

import {
	getAmountInWords, getHostUrl, getDateFormat, getDateFormatForDocument, getDateFormatWithDash,
	extractYearFromDate, getValidMaterialDateFormat, getFpaLabel,
	getServerErrorResponseMessage
} from '../../Helper/helpermethods';
import store from '../../Redux/Store/store'
import MySnackbar from '../Common/MySnackbar';
import { getFooterTemplate, showGenericMessage } from '../Common/templates'
import Body from '../../HOC/Body/body';
import { Scrollbars } from 'react-custom-scrollbars';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';

var downloadjs = require('downloadjs');
var currencyFormatter = require('currency-formatter');
const format = require('string-format')

const useStyles = {
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	category: {
		padding: '5px',
		background: '#DEEFF5'
	},
	distanceBetweenValues: {
		marginLeft: '30px'
	},
	reservationsStyle: {}
};

var paidAmountPureUntilToday = 0;
var paidAmountFpaUntilToday = 0;
var paidAmountTotalUntilToday = 0;
var cantComputeRemainContractAmount = false;
class AccountInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openMessage: false,
			message: '',
			variant: '',
			submitButtonDisabled: false,
			navigateToEditAccount: false,
		}

		this.editAccount = this.editAccount.bind(this);
		this.createDocument1 = this.createDocument1.bind(this);
		this.createDocument2 = this.createDocument2.bind(this);
	}

	// componentDidMount() {
	// 	this.props.getAccount(this.props.token.data.token, this.props.contractId, this.props.accountNumber)
	// }
	handleClose = (event, reason) => {
		this.setState({ openMessage: false });
	}
	editAccount(e) {
		this.setState({ navigateToEditAccount: true });
	}
	navigateToEditAccountForm(contractDetails, accountDetails) {			
		return <Redirect push to={{
			pathname: '/newaccount',
			state: {
				ContractId: contractDetails.Id,
				ContractTitle: contractDetails.Title,
				ContractTypeId: contractDetails.ContractTypeId,
				isDownpayment: contractDetails.HasDownPayment && accountDetails.Number == 1,
				isEdit: true,
				DownpaymentLawArticle: accountDetails.DownpaymentLawArticle,
				AccountId: accountDetails.Id,
				AccountNumber: accountDetails.Number,
				cc: accountDetails.cc ? accountDetails.cc : [],
				DocumentDate: accountDetails.DocumentDate ? getValidMaterialDateFormat(accountDetails.DocumentDate) : '',
				Start: accountDetails.Start ? getValidMaterialDateFormat(accountDetails.Start) : '',
				End: accountDetails.End ? getValidMaterialDateFormat(accountDetails.End) : '',
				AmountPure: accountDetails.AmountPure ? Number(accountDetails.AmountPure) : null,
				AmountFpa: accountDetails.AmountFpa ? Number(accountDetails.AmountFpa) : null,
				AmountTotal: accountDetails.AmountTotal ? Number(accountDetails.AmountTotal) : null,
				AmountFullWritten: accountDetails.AmountFullWritten ? accountDetails.AmountFullWritten : '',
				RemainAmountOfContract: accountDetails.RemainAmountOfContract ? accountDetails.RemainAmountOfContract : '',
				ProtocolNumber: accountDetails.ProtocolNumber ? accountDetails.ProtocolNumber : null,
				ProtocolDate: accountDetails.ProtocolDate ? getValidMaterialDateFormat(accountDetails.ProtocolDate) : '',
				FirstAccountProtocolNumber: accountDetails.FirstAccountProtocolNumber ? accountDetails.FirstAccountProtocolNumber : null,
				FirstAccountProtocolDate: accountDetails.FirstAccountProtocolDate ? getValidMaterialDateFormat(accountDetails.FirstAccountProtocolDate) : '',
				IsFirstOfTheYear: accountDetails.IsFirstOfTheYear ? accountDetails.IsFirstOfTheYear : false,
				WorkConfirmationDate: accountDetails.WorkConfirmationDate ? getValidMaterialDateFormat(accountDetails.WorkConfirmationDate) : '',
				DeliveryGoodsDate: accountDetails.DeliveryGoodsDate ? getValidMaterialDateFormat(accountDetails.DeliveryGoodsDate) : '',
				AayValue: accountDetails.aay && accountDetails.aay[0] && accountDetails.aay[0].Value ? accountDetails.aay[0].Value : '',
				AayADA: accountDetails.aay && accountDetails.aay[0] && accountDetails.aay[0].ADA ? accountDetails.aay[0].ADA : '',
				AayProtocolNumber: accountDetails.aay && accountDetails.aay[0] && accountDetails.aay[0].ProtocolNumber ? accountDetails.aay[0].ProtocolNumber : '',
				AayProtocolDate: accountDetails.aay && accountDetails.aay[0] && accountDetails.aay[0].ProtocolDate ? getValidMaterialDateFormat(accountDetails.aay[0].ProtocolDate) : '',
				AayEadNumber: accountDetails.aay && accountDetails.aay[0] && accountDetails.aay[0].EadNumber ? accountDetails.aay[0].EadNumber : '',
				AayPreviousYear: accountDetails.aay && accountDetails.aay[0] && accountDetails.aay[0].EadNumber ? accountDetails.aay[0].PreviousYear : '',
				InvoiceNumber: accountDetails.invoice && accountDetails.invoice[0] && accountDetails.invoice[0].Number ? accountDetails.invoice[0].Number : '',
				InvoiceDate: accountDetails.invoice && accountDetails.invoice[0] && accountDetails.invoice[0].Date ? getValidMaterialDateFormat(accountDetails.invoice[0].Date) : '',
				InvoiceDeliveredDate: accountDetails.invoice && accountDetails.invoice[0] && accountDetails.invoice[0].DeliveredDate ? accountDetails.invoice[0].DeliveredDate : '',
				InvoiceDeliveredDateProtocolNumber: accountDetails.invoice && accountDetails.invoice[0] && accountDetails.invoice[0].DeliveredDateProtocolNumber ? accountDetails.invoice[0].DeliveredDateProtocolNumber : '',
				InvoiceDeliveredDateProtocolDate: accountDetails.invoice && accountDetails.invoice[0] && accountDetails.invoice[0].DeliveredDateProtocolDate ? getValidMaterialDateFormat(accountDetails.invoice[0].DeliveredDateProtocolDate) : '',
				CC1Value1: accountDetails.cc && accountDetails.cc[0] && accountDetails.cc[0].CC1 ? accountDetails.cc[0].CC1 : '-1',
				CC1Value2: accountDetails.cc && accountDetails.cc[0] && accountDetails.cc[0].CC2 ? accountDetails.cc[0].CC2 : '-1',
				CC2Value1: accountDetails.cc && accountDetails.cc[1] && accountDetails.cc[1].CC1 ? accountDetails.cc[1].CC1 : '-1',
				CC2Value2: accountDetails.cc && accountDetails.cc[1] && accountDetails.cc[1].CC2 ? accountDetails.cc[1].CC2 : '-1',
				SignType1: accountDetails ? this.getSignatoryTypeId(accountDetails.documentsignatory, 1) : '-1',
				SignType2: accountDetails ? this.getSignatoryTypeId(accountDetails.documentsignatory, 3) : '-1',
				SignType3: accountDetails ? this.getSignatoryTypeId(accountDetails.documentsignatory, 2) : '-1',
				SignType4: accountDetails ? this.getSignatoryTypeId(accountDetails.documentsignatory, 4) : '-1',
				SignName1: accountDetails ? this.getSignatoryId(accountDetails.documentsignatory, 1) : '-1',
				SignName2: accountDetails ? this.getSignatoryId(accountDetails.documentsignatory, 3) : '-1',
				SignName3: accountDetails ? this.getSignatoryId(accountDetails.documentsignatory, 2) : '-1',
				SignName4: accountDetails ? this.getSignatoryId(accountDetails.documentsignatory, 4) : '-1',
				AbsenseOfDirector1: accountDetails ? this.getSignatoryAbsense(accountDetails.documentsignatory, 1) : false,
				AbsenseOfDirector2: accountDetails ? this.getSignatoryAbsense(accountDetails.documentsignatory, 2) : false,
				HasSecondDecisionBoard: accountDetails && accountDetails.decisionboard && accountDetails.decisionboard.length > 1 ? true : false,
				DecisionDS1Number: accountDetails && accountDetails.decisionboard ? accountDetails.decisionboard[0].ProtocolNumber : null,
				DecisionDS1ADA: accountDetails && accountDetails.decisionboard ? accountDetails.decisionboard[0].ADA : null,
				DecisionDS1Date: accountDetails && accountDetails.decisionboard ? accountDetails.decisionboard[0].ProtocolDate : null,
				DecisionDS2Number: accountDetails && accountDetails.decisionboard && accountDetails.decisionboard.length > 1 ? accountDetails.decisionboard[1].ProtocolNumber : null,
				DecisionDS2Date: accountDetails && accountDetails.decisionboard && accountDetails.decisionboard.length > 1 ? accountDetails.decisionboard[1].ProtocolDate : null,
				DecisionDS2Content: accountDetails && accountDetails.decisionboard && accountDetails.decisionboard.length > 1 ? accountDetails.decisionboard[1].Content : null,
				Decision1SADANumber: accountDetails && accountDetails.decisioncoordinatordecentrilizedadministration ? accountDetails.decisioncoordinatordecentrilizedadministration[0].ProtocolNumber : null,
				Decision1SADADate: accountDetails && accountDetails.decisioncoordinatordecentrilizedadministration ? accountDetails.decisioncoordinatordecentrilizedadministration[0].ProtocolDate : null,
				Decision2SADANumber: accountDetails && accountDetails.decisioncoordinatordecentrilizedadministration && accountDetails.decisioncoordinatordecentrilizedadministration.length > 1 ? accountDetails.decisioncoordinatordecentrilizedadministration[1].ProtocolNumber : null,
				Decision2SADADate: accountDetails && accountDetails.decisioncoordinatordecentrilizedadministration && accountDetails.decisioncoordinatordecentrilizedadministration.length > 1 ? accountDetails.decisioncoordinatordecentrilizedadministration[1].ProtocolDate : null,
				HasCourtOfAuditors: accountDetails && accountDetails.courtofauditors ? true : false,
				PraxisNumber: accountDetails && accountDetails.courtofauditors ? accountDetails.courtofauditors[0].ProtocolNumber : null,
				PraxisYear: accountDetails && accountDetails.courtofauditors ? accountDetails.courtofauditors[0].ProtocolYear : null,
				ScaleNumber: accountDetails && accountDetails.courtofauditors ? accountDetails.courtofauditors[0].ScaleNumber : null,
				APDANumber: accountDetails && accountDetails.courtofauditors ? accountDetails.courtofauditors[0].APDA_ProtocolNumber : null,
				APDADate: accountDetails && accountDetails.courtofauditors ? accountDetails.courtofauditors[0].APDA_ProtocolDate : null,
			}
		}} />
	}
	//#region documents info
	getDocumentsInfo(contractDetails, accountDetails) {
		return <>
			<Grid item>
				<Paper style={{ padding: '0px' }} square={true}>
					<Button variant="contained"
						style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
						disabled={this.state.submitButtonDisabled}
						onClick={this.editAccount}>
						<EditIcon />
						Επεξεργασία
          </Button>
					<Button variant="contained"
						style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
						disabled={this.state.submitButtonDisabled}
						onClick={this.createDocument1}>
						<SaveAltIcon />
						Δημιουργία αρχείου 'Διαβιβαστικό έγγραφο {accountDetails.Number}ου λογαριασμού.docx'
          </Button>
					<Button variant="contained"
						style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
						disabled={this.state.submitButtonDisabled}
						onClick={this.createDocument2}>
						<SaveAltIcon />
						Δημιουργία αρχείου '{accountDetails.Number}ος Λογαριασμός.docx'
          </Button>
				</Paper>
			</Grid>
			<Grid item>
				<Paper style={useStyles.category} square={true}>
					<Typography>
						<b>Στοιχεία εγγράφων</b>
					</Typography>
				</Paper>
			</Grid>
			<Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Ημερομηνία Εγγράφου: </b> {getDateFormat(accountDetails.DocumentDate)}
					</Typography>
				</Paper>
			</Grid>
		</>
	}
	//#endregion

	//#region create documents  
	getAAYDataToPost(accountDetails) {
		var AAY = (accountDetails.aay && accountDetails.aay.length > 0 ? accountDetails.aay[0] : {});
		var AAYValue = (AAY.Value || '');
		var AAYProtocolNumber = (AAY.ProtocolNumber || '');
		var AAYProtocolDate = (getDateFormatForDocument(AAY.ProtocolDate) || '');
		var AAYYear = extractYearFromDate(AAY.ProtocolDate)
		var AAYEadNumber = (AAY.EadNumber || '')
		var AAYPreviousYear = (AAY.PreviousYear || '')
		var AAYADA = (AAY.ADA || '')

		return [{
			Value: AAYValue,
			Year: AAYYear,
			ProtocolNumber: AAYProtocolNumber,
			ProtocolDate: AAYProtocolDate,
			EADNumber: AAYEadNumber,
			PreviousYearValue: AAYPreviousYear,
			ADA: AAYADA
		}]
	}
	getInvoiceDataToPost(accountDetails) {

		var Invoice = (accountDetails.invoice && accountDetails.invoice.length > 0 ? accountDetails.invoice[0] : {})
		var InvoiceNumber = (Invoice.Number || '')
		var InvoiceDate = (getDateFormatForDocument(Invoice.Date) || '')
		var InvoiceDeliveredDate = (getDateFormatForDocument(Invoice.DeliveredDate) || '')
		var InvoiceDeliveredDateProtocolNumber = (Invoice.DeliveredDateProtocolNumber || '')
		var InvoiceDeliveredDateProtocolDate = (getDateFormatForDocument(Invoice.DeliveredDateProtocolDate) || '')

		return [{
			Number: InvoiceNumber,
			Date: InvoiceDate,
			DeliveredDate: InvoiceDeliveredDate,
			DeliveredDateProtocol: [{ Number: InvoiceDeliveredDateProtocolNumber, Date: InvoiceDeliveredDateProtocolDate }]
		}]

	}

	getCCDataToPost(contractDetails, accountDetails) {

		var CC1 = accountDetails.cc[0];
		var CC2 = accountDetails.cc[1];

		var cc1Value = '';
		var cc2Value = '';

		var directionValue = '';
		var departmentValue = '';
		if (CC1 && CC1.cc1value1 && CC1.cc1value1[0])
			directionValue = format('Διεύθυνση {}', CC1.cc1value1[0].DirectionName)
		if (CC1 && CC1.cc1value2 && CC1.cc1value2[0] && CC1.cc1value2[0].DepartmentName)
			departmentValue = '-Τμήμα ' + CC1.cc1value2[0].DepartmentName
		cc1Value = format('{}{}', directionValue, departmentValue)

		directionValue = '';
		departmentValue = '';
		if (contractDetails.ContractTypeId == 1) {
			if (CC2 && CC2.cc2value1 && CC2.cc2value1[0])
				directionValue = format('Διεύθυνση {}', CC2.cc2value1[0].DirectionName)
			if (CC2 && CC2.cc2value2 && CC2.cc2value2[0] && CC2.cc2value2[0].DepartmentName)
				departmentValue = '-Τμήμα ' + CC2.cc2value2[0].DepartmentName
			cc2Value = format('{}{}', directionValue, departmentValue)
		}
		else {
			if (CC2 && CC2.ccagencyvalue && CC2.ccagencyvalue[0])
				cc2Value = CC2.ccagencyvalue[0].Name
		}

		return [{ CC1: cc1Value, CC2: cc2Value }]
	}

	getDecisionBoardValues() {
		let ret = undefined;
		// let ad = this.props.account;
		// let decisionDS1Number = (ad && ad.decisionboard ? ad.decisionboard[0].ProtocolNumber : null)
		// let decisionDS1Date = (ad && ad.decisionboard ? ad.decisionboard[0].ProtocolDate : null)

		// if (decisionDS1Number) {
		// 	ret = []
		// 	ret.push({ Number: decisionDS1Number, Date: getDateFormatForDocument(decisionDS1Date) })
		// 	if (ad && ad.decisionboard && ad.decisionboard.length > 1)
		// 		ret.push({ Number: ad.decisionboard[1].ProtocolNumber, Date: getDateFormatForDocument(ad.decisionboard[1].ProtocolDate), Content: ad.decisionboard[1].Content })
		// }
		// console.log('getDecisionBoardValues: ' + ret)
		return ret;
	}

	getDecisionSADAValues() {
		let ret = [];

		var ad = this.props.account;
		let Decision1SADANumber = (ad && ad.decisioncoordinatordecentrilizedadministration ? ad.decisioncoordinatordecentrilizedadministration[0].ProtocolNumber : null)
		let Decision1SADADate = (ad && ad.decisioncoordinatordecentrilizedadministration ? ad.decisioncoordinatordecentrilizedadministration[0].ProtocolDate : null)
		if (Decision1SADANumber) {
			ret.push({ Number: Decision1SADANumber, Date: getDateFormatForDocument(Decision1SADADate) })
			if (ad && ad.decisioncoordinatordecentrilizedadministration && ad.decisioncoordinatordecentrilizedadministration.length > 1)
				ret.push({ Number: ad.decisioncoordinatordecentrilizedadministration[1].ProtocolNumber, Date: getDateFormatForDocument(ad.decisioncoordinatordecentrilizedadministration[1].ProtocolDate) })
		}

		return ret;
	}

	getCourtOfAuditorsValues() {
		let ret = [];
		var accountDetails = this.props.account;
		ret.push({
			HasCourtOfAuditors: accountDetails.courtofauditors ? true : false,
			Action: [{ Number: accountDetails.courtofauditors ? accountDetails.courtofauditors[0].ProtocolNumber : null, Year: accountDetails.courtofauditors ? accountDetails.courtofauditors[0].ProtocolYear : null }],
			Scale: [{ Letter: accountDetails.courtofauditors ? accountDetails.courtofauditors[0].ScaleNumber : null }],
			APDA: [{ Number: accountDetails.courtofauditors ? accountDetails.courtofauditors[0].APDA_ProtocolNumber : null, APDADate: accountDetails.courtofauditors ? accountDetails.courtofauditors[0].APDA_ProtocolDate : null }],
		})

		return ret;
	}

	createDocument1(e) {
		e.preventDefault();

		this.setState({ submitButtonDisabled: true });

		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		var accountDetails = this.props.account;

		var firstAccountProtocol = ''
		if (accountDetails.firstprotocolinfo && accountDetails.firstprotocolinfo[0] && accountDetails.firstprotocolinfo[0].firstaccountprotocolnumber)
			firstAccountProtocol = format('{}/{}', accountDetails.firstprotocolinfo[0].firstaccountprotocolnumber, accountDetails.firstprotocolinfo[0].firstaccountprotocoldate)

		// eslint-disable-next-line eqeqeq
		var contractTypeName = (contractDetails.ContractTypeId == 1 ? 'Σύμβασης Δημόσιας Ανάθεσης' : 'Προγραμματικής Σύμβασης')
		var dirName, dirAddress, dirPostalCode, dirCity, depSupervisor, depTelephone, depEmail = '';
		if (contractDetails.direction && contractDetails.direction[0]) {
			dirName = contractDetails.direction[0].DirectionName;
			dirAddress = contractDetails.direction[0].DirectionAddress;
			dirPostalCode = contractDetails.direction[0].DirectionPostCode;
			dirCity = contractDetails.direction[0].DirectionCity;
			depSupervisor = contractDetails.department[0].DepartmentSupervisor;
			depTelephone = contractDetails.department[0].DepartmentTelephone;
			depEmail = contractDetails.department[0].DepartmentEmail;
		}

		var departmentName = contractDetails.department && contractDetails.department[0] ? contractDetails.department[0].DepartmentName : ''
		var dataToPost = {
			DocumentDate: getDateFormatWithDash(accountDetails.DocumentDate),
			WorkConfirmationDate: getDateFormatForDocument(accountDetails.WorkConfirmationDate),
			DeliveryGoodsDate: getDateFormatForDocument(accountDetails.DeliveryGoodsDate),
			Attachments2: [{ StartPhrase: accountDetails.IsFirstOfTheYear ? 'Πρωτότυπο και φωτ/φο' : 'Δύο (2) φωτ/φα' }], //if not the first account of this year then 'Δύο(2) φωτ/φα'
			Direction: [{
				Name: dirName ? dirName.toUpperCase() : '',
				NameInLower: dirName,
				Department: [{
					Name: departmentName ? departmentName.toUpperCase() : '',
					NameInLower: departmentName,
					Address: dirAddress,
					PostalCode: dirPostalCode,
					City: dirCity,
					Supervisor: [{ Name: depSupervisor, Tel: depTelephone, Email: depEmail }]
				}]
			}],
			CC: this.getCCDataToPost(contractDetails, accountDetails),
			Contract: [{
				ContractType: contractTypeName,
				Concessionaire: [{ Article: 'της', Name: contractDetails.ConcessionaireName, Afm: contractDetails.ConcessionaireAFM }],
				Title: [{ Article: 'τη', Value: contractDetails.Title }],
				Protocol: [{ Number: contractDetails.ProtocolNumber, Date: getDateFormatForDocument(contractDetails.ProtocolDate) }],
				Kae: contractDetails.KAE,
				Actor: contractDetails.Actor,
				CodeDirection: contractDetails.CodeDirection,
				Date: [{ Start: getDateFormatForDocument(contractDetails.Start), End: getDateFormatForDocument(contractDetails.End) }],
				Award: [{ Number: contractDetails.AwardNumber, Date: getDateFormatForDocument(contractDetails.AwardDate), Ada: contractDetails.AwardAda }],
				CPV: [{ Code: contractDetails.CpvCode, Title: contractDetails.CpvTitle }],
				Balance: currencyFormatter.format(Number(contractDetails.AmountTotal) - (Number(paidAmountTotalUntilToday) + Number(accountDetails.AmountTotal)), { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
			}],
			Account: [{
				Number: accountDetails.Number,
				NumberWord: this.getAccountNumberLex(accountDetails.Number),
				LastMessage: (accountDetails.Number == contractDetails.NumberOfAccounts ? '(και τελευταίου)' : ''),
				Start: getDateFormatForDocument(accountDetails.Start),
				End: getDateFormatForDocument(accountDetails.End),
				Amount: currencyFormatter.format(accountDetails.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				Invoice: this.getInvoiceDataToPost(accountDetails),
				AYY: this.getAAYDataToPost(accountDetails),
				FirstAccountProtocol: firstAccountProtocol
			}],
			DecisionDS: [{
				Protocol: this.getDecisionBoardValues()
			}],
			DecisionSADA: [{
				Protocol: this.getDecisionSADAValues()
			}],
			CourtOfAuditors: this.getCourtOfAuditorsValues(),
			Signature: [{
				SignatoryTitle: accountDetails.documentsignatory[3].signatorytype[0].Name,
				Kaa: accountDetails.documentsignatory[3].Absense ? 'κ.κ.α' : '',
				SignatoryName: accountDetails.documentsignatory[3].signatory[0].Name
			}]
		};

		var config = {
			headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: 'Bearer ' + this.props.token.data.token },
			responseType: 'arraybuffer'
		};

		if (contractDetails.HasDownPayment && accountDetails.Number == 1) {
			axios.post(getHostUrl() + '/getDownpaymentTransmissionWordDocument', dataToPost, config)
				.then(res => {
					var blob = new Blob([res.data]);
					var fileName = 'ΔΙΑΒΙΒΑΣΤΙΚΟ ΕΓΓΡΑΦΟ ' + accountDetails.Number + 'ου ΛΟΓΑΡΙΑΣΜΟΥ (ΠΡΟΚΑΤΑΒΟΛΗ).docx';
					downloadjs(blob, fileName, 'application/octet-stream');
					this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
				}).catch(error => {
					this.setState({ message: <><div>Αποτυχής προσπάθεια δημιουργίας αρχείου!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
				})
		}
		else {
			axios.post(getHostUrl() + '/diavlog', dataToPost, config)
				.then(res => {
					var blob = new Blob([res.data]);
					var fileName = 'ΔΙΑΒΙΒΑΣΤΙΚΟ ΕΓΓΡΑΦΟ ' + accountDetails.Number + 'ου ΛΟΓΑΡΙΑΣΜΟΥ (ΠΡΟΚΑΤΑΒΟΛΗ).docx';
					downloadjs(blob, fileName, 'application/octet-stream');
					this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
				}).catch(error => {
					this.setState({ message: <><div>Αποτυχής προσπάθεια δημιουργίας αρχείου!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
				})
		}
	}

	createDocument2(e) {
		e.preventDefault();

		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		var accountDetails = this.props.account;

		this.setState({ submitButtonDisabled: true });

		var contractTypeValue1 = (contractDetails.ContractTypeId === "1" ? 'Σύμβασης Δημόσιας Ανάθεσης' : 'Προγραμματικής Σύμβασης')
		var contractTypeValue2 = (contractDetails.ContractTypeId === "1" ? 'Δημόσιας' : 'Προγραμματικής')

		var WriterTitle = '';
		var WriterName = '';
		var ForemanDepartmentTitle = '';
		var ForemanDepartmentName = '';
		var ForemanDirectionTitle = '';
		var ForemanDirectionName = '';
		var ForemanDirectionAbsense = '';

		if (accountDetails.documentsignatory) {
			for (let index = 0; index < accountDetails.documentsignatory.length; index++) {
				const documentSignatory = accountDetails.documentsignatory[index];

				if (documentSignatory.signatorytype[0].Id === 1 || documentSignatory.signatorytype[0].Id === 2) {
					WriterTitle = documentSignatory.signatorytype[0].Name
					WriterName = documentSignatory.signatory[0].Name;
				} else if (documentSignatory.signatorytype[0].Id === 3 || documentSignatory.signatorytype[0].Id === 4) {
					ForemanDirectionAbsense = documentSignatory.Absense ? 'κ.α.α' : '';
					ForemanDirectionTitle = documentSignatory.signatorytype[0].Name;
					ForemanDirectionName = documentSignatory.signatory[0].Name;
				} else if (documentSignatory.signatorytype[0].Id === 5 || documentSignatory.signatorytype[0].Id === 6) {
					ForemanDepartmentTitle = documentSignatory.signatorytype[0].Name
					ForemanDepartmentName = documentSignatory.signatory[0].Name;
				}
			}
		}

		var dirName = '';
		if (contractDetails.direction && contractDetails.direction[0]) {
			dirName = contractDetails.direction[0].DirectionName;
		}
		var depName = contractDetails.department && contractDetails.department[0] ? contractDetails.department[0].DepartmentName : ''
		var dataToPost = {
			BudgetExpenditureYear: new Date(accountDetails.DocumentDate).getFullYear(),
			DocumentDate: getDateFormatWithDash(accountDetails.DocumentDate),
			WorkConfirmationDate: getDateFormatForDocument(accountDetails.WorkConfirmationDate),
			DeliveryGoodsDate: getDateFormatForDocument(accountDetails.DeliveryGoodsDate),
			Direction: [{
				Name: dirName.toUpperCase(),
				NameInLower: dirName,
				Department: [{ Name: depName.toUpperCase(), NameInLower: depName }]
			}],
			Contract: [{
				ContractTypeValue1: contractTypeValue1,
				ContractTypeValue2: contractTypeValue2,
				Concessionaire: [{ Article: 'THN', Name: contractDetails.ConcessionaireName }],
				Title: [{ Article: 'τη', Value: contractDetails.Title }],
				Protocol: [{ Number: contractDetails.ProtocolNumber, Date: getDateFormatForDocument(contractDetails.ProtocolDate) }],
				Kae: contractDetails.KAE,
				Actor: contractDetails.Actor,
				CodeDirection: contractDetails.CodeDirection,
				AmountPure: currencyFormatter.format(contractDetails.AmountPure, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				AmountFpa: currencyFormatter.format(contractDetails.AmountFpa, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				AmountTotal: currencyFormatter.format(contractDetails.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				PaidAmountPureUntilToday: currencyFormatter.format(paidAmountPureUntilToday, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				PaidAmountFpaUntilToday: currencyFormatter.format(paidAmountFpaUntilToday, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				PaidAmountTotalUntilToday: currencyFormatter.format(paidAmountTotalUntilToday, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				FpaValue: format('{}%', contractDetails.FpaValue)
			}],
			Account: [{
				Number: accountDetails.Number,
				AmountPure: currencyFormatter.format(accountDetails.AmountPure, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				AmountFpa: currencyFormatter.format(accountDetails.AmountFpa, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				AmountTotal: currencyFormatter.format(accountDetails.AmountTotal, { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				AmountInWords: getAmountInWords(accountDetails.AmountTotal, false),
				AmountInWordsCapital: getAmountInWords(accountDetails.AmountTotal, true),
				Start: getDateFormatForDocument(accountDetails.Start),
				End: getDateFormatForDocument(accountDetails.End),
				Invoice: this.getInvoiceDataToPost(accountDetails),
				AYY: this.getAAYDataToPost(accountDetails),
				Reservations: this.getReservationsToPost(accountDetails.AmountPure),
				MixedRemainApproval: currencyFormatter.format(Number(contractDetails.AmountTotal) - (Number(paidAmountTotalUntilToday) + Number(accountDetails.AmountTotal)), { symbol: '€', decimal: ',', thousand: '.', precision: 2, format: '%v%s' }),
				DownpaymentLawArticle: accountDetails.DownpaymentLawArticle
			}],
			Accounts: contractDetails.createdaccounts,
			DecisionBoard: [{
				Protocol: this.getDecisionBoardValues()
			}],
			DecisionSADA: [{
				Protocol: this.getDecisionSADAValues()
			}],
			CourtOfAuditors: this.getCourtOfAuditorsValues(),
			Signature: [
				{
					Kaa: ForemanDirectionAbsense,
					WriterTitle: WriterTitle,
					WriterName: WriterName,
					ForemanDepartmentTitle: ForemanDepartmentTitle,
					ForemanDepartmentName: ForemanDepartmentName,
					ForemanDirectionTitle: ForemanDirectionTitle,
					ForemanDirectionName: ForemanDirectionName
				}]
		};

		var config = {
			headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: 'Bearer ' + this.props.token.data.token },
			responseType: 'arraybuffer'
		};

		if (contractDetails.HasDownPayment && accountDetails.Number == 1) {
			axios.post(getHostUrl() + '/getDownpaymentAccountWordDocument', dataToPost, config)
				.then(res => {
					var blob = new Blob([res.data]);
					var fileName = accountDetails.Number + 'ος Λογαριασμός.docx';
					downloadjs(blob, fileName, 'application/octet-stream');
					this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
				}).catch(error => {
					this.setState({ message: <><div>Αποτυχής προσπάθεια δημιουργίας αρχείου!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
				})
		}
		else {
			axios.post(getHostUrl() + '/accountdocument', dataToPost, config)
				.then(res => {
					var blob = new Blob([res.data]);
					var fileName = accountDetails.Number + 'ος Λογαριασμός.docx';
					downloadjs(blob, fileName, 'application/octet-stream');
					this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
				}).catch(error => {
					this.setState({ message: <><div>Αποτυχής προσπάθεια δημιουργίας αρχείου!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
				})
		}

		// }).catch(error => {
		// 	var errMsg = 'Αποτυχής προσπάθεια δημιουργίας αρχείου!' + error;
		// 	this.setState({ message: errMsg, openMessage: true, variant: 'error', submitButtonDisabled: false });
		// })
	}
	getRemainAmountOfContract(am1) {
		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		return Number(contractDetails.TotalAmount) - Number(am1)
	}
	getReservationsToPost(Amount) {
		let ret = [];

		if (this.props.reservations) {
			for (let index = 0; index < this.props.reservations.length; index++) {
				const value = this.props.reservations[index];

				if (value.IsReservation) {
					let a1 = (Number(Amount) * Number(value.Percentage / 100)).toFixed(2);
					let a2 = '';
					let a3 = '';
					if (value.Stamp > 0) {
						a2 = (Number(a1) * Number(value.Stamp / 100)).toFixed(2);
						a3 = (Number(a2) * Number(value.StampOGA / 100)).toFixed(2);
					}

					let per = Number(value.Percentage);
					if (value.Stamp > 0)
						ret.push({ name: value.Name, percentage: per, value: a1, stamp: a2, stampPer: value.Stamp, StampOGAPer: value.StampOGA, stampoga: a3 })
					else
						ret.push({ name: value.Name, percentage: per, value: a1 })
				}
			}
		}

		return ret;
	}
	getAccountNumberLex(number) {
		var ret = '';
		if (number == 1)
			ret = 'πρώτου'
		else if (number == 2)
			ret = 'δεύτερου'
		else if (number == 3)
			ret = 'τρίτου'
		else if (number == 4)
			ret = 'τέταρου'
		else if (number == 5)
			ret = 'πέμπτου'
		else if (number == 6)
			ret = 'έκτου'
		else if (number == 7)
			ret = 'έβδομου'
		else if (number == 8)
			ret = 'όγδοου'
		else if (number == 9)
			ret = 'ένατου'
		else if (number == 10)
			ret = 'δέκατου'
		else if (number == 11)
			ret = 'ένδεκατου'
		else if (number == 12)
			ret = 'δωδέκατου'
		else if (number == 13)
			ret = 'δέκατου τρίτου'
		else if (number == 14)
			ret = 'δέκατου τέταρτου'

		return ret;
	}
	//#endregion

	//#region CC template

	getCCInfoTemplate(contractDetails, accountDetails) {
		var CC = accountDetails && accountDetails.cc ? accountDetails.cc : '';
		let durationBody;
		if (CC) {
			durationBody = CC.map((value, index) => {
				return <Grid item>
					<Paper style={{ padding: '5px' }} square={true}>
						<Typography>
							<b>Κοιν {index + 1}:</b> <span>{value.CC}</span>
						</Typography>
					</Paper>
				</Grid>
			})
		} else {
			return <Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<span>Δεν έχει οριστεί κοινοποίηση εγγράφου</span>
					</Typography>
				</Paper>
			</Grid>
		}

		return durationBody;
	}
	//#endregion

	//#region Reservations
	getReservationsTemplate(contractDetails, accountDetails) {
		return <>
			<Grid item>
				<Paper style={useStyles.category} square={true}>
					<Typography>
						<b>Κρατήσεις Επί Του Ποσού Των <NumberFormat value={accountDetails.AmountPure} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} /></b>
					</Typography>
				</Paper>
			</Grid>
			<div style={{ display: 'block', padding: '0px', width: '100%' }}>
				{this.getReservations(accountDetails.AmountPure)}
			</div>
		</>
	}
	getReservations(AmountPure) {
		return ((this.props.reservations) ?
			this.props.reservations.map((value, index) => {
				var percentage = parseFloat(value.Percentage);
				var stamp = parseFloat(value.Stamp);
				var stampOGA = parseFloat(value.StampOGA);
				if (value.IsReservation) {
					let a1 = (Number(AmountPure) * Number(percentage / 100)).toFixed(2);
					let a2 = (Number(a1) * Number(stamp / 100)).toFixed(2);
					let a3 = (Number(a2) * Number(stampOGA / 100)).toFixed(2);
					return (this.getReservationTemplate(value, Number(a1), Number(a2), Number(a3), index))
				}
			}) : null)
	}
	getReservationTemplate(value, a1, a2, a3, index) {
		var percentage = parseFloat(value.Percentage);
		var stamp = parseFloat(value.Stamp);
		var stampOGA = parseFloat(value.StampOGA);

		if (stamp > 0) {
			return (
				<div style={{ display: 'table-row' }}>
					<div style={{ display: 'table-cell', padding: '5px', textAlign: 'right', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<span><b>{value.Name} ({percentage}%) :</b></span>
					</div>
					<div style={{ display: 'table-cell', padding: '5px', textAlign: 'right', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<NumberFormat value={a1} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
					</div>
					<div style={{ display: 'table-cell', padding: '5px', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<b style={useStyles.distanceBetweenValues}>ΧΑΡΤΟΣΗΜΟ ({stamp}%) :</b>
					</div>
					<div style={{ display: 'table-cell', padding: '5px', textAlign: 'right', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<NumberFormat value={a2} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
					</div>
					<div style={{ display: 'table-cell', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<b style={useStyles.distanceBetweenValues}>ΧΑΡΤΟΣ. ΟΓΑ ({stampOGA}%) :</b>
					</div>
					<div style={{ display: 'table-cell', textAlign: 'right', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<NumberFormat value={a3} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
					</div>
					<div style={{ display: 'table-cell', width: '99%', borderBottom: '1px solid lightgrey' }}>
					</div>
				</div>
			)
		}
		else {
			return (
				<div style={{ display: 'table-row' }}>
					<div style={{ display: 'table-cell', padding: '5px', textAlign: 'right', borderBottom: '1px solid lightgrey', whiteSpace: 'nowrap' }}>
						<b style={{ marginLeft: '5px' }}>{value.Name} ({percentage}%) :</b>
					</div>
					<div style={{ display: 'table-cell', padding: '5px', textAlign: 'right' }}>
						<NumberFormat value={a1} displayType={'text'} thousandSeparator={'.'} decimalSeparator=',' suffix={'€'} isNumericString={true} />
					</div>
				</div>
			)
		}
	}
	//#endregion

	//#region AAY
	getAAYLabelTemplate() {
		return <Grid item>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Στοιχεία Απόφασης Ανάληψης Υποχρέωσης (AAY)</b>
				</Typography>
			</Paper>
		</Grid>
	}
	getAAYTemplate(contractDetails, accountDetails) {
		var AAY = accountDetails && accountDetails.aay && accountDetails.aay.length > 0 ? accountDetails.aay[0] : {};

		if (AAY)
			return <>
				{this.getAAYLabelTemplate()}
				<Grid item>
					<Paper style={{ padding: '5px' }} square={true}>
						<Typography>
							<b>ΑΑΥ/ΕΤΟΣ (ΕΑΔ):</b><span>{AAY.Value}/{extractYearFromDate(AAY.ProtocolDate)}</span><span style={{ marginLeft: '5px' }}>(ΕΑΔ </span>{AAY.EadNumber}<span>)</span>
							<b style={useStyles.distanceBetweenValues}>Α.Π. ΑΑΥ:</b><span>{AAY.ProtocolNumber}/{getDateFormatForDocument(AAY.ProtocolDate)}</span>
							<b style={useStyles.distanceBetweenValues}>ΑΔΑ:</b><span>{AAY.ADA}</span>
							<b style={useStyles.distanceBetweenValues}>ΑΑΥ ΠΡΟΗΓΟΥΜΕΝΟΥ ΕΤΟΥΣ (για δαπάνες ΠΟΕ):</b> {AAY.PreviousYear}
						</Typography>
					</Paper>
				</Grid>
			</>
		else
			return <>
				{this.getAAYLabelTemplate()}
				<Grid item>
					<Paper style={{ padding: '5px' }} square={true}>
						<Typography>
							<span style={{ color: 'red' }}>Δεν έχουν συμπληρωθεί τα πεδία για την Απόφαση Ανάληψης Υποχρέωσης</span>
						</Typography>
					</Paper>
				</Grid>
			</>
	}
	//#endregion

	//#region Invoice
	getInvoiceLabelTemplate() {
		return <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Στοιχεία Τιμολογίου</b>
				</Typography>
			</Paper>
		</Grid>
	}
	getInvoiceTemplate(contractDetails, accountDetails) {
		var Invoice = accountDetails && accountDetails.invoice && accountDetails.invoice.length > 0 ? accountDetails.invoice[0] : {};
		if (Invoice) {
			return <>
				{this.getInvoiceLabelTemplate()}
				<Grid item>
					<Paper style={{ padding: '5px' }} square={true}>
						<Typography>
							<span><b>Ημερομηνία παραλαβής τιμολογίου:</b> {getDateFormatForDocument(Invoice.DeliveredDate)}</span>
							<span style={useStyles.distanceBetweenValues}><b>Α.Π. Παραλαβής Τιμολογίου:</b> {Invoice.DeliveredDateProtocolNumber}<b>/</b>{getDateFormatForDocument(Invoice.DeliveredDateProtocolDate)}</span>
							<b style={useStyles.distanceBetweenValues}>Α.Π. τιμολογίου:</b> {Invoice.Number}<b>/</b>{getDateFormatForDocument(Invoice.Date)}
						</Typography>
					</Paper>
				</Grid>
			</>
		}
		else
			return <>
				{this.getInvoiceLabelTemplate()}
				<Grid item>
					<Paper style={{ padding: '5px' }} square={true}>
						<Typography>
							<span style={{ color: 'red' }}>Δεν έχουν συμπληρωθεί τα πεδία για τo Τιμολόγιο</span>
						</Typography>
					</Paper>
				</Grid>
			</>
	}
	//#endregion

	//#region general account info
	getGeneralAccountInfo(contractDetails, accountDetails) {

		return <>
			<Grid item>
				<Paper style={useStyles.category} square={true}>
					<Typography>
						<b>Στοιχεία λογαριασμου #{accountDetails.Number}</b>
					</Typography>
				</Paper>
			</Grid>
			{this.getFirstAccountProtocolInfoTemplate(accountDetails)}
			{this.getAccountProtocolInfoTemplate(accountDetails)}
			<Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Έναρξη:</b> {getDateFormat(accountDetails.Start)}
						<b style={{ marginLeft: '20px' }}>Λήξη:</b> {getDateFormat(accountDetails.End)}
						<b style={{ marginLeft: '20px' }}>1ος του έτους:</b> {accountDetails.IsFirstOfTheYear ? 'Ναι' : 'Όχι'}
					</Typography>
				</Paper>
			</Grid>
			<Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b style={{ marginLeft: '0px' }}>Καθαρό Ποσό:</b> <NumberFormat value={accountDetails.AmountPure} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
						<b style={{ marginLeft: '20px' }}>{getFpaLabel(contractDetails.FpaValue)} </b> <NumberFormat value={accountDetails.AmountFpa} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
						<b style={{ marginLeft: '20px' }}>Σύνολο:</b> <NumberFormat value={accountDetails.AmountTotal} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
					</Typography>
				</Paper>
			</Grid>
			<Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Ποσό Ολογράφως: </b> {getAmountInWords(accountDetails.AmountTotal, true)}
					</Typography>
				</Paper>
			</Grid>
			{this.getRemainAmountOfContractTemplate(contractDetails, accountDetails)}
			{this.getWorkConfirmationDate(accountDetails)}
			{this.getDeliveryGoodsDate(accountDetails)}
		</>
	}

	getRemainAmountOfContractTemplate(contractDetails, accountDetails) {
		var remainAmountOfContract = Number(contractDetails.AmountTotal) - (Number(paidAmountTotalUntilToday) + Number(accountDetails.AmountTotal))
		if (cantComputeRemainContractAmount)
			return <Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Υπόλοιπο Σύμβασης: </b> <span style={{ color: 'red' }}>Δεν μπόρεσε να υπολογιστεί!</span>
					</Typography>
				</Paper>
			</Grid>
		else
			return <Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Υπόλοιπο Σύμβασης: </b>
						<span style={{ color: (remainAmountOfContract < 0 ? 'red' : 'black') }}>
							<NumberFormat value={remainAmountOfContract} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
						</span>
					</Typography>
				</Paper>
			</Grid>

	}

	getFirstAccountProtocolInfoTemplate(accountDetails) {
		if (accountDetails && accountDetails.Number > 1) {
			var firstaccountprotocolnumber = accountDetails.FirstAccountProtocolNumber
			var firstaccountprotocoldate = getDateFormatForDocument(accountDetails.FirstAccountProtocolDate)
			return (
				<Grid item>
					<Paper style={{ padding: '5px' }} square={true}>
						<Typography>
							<b>Α.Π. Πρώτου Διαβιβαστικού Εγγράφου</b> {firstaccountprotocolnumber}<b>/</b>{firstaccountprotocoldate}
						</Typography>
					</Paper>
				</Grid>
			)
		}
	}
	getAccountProtocolInfoTemplate(accountDetails) {
		if (accountDetails) {
			if (accountDetails.ProtocolNumber && accountDetails.ProtocolNumber !== '') {
				return (
					<Grid item>
						<Paper style={{ padding: '5px' }} square={true}>
							<Typography>
								<b>Αρ. Πρωτ.:</b> {accountDetails.ProtocolNumber}<b>/</b>{getDateFormatForDocument(accountDetails.ProtocolDate)}
							</Typography>
						</Paper>
					</Grid>
				)
			}
		}
	}
	getWorkConfirmationDate(accountDetails) {
		var isDownpayment = accountDetails && accountDetails.decisionboard && accountDetails.decisionboard.length > 0
		if (isDownpayment === false)
			return <Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Ημερομηνία Βεβαίωσης Έργου: </b> {getDateFormat(accountDetails.WorkConfirmationDate)}
					</Typography>
				</Paper>
			</Grid>
	}
	getDeliveryGoodsDate(accountDetails) {
		var isDownpayment = accountDetails && accountDetails.decisionboard && accountDetails.decisionboard.length > 0
		if (isDownpayment === false)
			return <Grid item>
				<Paper style={{ padding: '5px' }} square={true}>
					<Typography>
						<b>Ημερομηνία Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών: </b> {getDateFormat(accountDetails.DeliveryGoodsDate)}
					</Typography>
				</Paper>
			</Grid>
	}

	//#endregion

	//#region downpayment info

	getLawArticleForDownpaymentTemplate(accountDetails) {
		let title = accountDetails.DownpaymentLawArticle ? <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>“Πόροι – Χρηματοδότηση – Προϋπολογισμός”</b>
				</Typography>
			</Paper>
		</Grid> : <></>
		let downpaymentLawArticleValue = accountDetails.DownpaymentLawArticle ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>'Αρθρο </b> {accountDetails.DownpaymentLawArticle}
				</Typography>
			</Paper>
		</Grid> : <></>

		if (accountDetails.DownpaymentLawArticle) {
			return (<>
				{title}
				{downpaymentLawArticleValue}
			</>
			)
		}

	}

	getDecisionBoardTemplate(contractDetails, accountDetails) {
		let title = accountDetails.decisionboard ? <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Στοιχεία Απόφασεων Διοικητικού Συμβουλίου</b>
				</Typography>
			</Paper>
		</Grid> : <></>
		let firstDecisionBoard = accountDetails.decisionboard ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Απόφαση Διοικητικού Συμβουλίου Α.Π. </b>: {accountDetails.decisionboard[0].ProtocolNumber}/{accountDetails.decisionboard[0].ProtocolDate}
				</Typography>
			</Paper>
		</Grid> : <></>
		let secondDecisionBoard = accountDetails.decisionboard && accountDetails.decisionboard.length > 1 ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>2η Απόφαση Διοικητικού Συμβουλίου Α.Π. </b>: {accountDetails.decisionboard[1].ProtocolNumber}/{accountDetails.decisionboard[1].ProtocolDate}
				</Typography>
			</Paper>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Περιεχόμενο Α.Δ.Σ. </b>	{accountDetails.decisionboard[1].Content}
				</Typography>
			</Paper>
		</Grid> : <></>

		if (accountDetails.decisionboard) {
			return (<>
				{title}
				{firstDecisionBoard}
				{secondDecisionBoard}
			</>
			)
		}
	}
	getDecisionCoordinatorDecentrilizedAdministrationTemplate(contractDetails, accountDetails) {
		let title = accountDetails.decisioncoordinatordecentrilizedadministration ? <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Στοιχεία Αποφάσεων του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής</b>
				</Typography>
			</Paper>
		</Grid> : <></>

		let firstDecisionCoordinatorDecentrilizedAdministration = accountDetails.decisioncoordinatordecentrilizedadministration ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής Α.Π. </b>: {accountDetails.decisioncoordinatordecentrilizedadministration[0].ProtocolNumber}/{accountDetails.decisioncoordinatordecentrilizedadministration[0].ProtocolDate}
				</Typography>
			</Paper>
		</Grid> : <></>

		let secondDecisionCoordinatorDecentrilizedAdministration = accountDetails.decisioncoordinatordecentrilizedadministration && accountDetails.decisioncoordinatordecentrilizedadministration.length > 1 ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>2η Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής Α.Π. </b>: {accountDetails.decisioncoordinatordecentrilizedadministration[1].ProtocolNumber}/{accountDetails.decisioncoordinatordecentrilizedadministration[1].ProtocolDate}
				</Typography>
			</Paper>
		</Grid> : <></>

		if (accountDetails.decisioncoordinatordecentrilizedadministration) {
			return (<>
				{title}
				{firstDecisionCoordinatorDecentrilizedAdministration}
				{secondDecisionCoordinatorDecentrilizedAdministration}
			</>
			)
		}
	}
	getCourtOfAuditorsInfoTemplate(contractDetails, accountDetails) {
		let title = accountDetails.courtofauditors ? <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Στοιχεία Ελεγκτικού Συνεδρίου</b>
				</Typography>
			</Paper>
		</Grid> : <></>

		let grid1 = accountDetails.courtofauditors ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Πράξη</b>: {accountDetails.courtofauditors[0].ProtocolNumber}/{accountDetails.courtofauditors[0].ProtocolYear}
				</Typography>
			</Paper>
		</Grid> : <></>

		let grid2 = accountDetails.courtofauditors ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Κλίμακα</b>: {accountDetails.courtofauditors[0].ScaleNumber}
				</Typography>
			</Paper>
		</Grid> : <></>

		let grid3 = accountDetails.courtofauditors ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Αριθμός Πρωτοκόλλου A.Π.Δ.Α</b>: {accountDetails.courtofauditors[0].APDA_ProtocolNumber}/{accountDetails.courtofauditors[0].APDA_ProtocolDate}
				</Typography>
			</Paper>
		</Grid> : <></>

		if (accountDetails.courtofauditors) {
			return (<>
				{title}
				{grid1}
				{grid2}
				{grid3}
			</>
			)
		}
	}
	//#endregion

	//#region signatory
	//#region signatory info
	getSignatoriesForDocument1(contractDetails, accountDetails) {
		return <>
			{this.getSignatoriesForDocument1Header(accountDetails)}
			{this.getSignatoriesDocument1Values(accountDetails)}
		</>
	}
	getSignatoriesForDocument1Header(accountDetails) {
		return (<Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Υπογραφές για αρχείο 'Διαβιβαστικό Έγγραφο {accountDetails.Number}ου Λογαριασμού'</b>
				</Typography>
			</Paper>
		</Grid>)
	}
	getSignatoriesDocument1Values(accountDetails) {
		if (accountDetails && accountDetails.documentsignatory) {
			return (
				<>
					{
						accountDetails.documentsignatory.map((item, index) => {
							if (item.DocumentType === 2) {
								return (
									<Grid item>
										<Paper style={{ padding: '5px' }} square={true}>
											<Typography>
												<b>{item.signatorytype[0].Name}:</b>
												<span>{item.Absense ? 'κ.κ.α' : ''} {item.signatory[0].Name}</span>
											</Typography>
										</Paper>
									</Grid>
								)
							}
						})
					}
				</>
			)
		}
		else
			return <span style={{ color: 'red' }}>Δεν έχουν συμπληρωθεί τα πεδία για τις υπογραφές</span>
	}

	getSignatoriesForDocument2(contractDetails, accountDetails) {

		if (accountDetails && accountDetails.documentsignatory) {
			return (
				<>
					{this.getSignatoriesForDocument2Header(accountDetails)}
					{
						accountDetails.documentsignatory.map((item, index) => {
							if (item.DocumentType === 1) {
								return (
									<Grid key={index} item style={{ flexGrow: '1' }}>
										<Paper style={{ padding: '5px' }} square={true}>
											<Typography>
												<b>{item.signatorytype[0].Name}:</b>
												<span>{item.Absense ? 'κ.κ.α' : ''} {item.signatory[0].Name}</span>
											</Typography>
										</Paper>
									</Grid>
								)
							}
						})
					}
				</>
			)
		}
	}
	getSignatoriesForDocument2Header(accountDetails) {
		return <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Υπογραφές για αρχείο '{accountDetails.Number}ος Λογαριασμός'</b>
				</Typography>
			</Paper></Grid>
	}
	//#enderegion
	//#region get signatory values
	getSignatoryTypeId(documentsignatory, signatoryType) {
		var ret = -1;
		if (documentsignatory) {
			for (let index = 0; index < documentsignatory.length; index++) {
				const item = documentsignatory[index];
				if (item.DocumentType === 1) {
					if (signatoryType === 1 && item.SignatoryTypeId <= 2) {
						ret = item.SignatoryTypeId;
						break;
					}
					else if (signatoryType === 2 && (item.SignatoryTypeId === 3 || item.SignatoryTypeId === 4)) {
						ret = item.SignatoryTypeId;
						break;
					}
					else if (signatoryType === 3 && (item.SignatoryTypeId === 5 || item.SignatoryTypeId === 6)) {
						ret = item.SignatoryTypeId;
						break;
					}
				}
				else if (signatoryType === 4 && item.DocumentType === 2) {
					ret = item.SignatoryTypeId;
					break;
				}
			}
		}
		return ret;
	}
	getSignatoryId(documentsignatory, signatoryType) {
		var ret = -1;
		if (documentsignatory) {
			for (let index = 0; index < documentsignatory.length; index++) {
				const item = documentsignatory[index];
				if (item.DocumentType === 1) {
					if (signatoryType === 1 && item.SignatoryTypeId <= 2) {
						ret = item.SignatoryId;
						break;
					}
					else if (signatoryType === 2 && (item.SignatoryTypeId === 3 || item.SignatoryTypeId === 4)) {
						ret = item.SignatoryId;
						break;
					}
					else if (signatoryType === 3 && (item.SignatoryTypeId === 5 || item.SignatoryTypeId === 6)) {
						ret = item.SignatoryId;
						break;
					}
				}
				else if (signatoryType === 4 && item.DocumentType === 2) {
					ret = item.SignatoryId;
					break;
				}
			}
		}

		return ret;
	}
	getSignatoryAbsense(documentsignatory, signatoryType) {
		var ret = false;

		if (documentsignatory) {
			for (let index = 0; index < documentsignatory.length; index++) {
				const item = documentsignatory[index];
				if (item.DocumentType === 1) {
					if (signatoryType === 2 && (item.SignatoryTypeId === 3 || item.SignatoryTypeId === 4)) {
						ret = item.Absense;
						break;
					}
				}
				else if (item.DocumentType === 2) {
					ret = item.Absense;
					break;
				}
			}
		}

		return ret;
	}
	//#endregion
	//#endregion

	getAccountDetailsTemplate(accountDetails) {

		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		if (accountDetails)
			return (
				<Body>
					<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'hidden' }}>
						<div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
							<Scrollbars style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', flexBasis: '100%', flex: '1', backgroundColor: '#fff' }}>
								<LoadingOverlay
									active={this.state.submitButtonDisabled ? true : false}
									spinner
									text='Το αρχείο δημιουργείται ...'
									styles={{
										overlay: (base) => ({
											...base,
											textAlign: 'middle'
										})
									}}>
									<Grid container xl style={{ flexGrow: '1', alignItems: 'stretch' }} direction='column' >
										{this.getDocumentsInfo(contractDetails, accountDetails)}
										{this.getCCInfoTemplate(contractDetails, accountDetails)}
										{this.getGeneralAccountInfo(contractDetails, accountDetails)}
										{this.getReservationsTemplate(contractDetails, accountDetails)}
										{this.getAAYTemplate(contractDetails, accountDetails)}
										{this.getInvoiceTemplate(contractDetails, accountDetails)}
										{this.getLawArticleForDownpaymentTemplate(accountDetails)}
										{this.getDecisionBoardTemplate(contractDetails, accountDetails)}
										{this.getDecisionCoordinatorDecentrilizedAdministrationTemplate(contractDetails, accountDetails)}
										{this.getCourtOfAuditorsInfoTemplate(contractDetails, accountDetails)}
										{this.getSignatoriesForDocument1(contractDetails, accountDetails)}
										{this.getSignatoriesForDocument2(contractDetails, accountDetails)}
									</Grid>
								</LoadingOverlay>
							</Scrollbars>
						</div>
						{getFooterTemplate()}
					</div>
					<MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
				</Body>
			)
		else
			return (<></>)
	}

	render() {

		const accountInfo = this.props.account;
		if (accountInfo && accountInfo.tokenIsValid) {
		  console.log('Account Info: RESET_ACTION')
			store.dispatch({ type: "RESET_ACTION", payload: null });
			return <Redirect push to="/login" />;
		} else {
			if (accountInfo) {
				var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
				paidAmountPureUntilToday = 0;
				paidAmountFpaUntilToday = 0;
				paidAmountTotalUntilToday = 0;
				if (contractDetails && contractDetails.createdaccounts) {
					for (let i = 0; i < contractDetails.createdaccounts.length; i++) {
						if (contractDetails.createdaccounts[i].Number < accountInfo.Number) {
							paidAmountPureUntilToday += Number(contractDetails.createdaccounts[i].AmountPure);
							paidAmountFpaUntilToday += Number(contractDetails.createdaccounts[i].AmountFpa);
							paidAmountTotalUntilToday += Number(contractDetails.createdaccounts[i].AmountTotal);
						}
					}
					cantComputeRemainContractAmount = false
				}
				else
					cantComputeRemainContractAmount = true

				if (this.state.navigateToEditAccount)
					return this.navigateToEditAccountForm(contractDetails, accountInfo)
				else
					return this.getAccountDetailsTemplate(accountInfo)
			}
			else
				return showGenericMessage('Ο λογαριασμός δεν βρέθηκε!. Παρακαλώ ξαναπροσπαθήστε!', true)
		}
	}
}

function mapStateToProps(state) {
	return {
		contractDetails: state.contracts_reducer.contractDetails,
		contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
		isSearchMode: state.contracts_reducer.isSearchMode,
		account: state.account_reducer.account,
		reservations: state.parametricdata_reducer.reservations,
		token: state.token_reducer.token
	}
}

export default connect(mapStateToProps, null)(withStyles(useStyles)(AccountInfo))