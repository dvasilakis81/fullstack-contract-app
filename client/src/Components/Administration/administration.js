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

  render() {

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Header title="Διαχειριστικό Παραμέτρων" showAdministrationOption={false} showNewContractOption={false} hstyle="2" />
        <AdministrationContainer />
        <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.token
  }
}

export default connect(mapStateToProps, null)(Administration)