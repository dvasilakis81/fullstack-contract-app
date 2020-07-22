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
import { getFooterTemplate } from '../Common/templates';
import Body from '../../HOC/Body/body';
import { resetData } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';

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

class ReservationsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.token.data.token.id,
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

  componentDidMount() {
    this.setColumnsAndData()
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
        title: 'Χαρτόσημο(%)', field: 'Stamp', cellStyle: { width: '100px', wordBreak: 'break-word' },
        editComponent: props => (
          <TextField
            type="number"
            value={props.value}
            style={{ width: '100px' }}
            onChange={e => props.onChange(e.target.value)}
          />)
      },
      {
        title: 'Χαρτ. ΟΓΑ(%)', field: 'StampOGA', cellStyle: { width: '100px', wordBreak: 'break-word' },
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

    if (this.props.token && this.props.token.data && this.props.token.data.user.reservations) {
      this.props.token.data.user.reservations.forEach(x => {
        data.push({ 'Id': x.Id, 'Name': x.Name, 'Percentage': x.Percentage ? parseFloat(x.Percentage) : '', 'Stamp': x.Stamp ? parseFloat(x.Stamp) : '', 'StampOGA': x.StampOGA ? parseFloat(x.StampOGA) : '', 'IsReservation': x.IsReservation ? 'Ναι' : 'Όχι', 'Order': x.Order });
      });
    }

    return columns;
  }

  setColumnsAndData() {

    let data = [];
    let columns = this.getColumnsForReservations(data)
    this.setState({ columns: columns, data: data });
  }

  showData(maxBodyHeight) {
    console.log('showData: getBodyHeight: ' + getBodyHeight());
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
          title='Κρατήσεις'
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
                  this.requestAdd(newData, this.state.data, resolve);
                  resolve();
                }, 600)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  this.requestUpdate(oldData, newData, this.state.data, resolve);
                  resolve();
                }, 600);
              })
            ,
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  this.requestDelete(oldData, this.state.data, resolve);
                  resolve();
                }, 600);
              })
          }
          }
        />
      </div>
    )
  }

  requestAdd(newData, data, resolve) {

    let notSupported = false;
    var methodName = 'createuserreservation'
    var newDataName = newData.Name
    let doRequest = (newData.Name && newData.Percentage && newData.Order ? true : false)
    var dispatchLabel = 'CREATE_RESERVATION'
    var addTypeLabel = 'της Κράτησης'

    if (doRequest) {
      axios.post(getHostUrl() + '/' + methodName, newData, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
        if (res && res.data && res.data.tokenIsValid === undefined) {
          var msg = 'Η δημιουργία ' + addTypeLabel + ' "' + newDataName + '" έγινε επιτυχώς!!!'
          this.setState({ message: msg, openMessage: true, variant: 'success', submitButtonDisabled: false });
          store.dispatch({ type: dispatchLabel, payload: res.data })
          res.data.IsReservation = (res.data.IsReservation ? 'Ναι' : 'Όχι')
          data.push(res.data);
          this.setState({ data }, () => resolve());
        } else
          this.setState({ message: 'Η συνεδρία έχει λήξει! Ξανακάνετε σύνδεση\n', openMessage: true, submitButtonDisabled: false, navigateToLogin: true });
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

  requestUpdate(oldData, newData, data, resolve) {
    let notSupported = false;
    var doRequest = (newData.Name ? true : false)
    var methodName = 'updateuserreservation'
    var newDataName = newData.Name
    var dispatchLabel = 'UPDATE_RESERVATION'
    var addTypeLabel = 'της Κράτησης'


    if (doRequest) {
      axios.post(getHostUrl() + '/' + methodName, newData, { headers: { Authorization: 'Bearer ' + this.props.token.data.token } }).then(res => {
        if (res && res.data && res.data.tokenIsValid === undefined) {
          this.updateTokenReservation(newData);
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

  requestDelete(oldData, data, resolve) {

    var methodName = 'deleteuserreservation'
    var newDataName = oldData.Name
    var dispatchLabel = 'DELETE_RESERVATION'
    var addTypeLabel = 'της Κράτησης'

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

  updateTokenReservation(data) {
    var tokenReservations = this.props.token.data ? this.props.token.data.user.reservations : undefined;
    if (tokenReservations) {
      for (let index = 0; index < tokenReservations.length; index++) {
        const element = tokenReservations[index];
        if (element.Id == data.Id) {
          element.Name = data.Name;
          element.Percentage = data.Percentage;
          element.Stamp = data.Stamp;
          element.StampOGA = data.StampOGA;
          element.IsReservation = data.IsReservation === 'Ναι' ? true : false;
          element.Order = data.Order;

          break;
        }
      }
    }
  }

  render() {

    if (this.state.navigateToLogin) {
      resetData(store)
      return <Redirect push to={{
        pathname: '/login',
        state: { expired: true }
      }} />
    } else {
      return (
        <Body>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', flexWrap: 'wrap' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '1', backgroundColor: '#fff', overflowY: 'hidden' }}>
                <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                  <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
                    {this.showData(window.innerHeight ? window.innerHeight - (getHeaderHeight() + getFooterHeight()) : '800px')}
                  </div>
                </div>
              </div>
            </div>
            {getFooterTemplate(this.props.token)}
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
    reservations: state.parametricdata_reducer.reservations,
    token: state.token_reducer.token,
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(ReservationsContainer))