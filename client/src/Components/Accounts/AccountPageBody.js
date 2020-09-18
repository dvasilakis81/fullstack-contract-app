import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAccount } from '../../Redux/Actions';
import AccountInfo from './ΑccountΙnfo';
import { getFailedConnectionWithServer, showGenericMessage } from '../Common/templates'
import { resetData } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store'

class AccountContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAccount(this.props.token.data.token, this.props.contractId, this.props.accountNumber)
  }

  getAccountTemplate() {
    if (this.props.getAccountPending)
      return showGenericMessage('Αναμονή για τον λογαριασμό ...', false, false)
    else {
      if (this.props.getAccountRejected)
        return getFailedConnectionWithServer();
      else {
        if (this.props.exists)
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
              cc: [],
              InvoiceNumber: '',
              InvoiceDate: undefined,
              InvoiceDeliveredDate: undefined,
              InvoiceDeliveredDateProtocolNumber: '',
              InvoiceDeliveredDateProtocolDate: undefined,
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

    if (this.props.account && this.props.account.tokenIsValid === false) {
      resetData(store)
      return <Redirect push to={{
        pathname: '/login',
        state: { expired: true }
      }} />
    }
    else
      return (this.getAccountTemplate())
  }
}

function mapStateToProps(state) {
  return {
    account: state.account_reducer.account,
    getAccountPending: state.account_reducer.getAccountPending,
    getAccountRejected: state.account_reducer.getAccountRejected,
    token: state.token_reducer.token
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)