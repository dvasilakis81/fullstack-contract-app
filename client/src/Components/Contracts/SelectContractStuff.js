import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { getCheckboxField } from '../MaterialObjects/materialobjects';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  menu: {
    width: 200
  },
  column: {
    padding: 10,
    width: 'auto'
  },
  columnWithItems: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    marginTop: '5px'
  },
  oddRow: {
    margin: 10,
    background: '#f0f0f0'
  },
  btnAuto: {
    margin: '10px',
    paddingLeft: '5px',
    paddingRight: '5px',
    background: 'lightGreen'
  }
};

function random(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const OPTIONS = Array.from(new Array(10000))
  .map(() => random(10 + Math.ceil(Math.random() * 20)))
  .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));


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
        {/* <Select
          multiple
          value={this.props.usersHavingAccessToContract}
          onChange={this.props.handleContractStuff}
          input={<Input style={{ width: '800px', maxWidth: '800px' }} />}
          renderValue={selected => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map(value => (
                <Chip key={value.Id} label={this.getMenutItemValue(value)} style={{ background: 'lightBlue', display: 'flex', flexWrap: 'wrap', margin: '5px', fontSize: '14px', fontWeight: 4000 }} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}>
          {this.getMenuItems()}
        </Select> */}
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