import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAccount } from '../../Redux/Actions';
import AccountInfo from './ΑccountΙnfo';
import { getFailedConnectionWithServer, showGenericMessage } from '../Common/templates'

class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountExists: this.props.exists,
    }
  }

  componentDidMount() {
    this.props.getAccount(this.props.token.data.token, this.props.contractId, this.props.accountNumber)
  }

  getAccountTemplate() {    
    if (this.props.accountPending)
      return showGenericMessage('Αναμονή για τον λογαριασμό ...', false, false)
    else {
      if (this.props.accountRejected)
        return getFailedConnectionWithServer();
      else {
        if (this.state.accountExists)
          return <AccountInfo contractId={this.props.contractId} accountNumber={this.props.accountNumber} />
        else
          return <Redirect to={{
            pathname: '/newaccount',
            state: {
              AccountId: '',
              AccountNumber: this.props.accountNumber,
              ContractId: this.props.contractId,
              ContractTitle: this.props.title,
              ContractTypeId: this.props.contractTypeId,
              isDownpayment: this.props.isDownpayment,              
              isEdit: false,
              DownpaymentLawArticle: '',
              AmountPure: null,
              AmountFpa: null,
              AmountTotal: null,
              AmountFullWritten: '',
              RemainAmountOfContract: '',
              ProtocolNumber: null,
              FirstAccountProtocolNumber: null,
              IsFirstOfTheYear: false,
              cc: [],
              AayValue: '',
              AayYear: '',
              AayADA: '',
              AayProtocolNumber: '',
              AayProtocolDate: undefined,
              AayEadNumber: '',
              AayPreviousYear: '',
              InvoiceNumber: '',
              InvoiceDate: undefined,
              InvoiceDeliveredDate: undefined,
              InvoiceDeliveredDateProtocolNumber: '',
              InvoiceDeliveredDateProtocolDate: undefined,
              CC1Value1: '-1',
              CC1Value2: '-1',
              CC2Value1: '-1',
              CC2Value2: '-1',
              SignType1: '-1',
              SignType2: '-1',
              SignType3: '-1',
              SignType4: '-1',
              SignName1: '-1',
              SignName2: '-1',
              SignName3: '-1',
              SignName4: '-1',
              AbsenseOfDirector1: false,
              AbsenseOfDirector2: false,
              HasSecondDecisionDS: false,
              HasCourtOfAuditors: false
            }
          }} />
      }
    }
  }

  render() {

    if (this.props.account && this.props.account.success !== undefined && !this.props.account.success)
      return <Redirect push to='/login' />
    else {
      return (
        <>
          {this.getAccountTemplate()}
        </>)
    }
  }
}

function mapStateToProps(state) {
  return {    
    account: state.account_reducer.account,
    accountPending: state.account_reducer.accountPending,
    accountRejected: state.account_reducer.accountRejected,
    token: state.token_reducer.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)