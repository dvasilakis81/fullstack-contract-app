import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'
import SearchBar from 'material-ui-search-bar'
import scrollIntoView from 'scroll-into-view-if-needed'
import { withStyles } from "@material-ui/core/styles"
import LoadingOverlay from 'react-loading-overlay'

import ItemsList from '../Contracts/Items/itemslist';
import ItemDetail from '../Contracts/Items/itemdetail';
import { getFooterTemplate, getFailedConnectionWithServer, showGenericMessage } from '../Common/templates'
import { getContracts, searchContracts } from '../../Redux/Actions';
import store from '../../Redux/Store/store';
import Body from '../../HOC/Body/body';
import { getHostUrl, getContractsLimit } from '../../Helper/helpermethods';

const styles = {
  clipperStyle: {
    display: 'block',
    margin: '0 auto',
  },
  loadingSpinner: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    color: '#1a1d1d',
    textAlign: 'center'
  }
};
const minCharsToSearch = 3;
class ContractsPageBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitButtonDisabled: false,
      navigateToEditAccount: false,
      navigateToLogin: false,
      searchValue: '',
      contractsPendingLoading: this.props.contractsPending,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };

    this.fetchMore = this.fetchMore.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onCancelRequest = this.onCancelRequest.bind(this);
  }

  onChangeSearch(value) {
    this.setState({ searchValue: value });
    if (value.length >= minCharsToSearch) {
      this.props.searchContracts(this.props.token.data, value);
      store.dispatch({ type: 'IS_CONTRACTS_SEARCH_MODE', payload: true });
      store.dispatch({ type: 'SEARCH_MODE_VALUE', payload: value });

    }
    else {
      store.dispatch({ type: 'IS_CONTRACTS_SEARCH_MODE', payload: false });
      store.dispatch({ type: 'SEARCH_MODE_VALUE', payload: '' });
    }
  }

  onCancelRequest() {
    this.setState({ searchValue: '' });
    store.dispatch({ type: 'IS_CONTRACTS_SEARCH_MODE', payload: false });
    store.dispatch({ type: 'SEARCH_MODE_VALUE', payload: '' });
    store.dispatch({ type: 'SEARCH_MODE_CONTRACT_DETAIL', payload: null });

    this.scrollToSelectedItem();
  }

  fetchMore() {
    this.props.getContracts(this.props.token.data, this.props.contracts.length, getContractsLimit());
  }

  componentDidMount() {
    if (this.props.token && this.props.token.data) {
      if (this.props.doRefresh === undefined || (this.props.doRefresh !== undefined && this.props.doRefresh)) {        
        //if (this.props.token.data.role === 1) {

        axios.get(getHostUrl() + "/users", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_USERS",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/userroles", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_USER_ROLES",
            payload: response
          });
        });
        //}

        axios.get(getHostUrl() + "/agencies", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_MUN_AGENCIES",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/directions", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_MUN_DIRECTIONS",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/contracttypes", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_CONTRACT_TYPES",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/reservations", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_RESERVATIONS",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/signatories", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_SIGNATORIES",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/signatorytypes", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_SIGNATORYTYPES",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/errormessages", { headers: { Authorization: "Bearer " + this.props.token.data.token } }).then(response => {
          store.dispatch({
            type: "GET_ERRORMESSAGES",
            payload: response
          });
        });

        if (this.props.isSearchMode)
          this.props.searchContracts(this.props.token.data, this.props.searchModeValue);
        else
          this.props.getContracts(this.props.token.data, 0, getContractsLimit(this.props.loadedItems));
      }

      let isSearchMode = (this.props.searchModeValue && this.props.searchModeValue.length > minCharsToSearch)
      if (isSearchMode)
        this.setState({ searchValue: this.props.searchModeValue });
      this.scrollToSelectedItem();
    }
    else
      this.setState({ navigateToLogin: true })

  }

  componentDidUpdate() {
    store.dispatch({ type: 'DO_REFRESH', payload: true });
    let loadedItems = 0;
    if (this.props.isSearchMode && this.props.searchContractsList) {
      loadedItems = this.props.searchContractsList.length
    }
    else {
      if (this.props.contracts)
        loadedItems = this.props.contracts.length
    }

    let isSearchMode = (this.props.searchModeValue && this.props.searchModeValue.length > minCharsToSearch)
    var contractDetails = isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
    if (contractDetails && contractDetails.Id) {
      const element = document.getElementById(contractDetails.Id);
      if (element)
        scrollIntoView(element, { scrollMode: 'if-needed', block: 'nearest', inline: 'nearest' })
    }

    store.dispatch({ type: 'CONTRACT_LOADED_ITEMS', payload: loadedItems })
  }

  scrollToSelectedItem() {
    let isSearchMode = (this.props.searchModeValue && this.props.searchModeValue.length > minCharsToSearch)
    var contractDetails = isSearchMode ? this.props.contractDetailsSearchMode : this.props.contractDetails
    if (contractDetails && contractDetails.Id) {
      const element = document.getElementById(contractDetails.Id);
      if (element)
        scrollIntoView(element, { scrollMode: 'if-needed', block: 'nearest', inline: 'nearest', })
    }
  }
  getMoreButton(contracts) {
    if (contracts && contracts.length > 0) {
      if (contracts[0] && contracts.length < this.getTotalContacts(contracts)) {
        return (

          <Button
            variant="contained"
            color="primary"
            style={{ margin: "auto", width: "200px", padding: "0px", fontSize: '16px' }}
            onClick={this.fetchMore}>
            <b>Περισσότερες Συμβάσεις</b>
          </Button>
        );
      }
    }
  }

  getTotalContacts(contracts) {
    let totalContacts = 0;

    if (contracts) {
      let totalContactsUndefined = 0;

      if (contracts) {
        for (let index = 0; index < contracts.length; index++) {
          if (contracts[index].Total) {
            totalContacts = contracts[index].Total
            break;
          }
          else
            totalContactsUndefined = totalContactsUndefined + 1;
        }
      }
      if (totalContactsUndefined > 0)
        totalContacts = Number(totalContacts) + Number(totalContactsUndefined);
    }

    return totalContacts
  }

  getContractsLabel(contracts) {
    if (contracts) {
      let totalContacts = this.getTotalContacts(contracts)
      return (
        <div style={{ fontSize: "20px", textAlign: "center", verticalAlign: 'middle', fontWeight: "600", padding: "0px", }}>
          <span>{contracts.length}</span>
          <span style={{ marginLeft: "5px" }}>/</span>
          <span style={{ marginLeft: "5px" }}>{totalContacts}</span>
          <span style={{ marginLeft: "5px" }}>Συμβάσεις</span>
        </div>
      );
    }
  }

  getSearchLabel(contracts) {
    if (contracts) {
      if (contracts.length === 1) {
        return (<div style={{ fontSize: "20px", textAlign: "center", verticalAlign: 'middle', fontWeight: "600", padding: "0px" }}>
          <span style={{ marginLeft: "5px" }}>Βρέθηκε 1 σύμβαση</span>
        </div>)
      }
      else {
        return (
          <div style={{ fontSize: "20px", textAlign: "center", verticalAlign: 'middle', fontWeight: "600", padding: "0px" }}>
            <span style={{ marginLeft: "5px" }}>Βρέθηκαν</span>
            <span style={{ marginLeft: "5px" }}>{contracts.length}</span>
            <span style={{ marginLeft: "5px" }}>συμβάσεις</span>
          </div>
        )
      };
    }
  }

  getSearchBar() {
    return (
      <SearchBar
        id='SearchBar'
        placeholder='Αναζήτηση στον Τίτλο ή Ανάδοχο'
        onChange={this.onChangeSearch.bind(this)}
        value={this.state.searchValue}
        onCancelSearch={this.onCancelRequest.bind(this)}
        style={{
          marginLeft: "20px",
          marginRight: "0px",
          marginBottom: "5px",
          maxWidth: 800,
          height: 'auto',
          border: '2px solid lightblue'
        }} />
    );
  }
  getTemplate() {
    //let wh = this.props.screenDimensions.height;

    let isSearchMode = ((this.state.searchValue && this.state.searchValue.length > 2) || this.props.isSearchMode)
    let contractsList = isSearchMode ? this.props.searchContractsList : this.props.contracts
    if (this.state.navigateToLogin)
      return <Redirect to='/login' />
    else if (this.props.contractsRejected)
      return getFailedConnectionWithServer();
    else {
      return (
        <LoadingOverlay
          active={this.props.contractsPending ? true : false}
          spinner
          text='Αναμονή για τις συμβάσεις ...'
          styles={{
            overlay: (base) => ({
              ...base,
              width: '100%',
              textAlign: 'middle'
            })
          }}>
          <Body>
            <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%' }}>
              <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
                {/* 1st column */}
                <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
                  <div style={{ display: 'flex', flexFlow: 'row', backgroundColor: '#fff', height: '100px' }}>
                    <div style={{ display: 'flex', flexFlow: 'column', flex: '1' }}>
                      {isSearchMode ? this.getSearchLabel(contractsList) : this.getContractsLabel(contractsList)}
                      {this.getSearchBar()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px', }}>
                    <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
                      {(contractsList && contractsList.length > 0) ? <ItemsList data={contractsList} defaultSelectedItem={contractsList[0]} /> : showGenericMessage('Δεν βρέθηκαν συμβάσεις', false, false)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff' }}>
                    {isSearchMode ? null : this.getMoreButton(contractsList)}
                  </div>
                </div>

                <div style={{ marginLeft: '10px', marginRight: '15px', display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '0.7', backgroundColor: '#fff', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                    <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
                      {this.props.contracts ? (<ItemDetail item={this.props.contracts[0]} />) : null}
                    </div>
                  </div>
                </div>
              </div>

              {getFooterTemplate()}
            </div>
          </Body>
        </LoadingOverlay>
      );
    }
  }

  render() {

    var isSearchMode = (this.state.searchValue && this.state.searchValue.length > minCharsToSearch);
    let contractsList = isSearchMode ? this.props.searchContractsList : this.props.contracts
    console.log('contractsList: ' + contractsList)
    console.log('contractsList.tokenIsValid: ' + contractsList.tokenIsValid)
    if (contractsList && contractsList.tokenIsValid === false) {
      console.log('RESET_ACTION')
      store.dispatch({ type: "RESET_ACTION", payload: null });
      return <Redirect push to="/login" />;
    } else
      return this.getTemplate(window.innerWidth, window.innerHeight);
  }
}

function mapStateToProps(state) {
  return {
    //screenDimensions: state.parametricdata_reducer.screenDimensions,
    doRefresh: state.parametricdata_reducer.doRefresh,
    contracts: state.contracts_reducer.contractsList,
    contractsPending: state.contracts_reducer.contractsPending,
    contractsRejected: state.contracts_reducer.contractsRejected,
    contractDetails: state.contracts_reducer.contractDetails,
    contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
    searchContractsList: state.contracts_reducer.searchContractsList,
    searchModeValue: state.contracts_reducer.searchModeValue,
    isSearchMode: state.contracts_reducer.isSearchMode,
    loadedItems: state.contracts_reducer.loadedItems,
    token: state.token_reducer.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getContracts, searchContracts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContractsPageBody));
