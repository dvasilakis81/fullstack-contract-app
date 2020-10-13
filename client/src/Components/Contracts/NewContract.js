import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { findLocalIp } from '../../Helper/helpermethods';

import {
	getHostUrl, getDateFormatForDocument, getValidMaterialDateFormat,
	getFpaValueFromReservations, getFpaLabel, getHeaderHeight, getFooterHeight, getServerErrorResponseMessage
} from '../../Helper/helpermethods';

import { getCheckboxField, getButton, getSubmitButton } from '../MaterialObjects/materialobjects';
import store from '../../Redux/Store/store'
import Header from '../Header/header'
import SelectContractStuff from './SelectContractStuff'

//import Fab from '@material-ui/core/Fab';
//import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { getFooterTemplate } from '../Common/templates'

import MySnackbar from '../Common/MySnackbar'
import Body from '../../HOC/Body/body'

import ProtocolInput from '../CustomControls/ProtocolInput';
import MyTextField from '../CustomControls/MyTextField';

import { getLawArticleTooltip } from './TooltipMethods';
const internalIp = require('internal-ip');

const styles = {
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	menu: {
		width: 200
	},
	column: {
		padding: 10,
		width: 'auto'
	},
	columnWithItems: {
		padding: 10,
		display: 'flex',
		flexDirection: 'row',
		marginTop: '5px'
	},
	oddRow: {
		margin: 10,
		background: '#f0f0f0'
	},
	btnAuto: {
		margin: '10px',
		paddingLeft: '5px',
		paddingRight: '5px',
		background: 'lightGreen'
	},
	divRow: {
		display: 'flex',
		flexFlow: 'row',
		flex: 1,
		width: '100%',
		justifyContent: 'start'
	}
};

