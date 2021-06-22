import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../Redux/Store/store';
import { createAccount } from '../../../Redux/Actions';

import { Grid, Typography, Paper, withStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import axios from 'axios';
import { getHostUrl } from '../../../Helper/helpermethods';
import { successFgColor, successBgColor, failedFgColor, failedBgColor } from '../../Common/colors';

import { bindActionCreators } from 'redux';
import MaterialTable, { MTableToolbar } from 'material-table';

const styles = {
  root: {
    overflowX: 'scroll',
  },
  paper: {
    width: '300px',
    overflowX: 'scroll',
  },
  table: {
    maxWidth: '650px',
  },
  tableHeader: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '90vh',
  },
  column1: {
    display: 'flex',
    flexFlow: 'column',
    flexBasis: '100%',
    flex: '1',
    backgroundColor: 'lightgrey',
    overflowY: 'auto',
    maxWidth: '200px'
  },
  column2: {
    display: 'flex',
    flexFlow: 'column',
    flexBasis: '100%',
    flex: '1',
    backgroundColor: 'lightgrey',
    overflowY: 'auto',
  },
  tableStyle1: {
    tableLayout: 'fixed',
    padding: '10px',
    fontSize: '12px',
    background: 'lightyellow',
    border: '2px',
    borderStyle: 'solid',
    borderColor: '#ccccb3'
  },
  tableStyle2: {
    tableLayout: 'fixed',
    padding: '10px',
    fontSize: '12px',
    background: 'lightblue',
    border: '2px',
    borderStyle: 'solid',
    borderColor: '#7997a1'
  }
};

class AdministrationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: false,
      message: '',
      bgColorMessage: '',
      fgColorMessage: '',
      submitButtonDisabled: false,
      bgcolor: '',
      editRowId: undefined,
      username: '',
      roleid: ''
    }

    this.updateItem = this.updateItem.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.setTextValue = this.setTextValue.bind(this);
    this.handleChangeUserRole = this.handleChangeUserRole.bind(this);
    this.tableRowSelection = this.tableRowSelection.bind(this);
    this.getDataTableTemplate = this.getDataTableTemplate.bind(this);
  }

  getUserRoleName(roleId) {
    var userRole = this.props.userroles.data.find(function (item) {
      if (item.Id == roleId)
        return item
    });

    return userRole.Name;
  }

  loadUserRoles() {
    let ret = '';

    if (this.props.userroles) {
      ret = this.props.userroles.data.map((data, index) => {
        return <option key={index} value={data.Id}>{data.Name}</option>
      })
    }

    return ret;
  }

  handleChangeUserRole(e) {
    this.setState({ roleid: e.target.value });
  };

  setTextValue(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  startEditing(row) {
    let selectedItem = this.props.selectedParametric;
    if (selectedItem === 'Χρήστες')
      this.setState({ editRowId: row.id, username: row.username, roleid: row.roleid });
  }

  updateItem() {
    let selectedItem = this.props.selectedParametric;
    if (selectedItem === 'Χρήστες') {
      axios.post(getHostUrl() + '/updateuser', this.state, { headers: { Authorization: 'Bearer ' + this.props.token.token } }).then(res => {
        var msg = 'Η επεξεργασία του χρήστη ' + this.state.username + ' δημιουργήθηκε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, bgColorMessage: successBgColor, fgColorMessage: successFgColor, submitButtonDisabled: false });
        this.setState({ editRowId: '', username: '', roleid: '' });
        store.dispatch({ type: 'UPDATE_USER', payload: res.data })
      }).catch(error => {
        var msg = 'Αποτυχία επεξεργασίας χρήστη !!\n' + error;
        this.setState({ message: msg, openMessage: true, bgColorMessage: failedBgColor, fgColorMessage: failedFgColor, submitButtonDisabled: false });
      });
    }
  }

  cancelUpdate() {
    this.setState({ editRowId: '' });
  }

  parameterSelection(e, item) {    
  }

  tableRowSelection(item) {
    store.dispatch({ type: 'SELECTED_TABLE_ITEM', payload: item });
  }

  getParametricArray() {
    return ['Χρήστες', 'Δημόσιοι Φορείς', 'Διευθύνσεις', 'Τμήματα', 'Κρατήσεις', 'Υπογράφοντες', 'Τύπος Υπογραφώντων']
  }

  getItems() {

    let template = null;
    let data = this.getParametricArray()
    if (data !== undefined) {
      template = data.map((item, index) => (
        <div key={index}
          id={item}
          onClick={() => this.parameterSelection(this, item)}
          style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '1px', paddingBottom: '0px' }}>
          <Grid style={{ flexGrow: '1' }}>
            <Grid item>
              <Paper square={true} style={this.props.selectedParametric !== item ? styles.tableStyle1 : styles.tableStyle2}>
                <Typography>
                  <span style={{ fontWeight: 'bold', width: 'auto' }}>{item}</span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </ div>
      ));
    }

    return template;
  }

  showData() {
    let selectedItem = this.props.selectedParametric;

    let columns = [];
    let data = [];

    let items = {};
    if (selectedItem === 'Χρήστες') {
      var lookupRoles = {};
      this.props.userroles.data.map(x => {
        lookupRoles[x.Id] = x.Name;
      });

      columns = [
        { title: 'Username', field: 'username', cellStyle: { backgroundColor: '#039be5', width: '200px' }},
        { title: 'Password', field: 'password', cellStyle: { backgroundColor: '#45h9ce5', width: '200px' }},
        { title: 'Role', field: 'role', lookup: lookupRoles }
      ];

      this.props.users.map(x => {
        data.push({ 'id': x.Id, 'username': x.Username, 'password': '', 'role': x.Role });
      });
    }
    else if (selectedItem === 'Δημόσιοι Φορείς')
      items = this.props.agencies
    else if (selectedItem === 'Διευθύνσεις')
      items = this.props.municipalityDirections
    //else if (selectedItem === 'Τμήματα')
    //items = this.props.
    else if (selectedItem === 'Κρατήσεις')
      items = this.props.reservations
    else if (selectedItem === 'Υπογράφοντες')
      items = this.props.signatories
    else if (selectedItem === 'Τύπος Υπογραφώντων')
      items = this.props.signatorytypes

    // let columns = [
    //   { title: 'Name', field: 'name' },
    //   { title: 'Surname', field: 'surname' },
    //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //   { title: 'Birth Place', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } },
    // ];

    // const data = [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    //   { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    // ]
    return (
      // <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>     
      //   <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
      //     {this.getDataTableTemplate(selectedItem)}
      //   </div>      
      // </div>
      <MaterialTable
        title="Διαχειριστικό"
        components={{
          Toolbar: props => (
            <div style={{ backgroundColor: '#e8eaf5' }}>
              <MTableToolbar {...props} />
            </div>
          )
        }}
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {

            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                if (selectedItem === 'Χρήστες') {
                  axios.post(getHostUrl() + '/updateuser', newData, { headers: { Authorization: 'Bearer ' + this.props.token.token } }).then(res => {
                    var msg = 'Η επεξεργασία του χρήστη ' + this.state.username + ' δημιουργήθηκε επιτυχώς!!!'
                    this.setState({ message: msg, openMessage: true, bgColorMessage: 'green', fgColorMessage: 'white', submitButtonDisabled: false });
                    this.setState({ editRowId: '', username: '', roleid: '' });
                    store.dispatch({ type: 'UPDATE_USER', payload: res.data })
                  }).catch(error => {
                    var msg = 'Αποτυχία επεξεργασίας χρήστη !!\n' + error;
                    this.setState({ message: msg, openMessage: true, bgColorMessage: failedBgColor, fgColorMessage: failedFgColor, submitButtonDisabled: false });
                  })
                }
                resolve();
              }, 600);
            })
          ,
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 600);
            }),
        }
        }
      />
    )
  }

  getHeaders(title) {
    let columns = [];
    //if (title === 'Χρήστες') {
    columns.push({
      name: 'Username',
      selector: 'Username',
      sortable: false
    })
    columns.push({ name: 'Role', selector: 'Role', sortable: false })
    //}
    return columns
  }

  getTableHeader() {
    let headers = [];

    if (this.props.selectedParametric === 'Χρήστες') {

      headers = (<TableHead>
        <TableRow>
          <TableCell style={styles.tableHeader}>Όνομα χρήστη</TableCell>
          <TableCell style={styles.tableHeader}>Ρόλος χρήστη</TableCell>
        </TableRow>
      </TableHead>)
    }
    else if (this.props.selectedParametric === 'Δημόσιοι Φορείς') {

      headers = (<TableHead>
        <TableRow>
          <TableCell style={styles.tableHeader}>Όνομα</TableCell>
        </TableRow>
      </TableHead>)
    } else if (this.props.selectedParametric === 'Διευθύνσεις') {

      headers = (<TableHead>
        <TableRow>
          <TableCell style={styles.tableHeader}>Όνομα</TableCell>
          <TableCell style={styles.tableHeader}>Προΐστάμενος</TableCell>
          <TableCell style={styles.tableHeader}>Τηλέφωνο</TableCell>
          <TableCell style={styles.tableHeader}>Email</TableCell>
          <TableCell style={styles.tableHeader}>Διεύθυνση</TableCell>
          <TableCell style={styles.tableHeader}>Ταχ. Κώδικας</TableCell>
          <TableCell style={styles.tableHeader}>Πόλη</TableCell>
        </TableRow>
      </TableHead>)
    } else if (this.props.selectedParametric === 'Τμήματα') {

      headers = (<TableHead>
        <TableRow>
          <TableCell style={styles.tableHeader}>Διεύθυνση</TableCell>
          <TableCell style={styles.tableHeader}>Όνομα</TableCell>
          <TableCell style={styles.tableHeader}>Προΐστάμενος</TableCell>
          <TableCell style={styles.tableHeader}>Τηλέφωνο</TableCell>
          <TableCell style={styles.tableHeader}>Email</TableCell>
        </TableRow>
      </TableHead>)
    }

    return headers;
  }

  getTableRows() {
    let ret;
    let rows = [];

    if (this.props.selectedParametric === 'Χρήστες') {
      if (this.props.users) {
        for (let index = 0; index < this.props.users.length; index++) {
          const id = this.props.users[index].Id;
          const username = this.props.users[index].Username;
          const roleid = this.props.users[index].userroles[0].Id;
          const rolename = this.props.users[index].userroles[0].Name;
          let bgcolor = '';
          if (this.props.selectedTableItem)
            bgcolor = this.props.selectedTableItem.id !== id ? 'white' : 'lightgrey'

          rows.push({ id, username, roleid, rolename, bgcolor })
        }
      }

      if (rows) {
        let editRowId = this.state.editRowId;
        ret = rows.map((row, index) => (
          <TableRow key={row.name} onClick={() => this.tableRowSelection(row)} style={{ backgroundColor: row.bgcolor }} selectable={false}>
            <TableCell align="left">
              {editRowId && row.id === editRowId ? <TextField
                type="text"
                id="username"
                label="Όνομα χρήστη"
                style={{ color: 'blue' }}
                onChange={this.setTextValue}
                value={this.state.username}
                inputProps={{ style: { fontFamily: 'Arial', color: 'blue', background: 'lightgrey' } }}>
              </TextField> : row.username}
            </TableCell>
            <TableCell align="left">
              {row.id === editRowId ? <TextField
                select
                label="Ρόλος Χρήστη"
                value={this.state.roleid}
                onChange={this.handleChangeUserRole}
                SelectProps={{ native: true }}
                fontSize='10px'>
                <option />
                {this.loadUserRoles()}
              </TextField> : this.getUserRoleName(row.roleid)}
            </TableCell>
            <TableCell align="left" style={{ width: '10px' }}>
              {
                row.id === editRowId ?
                  <DoneIcon onClick={this.updateItem} /> :
                  <EditIcon onClick={() => this.startEditing(row)} />
              }
            </TableCell>
            <TableCell align="left" style={{ width: '10px' }}>
              {
                row.id === editRowId ?
                  <CloseIcon onClick={this.cancelUpdate} /> :
                  <DeleteIcon />
              }
            </TableCell>
          </TableRow>
        ))
      }
    } else if (this.props.selectedParametric === 'Δημόσιοι Φορείς') {
      if (this.props.agencies) {
        for (let index = 0; index < this.props.agencies.length; index++) {
          const id = this.props.agencies[index].Id;
          const name = this.props.agencies[index].Name;

          let bgcolor = '';
          if (this.props.selectedTableItem)
            bgcolor = this.props.selectedTableItem.id !== id ? 'white' : 'lightgrey'

          rows.push({ id, name, bgcolor })
        }
      }

      if (rows) {
        ret = rows.map(row => (
          <TableRow key={row.name} onClick={() => this.tableRowSelection(row)} style={{ backgroundColor: row.bgcolor }}>
            <TableCell align="left" style={{ wordWrap: true, minWidth: '100px' }}>{row.name}</TableCell>
          </TableRow>
        ))
      }
    } else if (this.props.selectedParametric === 'Διευθύνσεις') {
      var directions = this.props.municipalityDirections;
      if (directions && directions.data) {
        for (let index = 0; index < directions.data.length; index++) {
          const id = directions.data[index].directions.DirectionId;
          const name = directions.data[index].directions.DirectionName;
          const supervisor = directions.data[index].directions.DirectionSupervisor;
          const telephone = directions.data[index].directions.DirectionTelephone;
          const email = directions.data[index].directions.DirectionEmail;
          const address = directions.data[index].directions.DirectionAddress;
          const postCode = directions.data[index].directions.DirectionPostCode;
          const city = directions.data[index].directions.DirectionCity;

          let bgcolor = '';
          if (this.props.selectedTableItem)
            bgcolor = this.props.selectedTableItem.id !== id ? 'white' : 'lightgrey'

          rows.push({ id, name, supervisor, telephone, email, address, postCode, city, bgcolor })
        }
      }

      if (rows) {
        ret = rows.map(row => (
          <TableRow key={row.name} onClick={() => this.tableRowSelection(row)} style={{ backgroundColor: row.bgcolor }}>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '300px' }}>{row.name}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.supervisor}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.telephone}</TableCell>
            <TableCell align="left" style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.email}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.address}</TableCell>
            <TableCell align="left" style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.postCode}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.city}</TableCell>
          </TableRow>
        ))
      }
    } else if (this.props.selectedParametric === 'Τμήματα') {      
      var directions = this.props.municipalityDirections;
      if (directions && directions.data) {
        for (let index = 0; index < directions.data.length; index++) {
          const directionId = directions.data[index].directions.DirectionId;
          const directionName = directions.data[index].directions.DirectionName;
          var department = this.props.municipalityDirections[0].directions.Department
          for (let index = 0; index < department.length; index++) {
            const id = department.DepartmentId;
            const name = department.DepartmentName;
            const supervisor = department.DepartmentSupervisor;
            const telephone = department.DepartmentTelephone;
            const email = department.DepartmentEmail;
            let bgcolor = '';
            if (this.props.selectedTableItem)
              bgcolor = this.props.selectedTableItem.id !== id ? 'white' : 'lightgrey'

            rows.push({ id, name, supervisor, telephone, email, directionId, directionName, bgcolor })
          }
        }
      }

      if (rows) {
        ret = rows.map(row => (
          <TableRow key={row.name} onClick={() => this.tableRowSelection(row)} style={{ backgroundColor: row.bgcolor }}>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '300px' }}>{row.name}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.supervisor}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.telephone}</TableCell>
            <TableCell align="left" style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.email}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.address}</TableCell>
            <TableCell align="left" style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.postCode}</TableCell>
            <TableCell align="left" style={{ wordWrap: true, maxWidth: '100px' }}>{row.city}</TableCell>
          </TableRow>
        ))
      }
    }

    return ret;
  }

  getDataTableTemplate(title) {
    return (
      <Paper style={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          {this.getTableHeader()}
          <TableBody>
            {this.getTableRows()}
          </TableBody>
        </Table>
      </Paper>
    );
    // return (<DataTable
    //   title={title}
    //   columns={this.getHeaders(title)}
    //   data={this.props.users.data}
    //   style={{ overflowY: 'auto' }}
    // />)
  }

  handleClose = (event, reason) => {
    this.setState({ openMessage: false });
  };

  render() {
    if (this.props.users === undefined || this.props.users.token !== undefined) {
      return <Redirect push to='/login' />
    }
    else {
      return (
        <div>
          <div style={styles.row}>
            <div style={styles.column1}>
              <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                <div style={{ display: 'flex', flexFlow: 'column', overflowY: 'auto', overflowX: 'hidden', margin: '5px', padding: '10px' }}>
                  {this.getItems()}
                </div>
              </div>
              <div style={{ display: 'flex', flexFlow: 'row', backgroundColor: 'lightblue', height: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: '1', justifyContent: 'flex-end' }}></div>
              </div>
            </div>
            <div style={styles.column2}>
              <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '5px', padding: '10px' }}>
                  {this.showData()}
                </div>
              </div>
              <div style={{ display: 'flex', flexFlow: 'row', backgroundColor: 'lightblue', height: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: '1', justifyContent: 'flex-end', marginRight: '30px' }}>@Δημος Αθηναίων</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedTableItem: state.parametricdata_reducer.selectedTableItem,
    selectedParametric: state.parametricdata_reducer.selectedParametric,
    users: state.parametricdata_reducer.users,
    userroles: state.parametricdata_reducer.userroles,
    municipalityDirections: state.parametricdata_reducer.municipalityDirections,
    contractTypes: state.parametricdata_reducer.contractTypes,
    reservations: state.parametricdata_reducer.reservations,
    agencies: state.parametricdata_reducer.agencies,
    signatories: state.parametricdata_reducer.signatories,
    signatorytypes: state.parametricdata_reducer.signatorytypes,
    token: state.token_reducer.token,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createAccount }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdministrationContainer))