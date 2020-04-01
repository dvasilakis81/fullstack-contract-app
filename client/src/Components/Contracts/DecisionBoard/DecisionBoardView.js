import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  paperContractMonetaryInfoFrame: {
    padding: '10px',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    background: '#013220'
  },
  paperContractMonetaryInfoLabel: {
    margin: '20px',
    color: 'white'
  },
  paperContractInfo: {
    padding: '10px',
    borderLeft: '0px solid black',
    borderRight: '0px solid black'
  },
  paperContractInfoLast: {
    padding: '10px',
    borderLeft: '0px solid black',
    borderRight: '0px solid black',
    borderBottom: '0px solid black'
  },
  paperMoreContractInfo: {
    padding: '10px',
    background: '#fffef3'
  }
};

class DecisionBoardEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMessage: false,
      message: '',
      variant: '',
      submitButtonDisabled: false,
      redirectToLogin: false,
      ContractId: this.props.ContractId,
      DecisionBoard: this.props.DecisionBoard ? this.props.DecisionBoard : []
    }

    // this.setTextValue = this.setTextValue.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClose = this.handleClose.bind(this, '');
  }

  render() {

    return (
      <ContractsPopup header='Αποφάσεις Δημοτικού Συμβουλίου'>
        <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
            {/* 1st column */}
            <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
              {
                this.state.DecisionBoard ? this.state.DecisionBoard.map((item, index) => {
                  return (<Grid item key={index}>
                    <Paper style={styles.paperMoreContractInfo} square={true}>
                      <Typography>
                        <div style={{ display: 'flex' }}>
                          <span style={{ flex: '1' }}>
                            <b>{index + 1}η Απόφαση Δημοτικού Συμβουλίου A.Π.</b> {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? item.ProtocolDate : ''}
                            {item.ADA ? <span >με ΑΔΑ {item.ADA}</span> : ''}
                            <span style={{ marginLeft: '10px' }}></span>
                            {item.Content ? <span style={{ fontStyle: 'italic' }}>{item.Content}</span> : ''}
                          </span>
                          <span onClick={this.gotoAdministration} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
                            <IconButton size="medium" color="inherit">
                              <SettingsIcon />
                            </IconButton>
                          </span>
                          <span onClick={this.gotoAdministration} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
                            <IconButton size="medium" color="inherit">
                              <DeleteIcon />
                            </IconButton>
                          </span>
                        </div>
                      </Typography>
                    </Paper>
                  </Grid>)
                }) : <></>
              }
            </div>
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'green', justifyContent: 'center' }}>
            <Button style={{ fontSize: '18px', textAlign: 'center' }}>ΠΡΟΣΘΗΚΗ</Button>
          </div>
        </div>
      </ContractsPopup>
    )
  }
}

function mapStateToProps(state) {
  return {
    screenDimensions: state.parametricdata_reducer.screenDimensions,
    isSearchMode: state.contracts_reducer.isSearchMode,
    token: state.token_reducer.token
  }
}

export default connect(mapStateToProps, null)(DecisionBoardEdit)