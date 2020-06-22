import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import store from '../../Redux/Store/store'
import { connect } from 'react-redux';
import { getHeaderHeight, resetData } from '../../Helper/helpermethods';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  stickyHeader: {
    flexGrow: 1,
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1100,
    height: getHeaderHeight()
  },
  stickyHeader2: {
    flexGrow: 1,
    position: 'static',
    top: 0,
    left: 0,
    zIndex: 1,
    height: getHeaderHeight(),
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontSize: '1.5rem !important',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1.33',
    letterSpacing: '0em'
  }
};

// 13275

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAnchorEl: false,
      navigateToLogin: false,
      navigateToCreateNewContact: false,
      navigateToAdministration: false
    }

    this.gotoAdministration = this.gotoAdministration.bind(this);
    this.createNewContract = this.createNewContract.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAccountMenuOpen = this.handleAccountMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  renderMenu() {
    return <Menu
      style={{
        width: this.props.screenDimensions.width,
        height: this.props.screenDimensions.height,
        textAlign: 'middle',
        horizontal: 'center'
      }}
      anchorEl={this.state.accountAnchorEl}
      id='primary-search-account-menu'
      keepMounted
      open={Boolean(this.state.accountAnchorEl)}
      onClose={this.handleMenuClose}>
      <MenuItem onClick={this.logout} style={{ transform: document.getElementById('root').style.transform }}>Έξοδος</MenuItem>
    </Menu>
  };

  handleMenuClose() {
    this.setState({ accountAnchorEl: null })
  }

  handleAccountMenuOpen(event) {
    this.setState({ accountAnchorEl: event.currentTarget });
  };

  componentDidMount() {
    if (this.props.token === undefined)
      this.setState({ navigateToLogin: true })
  }

  getArrowBackIcon() {
    return <ArrowBack color="inherit" onClick={this.props.history.goBack} style={{ marginRight: '5px' }} />
  }

  getHeaderAction(title, showAdministrationOption, showNewContractOption) {
    
    return (
      <div style={{ width: '100%' }}>
        <AppBar style={this.props.hstyle && this.props.hstyle === '2' ? styles.stickyHeader2 : styles.stickyHeader}>
          <Toolbar>
            {this.getArrowBackIcon()}
            <Typography variant="h5" color="inherit" style={styles.title}>              
              {title}
            </Typography>
            {this.getAdministrationAction(showAdministrationOption)}
            {this.getNewContractAction(showNewContractOption)}
            {/* <Button color="inherit" onClick={this.logout}>ΈΞΟΔΟΣ</Button> */}
            <div onClick={this.handleAccountMenuOpen} style={{ textAlign: 'center', padding: '10px' }} >
              <IconButton
                className='colorPrimary'
                size="medium"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit">
                <AccountCircle />
              </IconButton>
              <div>
                {this.props.token ? this.props.token.data.username : 'όνομα χρήστη'}
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {this.renderMenu()}
      </div>
    )
  }

  gotoAdministration() {
    this.setState({ navigateToLogin: false, navigateToCreateNewContact: false, navigateToAdministration: true });
  }

  createNewContract() {
    this.setState({ navigateToLogin: false, navigateToCreateNewContact: true, navigateToAdministration: false });
  }

  logout() {
    resetData(store)
    this.setState({ navigateToLogin: true, navigateToCreateNewContact: false, navigateToAdministration: false });
  }

  getAdministrationAction(showAdministrationOption) {
    var accessToAdmin = false
    if (this.props.token && this.props.token.data) {
      if (this.props.token.data.role === 1 && showAdministrationOption === true)
        accessToAdmin = true
    }

    //if (showAdministrationOption) {
    if (accessToAdmin === true) {
      if (this.props.token && this.props.token.data.role <= 3)
        return (
          <div onClick={this.gotoAdministration} style={{ textAlign: 'center', padding: '10px' }} >
            <IconButton
              className='edgeStart'
              size="medium"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit">
              <SettingsIcon />
            </IconButton>
            <div>Ρυθμίσεις</div>
          </div>
          // <Button color="inherit" onClick={this.gotoAdministration}>Διαχειριστικό</Button>
        )
      else
        return <></>
    }
    else
      return <></>
  }
  getNewContractAction(showNewContractOption) {

    if (showNewContractOption) {
      if (this.props.token && this.props.token.data.role <= 4)
        return <div onClick={this.createNewContract} style={{ textAlign: 'center', padding: '10px' }} >
          <IconButton
            className='edgeStart'
            size="medium"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit">
            <AddIcon />
          </IconButton>
          <div>Νέα Σύμβαση</div>
        </div>
      else
        return <></>
    }
    else
      return <></>
  }

  render() {

    if (this.state.navigateToLogin)
      return <Redirect push to='/login' />
    else if (this.state.navigateToAdministration)
      return <Redirect push to='/administration' />
    else if (this.state.navigateToCreateNewContact)
      return <Redirect push to='/newcontract' />
    else {
      return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flex: 1 }}>
          {this.getHeaderAction(this.props.title, this.props.showAdministrationOption, this.props.showNewContractOption)}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    token: state.token_reducer.token,
    screenDimensions: state.parametricdata_reducer.screenDimensions,
  }
}

export default connect(mapStateToProps, null)(withRouter(withStyles(styles)(Header)));