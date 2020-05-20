import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import PulseLoader from 'react-spinners/PulseLoader';
import { Grid, Typography, Paper, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MaterialTable, { MTableToolbar } from 'material-table';
import axios from 'axios';

import { connect } from 'react-redux';

import { getHostUrl, getHeaderHeight, getFooterHeight, getBodyHeight, getDateTimeFormat, getServerErrorResponseMessage } from '../../Helper/helpermethods';
import MySnackbar from '../Common/MySnackbar';
import { getFooterTemplate } from '../Common/templates'
import Body from '../../HOC/Body/body'

import { resetData } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store'

const styles = {
  stickyActionsColumn: {
    '& table:first-child': {
      '& tr': {
        '& td:first-child, th:first-child': {
          backgroundColor: '#f5f5f5',
          position: 'sticky',
          left: 0,
          zIndex: 999
        },
        '& th:first-child': {
          zIndex: 9999
        }
      }
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: '1',
    width: '100%',
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
      variant: '',
      submitButtonDisabled: false,
      roleid: '',
      columns: [],
      data: [],
      navigateToLogin: false,
      selectedParameter: null,
      parameters: [],
      selectedRow: null
    }

    this.handleClose = this.handleClose.bind(this, '');
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

  parameterSelection(e, item) {
    this.setState({ selectedParameter: item, selectedRow: null });
    this.setColumnsAndData(item);
  }

  getParametricArray() {
    var ret = [];
    if (this.props.token.data.role === 1)
      ret.push('Χρήστες')
    if (this.props.token.data.role === 1)
      ret.push('Τύπος Σύμβασης')
    ret.push('Δημόσιοι Φορείς')
    ret.push('Διευθύνσεις')
    ret.push('Τμήματα')
    ret.push('Κρατήσεις')
    ret.push('Υπογράφοντες')
    if (this.props.token.data.role === 1)
      ret.push('Τύπος Υπογραφώντων')
    if (this.props.token.data.role === 1)
      ret.push('Σφάλματα')


    return ret;
  }

  getMaterialTableTitle(selectedItem) {
    return 'Διαχειριστικό' + (selectedItem ? ' - ' + selectedItem : '')
  }

  getItems() {

    let template = null;
    let data = this.state.parameters
    if (data) {
      template = data.map((item, index) => (
        <div key={index}
          id={item}
          onClick={() => this.parameterSelection(this, item)}
          style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '1px', paddingBottom: '0px' }}>
          <Grid style={{ flexGrow: '1' }}>
            <Grid item>
              <Paper square={true} style={this.state.selectedParameter !== item ? styles.tableStyle1 : styles.tableStyle2}>
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

  componentDidMount() {
    let parameters = this.getParametricArray();
    this.setState({ parameters: parameters, selectedParameter: parameters[0] });
    this.setColumnsAndData(parameters[0])
  }

  getColumnsForUsers(data) {

    var lookupRoles = {};
    this.props.userroles.data.forEach(x => { lookupRoles[x.Id] = x.Name; });

    let columns = [
      {
        title: 'Όνομα', field: 'Firstname', draggable: true, cellStyle: { width: '110px', wrap: true },
        editComponent: props => (
          <TextField
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Επίθετο', field: 'Lastname', draggable: true, cellStyle: { width: '110px', wrap: true },
        editComponent: props => (
          <TextField
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Όνομα Χρήστη', field: 'Username', draggable: true, cellStyle: { width: '110px', wrap: true },
        editComponent: props => (
          <TextField
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      { title: 'Κωδικός', field: 'Password', cellStyle: { width: '0px' } },
      { title: 'Ρόλος', field: 'Role', lookup: lookupRoles, cellStyle: { width: '0px' } }
    ];

    this.props.users.forEach(x => {
      data.push({ 'Id': x.Id, 'Firstname': x.Firstname, 'Lastname': x.Lastname, 'Username': x.Username, 'Password': '', 'Role': x.Role });
    });

    return columns
  }

  getColumnsForContractTypes(data) {

    let columns = [
      {
        title: 'Όνομα', field: 'ContractTypeName', defaultSort: 'asc', cellStyle: { width: '0px', wrap: true },
        editComponent: props => (
          <TextField
            type="text"
            value={props.value}
            style={{ width: '500px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      }
    ];

    this.props.contractTypes.forEach(x => {
      data.push({ 'ContractTypeId': x.ContractTypeId, 'ContractTypeName': x.ContractTypeName });
    });

    return columns
  }

  getColumnsForAgencies(data) {

    let columns = [
      {
        title: 'Όνομα', field: 'Name', defaultSort: 'asc', cellStyle: { width: '0px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            type="text"
            value={props.value}
            style={{ width: '1000px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      }
    ];

    this.props.agencies.forEach(x => {
      data.push({ 'Id': x.Id, 'Name': x.Name });
    });

    return columns
  }

  getColumnsForDirections(data) {

    let columns = [
      {
        title: 'Όνομα', field: 'DirectionName', defaultSort: 'asc', cellStyle: { width: '300px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            multiline={true}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Προϊστάμενος', field: 'DirectionSupervisor', cellStyle: { width: '150px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            multiline={true}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Τηλέφωνο', field: 'DirectionTelephone', cellStyle: { width: '90px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            multiline={true}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Email', field: 'DirectionEmail', cellStyle: { width: '200px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            multiline={true}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Διεύθυνση', field: 'DirectionAddress', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            multiline={true}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'T.K.', field: 'DirectionPostCode', cellStyle: { width: '70px' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Πόλη', field: 'DirectionCity', cellStyle: { width: '70px' },
        editComponent: props => (
          <TextField
            required
            type="text"
            multiline={true}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />)
      }
    ];

    if (this.props.municipalityDirections) {
      this.props.municipalityDirections.forEach(x => {
        data.push({
          'DirectionId': x.DirectionId, 'DirectionName': x.DirectionName, 'DirectionSupervisor': x.DirectionSupervisor,
          'DirectionTelephone': x.DirectionTelephone, 'DirectionEmail': x.DirectionEmail, 'DirectionAddress': x.DirectionAddress,
          'DirectionPostCode': x.DirectionPostCode, 'DirectionCity': x.DirectionCity
        });
      });
    }

    return columns
  }

  getColumnsForDepartments(data) {
    var lookupDirections = {};
    this.props.municipalityDirections.forEach(x => {
      lookupDirections[x.DirectionId] = x.DirectionName;
    });

    let columns = [
      { title: 'Διεύθυνση', field: 'DirectionId', defaultSort: 'asc', lookup: lookupDirections, cellStyle: { width: '500px', wordBreak: 'break-word' } },
      {
        title: 'Τμήμα', field: 'DepartmentName', cellStyle: { width: '600px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            style={{ width: '600px' }}
            value={props.value}
            multiline={true}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Προϊστάμενος', field: 'DepartmentSupervisor', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            type="text"
            value={props.value}
            multiline={true}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Τηλέφωνο', field: 'DepartmentTelephone', cellStyle: { width: '70px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            multiline={true}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Email', field: 'DepartmentEmail', cellStyle: { width: '150px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            multiline={true}
            onChange={e => props.onChange(e.target.value)}
          />)
      }
    ];

    if (this.props.municipalityDirections) {
      this.props.municipalityDirections.forEach(direction => {
        if (direction.department) {
          direction.department.forEach(department => {
            if (department) {
              data.push({
                'DepartmentId': department.DepartmentId, 'DirectionId': department.DirectionId,
                'DepartmentName': department.DepartmentName, 'DepartmentSupervisor': department.DepartmentSupervisor,
                'DepartmentTelephone': department.DepartmentTelephone, 'DepartmentEmail': department.DepartmentEmail
              });
            }
          });
        }
      })
    }

    return columns
  }

  getColumnsForReservations(data) {
    let columns = [
      {
        title: 'Όνομα', field: 'Name', defaultSort: 'asc', cellStyle: { width: '0px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            multiline={true}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Ποσοστό Κράτησης(%)', field: 'Percentage', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="number"
            value={props.value}
            style={{ width: '100px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Χαρτόσημο', field: 'Stamp', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            type="number"
            value={props.value}
            style={{ width: '100px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Χαρτ. ΟΓΑ', field: 'StampOGA', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            type="number"
            value={props.value}
            style={{ width: '100px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Κράτηση επί του καθαρού ποσού', field: 'IsReservation', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <Checkbox
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={props.value === 'Ναι' ? true : false}
            onChange={e => props.onChange(e.target.checked ? 'Ναι' : 'Όχι')}
            style={{ width: '100px' }}
          />)
      },
      {
        title: 'Σειρά', field: 'Order', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            type="number"
            value={props.value}
            style={{ width: '50px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      }

    ];

    this.props.reservations.forEach(x => {
      data.push({ 'Id': x.Id, 'Name': x.Name, 'Percentage': x.Percentage ? parseFloat(x.Percentage) : '', 'Stamp': x.Stamp ? parseFloat(x.Stamp) : '', 'StampOGA': x.StampOGA ? parseFloat(x.StampOGA) : '', 'IsReservation': x.IsReservation ? 'Ναι' : 'Όχι', 'Order': x.Order });
    });

    return columns
  }

  getColumnsForSignatories(data) {
    let columns = [
      {
        title: 'Όνομα Υπογράφων', field: 'Name', defaultSort: 'asc', cellStyle: { width: '0px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            style={{ width: '500px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      }
    ];

    this.props.signatories.forEach(x => {
      data.push({ 'Id': x.Id, 'Name': x.Name, 'Signatorytype': x.SignatoryType });
    });

    return columns;
  }

  getColumnsForSignatoryTypes(data) {
    let columns = [
      {
        title: 'Τύπος Υπογράφων', field: 'Name', defaultSort: 'asc', cellStyle: { width: '0px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            required
            type="text"
            value={props.value}
            style={{ width: '500px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      }
    ];

    this.props.signatorytypes.forEach(x => {
      data.push({ 'Id': x.Id, 'Name': x.Name, 'Signatorytype': x.SignatoryType });
    });

    return columns
  }

  getColumnsForErrorMessages(data) {
    let columns = [
      { title: 'Όνομα Χρήστη', field: 'Username', defaultSort: 'asc', cellStyle: { width: '0px', wordBreak: 'break-word' } },
      { title: 'Ημ/νία', field: 'DateCreated', cellStyle: { width: '0px', wordBreak: 'break-word' } },
      { title: 'Σφάλμα', field: 'ErrorMessage', cellStyle: { width: '800px', wordBreak: 'break-word' } }
    ];

    this.props.errormessages.forEach(x => {
      data.push({ 'Id': x.Id, 'Username': x.Username, 'ErrorMessage': x.ErrorMessage, 'DateCreated': getDateTimeFormat(x.DateCreated) });
    });

    return columns
  }

  setColumnsAndData(selectedItem) {

    let columns = [];
    let data = [];

    if (selectedItem === 'Χρήστες')
      columns = this.getColumnsForUsers(data)
    else if (selectedItem === 'Τύπος Σύμβασης')
      columns = this.getColumnsForContractTypes(data)
    else if (selectedItem === 'Δημόσιοι Φορείς')
      columns = this.getColumnsForAgencies(data)
    else if (selectedItem === 'Διευθύνσεις')
      columns = this.getColumnsForDirections(data)
    else if (selectedItem === 'Τμήματα')
      columns = this.getColumnsForDepartments(data)
    else if (selectedItem === 'Κρατήσεις')
      columns = this.getColumnsForReservations(data)
    else if (selectedItem === 'Υπογράφοντες')
      columns = this.getColumnsForSignatories(data)
    else if (selectedItem === 'Τύπος Υπογραφώντων')
      columns = this.getColumnsForSignatoryTypes(data)
    else if (selectedItem === 'Σφάλματα')
      columns = this.getColumnsForErrorMessages(data)

    this.setState({ columns: columns, data: data });
  }

  showData(maxBodyHeight) {
    console.log('showData: getBodyHeight: ' + getBodyHeight());
    let selectedItem = this.state.selectedParameter;
    return (
      <div style={{ height: getBodyHeight() }}>
        <MaterialTable
          localization={{
            pagination: {
              firstTooltip: 'Πρώτη Σελίδα',
              previousTooltip: 'Προηγούμενη Σελίδα',
              nextTooltip: 'Επόμενη Σελίδα',
              lastTooltip: 'Τελευταία Σελίδα',
              labelDisplayedRows: '{from}-{to} από {count}',
              labelRowsSelect: ''
            },
            toolbar: {
              nRowsSelected: '{0} γραμμές(s) επιλεγμένες',
              searchTooltip: 'Αναζήτηση',
              searchPlaceholder: 'Αναζήτηση'
            },
            header: {
              actions: 'Ενέργειες',

            },
            body: {
              emptyDataSourceMessage: 'Δεν υπάρχουν δεδομένα για προβολή',
              filterRow: {
                filterTooltip: 'Φίλτρο'
              },
              editRow: {
                deleteText: 'Να γίνει η διαγραφή του επιλεγμένου στοιχείου;'
              },
              addTooltip: 'Προσθήκη',
              deleteTooltip: 'Διαγραφή',
              editTooltip: 'Επεξεργασία'
            }
          }}
          title={this.getMaterialTableTitle(selectedItem)}
          options={{
            filtering: true,
            paging: true,
            pageSize: 20,
            maxBodyHeight: getBodyHeight() - 180,
            addRowPosition: 'first',
            doubleHorizontalScroll: false,
            actionsColumnIndex: -1,
            headerStyle: { backgroundColor: 'lightGreen' },
            sorting: true,
            rowStyle: rowData => ({
              backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? 'lightblue' : '#FFF'
            })
          }}
          components={{
            Toolbar: props => (
              <div style={{ backgroundColor: '#e8eaf5' }}>
                <MTableToolbar {...props} />
              </div>
            ),
            OverlayLoading: props => (
              <div style={{
                backgroundColor: '#e8eaf5', width: 'auto', height: 'auto',
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                display: 'flex', flexDirection: 'column', maxWidth: '100px', padding: '20px', borderRadius: '20px'
              }}>
                <PulseLoader
                  sizeUnit={"px"}
                  size={20}
                  color={'#123abc'}
                  loading={this.state.loading}
                />
              </div>
            )
          }}
          columns={this.state.columns}
          data={this.state.data}
          onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  this.requestAdd(selectedItem, newData, this.state.data, resolve);
                  resolve();
                }, 600)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  this.requestUpdate(selectedItem, oldData, newData, this.state.data, resolve);
                  resolve();
                }, 600);
              })
            ,
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  this.requestDelete(selectedItem, oldData, this.state.data, resolve);
                  resolve();
                }, 600);
              })
          }
          }
        />
      </div>
    )
  }

  requestAdd(selectedItem, newData, data, resolve) {
    // ['Χρήστες', 'Δημόσιοι Φορείς', 'Διευθύνσεις', 'Τμήματα', 'Κρατήσεις', 'Υπογράφοντες', 'Τύπος Υπογραφώντων']
    let doRequest = false;
    let notSupported = false;

    var methodName = ''
    var newDataName = ''
    var dispatchLabel = ''
    var addTypeLabel = ''

    if (selectedItem === 'Χρήστες') {
      methodName = 'createuser'
      newDataName = newData.Username
      doRequest = (newData.Username && newData.Password && newData.Role ? true : false)
      dispatchLabel = 'CREATE_USER'
      addTypeLabel = 'του Χρήστη'
    } else if (selectedItem === 'Τύπος Σύμβασης') {
      methodName = 'createcontracttype'
      newDataName = newData.ContractTypeName
      doRequest = (newData.ContractTypeName ? true : false)
      dispatchLabel = 'CREATE_CONTRACT_TYPE'
      addTypeLabel = 'του Τύπου Σύμβασης'
    } else if (selectedItem === 'Δημόσιοι Φορείς') {
      methodName = 'createagency'
      newDataName = newData.Name
      doRequest = (newData.Name ? true : false)
      dispatchLabel = 'CREATE_AGENCY'
      addTypeLabel = 'του Δημόσιου Φορέα'
    } else if (selectedItem === 'Διευθύνσεις') {
      methodName = 'createdirection'
      newDataName = newData.DirectionName
      doRequest = (newData.DirectionName && newData.DirectionSupervisor && newData.DirectionTelephone && newData.DirectionEmail && newData.DirectionAddress && newData.DirectionPostCode && newData.DirectionCity ? true : false)
      dispatchLabel = 'CREATE_DIRECTION'
      addTypeLabel = 'της Διεύθυνσης'
    } else if (selectedItem === 'Τμήματα') {
      methodName = 'createdepartment'
      newDataName = newData.DepartmentName
      doRequest = (newData.DirectionId && newData.DepartmentName && newData.DepartmentSupervisor && newData.DepartmentTelephone && newData.DepartmentEmail ? true : false)
      dispatchLabel = 'CREATE_DEPARTMENT'
      addTypeLabel = 'του Τμήματος'
    } else if (selectedItem === 'Κρατήσεις') {
      methodName = 'createreservation'
      newDataName = newData.Name
      doRequest = (newData.Name && newData.Percentage && newData.Order ? true : false)
      dispatchLabel = 'CREATE_RESERVATION'
      addTypeLabel = 'της Κράτησης'
    } else if (selectedItem === 'Υπογράφοντες') {
      methodName = 'createsignatory'
      newDataName = newData.Name
      doRequest = (newData.Name ? true : false)
      dispatchLabel = 'CREATE_SIGNATORY'
      addTypeLabel = 'του Υπογραφόντος'
    } else if (selectedItem === 'Τύπος Υπογραφώντων') {
      methodName = 'createsignatorytype'
      newDataName = newData.Name
      doRequest = (newData.Name ? true : false)
      dispatchLabel = 'CREATE_SIGNATORY_TYPE'
      addTypeLabel = 'του Τύπου Υπογραφόντος'
    } else if (selectedItem === 'Σφάλματα') {
      notSupported = true
      doRequest = false
    }

    if (doRequest) {
      axios.post(getHostUrl() + '/' + methodName, newData, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
        if (res && res.data && res.data.tokenIsValid === undefined) {
          var msg = 'Η δημιουργία ' + addTypeLabel + ' "' + newDataName + '" έγινε επιτυχώς!!!'
          this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
          store.dispatch({ type: dispatchLabel, payload: res.data })
          if (selectedItem === 'Κρατήσεις')
            res.data.IsReservation = (res.data.IsReservation ? 'Ναι' : 'Όχι')

          data.push(res.data);
          this.setState({ data }, () => resolve());
        } else {
          this.setState({ message: 'Η συνεδρία έχει λήξει! Ξανακάνετε σύνδεση\n', openMessage: true, submitButtonDisabled: false, navigateToLogin: true });
        }
      }).catch(error => {
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
      })
    }
    else {
      var msg = ''
      var variant = ''
      if (notSupported) {
        msg = 'Αυτή η ενέργεια δεν υποστηρίζεται!';
        variant = 'info';
      } else {
        msg = 'Αποτυχία επεξεργασίας ' + addTypeLabel + ' ' + newDataName + '!! Συμπληρώστε όλα τα πεδία!!';
        variant = 'error';
      }
      this.setState({ message: msg, openMessage: true, variant: variant, submitButtonDisabled: false });
    }
  }

  requestUpdate(selectedItem, oldData, newData, data, resolve) {
    // ['Χρήστες', 'Δημόσιοι Φορείς', 'Διευθύνσεις', 'Τμήματα', 'Κρατήσεις', 'Υπογράφοντες', 'Τύπος Υπογραφώντων']
    let doRequest = false;
    let notSupported = false;

    var methodName = ''
    var newDataName = ''
    var dispatchLabel = ''
    var addTypeLabel = ''

    if (selectedItem === 'Χρήστες') {
      doRequest = (newData.Username && newData.Role ? true : false)
      methodName = 'updateuser'
      newDataName = newData.Username
      dispatchLabel = 'UPDATE_USER'
      addTypeLabel = 'του Χρήστη'
    } else if (selectedItem === 'Τύπος Σύμβασης') {
      doRequest = (newData.ContractTypeName ? true : false)
      methodName = 'updatecontracttype'
      newDataName = newData.ContractTypeName
      dispatchLabel = 'UPDATE_AGENCY'
      addTypeLabel = 'του Δημόσιου Φορέα'
    } else if (selectedItem === 'Δημόσιοι Φορείς') {
      doRequest = (newData.Name ? true : false)
      methodName = 'updateagency'
      newDataName = newData.Name
      dispatchLabel = 'UPDATE_AGENCY'
      addTypeLabel = 'του Δημόσιου Φορέα'
    } else if (selectedItem === 'Διευθύνσεις') {
      doRequest = (newData.DirectionName && newData.DirectionSupervisor && newData.DirectionTelephone && newData.DirectionEmail && newData.DirectionAddress && newData.DirectionPostCode && newData.DirectionCity ? true : false)
      methodName = 'updatedirection'
      newDataName = newData.DirectionName
      dispatchLabel = 'UPDATE_DIRECTION'
      addTypeLabel = 'της Διεύθυνσης'
    } else if (selectedItem === 'Τμήματα') {
      doRequest = (newData.DirectionId && newData.DepartmentName && newData.DepartmentSupervisor && newData.DepartmentTelephone && newData.DepartmentEmail ? true : false)
      methodName = 'updatedepartment'
      newDataName = newData.DepartmentName
      dispatchLabel = 'UPDATE_DEPARTMENT'
      addTypeLabel = 'του Τμήματος'
    } else if (selectedItem === 'Κρατήσεις') {
      doRequest = (newData.Name ? true : false)
      methodName = 'updatereservation'
      newDataName = newData.Name
      dispatchLabel = 'UPDATE_RESERVATION'
      addTypeLabel = 'της Κράτησης'
    } else if (selectedItem === 'Υπογράφοντες') {
      doRequest = (newData.Name ? true : false)
      methodName = 'updatesignatory'
      newDataName = newData.Name
      dispatchLabel = 'UPDATE_SIGNATORY'
      addTypeLabel = 'του Υπογραφόντος'
    } else if (selectedItem === 'Τύπος Υπογραφώντων') {
      doRequest = (newData.Name ? true : false)
      methodName = 'updatesignatorytype'
      newDataName = newData.Name
      dispatchLabel = 'UPDATE_SIGNATORY_TYPE'
      addTypeLabel = 'του Τύπου Υπογραφόντος'
    } else if (selectedItem === 'Σφάλματα') {
      doRequest = false;
      notSupported = true;
    }

    if (doRequest) {
      axios.post(getHostUrl() + '/' + methodName, newData, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
        if (res && res.data && res.data.tokenIsValid === undefined) {
          var msg = 'Η επεξεργασία ' + addTypeLabel + ' "' + newDataName + '" έγινε επιτυχώς!!!'
          this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
          store.dispatch({ type: dispatchLabel, payload: res.data })
          const data = this.state.data;
          const index = data.indexOf(oldData);
          res.data.IsReservation = (res.data.IsReservation ? 'Ναι' : 'Όχι')
          data[index] = res.data;
          this.setState({ data }, () => resolve());
        } else {
          this.setState({ message: 'Η συνεδρία έχει λήξει! Ξανακάνετε σύνδεση\n', openMessage: true, variant: 'info', submitButtonDisabled: false, navigateToLogin: true });
        }
      }).catch(error => {
        var msg = 'Αποτυχία επεξεργασίας ' + addTypeLabel + ' "' + newDataName + '" !!\n';
        this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
      })
    }
    else {
      var msg = '';
      var variant = '';
      if (notSupported) {
        variant = 'info';
        msg = 'Αυτή η ενέργεια δεν υποστηρίζεται!';
      }
      else {
        variant = 'error';
        msg = 'Αποτυχία επεξεργασίας ' + addTypeLabel + ' ' + newDataName + '!! Συμπληρώστε όλα τα πεδία!!';
      }
      this.setState({ message: msg, openMessage: true, variant: variant, submitButtonDisabled: false });
    }
  }

  requestDelete(selectedItem, oldData, data, resolve) {
    // ['Χρήστες', 'Δημόσιοι Φορείς', 'Διευθύνσεις', 'Τμήματα', 'Κρατήσεις', 'Υπογράφοντες', 'Τύπος Υπογραφώντων']
    var methodName = ''
    var newDataName = ''
    var dispatchLabel = ''
    var addTypeLabel = ''

    if (selectedItem === 'Χρήστες') {
      methodName = 'deleteuser'
      newDataName = oldData.Username
      dispatchLabel = 'DELETE_USER'
      addTypeLabel = 'του Χρήστη'
    } else if (selectedItem === 'Τύπος Σύμβασης') {
      methodName = 'deletecontracttype'
      newDataName = oldData.ContractTypeName
      dispatchLabel = 'DELETE_CONTRACT_TYPE'
      addTypeLabel = 'του Τύπου Σύμβασης'
    } else if (selectedItem === 'Δημόσιοι Φορείς') {
      methodName = 'deleteagency'
      newDataName = oldData.Name
      dispatchLabel = 'DELETE_AGENCY'
      addTypeLabel = 'του Δημόσιου Φορέα'
    } else if (selectedItem === 'Διευθύνσεις') {
      methodName = 'deletedirection'
      newDataName = oldData.DirectionName
      dispatchLabel = 'DELETE_DIRECTION'
      addTypeLabel = 'της Διεύθυνσης'
    } else if (selectedItem === 'Τμήματα') {
      methodName = 'deletedepartment'
      newDataName = oldData.DepartmentName
      dispatchLabel = 'DELETE_DEPARTMENT'
      addTypeLabel = 'του Τμήματος'
    } else if (selectedItem === 'Κρατήσεις') {
      methodName = 'deletereservation'
      newDataName = oldData.Name
      dispatchLabel = 'DELETE_RESERVATION'
      addTypeLabel = 'της Κράτησης'
    } else if (selectedItem === 'Υπογράφοντες') {
      methodName = 'deletesignatory'
      newDataName = oldData.Name
      dispatchLabel = 'DELETE_SIGNATORY'
      addTypeLabel = 'του Υπογραφόντος'
    } else if (selectedItem === 'Τύπος Υπογραφώντων') {
      methodName = 'deletesignatorytype'
      newDataName = oldData.Name
      dispatchLabel = 'DELETE_SIGNATORY_TYPE'
      addTypeLabel = 'του Τύπου Υπογραφόντος'
    } else if (selectedItem === 'Σφάλματα') {
      methodName = 'deleteerrormessage'
      newDataName = oldData.ErrorMessage.substring(0, 30)
      dispatchLabel = 'DELETE_ERROR_MESSAGE'
      addTypeLabel = 'του μηνύματος'
    }

    axios.post(getHostUrl() + '/' + methodName, oldData, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
      if (res && res.data && res.data.tokenIsValid === undefined) {
        var msg = 'Η διαγραφή ' + addTypeLabel + ' "' + newDataName + '" έγινε επιτυχώς!!!'
        this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
        store.dispatch({ type: dispatchLabel, payload: res.data })

        const index = data.indexOf(oldData);
        data.splice(index, 1);
        this.setState({ data }, () => resolve());
      } else {
        this.setState({ message: 'Η συνεδρία έχει λήξει! Ξανακάνετε σύνδεση\n', openMessage: true, variant: 'info', submitButtonDisabled: false, navigateToLogin: true });
      }
    }).catch(error => {
      var msg = 'Αποτυχία διαγραφής ' + addTypeLabel + ' ' + newDataName + '!!\n';
      this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
    })
  }

  handleClose = (event, reason) => {
    this.setState({ openMessage: false });
  };

  render() {

    if (this.state.navigateToLogin) {
      resetData(store)
      return <Redirect push to={{
        pathname: '/login',
        state: { expired: true }
      }} />
    }
    else {
      return (
        <Body>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', flexBasis: '100%', flex: '0.2', backgroundColor: '#fff', overflowY: 'hidden' }}>
                {this.getItems()}
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '1', backgroundColor: '#fff', overflowY: 'hidden' }}>
                <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                  <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
                    {this.showData(window.innerHeight ? window.innerHeight - (getHeaderHeight() + getFooterHeight()) : '800px')}
                  </div>
                </div>
              </div>
            </div>
            {getFooterTemplate()}
            <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
          </div>
        </Body>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedTableItem: state.parametricdata_reducer.selectedTableItem,
    users: state.parametricdata_reducer.users,
    userroles: state.parametricdata_reducer.userroles,
    municipalityDirections: state.parametricdata_reducer.municipalityDirections,
    contractTypes: state.parametricdata_reducer.contractTypes,
    reservations: state.parametricdata_reducer.reservations,
    agencies: state.parametricdata_reducer.agencies,
    signatories: state.parametricdata_reducer.signatories,
    signatorytypes: state.parametricdata_reducer.signatorytypes,
    errormessages: state.parametricdata_reducer.errormessages,
    token: state.token_reducer.token,
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(AdministrationContainer))