import React, { Component } from 'react';
import MyTextField from './MyTextField'
import InputTitle from './InputTitle'

class ProtocolInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let divWidth = '300px';
    if (this.props.width)
      divWidth = this.props.width;

    return (
      <div style={{ margin: '10px', border: '1px solid black', minWidth: '0px', width: divWidth, height: 'fit-content' }} >
        <InputTitle title={this.props.title} />
        <div style={{ backgroundColor: 'white', height: 'fit-content' }}>
          <MyTextField {...this.props} tm={this.props.tm1} partOfProtocol={true} inputProps={{ style: { textAlign: "right" } }} id={this.props.idn} tp={this.props.tp1} stateValue={this.props.protocolNumber} width='30%'/>
          <span style={{ fontSize: '22px', margin: '0px' }}>/</span>
          <MyTextField {...this.props} tm={this.props.tm2} partOfProtocol={true} inputProps={{ style: { textAlign: "left" } }} id={this.props.idd} tp={this.props.tp2} stateValue={this.props.protocolDate} width='30%'/>
        </div>
      </div>
    )
  }
}

export default ProtocolInput