//let isRequired = false;
class NewContract extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openMessage: false,
			message: '',
			variant: '',
			submitButtonDisabled: false,
			loginUserInfo: this.props.token.data.user,
			contractInfo: {
				contractStuff: this.props.location.state ? this.props.location.state.contract.contractusers : [],
				AllUsers: this.props.location.state ? this.props.location.state.contract.AllUsers : false,
				OwnerId: this.props.location.state ? this.props.location.state.contract.OwnerId : this.props.token.data.id,
				ContractId: this.props.location.state ? this.props.location.state.contract.Id : undefined,
				DirectionId: this.props.location.state ? this.props.location.state.contract.DirectionId : '-1',
				DepartmentId: this.props.location.state ? this.props.location.state.contract.DepartmentId : '-1',
				ContractTypeId: this.props.location.state ? this.props.location.state.contract.ContractTypeId : '-1',
				LawArticle: this.props.location.state ? this.props.location.state.contract.LawArticle : '',
				ConcessionaireName: this.props.location.state ? this.props.location.state.contract.ConcessionaireName : '',
				ConcessionaireAFM: this.props.location.state ? this.props.location.state.contract.ConcessionaireAFM : '',
				Title: this.props.location.state ? this.props.location.state.contract.Title : '',
				Discreet: this.props.location.state ? this.props.location.state.contract.Discreet : '',
				ProtocolNumber: this.props.location.state ? this.props.location.state.contract.ProtocolNumber : '',
				ProtocolDate: this.props.location.state && this.props.location.state.contract.ProtocolDate ? getValidMaterialDateFormat(this.props.location.state.contract.ProtocolDate) : new Date(),
				KAE: this.props.location.state ? this.props.location.state.contract.KAE : '',
				Actor: this.props.location.state ? this.props.location.state.contract.Actor : '',
				CodeDirection: this.props.location.state ? this.props.location.state.contract.CodeDirection : '',
				AwardNumber: this.props.location.state ? this.props.location.state.contract.AwardNumber : '',
				AwardDate: this.props.location.state && this.props.location.state.contract.AwardDate ? getValidMaterialDateFormat(this.props.location.state.contract.AwardDate) : new Date(),
				AwardAda: this.props.location.state ? this.props.location.state.contract.AwardAda : '',
				CpvCode: this.props.location.state ? this.props.location.state.contract.CpvCode : '',
				CpvTitle: this.props.location.state ? this.props.location.state.contract.CpvTitle : '',
				AmountPure: this.props.location.state ? Number(this.props.location.state.contract.AmountPure) : '',
				AmountFpa: this.props.location.state ? Number(this.props.location.state.contract.AmountFpa) : '',
				AmountTotal: this.props.location.state ? Number(this.props.location.state.contract.AmountTotal) : '',
				Start: this.props.location.state && this.props.location.state.contract.Start ? getValidMaterialDateFormat(this.props.location.state.contract.Start) : new Date(),
				End: this.props.location.state && this.props.location.state.contract.End ? getValidMaterialDateFormat(this.props.location.state.contract.End) : new Date(),
				Discreet: this.props.location.state && this.props.location.state.contract.Discreet ? this.props.location.state.contract.Discreet : '',
				NumberOfAccounts: this.props.location.state ? this.props.location.state.contract.NumberOfAccounts : '',
				HasDownPayment: this.props.location.state ? this.props.location.state.contract.HasDownPayment : false,
				FpaValue: getFpaValueFromReservations(this.props.token.data.user.reservations),
				AccountPer: this.props.location.state ? this.props.location.state.contract.AccountPer : '',
				IpAddress: ''
			},
		}

		this.setCheckboxValue = this.setCheckboxValue.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChangeStart = this.onChangeStart.bind(this);
		this.onChangeEnd = this.onChangeEnd.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.autoCompleteBudget = this.autoCompleteBudget.bind(this);
		this.handleClose = this.handleClose.bind(this, '');
		this.handleContractStuff = this.handleContractStuff.bind(this);
		this.selectAllStuff = this.selectAllStuff.bind(this);
		this.getSelectedUsers = this.getSelectedUsers.bind(this);
		this.loadSelectAccountPer = this.loadSelectAccountPer.bind(this);
	}

	componentWillMount() {

		//var os = require('os');
		//var networkInterfaces = os.networkInterfaces();
		//var arr = networkInterfaces['Local Area Connection 3'];
		//var ip = arr[1].address

		//var localip = require('os');
		//console.log('localip: ', localip);

		axios.get('http://api.ipify.org/?format=json').then(res => {
			this.setState(prevState => ({
				contractInfo: {
					...prevState.contractInfo,
					IpAddress: res.data && res.data.ip ? res.data.ip : ''
				}
			}))
		})
	}
	handleContractStuff(e) {
		this.setState({ contractStuff: this.getUserIds(e) });
	};

	selectAllStuff() {
		this.setState({ AllUsers: !this.state.AllUsers });
		this.setState({ contractStuff: !this.state.AllUsers ? this.getUserIds(this.props.users) : [] });
	}

	getUserIds(e) {
		let userIds = [];

		if (e) {
			for (let i = 0; i < e.length; i++)
				userIds.push({ 'UserId': e[i].Id })
		}

		return userIds;
	}
	getSelectedUsers() {
		let users = [];

		if (this.props.users && this.state.contractStuff) {
			for (let i = 0; i < this.props.users.length; i++) {
				let user = this.props.users[i];
				for (let j = 0; j < this.state.contractStuff.length; j++) {
					const userHasPermission = this.state.contractStuff[j];
					if (userHasPermission.UserId.toString() === user.Id.toString()) {
						users.push(user)
						break;
					}
				}
			}
		}

		return users;
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ submitButtonDisabled: true });

		if (this.state.contractInfo.ContractId) {
			axios.post(getHostUrl() + '/updatecontract', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
				var msg = ''
				if (this.state.ProtocolNumber)
					msg = 'Η σύμβαση με πρωτόκολλο "' + this.state.contractInfo.ProtocolNumber + '/' + getDateFormatForDocument(this.state.contractInfo.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
				else
					msg = 'Η σύμβαση επεξεργάστηκε επιτυχώς!!!'
				this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
				store.dispatch({ type: 'UPDATE_CONTRACT', payload: res.data })

				var snackbarInfo = {}
				snackbarInfo.openMessage = true;
				snackbarInfo.message = msg;
				snackbarInfo.variant = 'success';

				store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });

				this.props.history.goBack();
			}).catch(error => {
				var msg = 'Αποτυχία επεξεργασίας σύμβασης!!\n' + error;
				this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
			});
		}
		else {

			axios.post(getHostUrl() + '/contractexists', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
				var contractExists = res.data;
				if (contractExists === true) {
					var msg = ''
					if (this.state.contractInfo.ProtocolNumber)
						msg = 'Η σύμβαση με αριθμό πρωτοκόλλου ' + this.state.contractInfo.ProtocolNumber + ' ήδη υπάρχει';
					else
						msg = 'Η σύμβαση ήδη υπάρχει!!!'
					var msg =
						this.setState({ message: msg, openMessage: true, variant: 'info', submitButtonDisabled: false });
				}
				else {
					axios.post(getHostUrl() + '/insertcontract', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
						var msg = "";
						if (res.data && res.data.ProtocolNumber)
							msg = 'Η σύμβαση με πρωτόκολλο ' + this.state.contractInfo.ProtocolNumber + '/' + getDateFormatForDocument(this.state.contractInfo.ProtocolDate) + ' δημιουργήθηκε επιτυχώς!!!';
						else
							msg = 'Η σύμβαση δημιουργήθηκε επιτυχώς!!!';

						this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
						store.dispatch({ type: 'INSERT_CONTRACT', payload: res.data });

						var snackbarInfo = {}
						snackbarInfo.openMessage = true;
						snackbarInfo.message = msg;
						snackbarInfo.variant = 'success';

						store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
						this.props.history.goBack();
					}).catch(error => {
						var msg = 'Αποτυχία δημιουργίας σύμβασης !!\n' + error;
						this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
					});
				}
			}).catch(error => {
				var msg = 'Αποτυχία δημιουργίας σύμβασης !!\n' + error;
				this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
			});
		}
	}

	componentDidMount() {
		store.dispatch({ type: 'DO_REFRESH', payload: false });
	}

	autoCompleteBudget(event) {
		event.preventDefault();
		event.persist();

		let fpaValue = getFpaValueFromReservations(this.props.token.data.user.reservations) / 100

		if (this.state.contractInfo.AmountPure && Number(this.state.contractInfo.AmountPure) > 0) {
			this.setState(prevState => ({
				contractInfo: {                   // object that we want to update
					...prevState.contractInfo,    // keep all other key-value pairs
					AmountPure: Number(prevState.contractInfo.AmountPure).toFixed(2),
					AmountFpa: (Number(prevState.contractInfo.AmountPure) * fpaValue).toFixed(2),
					AmountTotal: (Number(prevState.contractInfo.AmountPure) + (Number(prevState.contractInfo.AmountPure) * fpaValue)).toFixed(2)
				}
			}))
		} else if (this.state.contractInfo.AmountTotal && Number(this.state.contractInfo.AmountTotal) > 0) {
			this.setState(prevState => ({
				contractInfo: {                   // object that we want to update
					...prevState.contractInfo,    // keep all other key-value pairs
					AmountPure: (Number(prevState.contractInfo.AmountTotal) / (1 + fpaValue)).toFixed(2),
					AmountFpa: (Number(prevState.contractInfo.AmountTotal) - (Number(prevState.contractInfo.AmountTotal) / (1 + fpaValue))).toFixed(2),
					AmountTotal: Number(prevState.contractInfo.AmountTotal).toFixed(2)
				}
			}))
		}
		else {
			var errMsg = '"Είτε το Καθαρό Ποσό ή το Συνολικό Ποσό πρέπει να έχει κάποια τιμή!"\n';
			this.setState({ message: errMsg, openMessage: true, variant: 'info', submitButtonDisabled: false });
		}
	}

	setCheckboxValue(e) {
		this.setState({ [e.target.id]: e.target.checked });
	}
	monthDiff(d1, d2) {
		var months;
		months = (d2.getFullYear() - d1.getFullYear()) * 12;
		months -= d1.getMonth();
		months += d2.getMonth();
		return months <= 0 ? 0 : months;
	}
	onChange(event) {
		event.persist();

		if (event.target.id === 'AccountPer') {

			var accountPer = event.target.value;
			if (accountPer) {
				var months = this.monthDiff(new Date(this.state.contractInfo.Start), new Date(this.state.contractInfo.End));
				var numOfAccounts = Math.round(months / Number(accountPer));
				this.setState(prevState => ({
					contractInfo: {                   // object that we want to update
						...prevState.contractInfo,    // keep all other key-value pairs
						NumberOfAccounts: numOfAccounts    // update the value of specific key
					}
				}))
			}
		}

		//this.setState({ [event.target.id]: event.target.value });		

		this.setState(prevState => ({
			contractInfo: {                   // object that we want to update
				...prevState.contractInfo,    // keep all other key-value pairs
				[event.target.id]: event.target.value    // update the value of specific key				
			}
		}))
	}

	onChangeStart(e) {

		var start = e.target.value;
		var end = this.state.contractInfo.End;
		var accountPer = this.state.contractInfo.AccountPer;

		if (start && end && accountPer) {
			var months = this.monthDiff(new Date(start), new Date(end));
			var numOfAccounts = Math.round(months / Number(accountPer));

			this.setState(prevState => ({
				contractInfo: {                   // object that we want to update
					...prevState.contractInfo,    // keep all other key-value pairs
					NumberOfAccounts: numOfAccounts    // update the value of specific key
				}
			}))
			//this.setState({ NumberOfAccounts: numOfAccounts });
		}

		// this.setState({ Start: start });
		this.setState(prevState => ({
			contractInfo: {                   // object that we want to update
				...prevState.contractInfo,    // keep all other key-value pairs
				Start: start    // update the value of specific key				
			}
		}))
	}
	onChangeEnd(e) {

		var start = this.state.contractInfo.Start;
		var end = e.target.value;
		var accountPer = this.state.contractInfo.AccountPer;

		if (start && end && accountPer) {
			var months = this.monthDiff(new Date(start), new Date(end));
			var numOfAccounts = Math.round(months / Number(accountPer));
			this.setState(prevState => ({
				contractInfo: {                   // object that we want to update
					...prevState.contractInfo,    // keep all other key-value pairs
					NumberOfAccounts: numOfAccounts    // update the value of specific key				
				}
			}))
			this.setState({ NumberOfAccounts: numOfAccounts });
		}

		this.setState(prevState => ({
			contractInfo: {                   // object that we want to update
				...prevState.contractInfo,    // keep all other key-value pairs
				End: end    // update the value of specific key				
			}
		}))
		//this.setState({ End: end });
	}

	handleClose = (event, reason) => {
		this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
	};

	loadSelectAccountPer() {
		let ret = '';
		let accountPer = [];
		accountPer.push({ key: 1, value: "ανά μήνα" });
		accountPer.push({ key: 2, value: "ανά 2-μηνο" });
		accountPer.push({ key: 3, value: "ανά 3-μηνο" });
		accountPer.push({ key: 4, value: "ανά 4-μηνο" });
		accountPer.push({ key: 5, value: "ανά 5-μηνο" });
		accountPer.push({ key: 6, value: "ανά 6-μηνο" });
		accountPer.push({ key: 7, value: "ανά 7-μηνο" });
		accountPer.push({ key: 8, value: "ανά 8-μηνο" });
		accountPer.push({ key: 9, value: "ανά 9-μηνο" });
		accountPer.push({ key: 10, value: "ανά 10-μηνο" });
		accountPer.push({ key: 11, value: "ανά 11-μηνο" });
		accountPer.push({ key: 12, value: "ανά 12-μηνο" });

		ret = accountPer.map((data, index) => {
			if (this.state.contractInfo.AccountPer === data.key)
				return <option key={data.key} value={data.key} selected>{data.value}</option>
			else
				return <option key={data.key} value={data.key}>{data.value}</option>

		})

		return ret;
	}

	loadSelectMunicipalityDirections() {
		let ret = '';

		if (this.props.municipalityDirections) {
			ret = this.props.municipalityDirections.map((data, index) => {

				return <option key={index} value={data.DirectionId}>{data.DirectionName}</option>
			})
		}

		return ret;
	}
	loadMunicipalityDirectionDepartments(DirectionId) {
		let ret = '';

		if (this.props.municipalityDirections) {
			this.props.municipalityDirections.forEach(function (element) {
				if (element.DirectionId.toString() === DirectionId.toString()) {
					if (element.department != null) {
						ret = element.department.map((data, index) => {
							return <option key={index} value={data.DepartmentId}>{data.DepartmentName}</option>
						})
					}
				}
			})
		}

		return ret;
	}
	loadContractTypes() {
		let ret = '';
		let contractTypes = [
			{ ContractTypeId: 1, ContractTypeName: 'Δημόσιας Ανάθεσης' },
			{ ContractTypeId: 2, ContractTypeName: 'Προγραμματική' }
		];
		//if (this.props.contractTypes) {
		ret = contractTypes.map((data, index) => {
			if (data.ContractTypeId === 2)
				return <option key={index} value={data.ContractTypeId} selected>{data.ContractTypeName}</option>
			else
				return <option key={index} value={data.ContractTypeId}>{data.ContractTypeName}</option>
		})
		//}

		return ret;
	}

	// getSelectUsersTemplate() {

	// 	if (this.props.token && this.props.token.data) {
	// 		if (this.props.token.data.id.toString() === this.state.OwnerId.toString()) {
	// 			return <SelectContractStuff
	// 				handleContractStuff={this.handleContractStuff}
	// 				usersHavingAccessToContract={this.state.contractStuff}
	// 				selectAllStuff={this.selectAllStuff}
	// 				isAllStuffChecked={this.state.AllUsers}
	// 				selectedUsers={this.getSelectedUsers()} />
	// 		}
	// 	}
	// }

	render() {
		var divWidth = this.props.screenDimensions.width > this.props.screenDimensions.height ? '80%' : '100%'
		var title = 'Δημιουργία Σύμβασης';
		if (this.state.contractInfo.ContractId)
			title = <div><span>Επεξεργασία Σύμβασης</span><br /><span style={{ color: 'gold' }}>{this.state.contractInfo.Discreet}</span></div>;

		return (
			<div>
				<Header
					title={title}
					showAdministrationOption={false}
					showNewContractOption={false} />
				<Body>
					<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flex: '1', flexWrap: 'wrap', overflowY: 'hidden', overflowX: 'hidden' }}>
						<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
							<div style={{ width: divWidth, height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'normal', overflowX: 'hidden' }}>
								<form style={{ padding: '10px' }} autoComplete="off" onSubmit={this.handleSubmit}>
									{getSubmitButton('contained', 'primary', { position: 'fixed', left: this.props.screenDimensions.width - 250, top: this.props.screenDimensions.height - (getHeaderHeight() + getFooterHeight()) }, null, 'Αποθήκευση', <Icon style={{ marginLeft: '10px', padding: '10px' }}>save</Icon>, this.state.submitButtonDisabled)}
									<div style={{ display: 'flex', flexFlow: 'column', width: '100%', flexWrap: 'wrap' }}>
										{/* <div style={{ margin: '10px', width: '100%' }}>
											{this.getSelectUsersTemplate()}
										</div> */}
										<div style={styles.divRow}>
											{/* style={{ margin: '0px', padding: '0px', width: w, textAlignLast: 'center' }} */}
											<MyTextField title='Διεύθυνση' id='DirectionId' stateValue={this.state.contractInfo.DirectionId} values={this.loadSelectMunicipalityDirections()} InputProps={{ inputProps: { style: { textAlignLast: 'center' } } }} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='50%' />
											<MyTextField title='Τμήμα' id='DepartmentId' stateValue={this.state.contractInfo.DepartmentId} values={this.loadMunicipalityDirectionDepartments(this.state.contractInfo.DirectionId)} InputProps={{ inputProps: { style: { textAlignLast: 'center' } } }} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='50%' />
										</div>
										<div style={styles.divRow}>
											<ProtocolInput title='Α.Π.' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.contractInfo.ProtocolNumber} protocolDate={this.state.contractInfo.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' width='33.33%' />
											<MyTextField tp='date' title='Έναρξη Σύμβασης' id='Start' stateValue={this.state.contractInfo.Start} isRequired={true} isDisabled={false} onChange={this.onChangeStart} inputProps={{ style: { textAlign: 'center' } }} width='33.33%' />
											<MyTextField tp='date' title='Λήξη Σύμβασης' id='End' stateValue={this.state.contractInfo.End} isRequired={true} isDisabled={false} onChange={this.onChangeEnd} inputProps={{ style: { textAlign: 'center' } }} width='33.33%' />
										</div>
										<div style={styles.divRow}>
											<MyTextField title='Τύπος' id='ContractTypeId' stateValue={this.state.contractInfo.ContractTypeId} values={this.loadContractTypes(this.state.contractInfo.ContractTypeId)} InputProps={{ inputProps: { style: { textAlignLast: 'center' } } }} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='20%' />
											{this.state.contractInfo.ContractTypeId.toString() === '2' ?
												<MyTextField tm={getLawArticleTooltip(this.state)} title='Άρθρο Προγραμματικής' id='LawArticle' stateValue={this.state.contractInfo.LawArticle} isRequired={true} isDisabled={false} onChange={this.onChange} width='80%' />
												:
												<></>}
										</div>
										<div style={styles.divRow}>
											<MyTextField tp='text' title='K.A.E.' id='KAE' stateValue={this.state.contractInfo.KAE} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 20, style: { textAlign: 'center' } } }} width='20%' />
											<MyTextField tp='text' title='Φ.' id='Actor' stateValue={this.state.contractInfo.Actor} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 5, style: { textAlign: 'center' } } }} width='20%' />
											<MyTextField tp='text' title='Δ.' id='CodeDirection' stateValue={this.state.contractInfo.CodeDirection} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 5, style: { textAlign: 'center' } } }} width='20%' />
											<ProtocolInput title='Α.Α.Κ. Α.Π.' idn='AwardNumber' idd='AwardDate' protocolNumber={this.state.contractInfo.AwardNumber} protocolDate={this.state.contractInfo.AwardDate} onChange={this.onChange} tp1='text' tp2='date' width='20%' />
											<MyTextField tp='text' title='Α.Α.Κ. ΑΔΑ' id='AwardAda' stateValue={this.state.contractInfo.AwardAda} isRequired={false} isDisabled={false} onChange={this.onChange} ΙnputProps={{ inputProps: {maxLength: 20, style: { textAlign: 'center' }} }} width='20%' />
										</div>
										{
											this.state.contractInfo.ContractTypeId.toString() === '1' ? <div style={styles.divRow}>
												<MyTextField tp='text' title='CPV Κωδικός' id='CpvCode' stateValue={this.state.contractInfo.CpvCode} isRequired={false} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 20, style: { textAlign: 'center' } } }} width='20%' />
												<MyTextField tp='text' title='CPV Τίτλος' id='CpvTitle' stateValue={this.state.contractInfo.CpvTitle} isRequired={false} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 355, style: { textAlign: 'center' } } }} width='80%' />
											</div> : <></>
										}
										<div style={styles.divRow}>
											<MyTextField tp='text' title='Όνομα Αναδόχου' id='ConcessionaireName' stateValue={this.state.contractInfo.ConcessionaireName} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ style: { textAlign: 'center' } }} width='80%' />
											<MyTextField tp='text' title='Α.Φ.Μ. Αναδόχου' id='ConcessionaireAFM' stateValue={this.state.contractInfo.ConcessionaireAFM} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ style: { textAlign: 'center' } }} width='20%' />
										</div>
										<div style={styles.divRow}>
											<MyTextField tp='text' title='Διακριτικός Τίτλος' id='Discreet' stateValue={this.state.contractInfo.Discreet} isRequired={false} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 2000, style: { textAlign: 'center' } } }} multiline={true} width='100%' />
											<MyTextField tp='text' title='Τίτλος' id='Title' stateValue={this.state.contractInfo.Title} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { maxLength: 2000, style: { textAlign: 'center' } } }} multiline={true} width='100%' />
										</div>
										<div style={styles.divRow}>
											<MyTextField tp='number' title='Καθαρό Ποσό' id='AmountPure' stateValue={this.state.contractInfo.AmountPure} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: "center" } }} InputProps={{ endAdornment: <InputAdornment position="end"><span style={{ fontWeight: 'bolder', marginRight: '10px' }}>€</span></InputAdornment> }} width='20%' />
											<MyTextField tp='number' title={getFpaLabel(getFpaValueFromReservations(this.props.token.data.user.reservations))} id='AmountFpa' stateValue={this.state.contractInfo.AmountFpa} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: "center" } }} InputProps={{ endAdornment: <InputAdornment position="end"><span style={{ fontWeight: 'bolder', marginRight: '10px' }}>€</span></InputAdornment> }} width='20%' />
											<MyTextField tp='number' title='Συνολικό Ποσό' id='AmountTotal' stateValue={this.state.contractInfo.AmountTotal} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} InputProps={{ endAdornment: <InputAdornment position="end"><span style={{ fontWeight: 'bolder', marginRight: '10px' }}>€</span></InputAdornment> }} width='20%' />
											{getButton('contained', 'small', null, styles.btnAuto, this.autoCompleteBudget, 'ΥΠΟΛΟΓΙΣΜΟΣ', null, false)}
										</div>
										<div style={styles.divRow}>
											<MyTextField title='Λογαριασμός ανά' id='AccountPer' stateValue={this.state.contractInfo.AccountPer} values={this.loadSelectAccountPer()} InputProps={{ inputProps: { style: { textAlignLast: 'center' } } }} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='20%' />
											<MyTextField tp='number' title='# Παραδοτέων (Λογαριασμών)' id='NumberOfAccounts' stateValue={this.state.contractInfo.NumberOfAccounts} isRequired={true} isDisabled={false} onChange={this.onChange} InputProps={{ inputProps: { max: 100, min: 1, style: { textAlign: 'center' } } }} width='20%' />
											{getCheckboxField('HasDownPayment', 'Eχει προκαταβολή (Αν ναι θα είναι ο 1ος λογαριασμός)', this.state.contractInfo.HasDownPayment, null, this.setCheckboxValue)}
										</div>
									</div>
								</form>
							</div>
						</div>
						{getFooterTemplate(this.props.token)}
					</div>
					<MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
				</Body >
			</div >
		);
	}
}

function mapStateToProps(state) {
	return {
		screenDimensions: state.parametricdata_reducer.screenDimensions,
		municipalityDirections: state.parametricdata_reducer.municipalityDirections,
		contractTypes: state.parametricdata_reducer.contractTypes,
		isSearchMode: state.contracts_reducer.isSearchMode,
		users: state.parametricdata_reducer.users,
		token: state.token_reducer.token
	}
}

export default connect(mapStateToProps, null)(withStyles(styles)(NewContract))