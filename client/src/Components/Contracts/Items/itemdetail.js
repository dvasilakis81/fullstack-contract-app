import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

import { List, ListItem, Grid, Row, Col, Paper, Typography, Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Popover from '@material-ui/core/Popover';
import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

import { getDateFormat, getDateFormatForDocument, getHostUrl, getFpaLabel, getServerErrorResponseMessage } from '../../../Helper/helpermethods';
import MySnackbar from '../../Common/MySnackbar'
import store from '../../../Redux/Store/store'
//import AnalyticAccountPaymentUntilToday from '../Contracts/AnalyticAccountPaymentUntilToday';
import ReactVirtualizedTable from '../../Contracts/VirtualizedAccountsTable';
import DecisionBoardView from '../DecisionBoard/view';
import DecisionCoordinatorDecentrilizedAdministrationView from '../DecisionCoordinatorDecentrilizedAdministration/view';
import CourtOfAuditorsView from '../CourtOfAuditors/view';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//react table virtualzie
// import "../VirtualizedTable/react-table.css";
// import ReactTable from "../VirtualizedTable/react-table";
// import disablePaginationHOC from "../VirtualizedTable/disablePaginationHOC";
// import virtualizedTableHOC from "../VirtualizedTable/virtualizedTableHOC";
//const VirtualizedTable = virtualizedTableHOC(disablePaginationHOC(ReactTable));

const styles = {
	paperContractMonetaryInfoFrame: {
		padding: '10px',
		borderLeft: '1px solid black',
		borderRight: '1px solid black',
		background: '#013220'
	},
	paperContractMonetaryInfoLabel: {
		margin: '20px',
		color: 'white'
	},
	paperContractInfo: {
		padding: '10px',
		borderLeft: '0px solid black',
		borderRight: '0px solid black'
	},
	paperContractInfoLast: {
		padding: '10px',
		borderLeft: '0px solid black',
		borderRight: '0px solid black',
		borderBottom: '0px solid black'
	},
	paperMoreContractInfo: {
		padding: '10px',
		background: '#fffef3'
	}
};

class ItemDetail extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			navigateToEditContact: false,
			variant: '',
			openDeleteDialog: false,
			openDialog: false,
			openMessage: false,
			anchorEl: null,
			openDecisionBoardView: null,
			openDecisionCoordinatorDecentrilizedAdministrationView: null,
			openCourtOfAuditorsView: null,
			openView: null,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight
		}

		this.editNewContract = this.editNewContract.bind(this);
		this.handleDeleteContract = this.handleDeleteContract.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClickOpenDialog = this.handleClickOpenDialog.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handlePopoverClick = this.handlePopoverClick.bind(this);
		this.handlePopoverClose = this.handlePopoverClose.bind(this);

		this.handleDecisionBoardClick = this.handleDecisionBoardClick.bind(this);
		this.handleDecisionCoordinatorDecentrilizedAdministrationClick = this.handleDecisionCoordinatorDecentrilizedAdministrationClick.bind(this);
		this.handleCourtOfAuditorsClick = this.handleCourtOfAuditorsClick.bind(this);

	}

	handlePopoverClick(event) {
		this.setState({ anchorEl: event.currentTarget });
	}

	handleDecisionBoardClick(event) {
		this.setState({ openDecisionBoardView: event.currentTarget });
	}

	handleDecisionCoordinatorDecentrilizedAdministrationClick(event) {
		this.setState({ openDecisionCoordinatorDecentrilizedAdministrationView: event.currentTarget });
	}

	handleCourtOfAuditorsClick(event) {
		this.setState({ openCourtOfAuditorsView: event.currentTarget });
	}

	handlePopoverClose() {
		this.setState({ anchorEl: null, openDecisionBoardView: null, openDecisionCoordinatorDecentrilizedAdministrationView: null, openCourtOfAuditorsView: null });
	}

	editNewContract(e) {
		this.setState({ navigateToEditContact: true });
	}

	handleDeleteContract(e) {

		axios.post(getHostUrl() + '/deletecontract', this.props.contractDetails, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
			if (res && res.data && res.data.tokenIsValid === undefined) {
				var msg = 'Η διαγραφή της σύμβασης έγινε επιτυχώς!!!'
				this.setState({ openDeleteDialog: false, message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
				store.dispatch({ type: 'DELETE_CONTRACT', payload: res.data })
			} else {
				this.setState({ openDeleteDialog: false, message: 'Η συνεδρία έχει λήξει! Ξανακάνετε σύνδεση\n', openMessage: true, variant: 'info', submitButtonDisabled: false, doRedirect: true });
			}
		}).catch(error => {
			var msg = 'Αποτυχία διαγραφής της σύμβασης!!\n';
			this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
		})
	}

	handleClickOpen() {
		this.setState({ openDeleteDialog: true });
	}
	handleClickOpenDialog() {
		this.setState({ openDialog: true });
	}

	handleClose() {
		this.setState({ openDeleteDialog: false, openMessage: false });
	}

	getAccountColor(accountNumber, contractCreatedAccounts) {
		var buttonColor = 'lightBlue';

		if (contractCreatedAccounts) {
			for (let i = 0; i < contractCreatedAccounts.length; i++) {
				if (contractCreatedAccounts[i].Number === accountNumber) {
					buttonColor = 'lightGreen';
					break;
				}
			}
		}
		return buttonColor;
	}

	drawAccountButtons(contractInfo) {
		const items = [];
		var contractId = contractInfo.Id;
		var contractTypeId = contractInfo.ContractTypeId;
		var numberOfAccounts = contractInfo.NumberOfAccounts;
		var title = contractInfo.Title;
		var hasDownpayment = contractInfo.HasDownPayment;

		var buttonInfo = {}
		for (let index = 1; index <= numberOfAccounts; index++) {
			buttonInfo = { 'index': index, 'color': this.getAccountColor(index, contractInfo.createdaccounts) }
			items.push(buttonInfo);
		}

		return (
			<Fragment>
				{
					items.map((value, index) => {
						return (
							<Link key={value.index}
								to={{
									pathname: '/account',
									state: {
										ci: contractId,
										an: value.index,
										ct: contractTypeId,
										title: title,
										exists: (value.color === 'lightGreen' ? true : false),
										isDownpayment: (hasDownpayment && value.index === 1)
									}
								}} >
								<Button key={value.index} variant="contained" style={{ margin: '5px', background: value.color }}>
									<b>Λογαριασμός</b>: {value.index}
								</Button>
							</Link>
						)
					})
				}
			</Fragment>
		)
	}

	getEditAction() {
		//#17d3cd
		if (this.props.token.data.role <= 4)
			return (<Button variant="contained"
				style={{ margin: '5px', background: 'lightgrey' }}
				onClick={this.editNewContract}>
				<EditIcon />
				Επεξεργασία Σύμβασης
			</Button>)
		else
			return <></>
	}
	getDeleteAction(contractDetails) {
		//#ff4500
		if (this.props.token.data.id === contractDetails.OwnerId)
			return (<Button variant="contained"
				style={{ margin: '5px', background: '#FF7F7F' }}
				onClick={this.handleClickOpen}>
				<DeleteIcon />
				Διαγραφή Σύμβασης
			</Button>)
		else
			return <></>
	}

	getOpenDialogAction() {

		return (<Button variant="contained"
			style={{ margin: '5px', background: '#FF7F7F' }}
			onClick={this.handlePopoverClick}>
			Άνοιγμα διάλογου
		</Button>)
	}

	getActionsTemplate(detailItem) {

		return (<Grid item>
			<Paper style={{ padding: '0px' }} square={true}>
				{this.getEditAction()}
				{this.getDeleteAction(detailItem)}
				<Dialog
					open={this.state.openDeleteDialog}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description">
					<DialogTitle id="alert-dialog-title">{"Διαγραφή Σύμβασης"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Θέλετε να διαγράψετε την σύμβαση <b>«{detailItem.Title}»</b> και τους λογαριασμούς που σχετίζονται με αυτή;?
            </DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDeleteContract} color="primary">
							Διαγραφή
              </Button>
						<Button onClick={this.handleClose} color="primary" autoFocus>
							Ακύρωση
            </Button>
					</DialogActions>
				</Dialog>
				<MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
			</Paper>
		</Grid>)
	}

	getContractMonetaryTemplate(contractDetails) {
		let ret = <></>

		let paidAmountPure = 0;
		let paidAmountFpa = 0;
		let paidAmountTotal = 0;

		let toApprovalAmountPure = 0;
		let toApprovalAmountFpa = 0;
		let toApprovalAmountTotal = 0;
		let toApprovalAccountNumber = 0;

		if (contractDetails.createdaccounts) {
			for (let i = 0; i < contractDetails.createdaccounts.length - 1; i++) {
				paidAmountPure += Number(contractDetails.createdaccounts[i].AmountPure);
				paidAmountFpa += Number(contractDetails.createdaccounts[i].AmountFpa);
				paidAmountTotal += Number(contractDetails.createdaccounts[i].AmountTotal);
			}

			toApprovalAmountPure = Number(contractDetails.createdaccounts[contractDetails.createdaccounts.length - 1].AmountPure)
			toApprovalAmountFpa = Number(contractDetails.createdaccounts[contractDetails.createdaccounts.length - 1].AmountFpa)
			toApprovalAmountTotal = Number(contractDetails.createdaccounts[contractDetails.createdaccounts.length - 1].AmountTotal)
			toApprovalAccountNumber = contractDetails.createdaccounts[contractDetails.createdaccounts.length - 1].Number
		}

		var monetaryColor = (contractDetails.AmountTotal < paidAmountTotal ? 'red' : 'gold')
		ret = <>
			<Grid item>
				<Paper style={styles.paperContractMonetaryInfoFrame} square={true}>
					<Typography>
						<table>
							<tr>
								<td style={{ textAlign: "end" }}>
									<b style={styles.paperContractMonetaryInfoLabel}>Ποσό που εγκρίθηκε αρχικά</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={contractDetails.AmountPure} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
								<td>
									<b style={styles.paperContractMonetaryInfoLabel}>{getFpaLabel(contractDetails.FpaValue)}</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={contractDetails.AmountFpa} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
								<td>
									<b style={styles.paperContractMonetaryInfoLabel}>Σύνολο</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={contractDetails.AmountTotal} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
								<td>
								</td>
							</tr>
							<tr>
								<td style={{ textAlign: "end" }}>
									<b style={styles.paperContractMonetaryInfoLabel}>Άθροισμα των πληρωμών που έγιναν μέχρι σήμερα</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={paidAmountPure} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
								<td>
									<b style={styles.paperContractMonetaryInfoLabel}>{getFpaLabel(contractDetails.FpaValue)}</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={paidAmountFpa} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
								<td>
									<b style={styles.paperContractMonetaryInfoLabel}>Σύνολο</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={paidAmountTotal} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
								<td>
									{contractDetails.createdaccounts ? <>
										<Button
											variant='contained'
											size='small'
											style={{ margin: '5px', background: 'gold', color: '#000' }}
											onClick={this.handlePopoverClick}>
											Αναλυτικά
										</Button>
										<Popover
											open={this.state.anchorEl ? true : false}
											onClose={this.handlePopoverClose}
											anchorReference="anchorPosition"
											anchorPosition={{ top: this.getPopoverTop(this.state.windowHeight), left: this.getPopoverLeft(this.state.windowWidth) }}
											style={{ transform: document.getElementById('root').style.transform }}>
											<ReactVirtualizedTable createdAccounts={contractDetails.createdaccounts} fpaValue={contractDetails.FpaValue} />
										</Popover></> : null}
								</td>
							</tr>
							{contractDetails.createdaccounts ?
								<tr>
									<td style={{ textAlign: "end" }}>
										<b style={styles.paperContractMonetaryInfoLabel}>Πρoς έγκριση ο {toApprovalAccountNumber}ος λογαριασμός</b>
									</td>
									<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
										<NumberFormat value={toApprovalAmountPure} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
									</td>
									<td>
										<b style={styles.paperContractMonetaryInfoLabel}>{getFpaLabel(contractDetails.FpaValue)}</b>
									</td>
									<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
										<NumberFormat value={toApprovalAmountFpa} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
									</td>
									<td>
										<b style={styles.paperContractMonetaryInfoLabel}>Σύνολο</b>
									</td>
									<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
										<NumberFormat value={toApprovalAmountTotal} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
									</td>
									<td>
									</td>
								</tr> : <></>
							}
							{contractDetails.createdaccounts ? <tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td style={{ textAlign: "end" }}>
									<b style={styles.paperContractMonetaryInfoLabel}>Υπόλοιπο εγκρίσεως (Mεικτό)</b>
								</td>
								<td style={{ textAlign: "end", color: monetaryColor, fontWeight: 'bold' }}>
									<NumberFormat value={Number(contractDetails.AmountTotal) - (Number(paidAmountTotal) + Number(toApprovalAmountTotal))} displayType={'text'} thousandSeparator={'.'} decimalScale={2} fixedDecimalScale={true} decimalSeparator=',' suffix={'€'} isNumericString={true} />
								</td>
							</tr> : <></>}
						</table>
					</Typography>
				</Paper>
			</Grid >
		</>

		return ret;
	}

	getPopoverTop(windowHeight) {
		var ret = '';
		ret = (windowHeight / 2) - 250
		return ret;
	}
	getPopoverLeft(windowWidth) {
		var ret = '';
		ret = (windowWidth / 2) - 400
		return ret;
	}

	getSelectedUsers(contractDetails) {
		let users = [];

		if (this.props.users && contractDetails.contractusers) {
			for (let i = 0; i < this.props.users.length; i++) {
				let user = this.props.users[i];
				for (let j = 0; j < contractDetails.contractusers.length; j++) {
					const userHasPermission = contractDetails.contractusers[j];
					if (userHasPermission.UserId == user.Id) {
						users.push(user)
						break;
					}
				}
			}
		}

		return users;
	}

	getEmtpySpaceIfNeeded(item) {
		if (item.Lastname)
			return <span style={{ background: 'lightgrey', color: 'black', fontWeight: 'normal', width: 'auto', paddingLeft: '5px', paddingTop: '5px', paddingBottom: '5px' }}></span>
		else
			return <span></span>
	}
	getContractUserTemplate(item, color) {
		return <div style={{ background: color, color: 'black', fontWeight: 'normal', width: 'auto', paddingLeft: '3px', padding: '3px', marginLeft: '5px', marginRight: '5px', textAlign: 'center', borderRadius: '10px' }}>
			<span><AccountCircleIcon /></span>
			<span style={{ verticalAlign: 'top' }}>{item.Firstname} {item.Lastname}</span>
		</div>
	}
	getContractUsersTemplate(contractDetails) {
		if (contractDetails.AllUsers)
			return <List style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px' }}>
				<ListItem style={{ width: 'auto', margin: '0px', padding: '0px', wordWrap: 'normal', whiteSpace: 'noWrap' }}><b>Προσωπικό που έχει πρόσβαση </b></ListItem>
				<ListItem>
					<span>Όλοι οι υπόλοιποι χρήστες ({this.props.users ? (this.props.users.length - 1) : '???'})</span>
				</ListItem>
			</List>
		else {
			var contractusers = this.getSelectedUsers(contractDetails)
			if (contractusers.length === 0)
				return <List style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px' }}>
					<ListItem style={{ width: 'auto', margin: '0px', padding: '0px', wordWrap: 'normal', whiteSpace: 'noWrap' }}><b>Προσωπικό που έχει πρόσβαση </b></ListItem>
					<ListItem>
						<span>Κανένας από τους υπόλοιπους {this.props.users ? (this.props.users.length - 1) : '???'} χρήστες</span>
					</ListItem>
				</List>
			if (contractusers) {
				return (
					<List style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px' }}>
						<ListItem style={{ width: 'auto', margin: '0px', padding: '0px', wordWrap: 'normal', whiteSpace: 'noWrap' }}><b>Προσωπικό που έχει πρόσβαση </b></ListItem>
						<ListItem>
							<List style={{ display: 'flex', flexDirection: 'row', padding: '0px', flexWrap: 'wrap' }}>
								{
									contractusers.map((item, index) => {
										return (this.getContractUserTemplate(item, 'lightGrey'))
									})
								}
							</List>
						</ListItem>
					</List>
				)
			}
			else
				return <List style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px' }}>
					<ListItem style={{ width: 'auto', margin: '0px', padding: '0px', wordWrap: 'normal', whiteSpace: 'noWrap' }}><b>Προσωπικό που έχει πρόσβαση </b></ListItem>
					<ListItem>
						<span>Κανένας από τους υπόλοιπους {this.props.users ? (this.props.users.length - 1) : '???'} χρήστες</span>
					</ListItem>
				</List>
		}
	}

	getCPVTemplate(contractDetails) {
		if (contractDetails.contractTypeId == 1)
			return (<Grid item>
				<Paper style={styles.paperMoreContractInfo} square={true}>
					<Typography>
						<b>CPV Code</b> {contractDetails.CpvCode}
						<span style={{ marginLeft: '10px' }}></span>
						<b>Title</b> {contractDetails.CpvTitle}
					</Typography>
				</Paper>
			</Grid>)
		else
			return <></>
	}

	getBoardDecisionsInfoTemplate(contractDetails) {

		var quantity = contractDetails.decisionboard && contractDetails.decisionboard.length > 0 ? contractDetails.decisionboard.length : 'Δεν έχει';
		return <Grid>
			<Paper style={styles.paperMoreContractInfo} square={true}>
				<Typography>
					<b>Αποφάσεις Δημοτικού Συμβουλίου</b>
					<span style={{ marginLeft: '10px', fontWeight: '' }}>{quantity}</span>
					<Button
						variant='contained'
						size='small'
						style={{ margin: '5px', background: '#F3FCFF', color: '#000' }}
						onClick={this.handleDecisionBoardClick}>
						Προβολή
					</Button>
					<Popover
						open={this.state.openDecisionBoardView ? true : false}
						onClose={this.handlePopoverClose}
						anchorReference="anchorPosition"
						anchorPosition={{ top: this.getPopoverTop(this.state.windowHeight), left: this.getPopoverLeft(this.state.windowWidth) }}
						style={{ transform: document.getElementById('root').style.transform }}>
						<DecisionBoardView contractId={contractDetails.Id} DecisionBoard={contractDetails.decisionboard} header='Αποφάσεις Δημοτικού Συμβουλίου' />
					</Popover>
				</Typography>
			</Paper>
		</Grid>
	}

	getSADAInfoTemplate(contractDetails) {

		return <Grid>
			<Paper style={styles.paperMoreContractInfo} square={true}>
				<Typography>
					<b>Αποφάσεις Ελέγχου Νομιμότητας της Αποκεντρωμένης</b>
					<span style={{ marginLeft: '10px', fontWeight: '' }}>{contractDetails.decisioncoordinatordecentrilizedadministration ? contractDetails.decisioncoordinatordecentrilizedadministration.length : 'Δεν έχει'}</span>
					<Button
						variant='contained'
						size='small'
						style={{ margin: '5px', background: '#F3FCFF', color: '#000' }}
						onClick={this.handleDecisionCoordinatorDecentrilizedAdministrationClick}>
						Προβολή
					</Button>
					<Popover
						open={this.state.openDecisionCoordinatorDecentrilizedAdministrationView ? true : false}
						onClose={this.handlePopoverClose}
						anchorReference="anchorPosition"
						anchorPosition={{ top: this.getPopoverTop(this.state.windowHeight), left: this.getPopoverLeft(this.state.windowWidth) }}
						style={{ transform: document.getElementById('root').style.transform }}>
						<DecisionCoordinatorDecentrilizedAdministrationView contractId={contractDetails.Id} header='Αποφάσεις Ελέγχους της Αποκεντρωμένης Διοίκησης' />
					</Popover>
				</Typography>
			</Paper>
		</Grid>
	}

	getCourtOfAuditorsInfoTemplate(contractDetails) {

		return <Grid>
			<Paper style={styles.paperMoreContractInfo} square={true}>
				<Typography>
					<b>Ελεγκτικό Συνέδριο</b>
					<span style={{ marginLeft: '10px', fontWeight: '' }}>{contractDetails.courtofauditors ? contractDetails.courtofauditors.length : 'Δεν έχει'}</span>
					<Button
						variant='contained'
						size='small'
						style={{ margin: '5px', background: '#F3FCFF', color: '#000' }}
						onClick={this.handleCourtOfAuditorsClick}>
						Προβολή
					</Button>

					<Popover
						open={this.state.openCourtOfAuditorsView ? true : false}
						onClose={this.handlePopoverClose}
						anchorReference="anchorPosition"
						anchorPosition={{ top: this.getPopoverTop(this.state.windowHeight), left: this.getPopoverLeft(this.state.windowWidth) }}
						style={{ transform: document.getElementById('root').style.transform }}>
						<CourtOfAuditorsView contractId={contractDetails.Id} header='Ελεγκτικά Συνέδρια' />
					</Popover>
				</Typography>
			</Paper>
		</Grid>

		// return contractDetails.decisioncoordinatordecentrilizedadministration.map((item, index) => {
		// 	return (<Fragment>
		// 		{
		// 			<Grid item key={index}>
		// 				<Paper style={styles.paperMoreContractInfo} square={true}>
		// 					<Typography>
		// 						<b>{index + 1}η Απόφαση Ελέγχου Νομιμότητας της Αποκεντρωμένης A.Π.</b> {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? item.ProtocolDate : ''}
		// 						{item.ADA ? <span >με ΑΔΑ {item.ADA}</span> : ''}
		// 						<span style={{ marginLeft: '10px' }}></span>
		// 						{item.Content ? <span style={{ fontStyle: 'italic' }}>{item.Content}</span> : ''}
		// 					</Typography>
		// 				</Paper>
		// 			</Grid>
		// 		}
		// 	</Fragment>)
		// })		
	}

	getLawArticle(contractInfo) {
		let ret = '';

		if (contractInfo.contracttype && contractInfo.contracttype[0].ContractTypeId == 2)
			ret = <span style={{ marginLeft: '5px' }}><b>Άρθρο προγραμματικής</b> {contractInfo.LawArticle || ''}</span>
		else
			ret = <></>

		return ret;
	}
	getContractInfoTemplate(contractInfo, windowHeight) {

		return (
			<Scrollbars style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'auto', overflowX: 'hidden' }}>
				<Grid container xl style={{ flexGrow: '1', flexFlow: 'column', alignItems: 'stretch', height: '100%', maxHeight: windowHeight, overflowX: 'hidden' }}>
					{this.getActionsTemplate(contractInfo)}
					<Grid item>
						<Paper style={{ padding: '5px', fontSize: '20px', background: 'lightYellow', border: '1px solid black', display: 'flex', justifyContent: 'center' }} square={true}>
							<Typography>
								<b>Πληροφορίες σύμβασης</b>
							</Typography>
						</Paper>
					</Grid>
					<Grid item>
						<Paper style={styles.paperContractInfo} square={true}>
							<Typography>
								<List style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px' }}>
									<ListItem style={{ width: 'auto', margin: '0px', padding: '0px', wordWrap: 'normal', whiteSpace: 'noWrap' }}><b>Δημιουργός σύμβασης</b></ListItem>
									<ListItem>
										<List style={{ display: 'flex', flexDirection: 'row', padding: '0px', flexWrap: 'wrap' }}>
											{contractInfo.owner ? (this.getContractUserTemplate(contractInfo.owner[0], 'gold')) : ''}
										</List>
									</ListItem>
								</List>
							</Typography>
						</Paper>
					</Grid>
					<Grid item>
						<Paper style={styles.paperContractInfo} square={true}>
							<Typography>
								{this.getContractUsersTemplate(contractInfo)}
							</Typography>
						</Paper>
					</Grid>
					<Grid item>
						<Paper style={styles.paperContractInfo} square={true}>
							<Typography>
								<ExpansionPanel style={{ padding: '0px', margin: '0px', background: '#FFFDE8' }}>
									<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
										<Typography>
											<div style={{ color: 'black', fontWeight: 'normal', width: 'auto', paddingLeft: '3px', padding: '3px', marginLeft: '5px', marginRight: '5px', textAlign: 'center', borderRadius: '10px' }}>
												<span><b>Πατήστε για περισσότερες πληροφορίες</b></span>
												<span style={{ verticalAlign: 'top', marginLeft: '5px' }}><InfoIcon /></span>
											</div>
										</Typography>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<Grid container xl style={{ flexGrow: '1', flexFlow: 'column', alignItems: 'stretch', height: '100%', maxHeight: windowHeight, overflowX: 'hidden' }}>
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Διεύθυνση</b> {contractInfo.direction ? contractInfo.direction[0].DirectionName : ''}
														<span style={{ marginLeft: '5px' }}><b>Τμήμα</b> {contractInfo.department ? contractInfo.department[0].DepartmentName : ''}</span>
													</Typography>
												</Paper>
											</Grid>
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>K.A.E.</b> {contractInfo.KAE}
														<span style={{ marginLeft: '10px' }}></span>
														<b>Φ.</b>{contractInfo.Actor}
														<span style={{ marginLeft: '10px' }}></span>
														<b>Δ.</b>{contractInfo.CodeDirection}
													</Typography>
												</Paper>
											</Grid>
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Τύπος</b> {contractInfo.contracttype ? contractInfo.contracttype[0].ContractTypeName : ''}
														{this.getLawArticle(contractInfo)}
													</Typography>
												</Paper>
											</Grid>
											{contractInfo.contracttype && contractInfo.contracttype[0].ContractTypeId == 2 ? <Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Άρθρο Προγραμματική</b> {contractInfo.LawArticle || ''}
													</Typography>
												</Paper>
											</Grid> : <></>}
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Έναρξη</b> {getDateFormat(contractInfo.Start)}
														<span style={{ marginLeft: '10px' }}></span>
														<b>Λήξη</b> {getDateFormat(contractInfo.End)}
													</Typography>
												</Paper>
											</Grid>
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Ανάδοχος</b> {contractInfo.ConcessionaireName}  <b style={{ marginLeft: '5px' }}>Α.Φ.Μ.</b>: {contractInfo.ConcessionaireAFM}
													</Typography>
												</Paper>
											</Grid>
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Τίτλος</b> {contractInfo.Title}
													</Typography>
												</Paper>
											</Grid>
											{this.getCPVTemplate(contractInfo)}
											{this.getBoardDecisionsInfoTemplate(contractInfo)}
											{this.getSADAInfoTemplate(contractInfo)}
											{this.getCourtOfAuditorsInfoTemplate(contractInfo)}
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Α.Π.</b> {contractInfo.ProtocolNumber}/{getDateFormatForDocument(contractInfo.ProtocolDate)}
													</Typography>
												</Paper>
											</Grid>
											<Grid item>
												<Paper style={styles.paperMoreContractInfo} square={true}>
													<Typography>
														<b>Αρ.Απόφασης Κατακύρωσης</b> {contractInfo.AwardNumber}/{getDateFormatForDocument(contractInfo.AwardDate)}{' '}(ΑΔΑ: {contractInfo.AwardAda})
            			</Typography>
												</Paper>
											</Grid>
										</Grid>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							</Typography>
						</Paper>
					</Grid>
					{this.getContractMonetaryTemplate(contractInfo)}
					<Grid item>
						<Paper style={styles.paperContractInfo} square={true}>
							<Typography>
								<b># λογαριασμών</b> {contractInfo.NumberOfAccounts} {contractInfo.HasDownPayment === true ? '(Ο πρώτος λογαριασμός είναι η προκαταβολή)' : ''}
								{this.getAccountsCreatedMessage(contractInfo)}
							</Typography>
						</Paper>
					</Grid>
					<Grid item>
						<Paper style={styles.paperContractInfoLast} square={true}>
							<Typography>
								{this.drawAccountButtons(contractInfo)}
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Scrollbars >)
	}

	getAccountsCreatedMessage(detailItem) {
		if (detailItem) {
			var greenMessage = '';
			var blueMessage = '';
			var numberOfCreatedAccounts = detailItem.createdaccounts ? detailItem.createdaccounts.length : 0;
			var numberOfNoCreatedAccounts = detailItem.createdaccounts ? (detailItem.NumberOfAccounts - detailItem.createdaccounts.length) : detailItem.NumberOfAccounts;
			if (numberOfCreatedAccounts === 0) {
				greenMessage = ''
				blueMessage = 'Κανένας λογαριασμός δεν έχει δημιουργηθεί'
			}
			else if (numberOfCreatedAccounts === 1) {
				greenMessage = '1 λογαριασμός έχει δημιουργηθεί';
				if (numberOfNoCreatedAccounts > 0)
					blueMessage = numberOfNoCreatedAccounts === 1 ? '1 λογαριασμός δεν έχει δημιουργηθεί' : (numberOfNoCreatedAccounts + ' λογαριασμοί δεν έχουν δημιουργηθεί')
			}
			else {
				greenMessage = numberOfCreatedAccounts + ' λογαριασμοί έχουν δημιουργηθεί'
				if (numberOfNoCreatedAccounts > 0)
					blueMessage = numberOfNoCreatedAccounts === 1 ? '1 λογαριασμός δεν έχει δημιουργηθεί' : (numberOfNoCreatedAccounts + ' λογαριασμοί δεν έχουν δημιουργηθεί')
			}

			return <>
				<table>
					<tr>
						{this.getGreenMessage(greenMessage)}
						{this.getBlueMessage(blueMessage)}
					</tr>
				</table>
			</>;
		}
		else
			return <span>(Δεν έχει δημιουργηθεί κανείς λογαριασμός)</span>;
	}
	getGreenMessage(greenMessage) {
		if (greenMessage)
			return <>
				<td><div style={{ marginLeft: '5px', width: '20px', height: '20px', background: 'lightGreen', border: '1px solid black' }}></div></td>
				<td><span style={{ marginLeft: '5px' }}>{greenMessage}</span></td>
			</>
	}
	getBlueMessage(blueMessage) {
		if (blueMessage)
			return <>
				<td><div style={{ marginLeft: '5px', width: '20px', height: '20px', background: 'lightBlue', color: 'lightGreen', border: '1px solid black' }}></div></td>
				<td><span style={{ marginLeft: '5px' }}>{blueMessage}</span></td>
			</>
	}
	render() {

		let detailItem = null;
		if (this.props.isSearchMode)
			detailItem = this.props.contractDetailsSearchMode ? this.props.contractDetailsSearchMode : null;
		else
			detailItem = this.props.contractDetails ? this.props.contractDetails : this.props.item;

		if (this.state.navigateToEditContact) {
			return <Redirect push to={{
				pathname: '/newcontract',
				state: { contract: detailItem }
			}} />
		}
		else {
			return (
				detailItem ? this.getContractInfoTemplate(detailItem, this.props.windowsHeight) : null
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		contractDetails: state.contracts_reducer.contractDetails,
		contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
		isSearchMode: state.contracts_reducer.isSearchMode,
		token: state.token_reducer.token,
		users: state.parametricdata_reducer.users
	}
}

export default connect(mapStateToProps, null)(withStyles(styles)(ItemDetail))

{/* <VirtualizedTable
								data={contractDetails.createdaccounts}
								columns={[
									{
										Header: "#",
										accessor: "Number",
										width: '50',
									},
									{
										Header: "Έναρξη",
										accessor: "Start",
										width: 'auto',
									},
									{
										Header: "Τέλος",
										accessor: "End",
										width: 'auto',
									},
									{
										Header: "Καθαρό Ποσό",
										accessor: "AmountPure",
										width: 'auto'
									},
									{
										Header: getFpaLabel(contractDetails.FpaValue),
										accessor: "AmountFpa",
										width: 'auto',
									},
									{
										Header: "Σύνολο",
										accessor: "AmountTotal",
										width: 'auto'
									}
								]}
								className="-striped -highlight"
								style={{ width: '800px', height: '400px' }}
							/> */}
{/* <AnalyticAccountPaymentUntilToday createdAccounts={contractDetails.createdaccounts} fpaValue={contractDetails.FpaValue} /> */ }