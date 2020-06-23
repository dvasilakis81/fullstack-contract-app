import React, { Component } from 'react';
import AccountContainer from './AccountPageBody';
import store from '../../Redux/Store/store'
import Header from '../Header/header'

class Account extends Component {

  componentDidMount() {
    store.dispatch({ type: 'DO_REFRESH', payload: false })
  }

  getTitle(title, accountNumber) {
    if (title && title.length <= 150)
      return <div>
        <div>
          {title}
        </div>
        <div style={{ color: 'gold' }}>
          Στοιχεία {accountNumber}ου λογαριασμού
        </div>
      </div>
    return <div>{title.substring(0, 150)} ... <span style={{ color: 'gold' }}>Στοιχεία {accountNumber}ου λογαριασμού</span></div>
  }

  render() {
    return (
      <div style={{ width: '100%', height: '90%' }}>
        <Header
          title={this.getTitle(this.props.location.state.title, this.props.location.state.an)}
          showAdministrationOption={false}
          showNewContractOption={false} />
        <AccountContainer
          contractId={this.props.location.state.ci}
          contractTypeId={this.props.location.state.ct}
          accountNumber={this.props.location.state.an}
          title={this.props.location.state.title}
          exists={this.props.location.state.exists}
          isDownpayment={this.props.location.state.isDownpayment}
        />
      </div>
    );
  }
}

export default Account;