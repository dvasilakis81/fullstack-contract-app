import React, { Component } from 'react';

import InputTitle from './InputTitle'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

class MyAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {      
    }
  }

  render() {
    let divWidth = '300px';
    if (this.props.width)
      divWidth = this.props.width;

    // var type = props.tp;
    // var id = props.id;
    // var stateValue = props.stateValue;
    // var onChange = props.onChange;
    // var onInputChange = props.onInputChange;    
    // var style = props.style;
    console.log('this.props.inputValue: ' + this.props.inputValue);

    return (

      <div style={{ margin: '10px', width: divWidth, border: '1px solid black', height: 'fit-content', padding: '1px' }}>
        <InputTitle title={this.props.title} isRequired={this.props.isRequired} />
        <div style={{ backgroundColor: 'white' }}>
          <Autocomplete
            id={this.props.id}
            freeSolo
            filterSelectedOptions
            inputValue={this.props.inputValue ? this.props.inputValue : ''}
            options={this.props.options}
            onChange={(e, v, r) => this.props.onChange(e, v, r)}
            onInputChange={(e, v, r) => {
              if (r === 'clear')
                this.props.clearAutocomplete(this.props.id);
              else
                this.props.onInputChange(e, v, r);
            }}
            style={{ width: '100%', margin: '0px' }}
            renderInput={(params) =>
              <TextField {...params}
                placeholder="Πληκτρολογήστε ή επιλέξτε..."
                variant="standard"
                fullWidth />}
          />
        </div>
      </div>
    )
  }
}

export default MyAutocomplete