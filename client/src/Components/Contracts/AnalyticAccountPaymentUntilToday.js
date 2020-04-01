import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import { getDateFormat, getFpaLabel } from '../../Helper/helpermethods';

class AnalyticAccountPaymentUntilToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      openMessage: false,
      message: '',
      bgColorMessage: '',
      fgColorMessage: '',
      submitButtonDisabled: false,
      selectedRow: null,
      accounts: this.props.createdAccounts,
      fpaValue: this.props.fpaValue
    }
  }

  render() {
    return <div style={{ minWidth: '800px', maxHeight: '600px' }}>
      <MaterialTable
        localization={{
          pagination: {
            firstTooltip: 'Πρώτη Σελίδα',
            previousTooltip: 'Προηγούμενη Σελίδα',
            nextTooltip: 'Επόμενη Σελίδα',
            lastTooltip: 'Τελευταία Σελίδα',
            labelDisplayedRows: '{from}-{to} από {count}',
            labelRowsSelect: ''
          }
        }}
        options={{
          paging: true,
          header: true,
          toolbar: false,
          showTitle: false,
          search: false,
          emptyRowsWhenPaging: true,
          headerStyle: { position: 'sticky', top: 0, backgroundColor: 'lightGreen', fontSize: '16px' },
          sorting: true,
          rowStyle: rowData => ({
            backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? 'lightblue' : '#FFF'
          })
        }}
        columns={[
          { title: "#", field: "Number", render: data => <div style={{ fontSize: '16px', fontWeight: '500' }}>{data.Number}</div> },
          { title: "Έναρξη", field: "Start", type: "date", render: data => <div style={{ fontSize: '16px', fontWeight: '500' }}>{getDateFormat(data.Start)}</div> },
          { title: "Τέλος", field: "End", type: "date", render: data => <div style={{ fontSize: '16px', fontWeight: '500' }}>{getDateFormat(data.End)}</div> },
          {
            title: "Καθαρό Ποσό",
            field: "AmountPure",
            render: data => <div style={{ fontSize: '16px', fontWeight: '500' }}>{data.AmountPure}€</div>
          },
          {
            title: getFpaLabel(this.state.fpaValue),
            field: "AmountFpa",
            render: data => <div style={{ fontSize: '16px', fontWeight: '500' }}>{data.AmountFpa}€</div>
          },
          {
            title: "Σύνολο",
            field: "AmountTotal",
            render: data => <div style={{ fontSize: '16px', fontWeight: '500' }}>{data.AmountTotal}€</div>
          },
        ]}
        data={this.props.createdAccounts}
        onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
        title="Πληροφορίες δημιουργημένων λογαριασμών"
      />
    </div>

  }
}

export default (AnalyticAccountPaymentUntilToday)
