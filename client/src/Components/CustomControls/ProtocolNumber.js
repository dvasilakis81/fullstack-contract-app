import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { getSelectField, getTextFieldWithTooltip, getTextField, getCheckboxField, getButton, getSubmitButton } from '../MaterialObjects/materialobjects';

class ProtocolNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div style={{ background: 'lightgrey' }}>Α.Π.</div>
        <div>
          <span>{getTextField('number', this.props.idn, '', 'standard', this.props.protocolNumber, false, this.props.st.accountInfoItem, false, null, { shrink: true }, this.props.setTextValue)}</span>
          <span style={{ fontSize: 30 }}>/</span>
          <span>{getTextField('date', this.props.idd, '', 'standard', this.props.protocolDate, false, this.props.st.accountInfoItem, false, null, { shrink: true }, this.props.setTextValue)}</span>
        </div>
      </div>
    )
  }
}

export default ProtocolNumber