import React from 'react';
import { connect } from 'react-redux';
import { getDateFormat } from '../../../Helper/helpermethods';
import { Grid, Typography, Paper } from '@material-ui/core';

class ItemList extends React.Component {

  changeSelectedItem(e, item) {
    if (this.props.isSearchMode)
      this.props.dispatch({ type: 'SEARCH_MODE_CONTRACT_DETAIL', payload: item });
    else
      this.props.dispatch({ type: 'SET_CONTRACT_DETAIL', payload: item });
  }

  getTitle(title) {
    var ret = title;
    if (title && title.length > 100)
      ret = title.substring(0, 100) + '...';
    return ret;
  }

  render() {

    const tableStyle1 = {
      tableLayout: 'fixed',
      padding: '10px',
      fontSize: '12px',
      background: 'lightyellow',
      border: '2px',
      borderStyle: 'solid',
      borderColor: '#ccccb3'
    };

    const tableStyle2 = {
      tableLayout: 'fixed',
      padding: '10px',
      fontSize: '12px',
      background: 'lightblue',
      border: '2px',
      borderStyle: 'solid',
      borderColor: '#7997a1'
    };

    const itemToRender = this.props.item["item"];
    let selectedItem = null;
    if (this.props.isSearchMode)
      selectedItem = this.props.contractDetailsSearchMode ? this.props.contractDetailsSearchMode : this.props.defaultSelectedItem;
    else {

      if (this.props.contractDetails)
        selectedItem = this.props.contractDetails;
      else {
        selectedItem = this.props.defaultSelectedItem;
        this.props.dispatch({ type: 'SET_CONTRACT_DETAIL', payload: selectedItem });
      }
    }

    let listItemStyle = (itemToRender.Id !== selectedItem.Id ? tableStyle1 : tableStyle2);
    return (
      <div id={itemToRender.Id}
        onClick={() => this.changeSelectedItem(this, itemToRender)}
        style={{ padding: '0px', background: '#fff' }}>
        <Grid item style={{ flexGrow: '1' }}>
          <Paper square={true} style={listItemStyle}>
            <Typography>
              <span style={{ fontWeight: 'bold', width: 'auto' }}>Τίτλος:</span>
              <span style={{ marginLeft: '5px' }}>{this.getTitle(itemToRender.Title)}</span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold', width: 'auto' }}>Ανάδοχος:</span>
              <span style={{ marginLeft: '5px' }}>{itemToRender.ConcessionaireName}</span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold', width: 'auto' }}>Έναρξη:</span>
              <span style={{ marginLeft: '5px' }}>{getDateFormat(itemToRender.Start)}</span>
              <span style={{ fontWeight: 'bold', width: 'auto', marginLeft: '5px' }}>Λήξη:</span>
              <span style={{ marginLeft: '5px' }}>{getDateFormat(itemToRender.End)}</span>
            </Typography>
            <Typography>
              <span style={{ fontWeight: 'bold', width: 'auto' }}>Ημ. Καταχώρησης:</span>
              <span style={{ marginLeft: '5px' }}>{getDateFormat(itemToRender.DateCreated)}</span>
            </Typography>
          </Paper>
        </Grid>
      </ div>
    )
  };
}

function mapStateToProps(state) {
  return {
    contractDetails: state.contracts_reducer.contractDetails,
    contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
    isSearchMode: state.contracts_reducer.isSearchMode
  }
}

export default connect(mapStateToProps, null)(ItemList)