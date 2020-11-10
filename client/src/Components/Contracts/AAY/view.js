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

import { getSuggestAYTooltipTemplate, getAayTooltipTemplate, getAayOverthrowTooltipTemplate } from './tooltip';
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

class AayView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUserInfo: this.props.token.data.user,
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
      Type: '',
      AayValue: '',
      ProtocolNumber: '',
      ProtocolDate: '',
      EadNumber: '',
      ADA: '',
      Overthrow: '',
      NoPrototype: 0,
      NoPhotocopy: 2
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

  openEdit(index, Aay) {
    this.setState({
      Id: Aay.Id,
      Type: Aay.Type,
      AayValue: Aay.Value,
      ProtocolNumber: Aay.ProtocolNumber,
      ProtocolDate: Aay.ProtocolDate,
      EadNumber: Aay.EadNumber,
      ADA: Aay.ADA,
      Overthrow: Aay.Overthrow,
      orderNo: index + 1,
      NoPrototype: Aay.NoPrototype,
      NoPhotocopy: Aay.NoPhotocopy,
      editItem: true
    })
  }

  openDelete(index, aay) {
    this.setState({
      Id: aay.Id,
      ProtocolNumber: aay.ProtocolNumber,
      ProtocolDate: aay.ProtocolDate,
      orderNo: index + 1,
      deleteItem: true
    })
  }

  resetState() {
    this.setState({
      addNewItem: false,
      editItem: false,
      deleteItem: false,
      AayValue: '',
      ProtocolNumber: '',
      ProtocolDate: '',
      EadNumber: '',
      ADA: '',
      Overthrow: '',
      NoPrototype: 0,
      NoPhotocopy: 2,
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
      this.props.processContractInfo(this.state, this.props.token.data.token, 'insertaay').then(res => {
        var msg = 'Η Α.A.Y. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" δημιουργήθηκε επιτυχώς!!!'
        this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        store.dispatch({ type: 'SET_CONTRACTINFO_PENDING', payload: false });
        var msg = 'Αποτυχία δημιουργίας !!\n' + error;
        this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    } else if (this.state.editItem === true) {
      this.props.processContractInfo(this.state, this.props.token.data.token, 'updateaay').then(res => {
        var msg = 'Η Α.A.Y. με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" επεξεργάστηκε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false });
        this.resetState();
        this.resetMsgInfo();
      }).catch(error => {
        store.dispatch({ type: 'SET_CONTRACTINFO_PENDING', payload: false });
        var msg = 'Αποτυχία επεξεργασίας Α.A.Y. !!\n' + error;
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', msgPadding: '10px', submitButtonDisabled: false });
      })
    }
  }

  requestDelete() {
    this.setState({ submitButtonDisabled: true });

    this.props.processContractInfo(this.state, this.props.token.data.token, 'deleteaay').then(res => {
      var msg = 'Η Απόφαση Ανάληψης Υποχρέωσης με πρωτόκολλο "' + this.state.ProtocolNumber + '/' + getDateFormatForDocument(this.state.ProtocolDate) + '" διεγράφει επιτυχώς!!!'
      this.setState({ openMessage: true, message: msg, variant: 'success', msgPadding: '10px', submitButtonDisabled: false, addNewItem: false, editItem: false, deleteItem: false });
      this.resetState();
      this.resetMsgInfo();
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής Απόφασης Ανάληψης Υποχρέωσης !!\n' + error;
      this.setState({ openMessage: true, message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, variant: 'error', msgPadding: '0px', submitButtonDisabled: false });
    })
  }

  getAayTypes() {
    var ret;

    var aayTypes = [];
    aayTypes.push('Πρόταση Ανάληψης Υποχρέωσης');
    aayTypes.push('Απόφαση Ανάληψης Υποχρέωσης');
    aayTypes.push('Απόφαση Ανάληψης Υποχρέωσης (διάφορα έξοδα ΠΟΕ)');
    aayTypes.push('Απόφαση Ανατροπής Ανάληψης Υποχρέωσης');

    ret = aayTypes.map((data, index) => {
      return <option key={index} value={index} selected={index == 0}>{data}</option>
    })

    return ret;
  }

  getAayValuesToOverthrow() {
    var ret;
    var options = [];

    if (this.props.contractDetails.aay) {
      this.props.contractDetails.aay.map((data, index) => {
        if (data && data.Type == 1)
          return options.push(data);
      })

      ret = options.map((data, index) => {
        var stringValue = data.Value.toString() + '/' + extractYearFromDate(data.ProtocolDate).toString();
        return <option key={index} value={stringValue}>{stringValue}</option>
      })
    }

    return ret;
  }


  getEditTemplate() {
    if (this.state.Type == 0) {
      return <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px', flexWrap: 'nowrap', width: '90%' }}>
        <ProtocolInput tm1={getSuggestAYTooltipTemplate(this.state, 1)} tm2={getSuggestAYTooltipTemplate(this.state, 2)} title='Α.Π. Π.Α.Υ.' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' width='50%' />
      </div>
    } else if (this.state.Type == 1 || this.state.Type == 2) {

      return <>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px', flexWrap: 'nowrap', width: '90%' }}>
          <MyTextField tm={getAayTooltipTemplate(this.state, 1)} tp='text' title='Α.Α.Υ' id='AayValue' stateValue={this.state.AayValue} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, maxLength: 20 }} width='50%' />
          <ProtocolInput tm1={getAayTooltipTemplate(this.state, 2)} tm2={getAayTooltipTemplate(this.state, 3)} title='Α.Π. Α.Α.Υ.' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' width='50%' />
        </div>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px', flexWrap: 'nowrap', width: '90%' }}>
          <MyTextField tm={getAayTooltipTemplate(this.state, 4)} tp='number' title='ΕΑΔ αριθμός' id='EadNumber' stateValue={this.state.EadNumber} isRequired={false} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' } }} width='50%' />
          <MyTextField tm={getAayTooltipTemplate(this.state, 5)} tp='text' title='ΑΔΑ' id='ADA' stateValue={this.state.ADA} isRequired={false} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, maxLength: 20 }} width='50%' />
        </div>
      </>
    } else if (this.state.Type == 3) {
      return <>
        <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', justifyContent: 'center', paddingLeft: '0px', flexWrap: 'nowrap', width: '90%' }}>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'left', margin: '10px', flexWrap: 'nowrap', width: '100%' }}>
            <ProtocolInput tm1={getAayOverthrowTooltipTemplate(this.state, 1)} tm2={getAayOverthrowTooltipTemplate(this.state, 2)} title='Α.Π. Α.Α.Υ.' idn='ProtocolNumber' idd='ProtocolDate' protocolNumber={this.state.ProtocolNumber} protocolDate={this.state.ProtocolDate} onChange={this.onChange} tp1='text' tp2='date' width='50%' />
            <MyTextField tm={getAayOverthrowTooltipTemplate(this.state, 3)} tp='text' title='ΑΔΑ' id='ADA' stateValue={this.state.ADA} isRequired={true} isDisabled={false} onChange={this.onChange} inputProps={{ style: { textAlign: 'center' }, maxLength: 20 }} width='50%' />
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'left', margin: '10px', flexWrap: 'nowrap', width: '100%' }}>
            <MyTextField tm={getAayOverthrowTooltipTemplate(this.state, 4)} title='Ποια A.A.Y. ανατρέπεται?' id='Overthrow' stateValue={this.state.Overthrow} values={this.getAayValuesToOverthrow()} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='50%' />
            <div style={{ width: '50%' }}></div>
          </div>
        </div>
      </>
    }
    else
      return <></>
  }

  aayItemForm() {

    if (this.state.addNewItem === true || this.state.editItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', background: '#C0C0C0', color: 'black', justifyContent: 'center', padding: '20px' }}>
        <form style={{ padding: '10px', backgroundColor: '#fff' }} autoComplete="off" onSubmit={this.handleSubmit}>
          <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>{this.state.addNewItem === true ? 'Εισαγωγή' : 'Επεξεργασία'} στοιχείων {this.state.orderNo}ης Απόφασης Ανάληψης Υποχρέωσης</div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'left', padding: '10px' }}>
            <MyTextField tm={getAayTooltipTemplate(this.state, 5)} tp='number' title='# πρωτότυπα' label='' id='NoPrototype' stateValue={this.state.NoPrototype} isRequired={true} isDisabled={false} onChange={this.onChange} style={{ width: '100%' }} inputProps={{ style: { textAlign: 'center' } }} width='50%' />
            <MyTextField tm={getAayTooltipTemplate(this.state, 5)} tp='number' title='# φωτοαντίγραφα' label='' id='NoPhotocopy' stateValue={this.state.NoPhotocopy} isRequired={true} isDisabled={false} onChange={this.onChange} style={{ width: '100%' }} inputProps={{ style: { textAlign: 'center' } }} width='50%' />
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', justifyContent: 'center', padding: '10px', flexWrap: 'wrap', width: '90%' }}>
            <MyTextField title='Tύπος' id='Type' stateValue={this.state.Type} values={this.getAayTypes()} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='100%' />
          </div>
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
        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: 800, paddingBottom: '10px' }}>Διαγραφή {this.state.orderNo}ης Απόφασης Ανάληψης Υποχρέωσης</div>
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
      size="medium" color={index < this.props.contractDetails.aay.length - 1 ? "disabled" : "inherit"}
      onClick={() => {
        if (index.toString() === (this.props.contractDetails.aay.length - 1).toString())
          this.openDelete(index, item)
      }}
      style={{ textAlign: 'top', padding: '10px', justifyContent: 'end' }}>
      <DeleteIcon />
    </IconButton>
  }

  getTransmissionItemInfo(index, item) {

    var rContent = <></>;
    var lContent = <></>;
    var copiesPhrase = <>{getCopiesPhrase(item.NoPrototype, item.NoPhotocopy)}</>
    if (item.Type == 0) {
      rContent = <span>{copiesPhrase} της με αριθμ. {item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate} Πρότασης Ανάληψης Υποχρέωσης.</span>
    } else if (item.Type == 1 || item.Type == 2) {
      rContent = <span>{copiesPhrase} της με αριθμ. {item.Value}/{item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate}  {item.EadNumber ? 'ΕΑΔ ' + item.EadNumber : ''} </span>
      var ada = <></>
      if (item.ADA)
        ada = <><span>(ΑΔΑ: </span><b><u>{item.ADA}</u></b><span>) </span></>
      if (item.Type == 1)
        lContent = <span>Απόφασης Ανάληψης Υποχρέωσης.</span>
      else
        lContent = <span>Απόφασης Ανάληψης Υποχρέωσης. (διάφορα έξοδα ΠΟΕ)</span>
    } else if (item.Type == 3) {
      rContent = <span>{copiesPhrase} της υπ΄ αριθμ. {item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate} ΕΑΔ {item.EadNumber} </span>
      var ada = <></>
      if (item.ADA)
        ada = <><span>(ΑΔΑ: </span><b><u>{item.ADA}</u></b><span>) </span></>

      lContent = <span><b>ΑΠΟΦΑΣΗΣ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ</b> (παρ.2 άρθρο 4 ΠΔ 80/2016), της {item.Overthrow} Α.Α.Υ. </span>
    }

    return <>
      <span style={{ fontWeight: "bold" }}>Διαβιβαστικό (ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ)</span>
      <br />
      {rContent}
      {ada}
      {lContent}
    </>
  }

  getAccountItemInfo(index, item) {

    var rContent = <></>;
    var lContent = <></>;
    if (item.Type == 0) {
      rContent = <span>Τη με Α.Π. {item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate} Πρότασης Ανάληψης Υποχρέωσης.</span>
    } else if (item.Type == 1 || item.Type == 2) {
      var rContent = <span>Tη με αρ. {item.Value}/{item.ProtocolNumber}/{item.ProtocolDate} </span>;
      var ada = <></>
      if (item.ADA)
        ada = <><span>(ΑΔΑ: </span><b><u>{item.ADA}</u></b><span>) </span></>
      if (item.Type == 1)
        lContent = <span>Απόφασης Ανάληψης Υποχρέωσης.</span>
      else
        lContent = <span>Απόφασης Ανάληψης Υποχρέωσης. (διάφορα έξοδα ΠΟΕ)</span>
    } else if (item.Type == 3) {
      rContent = <span>Την υπ΄ αριθμ. {item.ProtocolNumber}/{item.ProtocolDate ? getDateFormatForDocument(item.ProtocolDate) : item.ProtocolDate}</span>
      var ada = <></>
      if (item.ADA)
        ada = <><span>(ΑΔΑ: </span><b><u>{item.ADA}</u></b><span>) </span></>

      lContent = <span><b>ΑΠΟΦΑΣΗΣ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ</b> (παρ.2 άρθρο 4 ΠΔ 80/2016), της {item.Overthrow} Α.Α.Υ. </span>
    }

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
    var length = this.props.contractDetails.aay ? this.props.contractDetails.aay.length : 0;
    return (
      <ContractsPopup
        header='Αποφάσεις Ανάληψης Υποχρέωσης'
        openMessage={this.state.openMessage}
        message={this.state.message}
        variant={this.state.variant}>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', background: 'lightgreen', justifyContent: 'center', padding: this.msgPadding }}>
          <span style={{ fontSize: '22px', textAlign: 'center', fontWeight: 'bold', padding: this.state.msgPadding }}>{this.state.message}</span>
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff', overflowY: 'scroll', overflowX: 'auto', flexWrap: 'nowrap', height: '600px' }}>
          {
            this.props.contractDetails.aay ? this.props.contractDetails.aay.map((item, index) => {
              return (<Grid item key={index}>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <div style={{ display: 'flex', flexFlow: 'row', fontSize: '18px' }}>
                      <span style={{ flex: '1' }}>
                        <span style={{ background: 'black', color: 'white', textAlign: 'center', marginRight: '10px' }}><b>{index + 1}</b></span>
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
        {this.aayItemForm(length)}
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'white', justifyContent: 'center' }}>
          <Button
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

export default connect(mapStateToProps, mapDispatchToProps)(AayView)