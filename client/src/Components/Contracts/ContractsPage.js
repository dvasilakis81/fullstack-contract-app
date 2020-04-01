import React, { Component } from 'react';
import ContractsPageBody from './ContractsPageBody';
import Header from '../Header/header'

class ContractsPage extends Component {

  render() {    
     
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Header
          title="Διαβίβαση παρασταστικών κ' δικαιολογητικών για ενταλματοποίηση της δαπάνης"
          showAdministrationOption={true}
          showNewContractOption={true} />
        <ContractsPageBody style={{ overflowY: 'hidden' }} />
      </div>
    );
  }
}

export default ContractsPage;