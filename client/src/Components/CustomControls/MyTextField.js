import React, { Component } from 'react';
import StyledTextField from './tf';
import InputTitle from './InputTitle'

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
        <div style={{ margin: '10px', width: this.props.width, border: '1px solid black' }}>
          <InputTitle title={this.props.title} />
          <div style={{ backgroundColor: 'white' }}>
            <StyledTextField {...this.props} style={{ width: '100%', minWidth: '250px' }} />
          </div>
        </div>
    )
  }
}

export default MyTextField