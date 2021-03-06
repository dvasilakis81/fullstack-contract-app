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
    let divWidth = '300px';
    if (this.props.width)
      divWidth = this.props.width;

    return (
      this.props.partOfProtocol === true
        ?
        <span style={{ height: 'fit-content' }}>
          <StyledTextField {...this.props} style={{ width: divWidth }}/>
        </span>
        :
        <div style={{ margin: '10px', width: divWidth, border: '1px solid black', height: 'fit-content', padding:'1px' }}>
          <InputTitle title={this.props.title} isRequired={this.props.isRequired}/>
          <div style={{ backgroundColor: 'white' }}>
            <StyledTextField {...this.props} style={{ width: '100%' }} />
          </div>
        </div>
    )
  }
}

export default MyTextField