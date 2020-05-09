import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { getCheckboxField } from '../MaterialObjects/materialobjects';
import Autocomplete from '@material-ui/lab/Autocomplete';

class SelectContractStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      IsCheckedAll: false
    }
  }

  getMenutItemValue(user) {
    return user.Firstname + ' ' + user.Lastname;
  }

  getMenuItems() {
    let menuItems = [];
        
    this.props.users.map(user => (
      menuItems.push(<MenuItem key={user.Username} value={user}>
        {this.getMenutItemValue(user)}
      </MenuItem>)))

    return menuItems.map(mi => (mi))
  }
  
  render() {
    
    return (
      <div style={{ display: 'flex', flexFlow: 'row', minWidth: 120, maxWidth: 800 }}>
        {!this.props.isAllStuffChecked ? <Autocomplete
          multiple
          id="tags-outlined"
          options={this.props.users}
          getOptionLabel={option => option.Firstname + ' ' + option.Lastname}
          filterSelectedOptions
          onChange={(event, value) => this.props.handleContractStuff(value)}
          defaultValue={this.props.selectedUsers}
          ChipProps={{ color: "primary" }}
          style={{ flex: '1' }}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Προσωπικό"
              placeholder="Όνοματεπώνυμο"
              fullWidth
            />
          )}
        /> : <span style={{ flex: '1', fontSize: '26px', color: 'red' }}>{this.props.users ? 'Να έχουν πρόσβαση και οι ' + this.props.users.length + ' χρήστες' : 'Κάτι πήγε λάθος!'} </span>}       
        <div style={{marginLeft: '30px'}}>
          {getCheckboxField('IsCheckedAll', 'Επιλογή όλων', this.props.isAllStuffChecked, null, this.props.selectAllStuff)}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    reservations: state.parametricdata_reducer.reservations,
    users: state.parametricdata_reducer.users,
    token: state.token_reducer.token
  }
}

export default connect(mapStateToProps, null)(SelectContractStuff)