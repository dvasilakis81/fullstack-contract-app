import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingOverlay from 'react-loading-overlay'
import Icon from '@material-ui/core/Icon';

import { getDateFormatForDocument, getServerErrorResponseMessage } from '../../../Helper/helpermethods';
import { getSubmitButton } from '../../MaterialObjects/materialobjects';
import { bindActionCreators } from 'redux';
import { processContractInfo } from '../../../Redux/Actions';

import { getDecisionBoardTooltip } from './tooltip';
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

class DecisionBoardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUserId: this.props.token.data.id,
      contractId: this.props.contractDetails.Id,
      submitButtonDisabled: false,
      addNewItem: false,
      editItem: false,
      deleteItem: false,
      orderNo: 0,
      openMessage: false,
      message: '',
      msgPadding: '0px',
      variant: '',
      Id: this.props.Id ? this.props.Id : '',
      ProtocolNumber: '',
      ProtocolDate: '',
      Content: '',
      ADA: ''
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

  openEditDecisionBoard(index, decisionBoard) {
    this.setState({
      Id: decisionBoard.Id,
      ProtocolNumber: decisionBoard.ProtocolNumber,
      ProtocolDate: decisionBoard.ProtocolDate,
      ContentTransmission: decisionBoard.ContentTransmission,
      ContentAccount: decisionBoard.ContentAccount,
      ADA: decisionBoard.ADA,
      orderNo: index + 1,
      editItem: true
    })
  }

  openDeleteDecisionBoard(index, decisionBoard) {
    this.setState({
      Id: decisionBoard.Id,
      ProtocolNumber: decisionBoard.ProtocolNumber,
      ProtocolDate: decisionBoard.ProtocolDate,
      orderNo: index + 1,
      deleteItem: true
    })
  }

  resetState() {
    this.setState({
      addNewItem: false, editItem: false, deleteItem: false,
      ProtocolNumber: '',
      ProtocolYear: '',
      ContentTransmission: '',
      ContentAccount: ' με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. ',
      ADA: '',
      orderNo: 0
    });
  }
  resetMsgInfo() {
    setTimeout(function () {
      this.setState({ openMessage: false, message: '', msgPadding: '0px' });
    }.bind(this), 5000);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitButtonDisabled: true });

    if (this.state.addNewItem === true) {
      this.props.processContractInfo(this.state, this.props.token.data.token, 'insertdecisionboard').then(res => {
        var msg = 'Η Α.Δ.Σ. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" δημιουργήθηκε επιτυχώς!!!'
        this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας Α.Δ.Σ. !!\n' + error;
        this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    } else if (this.state.editItem === true) {
      this.props.processContractInfo(this.state, this.props.token.data.token, 'updatedecisionboard').then(res => {
        var msg = 'Η Α.Δ.Σ. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας Α.Δ.Σ. !!\n' + error;
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    }
  }

  requestDeleteDecisionBoard() {
    this.setState({ submitButtonDisabled: true });

    this.props.processContractInfo(this.state, this.props.token.data.token, 'deleteDecisionBoard').then(res => {
      var msg = 'Η Α.Δ.Σ. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" διεγράφει επιτυχώς!!!'
      this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false, deleteItem: false });
      this.resetState();
      this.resetMsgInfo();
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής Α.Δ.Σ. !!\n' + error;
      this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '0px', submitButtonDisabled: false });
    })
  }

  decisionBoardItemForm() {

    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', background: '#C0C0C0', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <form style={{ padding: '10px', backgroundColor: '#fff' }} autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.orderNo}ης Απόφασης Δημοτικού Συμβουλίου</div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'left', padding: '10px' }}>
            <ProtocolInput tm1={getDecisionBoardTooltip(this.state, 1)} tm2={getDecisionBoardTooltip(this.state, 2)} title='Α.Π.' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolDate} st={null} onChange={this.onChange} tp1='text' tp2='date' width='50%' />
            <MyTextField tm={getDecisionBoardTooltip(this.state, 3)} tp='text' title='ΑΔΑ' label='' id='ADA' stateValue={this.state.ADA} isRequired={false} isDisabled={false} onChange={this.onChange} style={{ width: '100%' }} inputProps={{ style: { textAlign: 'center' } }} width='50%' />
          </div>
          {
            this.state.orderNo > 1 ?
              <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', justifyContent: 'left', padding: '10px' }}>
                <MyTextField tm={getDecisionBoardTooltip(this.state, 4)} tp='text' title='Περιεχόμενο (Αρχείο Διαβιβαστικού)' label='' id='ContentTransmission' stateValue={this.state.ContentTransmission} isRequired={false} isDisabled={false} onChange={this.onChange} width='95%' multiline={true}/>
                <MyTextField tm={getDecisionBoardTooltip(this.state, 4)} tp='text' title='Περιεχόμενο (Αρχείο Λογαριασμού)' label='' id='ContentAccount' stateValue={this.state.ContentAccount} isRequired={false} isDisabled={false} onChange={this.onChange} width='95%' multiline={true} />
              </div>
              :
              <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', justifyContent: 'left', padding: '10px' }}>
                <MyTextField tm={getDecisionBoardTooltip(this.state, 4)} tp='text' title='Περιεχόμενο (Αρχείο Λογαριασμού)' label='' id='ContentAccount' stateValue={this.state.ContentAccount} isRequired={false} isDisabled={false} onChange={this.onChange} width='95%' multiline={true} />
              </div>
          }
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px' }}>
            <LoadingOverlay
              active={this.props.insertContractInfoPending === true}
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
              <Button disabled={this.state.submitButtonDisabled} variant='contained'
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
      </div >
    } else if (this.state.deleteItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', background: '#33C1FF', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>Διαγραφή {this.state.orderNo}ης Απόφασης Δημοτικού Συμβουλίου;</div>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#33C1FF', justifyContent: 'center', padding: '10px' }}>
          <LoadingOverlay
            active={this.props.deleteContractInfoPending === true}
            spinner
            text='Αναμονή για διαγραφή Α.Δ.Σ. ...'
            styles={{
              overlay: (base) => ({
                ...base,
                width: '100%',
                textAlign: 'middle'
              })
            }}>
            <Button disabled={this.state.submitButtonDisabled} variant='contained' color='primary' style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }} onClick={() => { this.requestDeleteDecisionBoard() }}>
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
      onClick={() => { this.openEditDecisionBoard(index, item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
      <SettingsIcon />
    </IconButton>
  }
  renderDeleteOption(index, item) {
    return <IconButton
      disabled={this.state.addNewItem === true || this.state.editItem === true}
      size="medium" color={index < this.props.contractDetails.decisionboard.length - 1 ? "disabled" : "inherit"}
      onClick={() => {
        if (index.toString() === (this.props.contractDetails.decisionboard.length - 1).toString())
          this.openDeleteDecisionBoard(index, item)
      }}
      style={{ textAlign: 'top', padding: '10px', justifyContent: 'end' }}>
      <DeleteIcon />
    </IconButton>
  }
  getItemInfo() {
    var info = "Διαβιβαστικό (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)\n"
    //info += "Δύο (2) φωτοαντίγραφα της υπ' αριθ. " {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) /'11-04-2019' 

    return info
  }

  getTransmissionItemInfo(index, item) {

    var rContent = <>
      <span>Δύο (2) φωτοαντίγραφα της υπ' αριθ. </span>
      <span>{item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate}</span>
      <span> Απόφασης Δημοτικού Συμβουλίου</span>
    </>;
    var ada = <></>
    if (item.ADA)
      ada = <><span> (ΑΔΑ: </span><b>{item.ADA}</b><span>) </span></>

    var lContent = <></>;
    if (index + 1 > 1)
      lContent = <span>{item.ContentTransmission}</span>

    return <>
      <span style={{ fontWeight: "bold" }}>Διαβιβαστικό (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)</span>
      <br />
      {rContent}
      {ada}
      {lContent}
    </>
  }
  getAccountItemInfo(index, item) {

    var rContent = <span>Τη με αρ. {item.ProtocolNumber}/{item.ProtocolDate} Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων</span>;
    var ada = <><span> (ΑΔΑ: </span><b>{item.ADA}</b><span>) </span></>;
    var lContent = <span>{item.ContentAccount}</span>;

    return <>
      <br />
      <span style={{ fontWeight: "bold" }}>Λογαριασμός (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)</span>
      <br />
      {rContent}
      {ada}
      {lContent}
    </>
  }

  render() {
    var length = this.props.contractDetails.decisionboard ? this.props.contractDetails.decisionboard.length : 0
    return (
      <ContractsPopup
        header='Αποφάσεις Δημοτικού Συμβουλίου'
        openMessage={this.state.openMessage}
        message={this.state.message}
        variant={this.state.variant}>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: 'lightgreen', justifyContent: 'center', padding: this.msgPadding }}>
          <span style={{ fontSize: '22px', textAlign: 'center', fontWeight: 'bold', padding: this.state.msgPadding }}>{this.state.message}</span>
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff', overflowY: 'scroll', overflowX: 'auto', flexWrap: 'nowrap', height: '600px' }}>
          {
            this.props.contractDetails.decisionboard ? this.props.contractDetails.decisionboard.map((item, index) => {
              return (<Grid item key={index}>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <div style={{ display: 'flex', flexFlow: 'row', fontSize: '18px' }}>
                      <span style={{ flex: '1' }}>
                        <b>{index + 1}.</b>
                        {this.getTransmissionItemInfo(index, item)}
                        {this.getAccountItemInfo(index, item)}
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
        {this.decisionBoardItemForm(length)}
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'white', justifyContent: 'center' }}>
          <Button
            disabled={this.state.deleteItem === true || this.state.editItem === true}
            style={{ fontSize: '18px', textAlign: 'center' }}
            onClick={() => { this.setState({ addNewItem: true, 
            orderNo: length + 1,
            ContentAccount: length == 0 ? ' με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. ' : ''}) }}>
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
    deleteContractInfoPending: state.contracts_reducer.deleteContractInfoPending,
    deleteContractInfoRejected: state.contracts_reducer.deleteContractInfoRejected,
    isSearchMode: state.contracts_reducer.isSearchMode,
    contracts: state.contracts_reducer.contractsList,
    contractDetails: state.contracts_reducer.contractDetails,
    searchContractsList: state.contracts_reducer.searchContractsList,
    contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
    searchModeValue: state.contracts_reducer.searchModeValue,
    token: state.token_reducer.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processContractInfo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DecisionBoardView)