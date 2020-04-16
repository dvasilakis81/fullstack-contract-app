import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingOverlay from 'react-loading-overlay'
import Icon from '@material-ui/core/Icon';

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
    background: 'white'
    // background: '#fffef3'
  }
};

class DecisionBoardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractId: this.props.contractDetails.Id,
      ProtocolNumber: '',
      ProtocolDate: '',
      Content: '',
      ADA: '',
      submitButtonDisabled: false,
      addNewItem: false,
      editItem: false,
      decisionBoardIndex: 0,
      Id: this.props.Id ? this.props.Id : '',
      openMessage: false,
      message: '',
      variant: '',
      msgPadding: ''
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

  deleteDecisionBoard(decisionBoard) {
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
        this.setState({ openMessage: true, msg: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        // var param = {}
        // param.msg = msg;
        // param.variant = 'success'
        // this.props.openServerMessage(param);
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας Α.Δ.Σ. !!\n' + error;
        this.setState({ openMessage: true, msg: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    } else if (this.state.editNewItem === true) {

      this.props.updateDecisionBoard(this.state, this.props.token.data.token).then(res => {
        var msg = 'Η Α.Δ.Σ. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
        this.setState({ msg: msg, openMessage: true, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας Α.Δ.Σ. !!\n' + error;
        this.setState({ msg: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })

    }
  }

  editForm() {
    var decisionboard = this.props.contractDetails.decisionboard;
    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <>
        <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', background: '#33C1FF', color: 'black', justifyContent: 'center', padding: '20px' }}>
          <form style={{ padding: '10px' }} autoComplete="off" onSubmit={this.handleSubmit}>
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
                {getSubmitButton('contained', 'primary', { fontSize: '18px', padding: '5px', margin: '5px' }, null, 'ΑΠΟΘΗΚΕΥΣΗ', <Icon>save</Icon>, this.state.submitButtonDisabled)}
                <Button disabled={this.state.submitButtonDisabled} variant='contained' color='secondary' style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }} onClick={() => { this.setState({ addNewItem: false, editItem: false }) }}>ΑΚΥΡΩΣΗ
                  <Icon>cancel</Icon>
                </Button>
              </LoadingOverlay>
            </div>
          </form>
        </div>
      </>
    }
  }

  render() {
    console.log('Decision Board is rendered!!!!')
    return (
      <ContractsPopup header='Αποφάσεις Δημοτικού Συμβουλίου'>
        <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'scroll', overflowX: 'auto', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
              {
                this.props.contractDetails.decisionboard ? this.props.contractDetails.decisionboard.map((item, index) => {
                  return (<Grid item key={index}>
                    <Paper style={styles.paperMoreContractInfo} square={true}>
                      <Typography>
                        <div style={{ display: 'flex', flexFlow: 'row' }}>
                          <span style={{ flex: '1' }}>
                            <b>{index + 1}η Απόφαση Δημοτικού Συμβουλίου με A.Π.</b> {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? item.ProtocolDate : ''}
                            {item.ADA ? <span> με <b>ΑΔΑ</b> {item.ADA}</span> : ''}
                            <span style={{ marginLeft: '10px' }}></span>
                            {item.Content ? <span style={{ fontStyle: 'italic' }}> και με <b>περιεχόμενο</b> {item.Content}</span> : ''}
                          </span>
                          <span onClick={() => { this.editDecisionBoard(index, item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
                            <IconButton size="medium" color="inherit">
                              <SettingsIcon />
                            </IconButton>
                          </span>
                          <span onClick={() => { this.deleteDecisionBoard(item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
                            <IconButton size="medium" color={index < this.props.contractDetails.decisionboard.length - 1 ? "disabled" : "inherit"}>
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </div>
                      </Typography>
                    </Paper>
                  </Grid>)
                }) : <></>
              }
            </div>
          </div>
          {this.editForm()}          
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: 'lightgreen', justifyContent: 'center', padding: this.msgPadding }}>
            <span style={{ fontSize: '18px', textAlign: 'center', fontWeight: 'bold' }}>{this.state.msg}</span>
          </div>
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