import React, { Component } from 'react';
import { getTextField, getTextFieldWithTooltip } from '../MaterialObjects/materialobjects';
import StyledTextField from './tf'

class MyTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      this.props.partOfProtocol === true
        ?
        <StyledTextField {...this.props} />
        :
        <div style={{ margin: '10px' }}>
          <div style={{ background: 'lightgrey' }}>{this.props.title}</div>
          <div>
            <StyledTextField {...this.props} />
          </div>
        </div>
    )
  }
}

export default MyTextField