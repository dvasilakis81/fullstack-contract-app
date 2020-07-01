import React, { Component } from 'react';
import Header from "../Header/header";
import ReservationsContainer from './reservations_container'
import { connect } from 'react-redux';
import MySnackbar from '../Common/MySnackbar';

class Reservations extends Component {
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
        <Header title="Διαχειριστικό Φ.Π.Α. - Κρατήσεων" showAdministrationOption={false} showNewContractOption={false} hstyle="2" />
        <ReservationsContainer />
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

export default connect(mapStateToProps, null)(Reservations)