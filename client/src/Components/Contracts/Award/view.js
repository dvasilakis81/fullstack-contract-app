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

import { getCourtOfAuditorsTooltip } from './tooltip';
import ProtocolInput from '../../CustomControls/ProtocolInput';
import MyTextField from '../../CustomControls/MyTextField';
import { getCopiesPhrase } from '../TooltipMethods';

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

class AwardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUserId: this.props.token.id,
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

  openEditAward(index, award) {
    this.setState({
      Id: award.Id,
      ProtocolNumber: award.ProtocolNumber,
      ProtocolDate: award.ProtocolDate,
      editItem: true,
      orderNo: index + 1
    })
  }

  openDeleteAward(index, award) {
    this.setState({
      Id: award.Id,
      orderNo: index + 1,
      deleteItem: true
    })
  }

  resetState() {
    this.setState({
      ProtocolNumber: '',
      ProtocolDate: '',
      orderNo: 0
    });
  }
  resetMsgInfo() {
    setTimeout(function () {
      this.setState({
        openMessage: false,
        message: '',
        msgPadding: '0px'
      });
    }.bind(this), 5000);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitButtonDisabled: true });

    if (this.state.addNewItem === true) {
      this.props.processContractInfo(this.state, this.props.token.token, 'insertaward').then(res => {
        var msg = 'H απόφαση κατακύρωσης δημιουργήθηκε επιτυχώς!!!'
        this.setState({ openMessage: true, message: msg, msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας απόφασης κατακύρωσης!\n' + error;
        this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgColor: 'red', msgPadding: '10px', submitButtonDisabled: false });
      })
    } else if (this.state.editItem === true) {
      this.props.processContractInfo(this.state, this.props.token.token, 'updateaward').then(res => {
        var msg = 'H απόφαση κατακύρωσης επεξεργάστηκε επιτυχώς!!!'
        this.setState({ openMessage: true, message: msg, msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        var msg = 'Αποτυχία δημιουργίας απόφασης κατακύρωσης!!\n' + error;
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, msgColor: 'red', msgPadding: '10px', submitButtonDisabled: false });
      })
    }
  }

  requestDeleteAward() {
    this.setState({ submitButtonDisabled: true });

    this.props.processContractInfo(this.state, this.props.token.token, 'deleteaward').then(res => {
      var msg = 'Η διαγραφή έγινε επιτυχώς!!!'
      this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false, deleteItem: false });
      this.resetState();
      this.resetMsgInfo();
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής!!\n' + error;
      this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '0px', submitButtonDisabled: false });
    })
  }

  awardItemForm() {

    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', background: '#C0C0C0', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <form style={{ padding: '10px', backgroundColor: '#fff' }} autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.orderNo}ου αριθμού απόφασης κατακύρωσης</div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'left', padding: '10px' }}>
            {this.renderAwardInput()}
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px' }}>
            <LoadingOverlay
              active={this.props.insertContractInfoPending === true}
              spinner
              text='Αναμονή για δημιουργία απόφασης κατακύρωσης ...'
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
                  this.setState({ addNewItem: false, editItem: false })
                  this.resetState();
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
        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>Διαγραφή {this.state.orderNo}ης απόφασης κατακύρωσης</div>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#33C1FF', justifyContent: 'center', padding: '10px' }}>
          <LoadingOverlay
            active={this.props.deleteContractInfoPending === true}
            spinner
            text='Αναμονή για διαγραφή απόφασης κατακύρωσης ...'
            styles={{
              overlay: (base) => ({
                ...base,
                width: '100%',
                textAlign: 'middle'
              })
            }}>
            <Button disabled={this.state.submitButtonDisabled} variant='contained' color='primary' style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }} onClick={() => { this.requestDeleteAward() }}>
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
      onClick={() => { this.openEditAward(index, item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
      <SettingsIcon />
    </IconButton>
  }
  renderDeleteOption(index, item) {
    return <IconButton
      disabled={this.state.addNewItem === true || this.state.editItem === true}
      size="medium" color={index < this.props.contractDetails.award.length - 1 ? "disabled" : "inherit"}
      onClick={() => {
        if (index.toString() === (this.props.contractDetails.award.length - 1).toString())
          this.openDeleteAward(index, item)
      }}
      style={{ textAlign: 'top', padding: '10px', justifyContent: 'end' }}>
      <DeleteIcon />
    </IconButton>
  }
  renderAwardInput() {

    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '5px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        <ProtocolInput tm1={getAwardTooltip(this.state, 1)} tm2={getAwardTooltip(this.state, 2)} title='Αρ. Πράξης' idn='ProtocolNumber' idd='ProtocolYear' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolYear} onChange={this.onChange} tp1='text' tp2='text' />
        <MyTextField tm={getAwardTooltip(this.state, 3)} tp='text' title='Κλιμάκιο' label='' variant='outlined' id='ScaleNumber' stateValue={this.state.ScaleNumber} isRequired={true} isDisabled={false} onChange={this.onChange} />
        <ProtocolInput tm1={getAwardTooltip(this.state, 4)} tm2={getAwardTooltip(this.state, 5)} title='Α.Π.Δ.Α.' idn='APDANumber' idd='APDADate' protocolNumber={this.state.APDANumber} protocolDate={this.state.APDADate} onChange={this.onChange} tp1='text' tp2='date' />
      </div>
    )
  }  
  renderServerResponse() {

    return <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: this.state.msgColor, justifyContent: 'center', padding: this.msgPadding }}>
      <span style={{ fontSize: '22px', textAlign: 'center', fontWeight: 'bold', padding: this.state.msgPadding }}>{this.state.message}</span>
    </div>
  }

  render() {
    var length = this.props.contractDetails.award ? this.props.contractDetails.award.length : 0
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
              this.props.contractDetails.award ? this.props.contractDetails.award.map((item, index) => {
                return (<Grid item key={index}>
                  <Paper style={styles.paperMoreContractInfo} square={true}>
                    <Typography>
                      <div style={{ display: 'flex', flexFlow: 'row', fontSize: '18px', flexWrap: 'nowrap' }}>
                        <span style={{ flex: '1' }}>
                          <b>{index + 1}ο Ελεγκτικό Συνέδριο</b> με αρ. {item.ProtocolNumber}/{item.ProtocolYear} Πράξης του {item.ScaleNumber} Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. {item.APDA_ProtocolNumber}/{getDateFormatForDocument(item.APDA_ProtocolDate)})
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
        {this.awardItemForm(length)}
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
    insertContractInfoPendingRejected: state.contracts_reducer.insertContractInfoRejected,
    deleteContractInfoPending: state.contracts_reducer.deleteContractInfoPending,
    deleteContractInfoRejected: state.contracts_reducer.deleteContractInfoRejected,
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

export default connect(mapStateToProps, mapDispatchToProps)(AwardView)