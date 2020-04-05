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
import { Redirect } from 'react-router-dom';
import format from 'string-format';

import { getFooterTemplate } from '../Common/templates'

import MySnackbar from '../Common/MySnackbar'
import Body from '../../HOC/Body/body'

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
			redirectToLogin: false,
			contractStuff: this.props.location.state ? this.props.location.state.contract.contractusers : [],
			AllUsers: this.props.location.state ? this.props.location.state.contract.AllUsers : false,
			OwnerId: this.props.location.state ? this.props.location.state.contract.OwnerId : this.props.token.data.id,
			ContractId: this.props.location.state ? this.props.location.state.contract.Id : undefined,
			DirectionId: this.props.location.state ? this.props.location.state.contract.DirectionId : '-1',
			DepartmentId: this.props.location.state ? this.props.location.state.contract.DepartmentId : '-1',
			ContractTypeId: this.props.location.state ? this.props.location.state.contract.ContractTypeId : '-1',
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
		this.setTextValue = this.setTextValue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.autoCompleteBudget = this.autoCompleteBudget.bind(this);
		this.handleClose = this.handleClose.bind(this, '');
		this.handleContractStuff = this.handleContractStuff.bind(this);
		this.selectAllStuff = this.selectAllStuff.bind(this);
		this.getSelectedUsers = this.getSelectedUsers.bind(this);
	}

	handleContractStuff(e) {
		this.setState({ contractStuff: this.getUserIds(e) });
		// this.setState({ contractStuff: e.target.value });
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
		if (this.props.token && this.props.token.data) {
			this.setState({ UserId: this.props.token.data.id })

			var dtNow = new Date()
			var dtTokeExpiresAt = new Date(this.props.token.data.expiresAt);
			var dtDiffs = (dtTokeExpiresAt - dtNow)
			if (dtDiffs <= 0)
				this.setState({ redirectToLogin: true })
			else {
				var diffMins = Math.round(dtDiffs / 60000); // minutes
				if (diffMins >= 0 && diffMins <= 7) {
					var msg = format('H συνεδρία θα λήξει σε {} {}! {}', diffMins, diffMins > 1 ? 'λεπτά' : 'λεπτό', 'Θα ήταν προτιμότερο να γίνει έξοδος!');
					this.setState({ message: msg, openMessage: true, variant: 'info', submitButtonDisabled: false });
				}
			}
		}
		else
			this.setState({ redirectToLogin: true })
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
	setTextValue(event) {
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

	getFirstColumn(label) {
		return <td style={styles.column}>
			<InputLabel ><b>{label}</b></InputLabel>
		</td>
	}

	getSelectUsersTemplate() {

		if (this.props.token && this.props.token.data) {
			if (this.props.token.data.id == this.state.OwnerId) {
				return <tr>
					<td style={{ width: '10%', paddingLeft: '10px' }}>
						<InputLabel><b>Προσωπικό που θα έχει πρόσβαση</b></InputLabel>
					</td>
					<td style={styles.column}>
						<SelectContractStuff
							handleContractStuff={this.handleContractStuff}
							usersHavingAccessToContract={this.state.contractStuff}
							selectAllStuff={this.selectAllStuff}
							isAllStuffChecked={this.state.AllUsers}
							selectedUsers={this.getSelectedUsers()} />
					</td>
				</tr>
			}
		}
	}

	render() {

		if (this.state.redirectToLogin) {
			console.log('New Contract: RESET_ACTION')
			store.dispatch({ type: "RESET_ACTION", payload: null });
			return <Redirect push to="/login" />;
		} else {
			return (
				<div>
					<Header
						title={this.state.ContractId ? 'Επεξεργασία Σύμβασης' : 'Δημιουργία Σύμβασης'}
						showAdministrationOption={false}
						showNewContractOption={false} />
					<Body>
						<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap' }}>
							<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
								<div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap', flexBasis: '100%', flex: '1', backgroundColor: '#fff', overflowY: 'auto' }}>
									<form style={{ padding: '10px' }} autoComplete="off" onSubmit={this.handleSubmit}>
										{getSubmitButton('contained', 'primary', { position: 'fixed', left: this.props.screenDimensions.width - 250, top: this.props.screenDimensions.height - (getHeaderHeight() + getFooterHeight()) }, null, 'Αποθήκευση', <Icon style={{ marginLeft: '10px', padding: '10px' }}>save</Icon>, this.state.submitButtonDisabled)}
										<table style={{ width: '80%' }}>
											<tbody>
												{this.getSelectUsersTemplate()}
												<tr style={styles.oddRow} >
													<td style={{ width: '10%', paddingLeft: '10px' }}>
														<InputLabel><b>Διεύθυνση</b></InputLabel>
													</td>
													<td style={styles.column}>
														{getSelectField('DirectionId', 'Επιλέξτε μια διεύθυνση', this.loadSelectMunicipalityDirections(), this.state.DirectionId, isRequired, { display: 'flex', flexGrow: '1', height: '5' }, this.setTextValue)}
													</td>
												</tr>
												<tr >
													{this.getFirstColumn('Τμήμα')}
													<td style={styles.column}>
														{getSelectField('DepartmentId', 'Επιλέξτε ένα τμήμα', this.loadMunicipalityDirectionDepartments(this.state.DirectionId), this.state.DepartmentId, isRequired, { display: 'flex', flexGrow: '1', height: '5' }, this.setTextValue)}
													</td>
												</tr>
												<tr style={styles.oddRow}>
													{this.getFirstColumn('Τύπος')}
													<td style={styles.column}>
														{getSelectField('ContractTypeId', 'Επιλέξτε ένα τύπο', this.loadContractTypes(this.state.ContractTypeId), this.state.ContractTypeId, isRequired, { display: 'flex', flexGrow: '1' }, this.setTextValue)}
													</td>
												</tr>
												<tr>
													{this.getFirstColumn('Πρωτόκολλο')}
													<td style={styles.columnWithItems}>
														{getTextField('number', 'ProtocolNumber', 'Αρ. Πρωτ.', 'outlined', this.state.ProtocolNumber, isRequired, { width: '200px', marginRight: '20px' }, false, null, { shrink: true }, this.setTextValue)}
														{getTextField('date', 'ProtocolDate', 'Ημ. Πρωτ.', 'outlined', this.state.ProtocolDate, isRequired, { width: '200px' }, false, null, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr style={styles.oddRow}>
													{this.getFirstColumn('Έναρξη/Λήξη')}
													<td style={styles.columnWithItems}>
														{getTextField('date', 'Start', 'Έναρξη Σύμβασης', 'outlined', this.state.Start, isRequired, { width: '200px', marginRight: '20px' }, false, null, { shrink: true }, this.setTextValue)}
														{getTextField('date', 'End', 'Λήξη Σύμβασης', 'outlined', this.state.End, isRequired, { width: '200px' }, false, null, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr>
													{this.getFirstColumn('Ανάδοχος')}
													<td style={styles.columnWithItems}>
														{getTextField('text', 'ConcessionaireName', 'Ανάδοχος', 'outlined', this.state.ConcessionaireName, isRequired, { display: 'flex', flexGrow: '1', marginRight: '5px' }, false, { inputProps: { maxLength: 1000 } }, { shrink: true }, this.setTextValue)}
														{getTextField('text', 'ConcessionaireAFM', 'Α.Φ.Μ.', 'outlined', this.state.ConcessionaireAFM, isRequired, { width: '200px' }, false, { inputProps: { maxLength: 20 } }, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr style={styles.oddRow}>
													{this.getFirstColumn('Τίτλος')}
													<td style={styles.column}>
														{getTextFieldMultiline(3, 'text', 'Title', 'Τίτλος', 'outlined', this.state.Title, isRequired, { display: 'flex', flexGrow: '1', marginRight: '5px' }, false, { inputProps: { maxLength: 2000 } }, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr>
													{this.getFirstColumn('CPV')}
													<td style={styles.columnWithItems}>
														{getTextField('text', 'CpvCode', 'CPV Κωδικός', 'outlined', this.state.CpvCode, isRequired, { width: '200px', marginRight: '20px' }, false, { inputProps: { maxLength: 20 } }, { shrink: true }, this.setTextValue)}
														{getTextField('text', 'CpvTitle', 'CPV Τίτλος', 'outlined', this.state.CpvTitle, isRequired, { width: '450px' }, false, { inputProps: { maxLength: 355 } }, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr style={styles.oddRow}>
													{this.getFirstColumn('Κ.Α.Ε. / Φ. / Δ.')}
													<td style={styles.columnWithItems}>
														{getTextField('text', 'KAE', 'K.A.E.', 'outlined', this.state.KAE, isRequired, { width: '150px', marginRight: '20px' }, false, { inputProps: { maxLength: 20 } }, { shrink: true }, this.setTextValue)}
														{getTextField('text', 'Actor', 'Φ.', 'outlined', this.state.Actor, isRequired, { width: '100px', marginRight: '20px' }, false, { inputProps: { maxLength: 5 } }, { shrink: true }, this.setTextValue)}
														{getTextField('text', 'CodeDirection', 'Δ.', 'outlined', this.state.CodeDirection, isRequired, { width: '100px' }, false, { inputProps: { maxLength: 5 } }, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr>
													{this.getFirstColumn('Απόφαση Κατακύρωσης')}
													<td style={styles.columnWithItems}>
														{getTextField('number', 'AwardNumber', 'Αριθμός', 'outlined', this.state.AwardNumber, isRequired, { width: '100px', marginRight: '20px' }, false, null, { shrink: true }, this.setTextValue)}
														{getTextField('date', 'AwardDate', 'Ημερομηνία', 'outlined', this.state.AwardDate, isRequired, { width: '200px', marginRight: '20px' }, false, null, { shrink: true }, this.setTextValue)}
														{getTextField('text', 'AwardAda', 'ΑΔΑ', 'outlined', this.state.AwardAda, isRequired, { width: '200px' }, false, {
															startAdornment: <InputAdornment position="start">(ΑΔΑ:</InputAdornment>,
															endAdornment: <InputAdornment position="end">)</InputAdornment>,
															maxLength: 20
														}, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
												<tr style={styles.oddRow}>
													{this.getFirstColumn('Προϋπολογισμός')}
													<td style={styles.columnWithItems}>
														{getTextField('number', 'AmountPure', 'Καθαρό Ποσό', 'outlined', this.state.AmountPure, isRequired, { width: '200px', marginRight: '20px' }, false, { inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }, { shrink: true }, this.setTextValue)}
														{getTextField('number', 'AmountFpa', getFpaLabel(getFpaValueFromReservations(this.props.reservations)), 'outlined', this.state.AmountFpa, isRequired, { width: '200px', marginRight: '20px' }, false, { inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }, { shrink: true }, this.setTextValue)}
														{getTextField('number', 'AmountTotal', 'Συνολικό Ποσό', 'outlined', this.state.AmountTotal, isRequired, { width: '200px', marginRight: '20px' }, false, { inputProps: { step: 'any' }, endAdornment: <InputAdornment position="end">€</InputAdornment> }, { shrink: true }, this.setTextValue)}
														{getButton('contained', 'small', null, styles.btnAuto, this.autoCompleteBudget, 'ΥΠΟΛΟΓΙΣΜΟΣ', null, false)}
													</td>
												</tr>
												<tr>
													{this.getFirstColumn('Προκαταβολή')}
													<td style={styles.columnWithItems}>
														{getCheckboxField('HasDownPayment', 'Ναι (Αν έχει προκαταβολή θα είναι ο 1ος λογαριασμός)', this.state.HasDownPayment, null, this.setCheckboxValue)}
													</td>
												</tr>
												<tr style={styles.oddRow}>
													{this.getFirstColumn('Αριθμός Παραδοτέων (Λογαριασμών)')}
													<td style={styles.columnWithItems}>
														{getTextField('number', 'NumberOfAccounts', '# Παραδοτέων (Λογαριασμών)', 'outlined', this.state.NumberOfAccounts, isRequired, { width: '200px', marginRight: '20px' }, false, { inputProps: { min: 0, max: 100 } }, { shrink: true }, this.setTextValue)}
													</td>
												</tr>
											</tbody>
										</table >
									</form >
								</div>
							</div>
							{getFooterTemplate()}
						</div>
						<MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' />
					</Body>
				</div >
			);
		}
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