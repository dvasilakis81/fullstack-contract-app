import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingOverlay from 'react-loading-overlay'

import {
  getHostUrl, getDateFormatForDocument, getValidMaterialDateFormat,
  getFpaValueFromReservations, getFpaLabel, getHeaderHeight, getFooterHeight, getServerErrorResponseMessage
} from '../../../Helper/helpermethods';

import {
  getSelectField, getTextField, getTextFieldMultiline,
  getCheckboxField, getButton, getSubmitButton, getTextFieldWithTooltip
} from '../../MaterialObjects/materialobjects';

import { bindActionCreators } from 'redux';
import { createDecisionBoard, updateDecisionBoard } from '../../../Redux/Actions';

import { getDecisionBoardTooltip } from './Tooltip';

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

class DecisionBoardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMessage: false,
      message: '',
      variant: '',
      submitButtonDisabled: false,      
      addNewItem: false,
      editItem: false,
      decisionBoardIndex: 0,
      contractId: this.props.contractDetails.Id,
      Id: this.props.Id ? this.props.Id : '',
      ProtocolNumber: '',
      ProtocolDate: '',
      Content: '',
      ADA: ''
    }

    this.setTextValue = this.setTextValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this, '');
  }

  handleClose(event, reason) {
    this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
  }

  setTextValue(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  editDecisionBoard(index, decisionBoard) {
    this.setState({
      Id: decisionBoard.Id,
      ProtocolNumber: decisionBoard.ProtocolNumber,
      ProtocolDate: decisionBoard.ProtocolDate,
      Content: decisionBoard.Content,
      ADA: decisionBoard.ADA,
      decisionBoardIndex: index + 1,
      editItem: true
    })
  }

  deleteDecisionBoard(index, decisionBoard) {
    this.setState({
      Id: decisionBoard.Id
    })
  }

  getDeleteOption(index, item, decisionBoardlength) {

    return <span onClick={() => { this.deleteDecisionBoard(item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
      <IconButton size="medium" color={index < decisionBoardlength - 1 ? "disabled" : "inherit"}>
        <DeleteIcon />
      </IconButton>
    </span>
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitButtonDisabled: true });

    if (this.state.addNewItem === true) {
      this.props.createDecisionBoard(this.state, this.props.token.data.token).then(res => {
        var msg = 'Η Α.Δ.Σ. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" δημιουργήθηκε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας Α.Δ.Σ. !!\n' + error;
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
      })
    } else if (this.state.editNewItem === true) {

      // axios.post(getHostUrl() + '/contractexists', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
      //   var contractExists = res.data;
      //   if (contractExists === true) {
      //     var msg = 'Η σύμβαση με αριθμό πρωτοκόλλου ' + this.state.ProtocolNumber + ' ήδη υπάρχει';
      //     this.setState({ message: msg, openMessage: true, variant: 'info', submitButtonDisabled: false });
      //   }
      //   else {
      //     axios.post(getHostUrl() + '/insertcontract', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
      //       var msg = 'Η σύμβαση με πρωτόκολλο ' + this.state.ProtocolNumber + '/' + this.state.ProtocolDate + ' δημιουργήθηκε επιτυχώς!!!'
      //       this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
      //       store.dispatch({ type: 'INSERT_CONTRACT', payload: res.data })
      //       this.props.history.goBack();
      //     }).catch(error => {
      //       var msg = 'Αποτυχία δημιουργίας σύμβασης !!\n' + error;
      //       this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
      //     });
      //   }
      // }).catch(error => {
      //   var msg = 'Αποτυχία δημιουργίας σύμβασης !!\n' + error;
      //   this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
      // });
    }
  }

  editForm() {
    var decisionboard = this.props.contractDetails.decisionboard;
    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <>
        <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', background: 'lightBlue', justifyContent: 'center', padding: '20px' }}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.addNewItem === true ? (decisionboard ? decisionboard.length + 1 : 1) : this.state.decisionBoardIndex}ης Απόφασης Δημοτικού Συμβουλίου</div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
            {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 1), 'number', 'ProtocolNumber', 'Αρ. Πρωτ.', 'outlined', this.state.ProtocolNumber, true, { width: '200px', marginRight: '20px' }, false, null, { shrink: true }, this.setTextValue)}
            {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 2), 'date', 'ProtocolDate', 'Ημ. Πρωτ.', 'outlined', this.state.ProtocolDate, true, { width: '200px', background: 'white' }, false, null, { shrink: true }, this.setTextValue)}
          </div>
          <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
            {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 4), 'text', 'Content', 'Περιεχόμενο', 'outlined', this.state.Content, true, { width: 'auto' }, false, null, { shrink: true }, this.setTextValue)}
          </div>
          <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
            {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 3), 'text', 'ADA', 'ΑΔΑ', 'outlined', this.state.ADA, true, { width: '300px' }, false, null, { shrink: true }, this.setTextValue)}
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', justifyContent: 'center', padding: '10px' }}>
            <Button color='primary' style={{ fontSize: '18px', textAlign: 'center', disabled: this.state.submitButtonDisabled }} onClick={this.handleSubmit}>ΑΠΟΘΗΚΕΥΣΗ</Button>
            <Button color='secondary' style={{ fontSize: '18px', textAlign: 'center' }} onClick={() => { this.setState({ addNewItem: false, editItem: false }) }}>ΑΚΥΡΩΣΗ</Button>
          </div>
          <LoadingOverlay
            active={this.props.insertDecicionBoardPending === true}
            spinner
            text='Αναμονή για δημιουργία Α.Δ.Σ. ...'
            styles={{
              overlay: (base) => ({
                ...base,
                width: '100%',
                textAlign: 'middle'
              })
            }}>
          </LoadingOverlay>
        </div>
      </>
    }
  }

  render() {
    console.log('Decision Board is rendered!!!!')
    return (
      <ContractsPopup header='Αποφάσεις Δημοτικού Συμβουλίου'>
        <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
            {/* 1st column */}
            <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
              {
                this.props.contractDetails.decisionboard ? this.props.contractDetails.decisionboard.map((item, index) => {
                  return (<Grid item key={index}>
                    <Paper style={styles.paperMoreContractInfo} square={true}>
                      <Typography>
                        <div style={{ display: 'flex' }}>
                          <span style={{ flex: '1' }}>
                            <b>{index + 1}η Απόφαση Δημοτικού Συμβουλίου A.Π.</b> {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? item.ProtocolDate : ''}
                            {item.ADA ? <span>με ΑΔΑ {item.ADA}</span> : ''}
                            <span style={{ marginLeft: '10px' }}></span>
                            {item.Content ? <span style={{ fontStyle: 'italic' }}>{item.Content}</span> : ''}
                          </span>
                          <span onClick={() => { this.editDecisionBoard(index, item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
                            <IconButton size="medium" color="inherit">
                              <SettingsIcon />
                            </IconButton>
                          </span>
                          {this.getDeleteOption(index, item, this.props.contractDetails.decisionboard.length)}
                        </div>
                      </Typography>
                    </Paper>
                  </Grid>)
                }) : <></>
              }
            </div>
          </div>
          {this.editForm()}
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'lightgrey', justifyContent: 'center' }}>
            <Button style={{ fontSize: '18px', textAlign: 'center' }} onClick={() => { this.setState({ addNewItem: true }) }}>ΠΡΟΣΘΗΚΗ</Button>
          </div>
        </div>
      </ContractsPopup >

    )
  }
}

function mapStateToProps(state) {
  return {
    screenDimensions: state.parametricdata_reducer.screenDimensions,
    insertDecicionBoardPending: state.contracts_reducer.insertDecicionBoardPending,
    insertDecicionBoardRejected: state.contracts_reducer.insertDecicionBoardRejected,
    isSearchMode: state.contracts_reducer.isSearchMode, 
    contractDetails: state.contracts_reducer.contractDetails,
    token: state.token_reducer.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createDecisionBoard, updateDecisionBoard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionBoardView)