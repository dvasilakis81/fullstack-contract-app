import React, { Component } from 'react';
import DiavivastikoLogariasmou from './diav_logariasmou';
import Logariasmos from './logariasmos';
import DownpaymentTransmission from './DownPayment/Downpayment';

class App extends Component {

  render() {
    return (
      <div>
        <div >
          <DiavivastikoLogariasmou />
          <Logariasmos />
        </div>
        <div style={{margin:'40px'}}>
          <span style={{fontWeight: '900'}}>Προκαταβολή</span>
          <DownpaymentTransmission />
        </div>
      </div>
    );
  }
}

export default App;
