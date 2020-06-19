import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingOverlay from 'react-loading-overlay'
import Icon from '@material-ui/core/Icon';

import { getDateFormatForDocument, getServerErrorResponseMessage, extractYearFromDate } from '../../../Helper/helpermethods';
import { getSubmitButton } from '../../MaterialObjects/materialobjects';
import { bindActionCreators } from 'redux';
import { processContractInfo } from '../../../Redux/Actions';

import { getTooltipTemplate } from './tooltip';
import ProtocolInput from '../../CustomControls/ProtocolInput';
import MyTextField from '../../CustomControls/MyTextField';
import store from '../../../Redux/Store/store'

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

class SnippetPracticalView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUserId: this.props.token.data.id,
      contractId: this.props.contractDetails.Id,      
      submitButtonDisabled: false,
      addNewItem: false,
      editItem: false,
      deleteItem: false,
      OrderNo: 0,
      openMessage: false,
      message: '',
      msgPadding: '0px',
      variant: '',
      Id: this.props.Id ? this.props.Id : '',
      ProtocolNumber: '',
      ProtocolDate: '',
      DecisionBoardProtocol: ''
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

  openEdit(index, item) {
    this.setState({
      Id: item.Id,
      ProtocolNumber: item.ProtocolNumber,
      ProtocolDate: item.ProtocolDate,
      DecisionBoardProtocol: item.DecisionBoardProtocol,
      OrderNo: index + 1,
      editItem: true
    })
  }

  openDelete(index, item) {
    this.setState({
      Id: item.Id,
      ProtocolNumber: item.ProtocolNumber,
      ProtocolDate: item.ProtocolDate,
      DecisionBoardProtocol: item.DecisionBoardProtocol,
      OrderNo: index + 1,
      deleteItem: true
    })
  }

  resetState() {
    this.setState({
      addNewItem: false, editItem: false, deleteItem: false,
      ProtocolNumber: '',
      ProtocolDate: '',
      DecisionBoardProtocol: '',
      OrderNo: 0
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
      this.props.processContractInfo(this.state, this.props.token.data.token, 'insertsnippetpractical').then(res => {
        var msg = 'To Απόσπασμα Πρακτικου με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" δημιουργήθηκε επιτυχώς!!!'
        this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        store.dispatch({ type: 'SET_CONTRACTINFO_PENDING', payload: false });
        var msg = 'Αποτυχία δημιουργίας!!';
        this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    } else if (this.state.editItem === true) {
      this.props.processContractInfo(this.state, this.props.token.data.token, 'updatesnippetpractical').then(res => {
        var msg = 'To Απόσπασμα Πρακτικού με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        store.dispatch({ type: 'SET_CONTRACTINFO_PENDING', payload: false });
        var msg = 'Αποτυχία επεξεργασίας Απόσπασματος Πρακτικού !!';
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    }
  }

  requestDelete() {
    this.setState({ submitButtonDisabled: true });

    this.props.processContractInfo(this.state, this.props.token.data.token, 'deletesnippetpractical').then(res => {
      var msg = 'Το Απόσπασμα Πρακτικού με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" διεγράφει επιτυχώς!!!'
      this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false, deleteItem: false });
      this.resetState();
      this.resetMsgInfo();
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής Αποσπάσματος Πρακτικού !!\n' + error;
      this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '0px', submitButtonDisabled: false });
    })
  }

  getDecisionBoardValues() {
    var ret;
    var options = [];

    if (this.props.contractDetails.decisionboard && this.props.contractDetails.decisionboard.length > 0) {
      this.props.contractDetails.decisionboard.map((data, index) => {
        return options.push(data);
      })

      ret = options.map((data, index) => {
        var stringValue = data.ProtocolNumber + '/' + data.ProtocolDate;
        return <option key={index} value={stringValue}>{stringValue}</option>
      })
    }

    return ret;
  }


  getEditTemplate() {

    return <>
      <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px', flexWrap: 'nowrap', width: '90%' }}>
        <ProtocolInput
          tm1={getTooltipTemplate(this.state, this.props.contractDetails.ConcessionaireName, this.getDateString(this.state.ProtocolDate), 1)}
          tm2={getTooltipTemplate(this.state, this.props.contractDetails.ConcessionaireName, this.getDateString(this.state.ProtocolDate), 2)}
          title='Α.Π.'
          idn='ProtocolNumber'
          idd='ProtocolDate'
          protocolNumber={this.state.ProtocolNumber}
          protocolDate={this.state.ProtocolDate}
          onChange={this.onChange}
          tp1='text'
          tp2='date'
          width='50%' />
        <MyTextField tm={getTooltipTemplate(this.state, this.props.contractDetails.ConcessionaireName, this.getDateString(this.state.ProtocolDate), 3)} title='Επιλογή Α.Δ.Σ.' id='DecisionBoardProtocol' stateValue={this.state.DecisionBoardProtocol} values={this.getDecisionBoardValues()} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='50%' />
      </div>
    </>
  }

  itemForm() {

    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', background: '#C0C0C0', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <form style={{ padding: '10px', backgroundColor: '#fff' }} autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.OrderNo}ου Αποσπάσματος Πρακτικού</div>
          {this.getEditTemplate()}
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px' }}>
            <LoadingOverlay
              active={this.props.insertContractInfoPending === true}
              spinner
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
        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>Διαγραφή {this.state.OrderNo}ου Αποσπάσματος Πρακτικού</div>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#33C1FF', justifyContent: 'center', padding: '10px' }}>
          <LoadingOverlay
            active={this.props.deleteContractInfoPending === true}
            spinner
            styles={{
              overlay: (base) => ({
                ...base,
                width: '100%',
                textAlign: 'middle'
              })
            }}>
            <Button disabled={this.state.submitButtonDisabled} variant='contained' color='primary' style={{ fontSize: '18px', textAlign: 'center', padding: '5px', margin: '5px' }} onClick={() => { this.requestDelete() }}>
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
      onClick={() => { this.openEdit(index, item) }} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
      <SettingsIcon />
    </IconButton>
  }
  renderDeleteOption(index, item) {
    return <IconButton
      disabled={this.state.addNewItem === true || this.state.editItem === true}
      size="medium" color={index < this.props.contractDetails.snippetpractical.length - 1 ? "disabled" : "inherit"}
      onClick={() => {
        if (index.toString() === (this.props.contractDetails.snippetpractical.length - 1).toString())
          this.openDelete(index, item)
      }}
      style={{ textAlign: 'top', padding: '10px', justifyContent: 'end' }}>
      <DeleteIcon />
    </IconButton>
  }

  getDateString(protocolDate) {
    var ret;
    var day, month, year;
    if (protocolDate) {
      day = Intl.DateTimeFormat('el-GR', { day: 'numeric' }).format(new Date(protocolDate));
      month = Intl.DateTimeFormat('el-GR', { month: 'numeric' }).format(new Date(protocolDate));
      year = Intl.DateTimeFormat('el-GR', { year: 'numeric' }).format(new Date(protocolDate));
    }

    if (month == '1')
      ret = day + ' Ιανουαρίου ' + year
    else if (month == '2')
      ret = day + ' Φεβρουαρίου ' + year
    else if (month == '3')
      ret = day + ' Μαρτίου ' + year
    else if (month == '4')
      ret = day + ' Απριλίου ' + year
    else if (month == '5')
      ret = day + ' Μαΐου ' + year
    else if (month == '6')
      ret = day + ' Ιουνίου ' + year
    else if (month == '7')
      ret = day + ' Ιουλίου ' + year
    else if (month == '8')
      ret = day + ' Αυγούστου ' + year
    else if (month == '9')
      ret = day + ' Σεπτεμβρίου ' + year
    else if (month == '10')
      ret = day + ' Οκτωβρίου ' + year
    else if (month == '11')
      ret = day + ' Νοέμβριου ' + year
    else if (month == '12')
      ret = day + ' Δεκεμβρίου ' + year

    return ret;
  }
  getTransmissionItemInfo(item) {

    // Το από 11 Φεβρουαρίου 2019 Απόσπασμα Πρακτικού ΔΣ 3/11-02-2019 της ΔΑΕΜ Α.Ε. περί έγκρισης σύναψης 
    // Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της 108/31-01-2019 ΑΔΣ
    var rContent = <span>
      To από {this.getDateString(item.ProtocolDate)} Απόσπασμα Πρακτικού ΔΣ {item.ProtocolNumber}/{item.ProtocolDate}
        της {this.props.contractDetails.ConcessionaireName} περί έγκρισης σύναψης
        Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της {item.DecisionBoardProtocol} ΑΔΣ
      </span>

    return <>
      <span style={{ fontWeight: "bold" }}>Διαβιβαστικό (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)</span>
      <br />
      {rContent}
    </>
  }

  getHeaderTitle() {
    return 'Απόσπασματα Πρακτικού (' + this.props.contractDetails.ConcessionaireName + ') ';
  }
  render() {
    var length = this.props.contractDetails.snippetpractical ? this.props.contractDetails.snippetpractical.length : 0
    return (
      <ContractsPopup
        header={this.getHeaderTitle()}
        openMessage={this.state.openMessage}
        message={this.state.message}
        variant={this.state.variant}>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: 'lightgreen', justifyContent: 'center', padding: this.msgPadding }}>
          <span style={{ fontSize: '22px', textAlign: 'center', fontWeight: 'bold', padding: this.state.msgPadding }}>{this.state.message}</span>
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff', overflowY: 'scroll', overflowX: 'auto', flexWrap: 'nowrap', height: '600px' }}>
          {
            this.props.contractDetails.snippetpractical ? this.props.contractDetails.snippetpractical.map((item, index) => {
              return (<Grid item key={index}>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <div style={{ display: 'flex', flexFlow: 'row', fontSize: '18px' }}>
                      <span style={{ flex: '1' }}>
                        <span style={{ background: 'black', color: 'white', textAlign: 'center', marginRight: '10px' }}><b>{index + 1}</b></span>
                        {this.getTransmissionItemInfo(item)}
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
        {this.itemForm(length)}
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'white', justifyContent: 'center' }}>
          <Button
            disabled={this.state.deleteItem === true || this.state.editItem === true}
            style={{ fontSize: '18px', textAlign: 'center' }}
            onClick={() => { this.setState({ addNewItem: true, OrderNo: length + 1 }) }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SnippetPracticalView)