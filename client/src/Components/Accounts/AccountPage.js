import React, { Component } from 'react';
import AccountContainer from './AccountPageBody';
import store from '../../Redux/Store/store'
import Header from '../Header/header'

class Account extends Component {

  componentDidMount() {
    store.dispatch({ type: 'DO_REFRESH', payload: false })
  }

  getTitle(state) {
    if (state.discreet) {
      return <div>{state.discreet}<br /><span style={{ color: 'gold' }}>Στοιχεία {state.an}ου λογαριασμού</span></div>
    }
    else {
      if (state.title && state.title.length <= 150) {
        return <div>
          <div>
            {state.title}
          </div>
          <div style={{ color: 'gold' }}>
            Στοιχεία {state.an}ου λογαριασμού
        </div>
        </div>
      }
      return <div>{state.title.substring(0, 150)} ... <br /><span style={{ color: 'gold' }}>Στοιχεία {state.an}ου λογαριασμού</span></div>
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '90%' }}>
        <Header
          title={this.getTitle(this.props.location.state)}
          showAdministrationOption={false}
          showNewContractOption={false} />
        <AccountContainer
          contractId={this.props.location.state.ci}
          contractTypeId={this.props.location.state.ct}
          accountNumber={this.props.location.state.an}
          title={this.props.location.state.title}
          discreet={this.props.location.state.discreet}
          exists={this.props.location.state.exists}
          isDownpayment={this.props.location.state.isDownpayment}
        />
      </div>
    );
  }
}

export default Account;