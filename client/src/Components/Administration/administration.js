import React, { Component } from 'react';
import Header from "../Header/header";
import AdministrationContainer from './administration_container'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import format from 'string-format';
import MySnackbar from '../Common/MySnackbar';

class Administration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      openMessage: false,
      message: '',
      variant: '',      
      submitButtonDisabled: false
    }
    this.handleClose = this.handleClose.bind(this, '');
  }

  handleClose = (event, reason) => {
    this.setState({ openMessage: false, message: '' });
  };

  componentDidMount() {
    if (this.props.token === undefined || this.props.token.data === undefined)
      this.setState({ redirectToLogin: true })
    else {
      var dtNow = new Date()
      var dtTokeExpiresAt = new Date(this.props.token.data.expiresAt);
      var dtDiffs = (dtTokeExpiresAt - dtNow)
      if (dtDiffs < 0)
        this.setState({ redirectToLogin: true })
      else {
        var diffMins = Math.round(dtDiffs / 60000);
        if (diffMins <= 7) {
          var msg = format('H συνεδρία θα λήξει σε {} {}! {}', diffMins, diffMins > 1 ? 'λεπτά' : 'λεπτό', 'Θα ήταν προτιμότερο να γίνει έξοδος!');
          this.setState({ message: msg, openMessage: true, variant: 'error', submitButtonDisabled: false });
        }
      }
    }
  }

  render() {
    if (this.state.redirectToLogin)
      return <Redirect to='/login' />
    else {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <Header
            title="Διαχειριστικό Παραμέτρων"
            showAdministrationOption={false}
            showNewContractOption={false}
            hstyle="2"
          />
          <AdministrationContainer />
          <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.token
  }
}

export default connect(mapStateToProps, null)(Administration)