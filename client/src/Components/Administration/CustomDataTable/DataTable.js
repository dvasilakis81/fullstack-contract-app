import React, { Component } from 'react';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      data: this.props.data
    }

    // this.editAccount = this.editAccount.bind(this);
    // this.createDocument1 = this.createDocument1.bind(this);
    // this.createDocument2 = this.createDocument2.bind(this);
    // this.getAccountNumberLex = this.getAccountNumberLex.bind(this);
  }

  getColumnsTemplate() {
    return (this.state.columns ?
      this.state.columns.map((value, index) => {
        return (<th id={index}>{value.selector}</th>)
      }) : null)
  }

  getDataTemplate() {
    return (this.state.columns ?
      this.state.data.map((value, index) => {
        return (
        <><div id={index}>{value.Username}</div>
        <div id={index}>{value.Role}</div></>
        )
      }) : null)
  }

  render() {
    return (
      <div>
        <table>
          {this.getColumnsTemplate()}
          <tbody>
            {/* {this.getDataTemplate()} */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;