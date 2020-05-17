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

    return (
      <div style={{ margin: '10px', border: '1px solid black', width: '300px'}} >
        <InputTitle title={this.props.title} style={{width: '100%'}}/>
        <div style={{ backgroundColor: 'white'}}>
          <MyTextField {...this.props} tm={this.props.tm1} partOfProtocol={true} inputProps={{ style: { textAlign: "right", width: '100px' } }} id={this.props.idn} tp={this.props.tp1} stateValue={this.props.protocolNumber}/>
          <span style={{ fontSize: '22px', margin: '0px' }}>/</span>
          <MyTextField {...this.props} tm={this.props.tm2} partOfProtocol={true} inputProps={{ style: { textAlign: "left", width: '150px' } }} id={this.props.idd} tp={this.props.tp2} stateValue={this.props.protocolDate}/>
        </div>
      </div>
    )
  }
}

export default ProtocolInput