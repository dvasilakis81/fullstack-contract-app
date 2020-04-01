import React from 'react'
import { showGenericMessage } from '../Common/templates'
import { connect } from 'react-redux';
import axios from 'axios';
import { getHostUrl, setDimensions, resetData } from '../../Helper/helpermethods';
import Body from '../../HOC/Body/body';
import Header from '../../Components/Header/header';
import { getFooterTemplate } from '../Common/templates'
import store from '../../Redux/Store/store'
import windowSize from 'react-window-size';
import { getButton } from '../../Components/MaterialObjects/materialobjects';
import { Redirect } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,      
      msgResponseLogClientError: '',
      username: this.props.token && this.props.token.data ? this.props.token.data.username : '',
      navigateToLogin: false
    };

    this.resetError = this.resetError.bind(this);
  }

  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI.
  //   return { hasError: true };
  // }

  resetError() {
    resetData(store)
    this.setState({ navigateToLogin: true, error: null, msgResponseLogClientError: '' })
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    // You can also log error messages to an error reporting service here
    this.setState({ error: error ? error.message : '', stack: errorInfo })
  }

  getErrorTemplate() {
    return <div>
      <span>Σφάλμα!</span>
      <br />
      {this.state.error}
      <br />
      {this.state.msgResponseLogClientError}
      <br />
      {getButton('contained', 'small', null, null, this.resetError, 'Έξοδος', null, false)}
    </div>
  }

  render() {

    //console.log('Προσπάθεια καταγραφής λάθους: ' + this.state.msgResponseLogClientError);
    var dimensions = setDimensions(store);
    if (this.state.error) {

      if (this.state.msgResponseLogClientError === '') {
        axios.post(getHostUrl() + '/logClientError', this.state).then(res => {
          this.setState({ msgResponseLogClientError: 'Επιτυχής καταγραφή λάθους' })
        }).catch(error => {
          this.setState({ msgResponseLogClientError: (error + 'Αποτυχής καταγραφή λάθους') })
        })
      }

      return (
        <div style={{ width: dimensions ? dimensions.width : '100%', height: dimensions ? dimensions.height : '100%' }}>
          {dimensions ? <Header
            title="Διαβίβαση παρασταστικών κ' δικαιολογητικών για ενταλματοποίηση της δαπάνης"
            showAdministrationOption={false}
            showNewContractOption={false} /> : <></>}
          <Body>
            {showGenericMessage(this.getErrorTemplate(), true, false)}
          </Body>
          {/* {dimensions ? getFooterTemplate() : <></>} */}
        </div>
      );
    }

    return this.props.children;
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.token,
    goToLogin: state.parametricdata_reducer.goToLogin,
    errorBoundary: state.parametricdata_reducer.errorBoundary
  }
}

export default connect(mapStateToProps, null)(windowSize(ErrorBoundary))
