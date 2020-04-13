import React, { Component } from 'react';

class ContractsPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div style={{ display: 'flex', flexDirection: 'column', background: 'green', width: '800px', height: '800px', border: '3px solid #33C1FF', overflowX: 'hidden', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', background: '#33C1FF', color: 'white', fontSize: '20px', fontWeight: '900', padding: '20px', justifyContent: 'center', alignItems: 'center', height: '30px'  }}>
          {this.props.header}
        </div>
        <div style={{ flex: '1', overflowX: 'hidden', overflowY: 'hidden' }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ContractsPopup