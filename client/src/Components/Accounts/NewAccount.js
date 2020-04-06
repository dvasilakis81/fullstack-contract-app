/* eslint-disable eqeqeq */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../Header/header'
import NewAccountForm from './NewAccountForm'
import format from 'string-format'
import MySnackbar from '../Common/MySnackbar';


class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: false,
      message: '',
      variant: '',
      submitButtonDisabled: false,
      redirectToLogin: false
    }

    this.handleClose = this.handleClose.bind(this, '');
  }

  handleClose = (event, reason) => {
    this.setState({ message: '', openMessage: false, submitButtonDisabled: false });
  };

  componentDidMount() {

    var dtNow = new Date()
    if (this.props.token && this.props.token.data) {
      var dtTokeExpiresAt = new Date(this.props.token.data.expiresAt);
      var dtDiffs = (dtTokeExpiresAt - dtNow)
      if (Math.abs(dtDiffs) <= 0)
        this.setState({ redirectToLogin: true });
      else {
        var diffMins = Math.round(dtDiffs / 60000);
        if (diffMins >= 0 && diffMins <= 7) {
          var msg = format('H συνεδρία θα λήξει σε {} {}! {}', diffMins, diffMins > 1 ? 'λεπτά' : 'λεπτό', diffMins < 5 ? 'Θα ήταν προτιμότερο να γίνει έξοδος!' : '');
          this.setState({ message: msg, openMessage: true, variant: 'info', submitButtonDisabled: false });
        }
      }
    }
  }

  getHeaderTitle() {
    // ContractId: contractDetails.Id,
    //         ContractTitle: contractDetails.Title,
    //         ContractTypeId: contractDetails.ContractTypeId,
    //         isEdit: true
    var ret = <></>;
    if (this.props.location && this.props.location.state) {
      var accountLabel = '';
      if (this.props.location.state.isEdit)
        accountLabel = 'Επεξεργασία ' + this.props.location.state.AccountNumber + 'ου λογαριασμού'
      else
        accountLabel = 'Δημιουργία ' + this.props.location.state.AccountNumber + 'ου λογαριασμού'

      return (<div>
        {this.props.location.state.ContractTitle}
        <br />
        {accountLabel}
      </div>)
    }
    return ret;
  }
  render(props) {
    return (
      <div>
        <Header
          title={this.getHeaderTitle()}
          showAdministrationOption={false}
          showNewContractOption={false} />
        <NewAccountForm {...props} />
        <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' />
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.token
  }
}

export default connect(mapStateToProps, null)(NewAccount)