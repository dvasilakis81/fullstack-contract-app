import React, { Component } from 'react';
import MyTextField from './MyTextField'

class ProtocolInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <div style={{ margin: '10px', border: '1px solid black' }}>
        <div style={{ background: 'lightgrey', textAlign: 'center' }}>{this.props.title}</div>
        <div>
          <MyTextField {...this.props} tm={this.props.tm1} partOfProtocol={true} inputProps={{ style: { textAlign: "right", width: '100px' } }} id={this.props.idn} />
          <span style={{ fontSize: '22px', margin: '0px', backgroundColor: '#daf0ff' }}>/</span>
          <MyTextField {...this.props} tm={this.props.tm2} partOfProtocol={true} inputProps={{ style: { textAlign: "left", width: '100px' } }} id={this.props.idd} />
        </div>
      </div>
    )
  }
}

export default ProtocolInput