import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingOverlay from 'react-loading-overlay'
import Icon from '@material-ui/core/Icon';

import { getDateFormatForDocument, getServerErrorResponseMessage } from '../../../Helper/helpermethods';
import { getSubmitButton, getTextFieldWithTooltip } from '../../MaterialObjects/materialobjects';
import { bindActionCreators } from 'redux';
import { processContractInfo } from '../../../Redux/Actions';

import { getDecisionCoordinatorDecentrilizedAdministrationTooltip } from './tooltip';
import ProtocolInput from '../../CustomControls/ProtocolInput';
import MyTextField from '../../CustomControls/MyTextField';

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

class DecisionCoordinatorDecentrilizedAdministrationView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contractId: this.props.contractDetails.Id,
      submitButtonDisabled: false,
      addNewItem: false,
      editItem: false,
      deleteItem: false,
      openMessage: false,
      message: '',
      msgColor: '',
      msgPadding: '0px',
      Id: this.props.Id ? this.props.Id : '',
      ProtocolNumber: '',
      ProtocolDate: '',
      Content: '',
      ADA: '',
      orderNo: 0
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this, '');
  }

  handleClose(event, reason) {
    this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  openEditDecisionCoordinatorDecentrilizedAdministration(index, decisionCoordinatorDecentrilizedAdministration) {
    this.setState({
      Id: decisionCoordinatorDecentrilizedAdministration.Id,
      ProtocolNumber: decisionCoordinatorDecentrilizedAdministration.ProtocolNumber,
      ProtocolDate: decisionCoordinatorDecentrilizedAdministration.ProtocolDate,
      Content: decisionCoordinatorDecentrilizedAdministration.Content,
      ADA: decisionCoordinatorDecentrilizedAdministration.ADA,
      orderNo: index + 1,
      editItem: true
    })
  }

  openDeleteDecisionCoordinatorDecentrilizedAdministration(index, decisionCoordinatorDecentrilizedAdministration) {
    this.setState({
      orderNo: index + 1,
      Id: decisionCoordinatorDecentrilizedAdministration.Id,
      ProtocolNumber: decisionCoordinatorDecentrilizedAdministration.ProtocolNumber,
      ProtocolDate: decisionCoordinatorDecentrilizedAdministration.ProtocolDate,
      deleteItem: true
    })
  }

  resetState() {
    this.setState({      
      addNewItem: false, editItem: false, deleteItem: false,
      ProtocolNumber: '',
      ProtocolDate: '',
      Content: '',
      ADA: '',
      orderNo: 0
    });
  }  
  resetMsgInfo() {
    setTimeout(function () {
      this.setState({ openMessage: false, message: '', msgPadding: '0px', ProtocolNumber: '', ProtocolDate: '', Content: '', ADA: '', orderNo: 0 });
    }.bind(this), 5000);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitButtonDisabled: true });

    if (this.state.addNewItem === true) {
      this.props.processContractInfo(this.state, this.props.token.data.token, 'insertdecisioncoordinatordecentrilizedadministration').then(res => {
        var msg = 'Η Σ.Α.Δ.Α με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" δημιουργήθηκε επιτυχώς!!!'
        this.setState({ openMessage: true, message: msg, msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας!\n' + error;
        this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgColor: 'red', msgPadding: '10px', submitButtonDisabled: false });
      })
    } else if (this.state.editItem === true) {
      this.props.processContractInfo(this.state, this.props.token.data.token, 'updatedecisioncoordinatordecentrilizedadministration').then(res => {
        var msg = 'Η Σ.Α.Δ.Α. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας !!\n' + error;
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, msgColor: 'red', msgPadding: '10px', submitButtonDisabled: false });
      })
    }
  }

  requestDeleteDecisionCoordinatorDecentrilizedAdministration() {
    this.setState({ submitButtonDisabled: true });

    this.props.processContractInfo(this.state, this.props.token.data.token, 'deletedecisioncoordinatordecentrilizedadministration').then(res => {
      var msg = 'Η Σ.Α.Δ.Α. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" διεγράφει επιτυχώς!!!'
      this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false });
      this.resetState();
      this.resetMsgInfo();
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής Σ.Α.Δ.Α. !!\n' + error;
      this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgPadding: '0px', submitButtonDisabled: false });
    })
  }

  decisionCoordinatorDecentrilizedAdministrationItemForm(length) {

    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', background: '#C0C0C0', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <form style={{ padding: '10px', backgroundColor: '#fff' }} autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.orderNo}ης Απόφασης Ελέγχου Νομιμότητας της Αποκεντρωμένης</div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
            <ProtocolInput
              tm1={getDecisionCoordinatorDecentrilizedAdministrationTooltip(this.state, 1)}
              tm2={getDecisionCoordinatorDecentrilizedAdministrationTooltip(this.state, 2)}
              title='Α.Π.'
              idn='ProtocolNumber'
              idd='ProtocolDate'
              protocolNumber={this.state.ProtocolNumber}
              protocolDate={this.state.ProtocolDate}
              onChange={this.onChange}
              tp1='text'
              tp2='date' />
            <MyTextField tm={getDecisionCoordinatorDecentrilizedAdministrationTooltip(this.state, 3)} tp='text' title='ΑΔΑ' label='' id='ADA' stateValue={this.state.ADA} isRequired={false} isDisabled={false} onChange={this.onChange} style={{ width: '100%' }} width='40%' />
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px' }}>
            <LoadingOverlay
              active={this.props.insertDecisionCoordinatorDecentrilizedAdministrationPending === true}
              spinner
              text='Αναμονή για δημιουργία Σ.Α.Δ.Α. ...'
              styles={{
                overlay: (base) => ({
                  ...base,
                  width: '100%',
                  textAlign: 'middle'
                })
              }}>
              {getSubmitButton('contained', 'primary', { fontSize: '18px', padding: '5px', margin: '5px' }, null, 'ΑΠΟΘΗΚΕΥΣΗ', <Icon>save</Icon>, this.state.submitButtonDisabled)}
              <Button
                disabled={this.state.submitButtonDisabled}
                variant='contained'
                color='secondary'
                style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }}
                onClick={() => {
                  this.resetState()
                }}>
                ΑΚΥΡΩΣΗ
                  <Icon>cancel</Icon>
              </Button>
            </LoadingOverlay>
          </div>
        </form>
      </div>
    } else if (this.state.deleteItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', background: '#33C1FF', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>Διαγραφή {this.state.orderNo}ης Απόφασης Ελέγχου Νομιμότητας της Αποκεντρωμένης</div>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#33C1FF', justifyContent: 'center', padding: '10px' }}>
          <LoadingOverlay
            active={this.props.deleteDecisionCoordinatorDecentrilizedAdministrationPending === true}
            spinner
            text='Αναμονή για διαγραφή Σ.Α.Δ.Α. ...'
            styles={{
              overlay: (base) => ({
                ...base,
                width: '100%',
                textAlign: 'middle'
              })
            }}>
            <Button disabled={this.state.submitButtonDisabled} variant='contained' color='primary' style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }} onClick={() => { this.requestDeleteDecisionCoordinatorDecentrilizedAdministration() }}>
              ΝΑΙ
            </Button>
            <Button disabled={this.state.submitButtonDisabled} variant='contained' color='secondary' style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }} onClick={() => { this.setState({ deleteItem: false }) }}>
              ΟΧΙ
            </Button>
          </LoadingOverlay>
        </div>
      </div>
    }
  }

  renderEditOption(index, item) {

    return <IconButton
      disabled={this.state.addNewItem === true || this.state.deleteItem === true}
      size='medium'
      color='inherit'
      onClick={() => { this.openEditDecisionCoordinatorDecentrilizedAdministration(index, item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
      <SettingsIcon />
    </IconButton>
  }
  renderDeleteOption(index, item) {
    return <IconButton
      disabled={this.state.addNewItem === true || this.state.editItem === true}
      size="medium" color={index < this.props.contractDetails.decisioncoordinatordecentrilizedadministration.length - 1 ? "disabled" : "inherit"}
      onClick={() => { this.openDeleteDecisionCoordinatorDecentrilizedAdministration(index, item) }} style={{ textAlign: 'top', padding: '10px', justifyContent: 'end' }}>
      <DeleteIcon />
    </IconButton>
  }
  renderItemOptions(index, item) {
    if (index > 0) {
      return <>
        {item.ADA ? <span> με <b>ΑΔΑ</b> {item.ADA}</span> : ''}
        <span style={{ marginLeft: '10px' }}></span>
        {item.Content ? <span style={{ fontStyle: 'italic' }}> και με <b>περιεχόμενο</b> {item.Content}</span> : ''}
      </>
    }
  }
  renderServerResponse() {

    return <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: this.state.msgColor, justifyContent: 'center', padding: this.msgPadding }}>
      <span style={{ fontSize: '22px', textAlign: 'center', fontWeight: 'bold', padding: this.state.msgPadding }}>{this.state.message}</span>
    </div>
  }

  render() {
    var length = this.props.contractDetails.decisioncoordinatordecentrilizedadministration ? this.props.contractDetails.decisioncoordinatordecentrilizedadministration.length : 0
    return (

      <ContractsPopup
        header={this.props.header}
        openMessage={this.state.openMessage}
        message={this.state.message}
        variant={this.state.variant}>
        {this.renderServerResponse()}
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'scroll', overflowX: 'auto', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            {
              this.props.contractDetails.decisioncoordinatordecentrilizedadministration ? this.props.contractDetails.decisioncoordinatordecentrilizedadministration.map((item, index) => {
                return (<Grid item key={index}>
                  <Paper style={styles.paperMoreContractInfo} square={true}>
                    <Typography>
                      <div style={{ display: 'flex', flexFlow: 'row', fontSize: '18px' }}>
                        <span style={{ flex: '1' }}>
                          <b>{index + 1}η Απόφαση Ελέγχου της Αποκεντρωμένης Διοίκησης με A.Π.</b> {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : ''}
                          {this.renderItemOptions(index, item)}
                        </span>
                        {this.renderEditOption(index, item)}
                        {this.renderDeleteOption(index, item)}
                      </div>
                    </Typography>
                  </Paper>
                </Grid>)
              }) : <></>
            }
          </div>
        </div>
        {this.decisionCoordinatorDecentrilizedAdministrationItemForm(length)}
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'white', justifyContent: 'center' }}>
          <Button
            width='100%'
            disabled={this.state.deleteItem === true || this.state.editItem === true}
            style={{ fontSize: '18px', textAlign: 'center' }}
            onClick={() => { this.setState({ addNewItem: true, orderNo: length + 1 }) }}>
            ΠΡΟΣΘΗΚΗ
          </Button>
        </div>
      </ContractsPopup >
    )
  }
}

function mapStateToProps(state) {
  return {
    screenDimensions: state.parametricdata_reducer.screenDimensions,
    insertContractInfoPending: state.contracts_reducer.insertContractInfoPending,
    insertContractInfoRejected: state.contracts_reducer.insertContractInfoRejected,
    isSearchMode: state.contracts_reducer.isSearchMode,
    contracts: state.contracts_reducer.contractsList,
    contractDetails: state.contracts_reducer.contractDetails,
    searchContractsList: state.contracts_reducer.searchContractsList,
    contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
    token: state.token_reducer.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processContractInfo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionCoordinatorDecentrilizedAdministrationView)