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
	getAmountInWords, getHostUrl, getDateFormat, getDateFormatForDocument,
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

import { createTransmissionDocument, createAccountDocument } from './PostDataCreateDocument'

var downloadjs = require('downloadjs');

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

var paidAmount = {};
// paidAmountPureUntilToday = 0;
// var paidAmountFpaUntilToday = 0;
// var paidAmountTotalUntilToday = 0;
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
				MonitoringCommittee: accountDetails.monitoringcommittee,
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
	createDocument1(e) {
		e.preventDefault();

		this.setState({ submitButtonDisabled: true });

		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		var accountDetails = this.props.account;
		var dataToPost = createTransmissionDocument(contractDetails, accountDetails, paidAmount)

		var config = {
			headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: 'Bearer ' + this.props.token.data.token },
			responseType: 'arraybuffer'
		};

		axios.post(getHostUrl() + '/createTransmissionDocument', dataToPost, config)
			.then(res => {
				var blob = new Blob([res.data]);
				var fileName = 'ΔΙΑΒΙΒΑΣΤΙΚΟ ΕΓΓΡΑΦΟ ' + accountDetails.Number + 'ου ΛΟΓΑΡΙΑΣΜΟΥ.docx';
				downloadjs(blob, fileName, 'application/octet-stream');
				this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
			}).catch(error => {
				this.setState({ message: <><div>Αποτυχής προσπάθεια δημιουργίας αρχείου!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
			})
	}
	//}

	createDocument2(e) {
		e.preventDefault();

		var contractInfo = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		var accountInfo = this.props.account;

		this.setState({ submitButtonDisabled: true });

		var dataToPost = createAccountDocument(contractInfo, accountInfo, paidAmount, this.props.reservations)
		var config = {
			headers: { 'Content-Type': 'application/json;charset=utf-8', Authorization: 'Bearer ' + this.props.token.data.token },
			responseType: 'arraybuffer'
		};

		axios.post(getHostUrl() + '/createAccountDocument', dataToPost, config)
			.then(res => {
				var blob = new Blob([res.data]);
				var fileName = accountInfo.Number + 'ος Λογαριασμός.docx';
				downloadjs(blob, fileName, 'application/octet-stream');
				this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
			}).catch(error => {
				this.setState({ message: <><div>Αποτυχής προσπάθεια δημιουργίας αρχείου!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
			})

	}

	getRemainAmountOfContract(am1) {
		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		return Number(contractDetails.TotalAmount) - Number(am1)
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
				} else
					return <></>
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
		var remainAmountOfContract = Number(contractDetails.AmountTotal) - (Number(paidAmount.TotalUntilToday) + Number(accountDetails.AmountTotal))
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
	getMonitoringCommitteeInfoTemplate(contractInfo, accountInfo) {

		let title = accountInfo.monitoringcommittee ? <Grid item style={{ background: 'lightGrey' }}>
			<Paper style={useStyles.category} square={true}>
				<Typography>
					<b>Στοιχεία Επιτροπής Παρακολούθησης</b>
				</Typography>
			</Paper>
		</Grid> : <></>

		let grid1 = accountInfo.monitoringcommittee ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Α.Π. Απόφασης Δημάρχου</b>: {accountInfo.monitoringcommittee[0].MayorDecisionForMembersProtocolNumber}/{accountInfo.monitoringcommittee[0].MayorDecisionForMembersProtocolDate}
				</Typography>
			</Paper>
		</Grid> : <></>

		let grid2 = accountInfo.monitoringcommittee ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Ημ. Πρακτικού Συνεδρίασης</b>: {accountInfo.monitoringcommittee[0].PracticalDate}
				</Typography>
			</Paper>
		</Grid> : <></>

		let grid3 = accountInfo.monitoringcommittee ? <Grid item>
			<Paper style={{ padding: '5px' }} square={true}>
				<Typography>
					<b>Α.Π. διαβιβαστικού εγγράφου</b>: {accountInfo.monitoringcommittee[0].TransmissionDocumentProtocolNumber}/{accountInfo.monitoringcommittee[0].TransmissionDocumentProtocolDate}
				</Typography>
			</Paper>
		</Grid> : <></>

		if (accountInfo.monitoringcommittee) {
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
							else
								return <></>
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
							else 
							return <></>
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

	getAccountInfoTemplate(accountInfo) {

		var contractInfo = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails;
		if (accountInfo)
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
										{this.getDocumentsInfo(contractInfo, accountInfo)}
										{this.getCCInfoTemplate(contractInfo, accountInfo)}
										{this.getGeneralAccountInfo(contractInfo, accountInfo)}
										{this.getReservationsTemplate(contractInfo, accountInfo)}
										{this.getAAYTemplate(contractInfo, accountInfo)}
										{this.getInvoiceTemplate(contractInfo, accountInfo)}
										{this.getLawArticleForDownpaymentTemplate(accountInfo)}
										{this.getDecisionBoardTemplate(contractInfo, accountInfo)}
										{this.getDecisionCoordinatorDecentrilizedAdministrationTemplate(contractInfo, accountInfo)}
										{this.getCourtOfAuditorsInfoTemplate(contractInfo, accountInfo)}
										{this.getMonitoringCommitteeInfoTemplate(contractInfo, accountInfo)}
										{this.getSignatoriesForDocument1(contractInfo, accountInfo)}
										{this.getSignatoriesForDocument2(contractInfo, accountInfo)}
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
				paidAmount.PureUntilToday = 0;
				paidAmount.FpaUntilToday = 0;
				paidAmount.TotalUntilToday = 0;
				if (contractDetails && contractDetails.createdaccounts) {
					for (let i = 0; i < contractDetails.createdaccounts.length; i++) {
						if (contractDetails.createdaccounts[i].Number < accountInfo.Number) {
							paidAmount.PureUntilToday += Number(contractDetails.createdaccounts[i].AmountPure);
							paidAmount.FpaUntilToday += Number(contractDetails.createdaccounts[i].AmountFpa);
							paidAmount.TotalUntilToday += Number(contractDetails.createdaccounts[i].AmountTotal);
						}
					}
					cantComputeRemainContractAmount = false
				}
				else
					cantComputeRemainContractAmount = true

				if (this.state.navigateToEditAccount)
					return this.navigateToEditAccountForm(contractDetails, accountInfo)
				else
					return this.getAccountInfoTemplate(accountInfo)
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