import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../HOC/Contracts/ContractsPopup';

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
        {
          this.state.DecisionBoard ? this.state.DecisionBoard.map((item, index) => {
            return (<Grid item key={index}>
              <Paper style={styles.paperMoreContractInfo} square={true}>
                <Typography>
                  <b>{index + 1}η Απόφαση Δημοτικού Συμβουλίου A.Π.</b> {item.ProtocolNumber ? item.ProtocolNumber : ''}/{item.ProtocolDate ? item.ProtocolDate : ''}
                  {item.ADA ? <span >με ΑΔΑ {item.ADA}</span> : ''}
                  <span style={{ marginLeft: '10px' }}></span>
                  {item.Content ? <span style={{ fontStyle: 'italic' }}>{item.Content}</span> : ''}
                </Typography>
              </Paper>
            </Grid>)
          }) : <></>
        }
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