/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from 'axios';
import Icon from '@material-ui/core/Icon';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import Avatar from '@material-ui/core/Avatar';
import ProtocolInput from '../CustomControls/ProtocolInput';
import MyTextField from '../CustomControls/MyTextField';

// Then import the virtualized Select HOC
import VirtualizedSelect from 'react-virtualized-select'
// // Make sure to import default styles.
// // This only needs to be done once; probably during bootstrapping process.
// import 'react-select/dist/react-select.css'
// import 'react-virtualized/styles.css'
// import 'react-virtualized-select/styles.css'

import {
	getHostUrl, getAmountInWords, getDateFormatForMaterialUIComponent,
	getFpaLabel, getHeaderHeight, getFooterHeight, getServerErrorResponseMessage
} from '../../Helper/helpermethods';
import { getSelectField, getTextFieldWithTooltip, getTextField, getCheckboxField, getButton, getSubmitButton } from '../MaterialObjects/materialobjects';
import { getFooterTemplate } from '../Common/templates'

import MySnackbar from '../Common/MySnackbar'
import Body from '../../HOC/Body/body';
import VirtualizedCC from './VirtualizedCC';

//import ProtocolNumber from '../CustomControls/ProtocolNumber';

import {
	getAayTooltipTemplate, getFirstTrasmissionProtocolTooltip,
	getAccountProtocolTooltip, getWorkConfirmationDateTooltip, getDeliveredGoodDateTooltip,
	getInvoiceTooltipTemplate, getLawArticleTooltip,
	getDocumentDateTooltipTemplate, getAccountStartDateTooltipTemplate,
	getMayorDecisionProtocolTooltip, getMonitoringCommitteePracticalTooltip, getMonitoringCommitteeTooltipTemplate,
	getAccountEndDateTooltipTemplate,
} from './ΤooltipMethods';

import Header from '../Header/header'

import { bindActionCreators } from 'redux';
import { createAccount, updateAccount } from '../../Redux/Actions';
import { withStyles } from "@material-ui/core/styles";

const useStyles = {
	category: {
		padding: '5px',
		background: '#add8e6'
	},
	accountInfoItem: {
		width: '200px',
		margin: '5px'
	},
	accountInfoLargeItem: {
		width: '250px',
		margin: '5px'
	},
	accountInfoLargeItem2: {
		width: '800px',
		margin: '5px'
	},
	selectSignatures: {
		minWidth: '500px'
	},
	divRowFlex: {
		display: 'flex',
		flexDirection: 'row',
		margin: '5px',
		flexWrap: 'wrap',
		justifyContent: 'flex-start'
	},
	btnAuto: {
		margin: '10px',
		paddingLeft: '5px',
		paddingRight: '5px',
		background: 'lightGreen'
	},
	btnRemoveCC: {
		margin: '5px',
		padding: '15px',
		background: 'Red'
	},
	btnSubmit: {
		padding: '20px',
		minWidth: '200px'
	},
	sltCC: {
		width: '700px',
		maxWidth: '700px'
	},
	tooltip: {
		fontSize: "16px",
		color: 'white'
	},
	tooltipTitle: {
		margin: '2px',
		fontSize: '16px',
		color: 'black',
		fontWeight: 'bold'
	},
	tooltipIndicate: {
		fontSize: "16px",
		color: '#00ff3e'
	}
};

class NewAccountForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openMessage: false,
			message: '',
			variant: '',
			submitButtonDisabled: false,
			isEdit: this.props.location.state.isEdit,
			ContractId: this.props.location.state.ContractId,
			IsDownpayment: this.props.location.state.isDownpayment,
			DownpaymentLawArticle: this.props.location.state.DownpaymentLawArticle,
			ContractTypeId: this.props.location.state.ContractTypeId,
			AccountId: this.props.location.state.AccountId,
			AccountNumber: this.props.location.state.AccountNumber,
			DocumentDate: this.props.location.state.DocumentDate,
			Start: this.props.location.state.Start,
			End: this.props.location.state.End,
			AmountPure: this.props.location.state.AmountPure,
			AmountFpa: this.props.location.state.AmountFpa,
			AmountTotal: this.props.location.state.AmountTotal,
			AmountFullWritten: this.props.location.state.AmountFullWritten,
			RemainAmountOfContract: Number(this.props.location.state.RemainAmountOfContract),
			ProtocolNumber: this.props.location.state.ProtocolNumber,
			ProtocolDate: this.props.location.state.ProtocolDate,
			FirstAccountProtocolNumber: this.props.location.state.FirstAccountProtocolNumber,
			FirstAccountProtocolDate: this.props.location.state.FirstAccountProtocolDate,
			IsFirstOfTheYear: this.props.location.state.IsFirstOfTheYear,
			WorkConfirmationDate: this.props.location.state.WorkConfirmationDate,
			DeliveryGoodsDate: this.props.location.state.DeliveryGoodsDate,
			AayValue: this.props.location.state.AayValue,
			AayADA: this.props.location.state.AayADA,
			AayProtocolNumber: this.props.location.state.AayProtocolNumber,
			AayProtocolDate: this.props.location.state.AayProtocolDate,
			AayEadNumber: this.props.location.state.AayEadNumber,
			AayPreviousYear: this.props.location.state.AayPreviousYear,
			InvoiceNumber: this.props.location.state.InvoiceNumber,
			InvoiceDate: this.props.location.state.InvoiceDate,
			InvoiceDeliveredDate: this.props.location.state.InvoiceDeliveredDate,
			InvoiceDeliveredDateProtocolNumber: this.props.location.state.InvoiceDeliveredDateProtocolNumber,
			InvoiceDeliveredDateProtocolDate: this.props.location.state.InvoiceDeliveredDateProtocolDate,
			CC1Value1: this.props.location.state.CC1Value1,
			CC1Value2: this.props.location.state.CC1Value2,
			CC2Value1: this.props.location.state.CC2Value1,
			CC2Value2: this.props.location.state.CC2Value2,
			SignType1: this.props.location.state.SignType1,
			SignType2: this.props.location.state.SignType2,
			SignType3: this.props.location.state.SignType3,
			SignType4: this.props.location.state.SignType4,
			SignName1: this.props.location.state.SignName1,
			SignName2: this.props.location.state.SignName2,
			SignName3: this.props.location.state.SignName3,
			SignName4: this.props.location.state.SignName4,
			AbsenseOfDirector1: this.props.location.state.AbsenseOfDirector1,
			AbsenseOfDirector2: this.props.location.state.AbsenseOfDirector2,
			MonitoringCommittee: this.props.location.state.MonitoringCommittee,
			HasMonitoringCommittee: false,
			MonitoringCommitteeMayorDecisionForMembersProtocolNumber: this.props.location.state.MonitoringCommitteeMayorDecisionForMembersProtocolNumber,
			MonitoringCommitteeMayorDecisionForMembersProtocolDate: this.props.location.state.MonitoringCommitteeMayorDecisionForMembersProtocolDate,
			MonitoringCommitteeDocumentProtocolNumber: this.props.location.state.MonitoringCommitteeDocumentProtocolNumber,
			MonitoringCommitteeDocumentProtocolDate: this.props.location.state.MonitoringCommitteeDocumentProtocolDate,
			MonitoringCommitteePracticalDate: this.props.location.state.MonitoringCommitteePracticalDate,
			MonitoringCommitteeContentGivenWorkTime: this.props.location.state.MonitoringCommitteeContentGivenWorkTime,
			cc: this.props.location.state.cc ? this.props.location.state.cc : []
		}

		this.setCheckboxValue = this.setCheckboxValue.bind(this);
		this.onChange = this.onChange.bind(this);
		this.setCC1Value1TextValue = this.setCC1Value1TextValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.autoComplete = this.autoComplete.bind(this);
		this.autoCompleteFullWritten = this.autoCompleteFullWritten.bind(this);
		this.autoCompleteFirstAccountProtocolNumber = this.autoCompleteFirstAccountProtocolNumber.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.showEditHeader = this.showEditHeader.bind(this);
		this.setCC = this.setCC.bind(this);
		this.addCC = this.addCC.bind(this);
		this.removeCC = this.removeCC.bind(this);
		this.addMonitoringCommittee = this.addMonitoringCommittee.bind(this);
		this.removeMonitoringCommittee = this.removeMonitoringCommittee.bind(this);
		this.getCC = this.getCC.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitButtonDisabled: true });
		if (this.state.AccountId) {
			this.props.updateAccount(this.state, this.props.token.data.token).then(res => {
				this.setState({ message: 'Ο λογαριασμός επεξεργάστηκε επιτυχώς!!!', openMessage: true, variant: 'success', submitButtonDisabled: false });
				this.props.history.goBack();
			}).catch(error => {
				this.setState({ message: <><div>Αποτυχία επεξεργασίας λογαριασμών!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
			});
		}
		else {
			this.props.createAccount(this.state, this.props.token.data.token).then(res => {
				this.setState({ AccountId: res.value.data[0].Id, message: 'Ο λογαριασμός δημιουργήθηκε επιτυχώς!!!', openMessage: true, variant: 'success', submitButtonDisabled: false });
				this.props.history.goBack();
			}).catch(error => {
				this.setState({ message: <><div>Αποτυχία δημιουργίας λογαριασμών!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
			})
		}
	}

	setCheckboxValue(e) {
		this.setState({ [e.target.id]: e.target.checked });
	}

	setCC1Value1TextValue(e) {
		this.setState({ [e.target.id]: e.target.value });
		this.setState({ CC1Value2: '-1' });
	}

	onChange(e) {
		this.setState({ [e.target.id]: e.target.value });
	}
	handleClose = (event, reason) => {
		this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
	};

	autoComplete(event) {
		event.preventDefault();
		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
		let fpaValue = contractDetails.FpaValue / 100

		if (this.state.AmountPure && Number(this.state.AmountPure) > 0) {

			this.setState((state) => ({
				AmountPure: Number(state.AmountPure).toFixed(2),
				AmountFpa: (Number(state.AmountPure) * fpaValue).toFixed(2),
				AmountTotal: (Number(state.AmountPure) + (Number(state.AmountPure) * fpaValue)).toFixed(2),
				AmountFullWritten: getAmountInWords((Number(state.AmountPure) + (Number(state.AmountPure) * fpaValue)).toFixed(2), true)

			}));
		} else if (this.state.AmountTotal && Number(this.state.AmountTotal) > 0) {
			this.setState((state) => ({
				AmountPure: (Number(state.AmountTotal) / (1 + fpaValue)).toFixed(2),
				AmountFpa: (Number(state.AmountTotal) - (Number(state.AmountTotal) / (1 + fpaValue))).toFixed(2),
				AmountTotal: Number(state.AmountTotal).toFixed(2),
				AmountFullWritten: getAmountInWords(Number(state.AmountTotal).toFixed(2), true)
			}));
		}
		else {
			var errMsg = '"Είτε το Καθαρό Ποσό ή το Συνολικό Ποσό πρέπει να έχει κάποια τιμή!"\n';
			this.setState({ message: errMsg, openMessage: true, variant: 'info', submitButtonDisabled: false });
		}
	}

	autoCompleteFirstAccountProtocolNumber(e) {
		e.preventDefault();

		axios.get(getHostUrl() + '/getfirstaccountprotocolinfo?ci=' + this.state.ContractId, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
			var firstAccountExists = res.data && res.data[0] ? true : false;
			var firstAccountHasProtocol = false
			if (firstAccountExists === true)
				firstAccountHasProtocol = res.data[0].ProtocolNumber ? true : false

			if (firstAccountExists === true && firstAccountHasProtocol === true) {
				this.setState((state) => ({
					FirstAccountProtocolNumber: res.data[0].ProtocolNumber ? res.data[0].ProtocolNumber : null,
					FirstAccountProtocolDate: getDateFormatForMaterialUIComponent(new Date(res.data[0].ProtocolDate))
				}));
			} else {
				var msg = firstAccountExists === false ? 'O 1ος λογαριασμός δεν έχει δημιουργηθεί' : 'O 1ος λογαριασμός δεν έχει πρωτόκολλο'
				this.setState({ message: msg, openMessage: true, variant: 'info', submitButtonDisabled: false });
			}
		}).catch(error => {
			this.setState({ message: <><div>Αποτυχής προσπάθεια!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
		})
	}

	autoCompleteFullWritten(event) {
		event.preventDefault();

		this.setState((state) => ({
			AmountFullWritten: getAmountInWords(state.AmountTotal, true)
		}));
	}

	loadAgencies(cc2value1) {
		let ret = '';

		if (this.props.agencies) {
			ret = this.props.agencies.map((data, index) => {
				return <option key={index} value={data.Id} selected={cc2value1 == data.Id}>{data.Name}</option>
			})
		}

		return ret;
	}

	loadSelectMunicipalityDirections(cc1value1) {
		let ret = '';

		if (this.props.municipalityDirections) {
			ret = this.props.municipalityDirections.map((data, index) => {
				return <option key={index} value={data.DirectionId} selected={cc1value1 == data.DirectionId}>{data.DirectionName}</option>
			})
		}

		return ret;
	}

	loadMunicipalityDirectionDepartments(DirectionId, cc1value2) {
		let ret = '';

		if (this.props.municipalityDirections !== undefined) {
			this.props.municipalityDirections.find(function (element) {
				if (element.DirectionId == DirectionId) {
					if (element.department != null) {
						ret = element.department.map((data, index) => {
							return <option key={index} value={data.DepartmentId} selected={cc1value2 == data.DepartmentId}>{data.DepartmentName}</option>
						})
					}
				}
			})
		}

		return ret;
	}

	loadSignatories(sigId) {
		let ret = '';

		if (this.props.signatories) {
			ret = this.props.signatories.map((data, index) => {
				return <option key={index} value={data.Id} selected={sigId == data.Id}>{data.Name}</option>
			})
		}

		return ret;
	}

	loadSignatoryTypes(sigTypes, sigTypeId) {
		let ret = '';

		if (this.props.signatorytypes) {

			ret = this.props.signatorytypes.map((data, index) => {
				return sigTypes.indexOf(data.Id) >= 0 ? <option key={index} value={data.Id} selected={sigTypeId == data.Id}>{data.Name}</option> : null
			})
		}

		return ret;
	}

	addFirstAccountProtocolInfo() {
		if (this.state.AccountNumber > 1) {

			return (
				<div style={useStyles.divRowFlex}>
					<ProtocolInput
						tm1={getFirstTrasmissionProtocolTooltip(useStyles, this.state.FirstAccountProtocolNumber, this.state.FirstAccountProtocolDate, 1)}
						tm2={getAccountProtocolTooltip(useStyles, this.state.FirstAccountProtocolNumber, this.state.FirstAccountProtocolDate, 2)}
						title='Α.Π. Πρώτου Διαβιβαστικού Εγγράφου'
						idn='FirstAccountProtocolNumber'
						idd='FirstAccountProtocolDate'
						protocolNumber={this.state.FirstAccountProtocolNumber}
						protocolDate={this.state.FirstAccountProtocolDate}
						onChange={this.onChange}
						tp1='text'
						tp2='date' />
					{getButton('contained', 'small', null, useStyles.btnAuto, this.autoCompleteFirstAccountProtocolNumber, 'ΥΠΟΛΟΓΙΣΜΟΣ', null, false)}
				</div>)
		}
	}

	addProtocolInfo(accountId) {

		if (accountId) {
			return (
				<div style={useStyles.divRowFlex}>
					<ProtocolInput tm1={getAccountProtocolTooltip(useStyles, this.state.ProtocolNumber, this.state.ProtocolDate, 1)} tm2={getAccountProtocolTooltip(useStyles, this.state.ProtocolNumber, this.state.ProtocolDate, 2)} title='Α.Π. Λογαριασμού' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' />
				</div>)
		}
	}

	setCC(e, v, r, i) {
		if (r === 'reset') {
		}
		else {
			const list = this.state.cc.map((item, j) => {
				if (j === i) {
					if (item && item.CC)
						item.CC = v;
					else
						item = { 'CC': v }
				}
				return item;
			});
			this.setState({ cc: list });
		}

		//this.state.cc[i] = v;
		//this.setState({ cc: this.state.cc });
	}
	addCC() {
		this.setState({ cc: [...this.state.cc, ""] })
	}
	removeCC(e, index) {
		var array = [...this.state.cc]; // make a separate copy of the array		
		if (index !== -1) {
			array.splice(index, 1);
			this.setState({ cc: array });
		}
	}
	getCC() {
		let ccValues = this.props.ccValues
		return <div>
			{
				this.state.cc.map((value, index) => {
					var ccValue = (value.CC ? value.CC : '')
					return (
						<Box display='div' style={{ width: '100%', margin: '5px' }}>
							<Box display='flex' flexDirection="row" key={index}>
								<Box flexGrow='1'>
									<Autocomplete
										freeSolo
										filterSelectedOptions
										inputValue={ccValue}
										options={ccValues}
										getOptionLabel={option => <li>{option}</li>}
										onChange={(e, v, r) => this.setCC(e, v, r, index)}
										onInputChange={(e, v, r) => this.setCC(e, v, r, index)}
										ChipProps={{ color: "primary" }}
										style={{ width: '100%', margin: '5px' }}
										renderInput={params => (
											<TextField
												{...params}
												required={true}
												variant="outlined"
												label={"Κοιν: " + (index + 1)}
												placeholder="Πληκτρολογήστε ή επιλέξτε..."
												fullWidth
											/>
										)}
									/>
								</Box>
								<Box alignSelf='center'>
									<Button
										variant='contained'
										size='normal'
										style={useStyles.btnRemoveCC}
										onClick={(e, v) => this.removeCC(e, index)}>
										<ClearIcon />
									</Button>
								</Box>
							</Box>
						</Box>
					)
				})
			}
			{this.state.cc && this.state.cc.length < 7 ? getButton('contained', 'small', null, useStyles.btnAuto, this.addCC, 'Προσθήκη Κοινοποίησης', null, false) : <></>}
		</div>
	}

	getEditHeaderTitle(title, accountNumber) {
		let ftitle = title ? title.substring(0, 100) + (title.length > 100 ? '...' : '') : '(Χωρίς Τίτλο)'
		return (<div>
			<span>Σύμβαση {ftitle}</span>
			<br />
			<span>Επεξεργασία {accountNumber} 'ου λογαριασμού'</span>
		</div>)
	}

	showEditHeader() {
		if (this.state.isEdit === true) {
			return (
				<Header
					title={this.getEditHeaderTitle(this.props.contractDetails.Title, this.state.AccountNumber)}
					showAdministrationOption={false}
					showNewContractOption={false}
				/>
			)
		}
	}

	getWorkConfirmationDate() {
		if (this.state.IsDownpayment === false)
			return <MyTextField tp='date' title='Ημ. Βεβαίωσης Έργου' id='WorkConfirmationDate' stateValue={this.state.WorkConfirmationDate} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
	}

	getDeliveryGoodsDate() {
		if (this.state.IsDownpayment === false)
			return <MyTextField tp='date' title='Ημ. Βεβαίωσης Έργου' id='DeliveryGoodsDate' stateValue={this.state.DeliveryGoodsDate} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
	}

	getAAYInfo() {

		return <div>
			<header style={useStyles.category}>Στοιχεία ΑΑΥ</header>
			<div style={useStyles.divRowFlex}>
				<ProtocolInput tm1={getAayTooltipTemplate(useStyles, this.state, 4)} tm2={getAayTooltipTemplate(useStyles, this.state, 5)} title='Α.Π. Α.Α.Υ.' idn='AayProtocolNumber' idd='AayProtocolDate' protocolNumber={this.state.AayProtocolNumber} protocolDate={this.state.AayProtocolDate} onChange={this.onChange} tp1='text' tp2='date' />
				<MyTextField tm={getAayTooltipTemplate(useStyles, this.state, 1)} tp='text' title='Α.Α.Υ' id='AayValue' stateValue={this.state.AayValue} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
				<MyTextField tm={getAayTooltipTemplate(useStyles, this.state, 3)} tp='number' title='ΕΑΔ αριθμός' id='AayEadNumber' stateValue={this.state.AayEadNumber} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
				<MyTextField tm={getAayTooltipTemplate(useStyles, this.state, 6)} tp='text' title='ΑΔΑ' id='AayADA' stateValue={this.state.AayADA} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
				{this.getAAYPreviousYear()}
			</div>
		</div>
	}
	getAAYPreviousYear() {
		if (this.state.IsDownpayment === false)
			return <MyTextField tp='number' title='ΑΑΥ Προηγούμενου Έτος (για δαπάνες ΠΟΕ)' id='AayPreviousYear' stateValue={this.state.AayPreviousYear} isRequired={false} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
	}

	getDocumentsInfo() {
		return <>
			<header style={useStyles.category}>Στοιχεία Εγγράφων</header>
			<div style={useStyles.divRowFlex}>
				<MyTextField tm={getDocumentDateTooltipTemplate(useStyles, this.state)} tp='date' title='Ημερομηνία Εγγράφων' id='DocumentDate' stateValue={this.state.DocumentDate} isRequired={true} isDisabled={false} onChange={this.onChange} />
			</div>
			{this.getCC()}
			{/* {this.getCC1()}
			{this.getCC2()} */}
		</>
	}
	getFpaValueForTextField() {
		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
		if (contractDetails)
			return getFpaLabel(contractDetails.FpaValue);
		else
			return '';
	}
	getBasicAccountInfo() {
		return <>
			<header style={useStyles.category}>Στοιχεία Λογαριασμού</header>
			{this.addProtocolInfo(this.state.AccountId, this.state.AccountNumber)}
			{this.addFirstAccountProtocolInfo()}
			<div style={useStyles.divRowFlex}>
				<MyTextField tm={getAccountStartDateTooltipTemplate(useStyles, this.state)} tp='date' title='Έναρξη Λογαριασμού' id='Start' stateValue={this.state.Start} isRequired={true} isDisabled={false} onChange={this.onChange} />
				<MyTextField tm={getAccountStartDateTooltipTemplate(useStyles, this.state)} tp='date' title='Λήξη Λογαριασμού' id='End' stateValue={this.state.End} isRequired={true} isDisabled={false} onChange={this.onChange} />
				{getCheckboxField('IsFirstOfTheYear', '1ος τους έτους', this.state.IsFirstOfTheYear, useStyles.accountInfoItem, this.setCheckboxValue)}
			</div>
			<div style={useStyles.divRowFlex}>
				{getTextField('number', 'AmountPure', 'Καθαρό Ποσό', 'outlined', this.state.AmountPure, true, useStyles.accountInfoItem, false, { inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }, { shrink: true }, this.onChange)}
				<MyTextField tp='number' title='Καθαρό Ποσό' id='AmountPure' stateValue={this.state.AmountPure} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }} />
				<MyTextField tp='number' title={this.getFpaValueForTextField()} id='AmountFpa' stateValue={this.state.AmountFpa} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }} />
				<MyTextField tp='number' title='Ποσό Λογαριασμού' id='AmountTotal' stateValue={this.state.AmountTotal} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }} />
				{getButton('contained', 'small', null, useStyles.btnAuto, this.autoComplete, 'ΥΠΟΛΟΓΙΣΜΟΣ', null, false)}
			</div>
			<div style={useStyles.divRowFlex}>
				<MyTextField tp='text' title='Ποσό Ολογράφως' id='AmountFullWritten' stateValue={this.state.AmountFullWritten} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center', width: '800px' }, inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }} />
				{getButton('contained', 'small', null, useStyles.btnAuto, this.autoCompleteFullWritten, 'ΥΠΟΛΟΓΙΣΜΟΣ', null, false)}
			</div>
			<div style={useStyles.divRowFlex}>
				{this.getWorkConfirmationDate()}
				{this.getDeliveryGoodsDate()}
			</div>
		</>
	}

	getInvoiceInfo() {
		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
		return <>
			<header style={useStyles.category}>Στοιχεία Τιμολογίου</header>
			<div style={useStyles.divRowFlex}>
				<MyTextField tm={getInvoiceTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, 5)} tp='date' title='Ημ/νία Παραλαβής Τιμολογίου' id='InvoiceDeliveredDate' stateValue={this.state.InvoiceDeliveredDate} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} />
				<ProtocolInput tm1={getInvoiceTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, 3)} tm2={getInvoiceTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, 4)} title='Α.Π. Ημ/νίας Παραλαβής Τιμολογίου' idn='InvoiceDeliveredDateProtocolNumber' idd='InvoiceDeliveredDateProtocolDate' protocolNumber={this.state.InvoiceDeliveredDateProtocolNumber} protocolDate={this.state.InvoiceDeliveredDateProtocolDate} onChange={this.onChange} tp1='text' tp2='date' />
				<ProtocolInput tm1={getInvoiceTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, 1)} tm2={getInvoiceTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, 2)} title='Α.Π. Τιμολογίου' idn='InvoiceNumber' idd='InvoiceDate' protocolNumber={this.state.InvoiceNumber} protocolDate={this.state.InvoiceDate} onChange={this.onChange} tp1='text' tp2='date' />
			</div>
		</>
	}

	getSignaturesForAccount() {
		return <>
			<header style={useStyles.category}>Υπογραφές για αρχείο '{this.state.AccountNumber}ος Λογαριασμός' </header>
			<div style={useStyles.divRowFlex}>
				{getSelectField('SignType1', 'Τίτλος υπογράφων', this.loadSignatoryTypes([1, 2], this.state.SignType1), this.state.SignType1, true, useStyles.selectSignatures, this.onChange)}
				<span style={{ marginLeft: '30px' }}></span>
				{getSelectField('SignName1', 'Όνομα υπογράφων', this.loadSignatories(this.state.SignName1), this.state.SignName1, true, useStyles.selectSignatures, this.onChange)}
			</div>
			<div style={useStyles.divRowFlex}>
				{getSelectField('SignType2', 'Τίτλος υπογράφων', this.loadSignatoryTypes([5, 6], this.state.SignType2), this.state.SignType2, true, useStyles.selectSignatures, this.onChange)}
				<span style={{ marginLeft: '30px' }}></span>
				{getSelectField('SignName2', 'Όνομα υπογράφων', this.loadSignatories(this.state.SignName2), this.state.SignName2, true, useStyles.selectSignatures, this.onChange)}
			</div>
			<div style={useStyles.divRowFlex}>
				{getSelectField('SignType3', 'Τίτλος υπογράφων', this.loadSignatoryTypes([3, 4], this.state.SignType3), this.state.SignType3, true, useStyles.selectSignatures, this.onChange)}
				<span style={{ marginLeft: '30px' }}></span>
				{getSelectField('SignName3', 'Όνομα υπογράφων', this.loadSignatories(this.state.SignName3), this.state.SignName3, true, useStyles.selectSignatures, this.onChange)}
				{getCheckboxField('AbsenseOfDirector1', 'κ.κ.α.', this.state.AbsenseOfDirector1, useStyles.accountInfoItem, this.setCheckboxValue)}
			</div>
		</>
	}
	getSignaturesForTransmission() {
		return <>
			<header style={useStyles.category}>Υπογραφές για αρχείο 'Διαβιβαστικό Έγγραφο {this.state.AccountNumber}ου Λογαριασμού' </header>
			<div style={useStyles.divRowFlex}>
				{getSelectField('SignType4', 'Τίτλος υπογράφων', this.loadSignatoryTypes([3, 4], this.state.SignType4), this.state.SignType4, true, useStyles.selectSignatures, this.onChange)}
				<span style={{ marginLeft: '30px' }}></span>
				{getSelectField('SignName4', 'Όνομα υπογράφων', this.loadSignatories(this.state.SignName4), this.state.SignName4, true, useStyles.selectSignatures, this.onChange)}
				{getCheckboxField('AbsenseOfDirector2', 'κ.κ.α.', this.state.AbsenseOfDirector2, useStyles.accountInfoItem, this.setCheckboxValue)}
			</div>
		</>
	}

	getDownpaymentInfo() {
		if (this.state.IsDownpayment === true) {
			return <>
				{this.getTemplateForDownpaymentLawArticle()}
			</>
		}
	}

	getTemplateForDownpaymentLawArticle() {
		return (<>
			<header style={useStyles.category}>“Πόροι – Χρηματοδότηση – Προϋπολογισμός”</header>
			<div style={useStyles.divRowFlex}>
				{getTextFieldWithTooltip(getLawArticleTooltip(useStyles, this.state, this.props.contractDetails), 'number', 'DownpaymentLawArticle', 'Άρθρο', 'outlined', this.state.DownpaymentLawArticle, true, useStyles.accountInfoItem, false, null, { shrink: true }, this.onChange)}
			</div>
		</>)
	}

	addMonitoringCommittee() {
		let newValue = this.state.HasMonitoringCommittee ? false : true
		this.setState({ HasMonitoringCommittee: newValue })
	}

	removeMonitoringCommittee() {
		let newValue = this.state.HasMonitoringCommittee ? false : true
		this.setState({ HasMonitoringCommittee: newValue })
	}

	getMonitoringCommiteeInfo() {
		var contractDetails = this.props.isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
		return <>
			<header style={useStyles.category}>Στοιχεία Επιτροπής Παρακολούθησης</header>
			{this.state.HasMonitoringCommittee === true ?
				<div>
					<div style={useStyles.divRowFlex}>
						<ProtocolInput tm1={getMayorDecisionProtocolTooltip(useStyles, this.state, 1)} tm2={getMayorDecisionProtocolTooltip(useStyles, this.state, 2)} title='Α.Π. Απόφασης Δημάρχου' idn='MayorDecisionForMembersProtocolNumber' idd='MayorDecisionForMembersProtocolDate' protocolNumber={this.state.MayorDecisionForMembersProtocolNumber} protocolDate={this.state.MayorDecisionForMembersProtocolDate} onChange={this.onChange} tp1='text' tp2='date' />
						<MyTextField tm={getMonitoringCommitteePracticalTooltip(useStyles, this.state, this.state.AccountNumber, 1)} tp='date' title='Ημ. Πρακτικού Συνεδρίασης' id='MonitoringCommitteePracticalDate' stateValue={this.state.MonitoringCommitteePracticalDate} isRequired={true} isDisabled={false} onChange={this.onChange} style={{ width: 'auto' }} />
						<ProtocolInput tm1={getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails, this.state.AccountNumber, 1)} tm2={getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails, this.state.AccountNumber, 2)} title='Α.Π. διαβιβαστικού εγγράφου' idn='TransmissionDocumentProtocolNumber' idd='TransmissionDocumentProtocolDate' protocolNumber={this.state.TransmissionDocumentProtocolNumber} protocolDate={this.state.TransmissionDocumentProtocolDate} onChange={this.onChange} tp1='text' tp2='date' />
						<MyTextField tm={getMonitoringCommitteeTooltipTemplate(useStyles, this.state, contractDetails.ConcessionaireName, this.state.AccountNumber, 3)} tp='text' title='Χρονικός ορίζοντας των περιεχομένων του παραδοτέου του φυσικού αντικειμένου' id='MonitoringCommitteeContentGivenWorkTime' stateValue={this.state.MonitoringCommitteeContentGivenWorkTime} isRequired={true} isDisabled={false} onChange={this.onChange} />
					</div>
				</div> : <></>}
			<div>
				{getButton('contained', 'small', null, useStyles.btnAuto, this.state.HasMonitoringCommittee === true ? this.removeMonitoringCommittee : this.addMonitoringCommittee, this.state.HasMonitoringCommittee === true ? 'Διαγραφή στοιχείων επιτροπής παρακολούθησης' : 'Προσθήκη στοιχείων επιτροπής παρακολούθησης', null, false)}
			</div>
		</>
	}

	render() {

		return (
			<Body>
				<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap' }}>
					<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
						<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap', flexBasis: '100%', flex: '1', backgroundColor: '#fff', overflowY: 'auto' }}>

							<form style={{ padding: '10px', position: 'relative' }} autoComplete="off" onSubmit={this.handleSubmit}>
								{getSubmitButton('contained', 'primary', { position: 'fixed', left: this.props.screenDimensions.width - 250, top: this.props.screenDimensions.height - (getHeaderHeight() + getFooterHeight()) }, null, 'Αποθήκευση',
									<Icon style={{ marginLeft: '10px', padding: '10px' }}>save</Icon>,
									this.state.submitButtonDisabled)}
								{this.getDocumentsInfo()}
								{this.getBasicAccountInfo()}
								{this.getAAYInfo()}
								{this.getInvoiceInfo()}
								{this.getMonitoringCommiteeInfo()}
								{/* {this.getDownpaymentInfo()} */}
								{this.getSignaturesForAccount()}
								{this.getSignaturesForTransmission()}
							</form >
							<MySnackbar state={this.state} duration={10000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
						</div>
					</div>
					{getFooterTemplate()}
				</div >
			</Body>
		);
	}
}

function mapStateToProps(state) {
	return {
		screenDimensions: state.parametricdata_reducer.screenDimensions,
		agencies: state.parametricdata_reducer.agencies,
		signatories: state.parametricdata_reducer.signatories,
		signatorytypes: state.parametricdata_reducer.signatorytypes,
		municipalityDirections: state.parametricdata_reducer.municipalityDirections,
		contractTypes: state.parametricdata_reducer.contractTypes,
		reservations: state.parametricdata_reducer.reservations,
		contractDetails: state.contracts_reducer.contractDetails,
		contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
		isSearchMode: state.contracts_reducer.isSearchMode,
		ccValues: state.parametricdata_reducer.ccValues,
		token: state.token_reducer.token
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ createAccount, updateAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(useStyles)(NewAccountForm)))