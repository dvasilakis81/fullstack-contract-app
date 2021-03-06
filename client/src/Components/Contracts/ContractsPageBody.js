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
import { getFooterTemplate, showErrorMessageFromServer, showGenericMessage } from '../Common/templates'
import { getContracts, searchContracts } from '../../Redux/Actions';
import Body from '../../HOC/Body/body';
import { getHostUrl, getContractsLimit } from '../../Helper/helpermethods';
import { resetData } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store'
import MySnackbar from '../Common/MySnackbar'

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
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    };

    this.fetchMore = this.fetchMore.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onCancelRequest = this.onCancelRequest.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    store.dispatch({ type: 'CLOSE_SNACKBAR', payload: false })
  }

  onChangeSearch(value) {
    this.setState({ searchValue: value });
    if (value.length >= minCharsToSearch) {
      this.props.searchContracts(this.props.token, value);
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
    this.props.getContracts(this.props.token, this.props.contracts.length, getContractsLimit());
  }

  componentDidMount() {
    if (this.props.token) {
      if (this.props.doRefresh === undefined) {

        axios.get(getHostUrl() + "/agencies", { headers: { Authorization: "Bearer " + this.props.token.token } }).then(response => {
          store.dispatch({
            type: "GET_MUN_AGENCIES",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/directions", { headers: { Authorization: "Bearer " + this.props.token.token } }).then(response => {
          store.dispatch({
            type: "GET_MUN_DIRECTIONS",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/contracttypes", { headers: { Authorization: "Bearer " + this.props.token.token } }).then(response => {
          store.dispatch({
            type: "GET_CONTRACT_TYPES",
            payload: response
          });
        });

        axios.get(getHostUrl() + "/errormessages", { headers: { Authorization: "Bearer " + this.props.token.token } }).then(response => {
          store.dispatch({
            type: "GET_ERRORMESSAGES",
            payload: response
          });
        });

        var ddd = (this.props.token.token ? this.props.token.token : 'tokenData.token: undefined');        

        if (this.props.isSearchMode)
          this.props.searchContracts(this.props.token, this.props.searchModeValue);
        else
          this.props.getContracts(this.props.token, 0, getContractsLimit(this.props.loadedItems));
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
          margin: '10px',
          maxWidth: 800,
          height: 'auto',
          border: '2px solid lightblue'
        }} />
    );
  }
  getTemplate() {

    let isSearchMode = ((this.state.searchValue && this.state.searchValue.length > 2) || this.props.isSearchMode)
    let contractsList = isSearchMode ? this.props.searchContractsList : this.props.contracts;
    if (this.state.navigateToLogin) {
      resetData(store)
      return <Redirect push to={{
        pathname: '/login',
        state: { expired: true }
      }} />
    } else if (this.props.contractsRejected) {
      var msgToShow = '';
      if (this.props.contractsRejected && this.props.contractsRejected.message === 'Network Error') {
        msgToShow = 'Αποτυχία σύνδεσης με τον διακομιστή!'
      } else if (this.props.contractsRejected.response && this.props.contractsRejected.response.data) {
        msgToShow = this.props.contractsRejected.response.statusText
        msgToShow += '\nroutine:' + this.props.contractsRejected.response.data.routine
        msgToShow += '\nhint: ' + this.props.contractsRejected.response.data.hint
      }
      else if (this.props.contractsRejected && this.props.contractsRejected.message)
        msgToShow = this.props.contractsRejected.message

      return showErrorMessageFromServer(msgToShow);
    }
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
              <MySnackbar duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} openMessage={this.props.openMessage} message={this.props.message} variant={this.props.variant} />
              <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
                {/* 1st column */}
                <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
                  <div style={{ display: 'flex', flexFlow: 'row', backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', flexFlow: 'column', flex: '1' }}>
                      {this.props.token.user.departmentNumber ? <div style={{ fontSize: "20px", textAlign: "center", verticalAlign: 'middle', fontWeight: "600", padding: "0px", }}>
                        <span style={{ marginLeft: "5px" }}>
                          {this.props.token.user.ou}/{this.props.token.user.departmentNumber}
                        </span>
                      </div> : <></>}                      
                      {this.getSearchBar()}
                      {isSearchMode === true ? this.getSearchLabel(contractsList) : this.getContractsLabel(contractsList)}
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

                {/* 2st column */}
                <div style={{ marginLeft: '10px', marginRight: '15px', display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '0.7', backgroundColor: '#fff', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden' }}>
                    <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
                      {this.props.contracts ? (<ItemDetail item={this.props.contracts[0]} />) : null}
                    </div>
                  </div>
                </div>
              </div>

              {getFooterTemplate(this.props.token)}
            </div>
          </Body>
        </LoadingOverlay>
      );
    }
  }

  render() {

    var isSearchMode = (this.state.searchValue && this.state.searchValue.length > minCharsToSearch);
    let contractsList = isSearchMode ? this.props.searchContractsList : this.props.contracts
    if (contractsList && contractsList.tokenIsValid === false) {
      console.log('Contracts dispatch RESET_ACTION');
      store.dispatch({ type: "RESET_ACTION", payload: null });
      return <Redirect push to="/login" />;
    } else
      return this.getTemplate(window.innerWidth, window.innerHeight);
  }
}

function mapStateToProps(state) {
  return {
    //screenDimensions: state.parametricdata_reducer.screenDimensions,
    openMessage: state.contracts_reducer.openMessage,
    message: state.contracts_reducer.message,
    variant: state.contracts_reducer.variant,
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
    token: state.token_reducer.token,
    insertContractInfoPending: state.contracts_reducer.insertContractInfoPending
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getContracts, searchContracts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContractsPageBody));
