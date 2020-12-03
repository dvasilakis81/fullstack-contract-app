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

import { getTooltip } from './tooltip';
import ProtocolInput from '../../CustomControls/ProtocolInput';
import MyTextField from '../../CustomControls/MyTextField';
import store from '../../../Redux/Store/store';
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

class AuthorDocumentedRequestView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUserInfo: this.props.token.data.user,
      activityType: 'AuthorDocumentRequest',
      contractId: this.props.contractDetails.Id,
      submitButtonDisabled: false,
      addNewItem: false,
      editItem: false,
      deleteItem: false,
      openMessage: false,
      message: '',
      msgColor: '',
      msgPadding: '0px',
      IpAddress: '',
      itemInfo: {
        Id: this.props.Id ? this.props.Id : '',
        ProtocolNumber: '',
        ProtocolDate: '',
        ADA: '',
        orderNo: 0,
        NoPrototype: 1,
        NoPhotocopy: 1
      }
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this, '');
  }

  handleClose(event, reason) {
    this.setState({ message: '', openMessage: false, submitButtonDisabled: false, insertContractInfoPending: false });
  }

  onChange(e) {
    e.persist();

    this.setState(prevState => ({
      itemInfo: {                   // object that we want to update
        ...prevState.itemInfo,          // keep all other key-value pairs
        [e.target.id]: e.target.value   // update the value of specific key
      }
    }))
  }

  openEdit(index, item) {

    this.setState(prevState => ({
      editItem: true,
      itemInfo: {
        ...prevState.itemInfo,
        Id: item.Id,
        ProtocolNumber: item.ProtocolNumber,
        ProtocolDate: item.ProtocolDate,
        ADA: item.ADA,        
        orderNo: index + 1,
        NoPrototype: item.NoPrototype,
        NoPhotocopy: item.NoPhotocopy
      }
    }))    
  }

  openDelete(index, item) { 

    this.setState(prevState => ({
      deleteItem: true,
      itemInfo: {
        ...prevState.itemInfo,
        Id: item.Id,
        orderNo: index + 1
      }
    }))
  }

  resetState() {
    this.setState(prevState => ({
      itemInfo: {
        ...prevState.itemInfo,
        ProtocolNumber: '',
        ProtocolDate: '',
        ADA: '',
        orderNo: 0,
        NoPrototype: 0,
        NoPhotocopy: 2
      }
    }))
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
      this.props.processContractInfo(this.state, this.props.token.data.token, 'insertauthordocumentedrequest').then(res => {
        console.log("Response from new author documented request " + res);

        var msg = 'To Τεκμηριωμένο Αίτημα του Διατάκτη δημιουργήθηκε επιτυχώς!!!';
        this.setState({ openMessage: true, message: msg, msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        store.dispatch({ type: 'SET_CONTRACTINFO_PENDING', payload: false });
        var msg = 'Αποτυχία δημιουργίας!\n' + error;
        this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgColor: 'red', msgPadding: '10px', submitButtonDisabled: false });
        this.resetMsgInfo();
      })
    } else if (this.state.editItem === true) {

      this.props.processContractInfo(this.state, this.props.token.data.token, 'updateauthordocumentedrequest').then(res => {
        console.log("Response from update author documented request " + res);
        var msg = 'To Τεκμηριωμένο Αίτημα του Διατάκτη επεξεργάστηκε επιτυχώς!!!';
        this.setState({ openMessage: true, message: msg, msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        store.dispatch({ type: 'SET_CONTRACTINFO_PENDING', payload: false });
        var msg = 'Αποτυχία δημιουργίας !!\n' + error;
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, msgColor: 'red', msgPadding: '10px', submitButtonDisabled: false });
        this.resetMsgInfo();
      })
    }
  }

  requestDelete() {
    this.setState({ submitButtonDisabled: true });

    this.props.processContractInfo(this.state, this.props.token.data.token, 'deleteauthordocumentedrequest').then(res => {
      console.log("Response from delete author documented request " + res);

      var msg = 'Η διαγραφή έγινε επιτυχώς!!!'
      this.setState({ openMessage: true, message: msg, variant: 'success', msgColor: 'lightGreen', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false, deleteItem: false });
      this.resetState();
      this.resetMsgInfo();
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής!!\n' + error;
      this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgColor: 'red', msgPadding: '0px', submitButtonDisabled: false });
      this.resetMsgInfo();
    })
  }

  itemForm() {

    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', background: '#C0C0C0', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <form style={{ padding: '10px', backgroundColor: '#fff' }} autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.itemInfo.orderNo}ου Ελεγκτικού Συνεδρίου</div>
          <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', justifyContent: 'left', padding: '10px' }}>
            {this.renderItemInput()}
          </div>
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
        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>Διαγραφή {this.state.itemInfo.orderNo}ου Τεκμηριωμένου Αιτήματος του Διατάκτη</div>
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
      size="medium" color={index < this.props.contractDetails.authordocumentedrequest.length - 1 ? "disabled" : "inherit"}
      onClick={() => {
        if (index.toString() === (this.props.contractDetails.authordocumentedrequest.length - 1).toString())
          this.openDelete(index, item)
      }}
      style={{ textAlign: 'top', padding: '10px', justifyContent: 'end' }}>
      <DeleteIcon />
    </IconButton>
  }
  renderItemInput() {

    return (
      <><div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'left', padding: '10px' }}>
        <MyTextField tm={getTooltip(this.state, 4)} tp='number' title='# πρωτότυπα' label='' id='NoPrototype' stateValue={this.state.itemInfo.NoPrototype} isRequired={true} isDisabled={false} onChange={this.onChange} style={{ width: '100%' }} inputProps={{ style: { textAlign: 'center' } }} width='50%' />
        <MyTextField tm={getTooltip(this.state, 4)} tp='number' title='# φωτοαντίγραφα' label='' id='NoPhotocopy' stateValue={this.state.itemInfo.NoPhotocopy} isRequired={true} isDisabled={false} onChange={this.onChange} style={{ width: '100%' }} inputProps={{ style: { textAlign: 'center' } }} width='50%' />
      </div>

        <div style={{ display: 'flex', flexDirection: 'row', margin: '5px', flexWrap: 'nowrap', justifyContent: 'flex-start' }}>
          <ProtocolInput tm1={getTooltip(this.state, 1)} tm2={getTooltip(this.state, 2)} title='Αρ. Πράξης' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.itemInfo.ProtocolNumber} protocolDate={this.state.itemInfo.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' width='50%' />
          <MyTextField tm={getTooltip(this.state, 3)} tp='text' title='ΑΔΑ' label='' variant='outlined' id='ADA' stateValue={this.state.itemInfo.ADA} isRequired={false} isDisabled={false} onChange={this.onChange} width='50%' />
        </div>
      </>
    )
  }
  renderServerResponse() {

    return <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: this.state.msgColor, justifyContent: 'center', padding: this.msgPadding }}>
      <span style={{ fontSize: '22px', textAlign: 'center', fontWeight: 'bold', padding: this.state.msgPadding }}>{this.state.message}</span>
    </div>
  }

  getTransmissionItemInfo(index, item) {
    var copiesPhrase = <>{getCopiesPhrase(item.NoPrototype, item.NoPhotocopy)}</>
    var rContent = <>
      <span>{copiesPhrase} του  υπ' αριθ. </span>
      <span>{item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate}</span>
      {item.ADA ? <span> (ΑΔΑ: {item.ADA}) </span> : <></>}
      <span> Τεκμηριωμένου Αιτήματος του Διατάκτη.</span>
    </>;


    return <>
      <span style={{ fontWeight: "bold" }}>Διαβιβαστικό (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)</span>
      <br />
      {rContent}
    </>
  }

  getAccountItemInfo(index, item) {

    var rContent = <>
      <span>Tο με Α.Π. {item.ProtocolNumber}/{item.ProtocolDate}</span>
      {item.ADA ? <span> (ΑΔΑ: {item.ADA}) </span> : <></>}
      <span> Τεκμηριωμένο Αίτημα του Διατάκτη.</span>
    </>

    return <>
      <br />
      <span style={{ fontWeight: "bold" }}>Λογαριασμός (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)</span>
      <br />
      {rContent}
    </>
  }

  render() {
    var length = this.props.contractDetails.authordocumentedrequest ? this.props.contractDetails.authordocumentedrequest.length : 0
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
              this.props.contractDetails.authordocumentedrequest ? this.props.contractDetails.authordocumentedrequest.map((item, index) => {
                return (<Grid item key={index}>
                  <Paper style={styles.paperMoreContractInfo} square={true}>
                    <Typography>
                      <div style={{ display: 'flex', flexFlow: 'row', fontSize: '18px', flexWrap: 'nowrap' }}>
                        <span style={{ flex: '1' }}>
                          <span style={{ background: 'black', color: 'white', textAlign: 'center', marginRight: '10px' }}><b>{index + 1}.</b></span>
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
        </div>
        {this.itemForm(length)}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDocumentedRequestView)