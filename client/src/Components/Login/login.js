import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../Redux/Actions';
import { Redirect } from "react-router-dom";
import LoadingOverlay from 'react-loading-overlay'
import store from '../../Redux/Store/store'
import { getTextField, getButton } from '../MaterialObjects/materialobjects'
import Body from '../../HOC/Body/body'
import MySnackbar from '../Common/MySnackbar'
import '../Common/templates'
import { getServerErrorResponseMessage } from '../../Helper/helpermethods'

const pageStyles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  btnConnect: {
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '30%',
    padding: '10px',
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    background: '#333',
    minWidth: '500px',
    padding: '20px',
    borderRadius: '20px'
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: false,
      message: '',
      variant: '',      
      username: '',
      password: '',
      loginsuccess: false
    }

    this.setTextValue = this.setTextValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this, '');
  }

  componentDidMount() {
    if (this.props.expired === true) {
      this.setState({ message: 'Η συνεδρία έληξε!', openMessage: true, variant: 'info' });
    }
  }
  componentWillMount() {
    store.dispatch({ type: 'RESET_TOKEN_JWT_REJECTED', payload: undefined })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.username === '')
      this.setState({ loginsuccess: false, message: 'Εισάγετε Όνομα Χρήστη!', openMessage: true, variant: 'info' });
    else if (this.state.password === '')
      this.setState({ loginsuccess: false, message: 'Εισάγετε Κωδικό!', openMessage: true, variant: 'info' });
    else {
      this.props.login(this.state.username, this.state.password).then(response => {
        console.log('response.value.data.token: ' + response.value.data.token)
        if (response.value.data.token)
          this.setState({ loginsuccess: true });
        else
          this.setState({ loginsuccess: false, message: response.value.data.message, openMessage: true, variant: 'error' });
      }).catch(error => {
        var msg = 'Αποτυχία σύνδεσης στον διακομιστή!'
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error' });
      })
    }
  }

  handleClose = (event, reason) => {
    this.setState({ message: '', openMessage: false });
    store.dispatch({ type: 'RESET_TOKEN_JWT_REJECTED', payload: undefined })
  };

  setTextValue(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  getLoginTemplate() {
    //let modifierState = KeyboardEvent.getModifierState('CapsLock')
    if (this.state.loginsuccess === true)
      return <Redirect push to='/' />
    else {
      return (
        <LoadingOverlay
          active={this.props.tokenPending ? true : false}
          spinner
          text='Αναμονή για επιβεβαίωση στοιχείων ...'
          styles={{
            overlay: (base) => ({
              ...base,
              textAlign: 'middle'
            })
          }}>
          <Body isLoginPage={true}>
            <div className='centered'>
              <div style={pageStyles.login}>
                <img src={require('../../Images/moa.png')} alt="Δήμος Αθηναίων" width='133' height='55' style={{ marginBottom: '20px', padding: '10px' }} />
                {getTextField('text', 'username', 'Όνομα χρήστη', 'filled', this.state.username, false, { paddingBottom: '10px' }, false, { style: { fontFamily: 'Arial', color: 'blue', background: 'white' } }, null, this.setTextValue)}
                {getTextField('password', 'password', 'Κωδικός', 'filled', this.state.password, false, { paddingBottom: '10px' }, false, { style: { fontFamily: 'Arial', color: 'blue', background: 'white' } }, null, this.setTextValue)}
                {getButton('contained', 'small', 'primary', pageStyles.btnConnect, this.handleSubmit, 'Σύνδεση', null, false)}
                <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='center' useScreenDimensions={false} />
              </div>
            </div>
          </Body>
        </LoadingOverlay >
      )
    }
  }

  render() {
    return (this.getLoginTemplate())
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.tokenjwt,
    tokenPending: state.token_reducer.tokenPending,
    tokenRejected: state.token_reducer.tokenRejected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(pageStyles)(Login))