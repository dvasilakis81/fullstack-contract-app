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
          <StyledTextField {...this.props} />
        </div>
    )
  }
}

export default MyTextField