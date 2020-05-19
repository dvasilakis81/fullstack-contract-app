import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

import {
	getHostUrl, getDateFormatForDocument, getValidMaterialDateFormat,
	getFpaValueFromReservations, getFpaLabel, getHeaderHeight, getFooterHeight, getServerErrorResponseMessage
} from '../../Helper/helpermethods';

import {
	getSelectField, getTextField, getTextFieldMultiline,
	getCheckboxField, getButton, getSubmitButton
} from '../MaterialObjects/materialobjects';
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

let isRequired = false;
class NewContract extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openMessage: false,
			message: '',
			variant: '',
			submitButtonDisabled: false,
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
			NumberOfAccounts: this.props.location.state ? this.props.location.state.contract.NumberOfAccounts : '',
			HasDownPayment: this.props.location.state ? this.props.location.state.contract.HasDownPayment : false,
			FpaValue: getFpaValueFromReservations(this.props.reservations)
		}

		this.setCheckboxValue = this.setCheckboxValue.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.autoCompleteBudget = this.autoCompleteBudget.bind(this);
		this.handleClose = this.handleClose.bind(this, '');
		this.handleContractStuff = this.handleContractStuff.bind(this);
		this.selectAllStuff = this.selectAllStuff.bind(this);
		this.getSelectedUsers = this.getSelectedUsers.bind(this);
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
					if (userHasPermission.UserId == user.Id) {
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

		if (this.state.ContractId) {
			axios.post(getHostUrl() + '/updatecontract', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
				var msg = 'Η σύμβαση με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
				this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
				store.dispatch({ type: 'UPDATE_CONTRACT', payload: res.data })

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
					var msg = 'Η σύμβαση με αριθμό πρωτοκόλλου ' + this.state.ProtocolNumber + ' ήδη υπάρχει';
					this.setState({ message: msg, openMessage: true, variant: 'info', submitButtonDisabled: false });
				}
				else {
					axios.post(getHostUrl() + '/insertcontract', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
						var msg = 'Η σύμβαση με πρωτόκολλο ' + this.state.ProtocolNumber + '/' + this.state.ProtocolDate + ' δημιουργήθηκε επιτυχώς!!!'
						this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
						store.dispatch({ type: 'INSERT_CONTRACT', payload: res.data })
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
		store.dispatch({ type: 'DO_REFRESH', payload: false })
	}

	autoCompleteBudget(event) {
		event.preventDefault();
		let fpaValue = getFpaValueFromReservations(this.props.reservations) / 100

		if (this.state.AmountPure && Number(this.state.AmountPure) > 0) {
			this.setState((state) => ({
				AmountPure: Number(state.AmountPure).toFixed(2),
				AmountFpa: (Number(state.AmountPure) * fpaValue).toFixed(2),
				AmountTotal: (Number(state.AmountPure) + (Number(state.AmountPure) * fpaValue)).toFixed(2)
			}));
		} else if (this.state.AmountTotal && Number(this.state.AmountTotal) > 0) {
			this.setState((state) => ({
				AmountPure: (Number(state.AmountTotal) / (1 + fpaValue)).toFixed(2),
				AmountFpa: (Number(state.AmountTotal) - (Number(state.AmountTotal) / (1 + fpaValue))).toFixed(2),
				AmountTotal: Number(state.AmountTotal).toFixed(2)
			}));
		}
		else {
			var errMsg = '"Είτε το Καθαρό Ποσό ή το Συνολικό Ποσό πρέπει να έχει κάποια τιμή!"\n';
			this.setState({ message: errMsg, openMessage: true, variant: 'info', submitButtonDisabled: false });
		}
	}

	setCheckboxValue(e) {
		this.setState({ [e.target.id]: e.target.checked });
	}
	onChange(event) {
		this.setState({ [event.target.id]: event.target.value });
	}
	handleClose = (event, reason) => {
		this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
	};

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
			this.props.municipalityDirections.find(function (element) {
				if (element.DirectionId == DirectionId) {
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

		if (this.props.contractTypes) {
			ret = this.props.contractTypes.map((data, index) => {
				return <option key={index} value={data.ContractTypeId}>{data.ContractTypeName}</option>
			})
		}

		return ret;
	}

	getSelectUsersTemplate() {

		if (this.props.token && this.props.token.data) {
			if (this.props.token.data.id == this.state.OwnerId) {
				return <SelectContractStuff
					handleContractStuff={this.handleContractStuff}
					usersHavingAccessToContract={this.state.contractStuff}
					selectAllStuff={this.selectAllStuff}
					isAllStuffChecked={this.state.AllUsers}
					selectedUsers={this.getSelectedUsers()} />
			}
		}
	}

	render() {
		var divWidth = this.props.screenDimensions.width > this.props.screenDimensions.height ? '80%' : '100%'
		return (
			<div>
				<Header
					title={this.state.ContractId ? 'Επεξεργασία Σύμβασης' : 'Δημιουργία Σύμβασης'}
					showAdministrationOption={false}
					showNewContractOption={false} />
				<Body>
					<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'hidden', overflowX: 'hidden'}}>
						<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
							<div style={{ width: divWidth, height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'normal', overflowX: 'hidden' }}>
								<form style={{ padding: '10px' }} autoComplete="off" onSubmit={this.handleSubmit}>
									{getSubmitButton('contained', 'primary', { position: 'fixed', left: this.props.screenDimensions.width - 250, top: this.props.screenDimensions.height - (getHeaderHeight() + getFooterHeight()) }, null, 'Αποθήκευση', <Icon style={{ marginLeft: '10px', padding: '10px' }}>save</Icon>, this.state.submitButtonDisabled)}
									<div style={{ display: 'flex', flexFlow: 'column', width: '100%', flexWrap: 'wrap' }}>
										<div style={{ margin: '10px', width: '100%' }}>
											{this.getSelectUsersTemplate()}
										</div>
										<div style={styles.divRow}>
											<MyTextField title='Διεύθυνση' id='DirectionId' stateValue={this.state.DirectionId} values={this.loadSelectMunicipalityDirections()} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='50%'/>
											<MyTextField title='Τμήμα' id='DepartmentId' stateValue={this.state.DepartmentId} values={this.loadMunicipalityDirectionDepartments(this.state.DirectionId)} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='50%'/>
										</div>
										<div style={styles.divRow}>
											<ProtocolInput title='Α.Π.' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' width='33.33%'/>
											<MyTextField tp='date' title='Έναρξη Σύμβασης' id='Start' stateValue={this.state.Start} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} width='33.33%'/>
											<MyTextField tp='date' title='Λήξη Σύμβασης' id='End' stateValue={this.state.End} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} width='33.33%'/>
										</div>
										<div style={styles.divRow}>
											<MyTextField title='Τύπος' id='ContractTypeId' stateValue={this.state.ContractTypeId} values={this.loadContractTypes(this.state.ContractTypeId)} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='20%'/>
											{this.state.ContractTypeId == 2 ?
												<MyTextField tm={getLawArticleTooltip(this.state)} title='Άρθρο Προγραμματικής' id='LawArticle' stateValue={this.state.LawArticle} isRequired={true} isDisabled={false} onChange={this.onChange} width='80%'/>
												:
												<></>}
										</div>
										<div style={styles.divRow}>
											<MyTextField tp='text' title='K.A.E.' id='KAE' stateValue={this.state.KAE} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { maxLength: 20 } }} width='20%' />
											<MyTextField tp='text' title='Φ.' id='Actor' stateValue={this.state.Actor} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { maxLength: 5 } }} width='20%' />
											<MyTextField tp='text' title='Δ.' id='CodeDirection' stateValue={this.state.CodeDirection} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { maxLength: 5 } }} width='20%' />
											<ProtocolInput title='Α.Α.Κ. Α.Π.' idn='AwardNumber' idd='AwardDate' protocolNumber={this.state.AwardNumber} protocolDate={this.state.AwardDate} onChange={this.onChange} tp1='text' tp2='date' width='20%' />
											<MyTextField tp='text' title='Α.Α.Κ. ΑΔΑ' id='AwardAda' stateValue={this.state.AwardAda} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} width='20%' />
										</div>
										{
											this.state.ContractTypeId == 1 ? <div style={styles.divRow}>
												<MyTextField tp='text' title='CPV Κωδικός' id='CpvCode' stateValue={this.state.CpvCode} isRequired={false} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { maxLength: 20 } }} width='20%'/>
												<MyTextField tp='text' title='CPV Τίτλος' id='CpvTitle' stateValue={this.state.CpvTitle} isRequired={false} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, inputProps: { maxLength: 355 } }} width='80%'/>
											</div> : <></>
										}										
										<div style={styles.divRow}>
											<MyTextField tp='text' title='Όνομα Αναδόχου' id='ConcessionaireName' stateValue={this.state.ConcessionaireName} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} width='80%' />
											<MyTextField tp='text' title='Α.Φ.Μ. Αναδόχου' id='ConcessionaireAFM' stateValue={this.state.ConcessionaireAFM} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} width='20%' />
										</div>
										<div style={styles.divRow}>
											<MyTextField tp='text' title='Τίτλος' id='Title' stateValue={this.state.Title} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center', inputProps: { maxLength: 2000 } } }} multiline={true} width='100%' />
										</div>
										<div style={styles.divRow}>
											<MyTextField tp='number' title='Καθαρό Ποσό' id='AmountPure' stateValue={this.state.AmountPure} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: "center" } }} InputProps={{ endAdornment: <InputAdornment position="end"><span style={{ fontWeight: 'bolder', marginRight: '10px' }}>€</span></InputAdornment> }} width='20%'/>
											<MyTextField tp='number' title={getFpaLabel(getFpaValueFromReservations(this.props.reservations))} id='AmountFpa' stateValue={this.state.AmountFpa} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: "center" } }} InputProps={{ endAdornment: <InputAdornment position="end"><span style={{ fontWeight: 'bolder', marginRight: '10px' }}>€</span></InputAdornment> }} width='20%'/>
											<MyTextField tp='number' title='Συνολικό Ποσό' id='AmountTotal' stateValue={this.state.AmountTotal} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: "center" } }} InputProps={{ endAdornment: <InputAdornment position="end"><span style={{ fontWeight: 'bolder', marginRight: '10px' }}>€</span></InputAdornment> }} width='20%'/>
											{getButton('contained', 'small', null, styles.btnAuto, this.autoCompleteBudget, 'ΥΠΟΛΟΓΙΣΜΟΣ', null, false)}
										</div>	
										<div style={styles.divRow}>
											<MyTextField tp='number' title='# Παραδοτέων (Λογαριασμών)' id='NumberOfAccounts' stateValue={this.state.NumberOfAccounts} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: "center" }, inputProps: { min: 0, max: 100 } }} />
											{getCheckboxField('HasDownPayment', 'Eχει προκαταβολή (Αν ναι θα είναι ο 1ος λογαριασμός)', this.state.HasDownPayment, null, this.setCheckboxValue)}
										</div>
									</div> 
								</form>
							</div>
						</div>
						{getFooterTemplate()}
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
		reservations: state.parametricdata_reducer.reservations,
		users: state.parametricdata_reducer.users,
		token: state.token_reducer.token
	}
}

export default connect(mapStateToProps, null)(withStyles(styles)(NewContract))