import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  getSelectField, getTextField, getTextFieldMultiline,
  getCheckboxField, getButton, getSubmitButton, getTextFieldWithTooltip
} from '../../MaterialObjects/materialobjects';

import { getDecisionBoardTooltip } from './Tooltip';

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

class DecisionBoardView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMessage: false,
      message: '',
      variant: '',
      submitButtonDisabled: false,
      contractDetails: this.props.contractDetails,
      DecisionBoard: this.props.DecisionBoard ? this.props.DecisionBoard : [],
      addNewItem: false,
      ProtocolNumber: '',
      ProtocolDate: '',
      Content: '',
      ADA: ''
    }

    this.setTextValue = this.setTextValue.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleClose = this.handleClose.bind(this, '');
  }

  setTextValue(event) {
		this.setState({ [event.target.id]: event.target.value });
  }
  
  getDeleteOption(index, decisionBoardlength) {

    return <span onClick={this.gotoAdministration} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
      <IconButton size="medium" color={index < decisionBoardlength - 1 ? "disabled" : "inherit"}>
        <DeleteIcon />
      </IconButton>
    </span>
  }
  getFormEditDecisionBoard(decisionBoard) {
    var numberOfDecisionBoard = decisionBoard ? decisionBoard.length + 1 : 1
    if (this.state.addNewItem === true) {
      return <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', background: 'lightBlue', justifyContent: 'center', padding: '20px' }}>
        <div style={{ justifyContent: 'center', fontSize: '18px', fontWeight: 800 }}>Εισαγωγή στοιχείων {numberOfDecisionBoard}ης Απόφασης Δημοτικού Συμβουλίου</div>
        <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
          {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 1), 'number', 'ProtocolNumber', 'Αρ. Πρωτ.', 'outlined', this.state.ProtocolNumber, true, { width: '200px', marginRight: '20px' }, false, null, { shrink: true }, this.setTextValue)}
          {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 2), 'date', 'ProtocolDate', 'Ημ. Πρωτ.', 'outlined', this.state.ProtocolDate, true, { width: '200px', background: 'white' }, false, null, { shrink: true }, this.setTextValue)}
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
          {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 3), 'text', 'Content', 'Περιεχόμενο', 'outlined', this.state.Content, true, { width: 'auto' }, false, null, { shrink: true }, this.setTextValue)}
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', height: 'auto', backgroundColor: '#fff', justifyContent: 'left', padding: '10px' }}>
          {getTextFieldWithTooltip(getDecisionBoardTooltip(this.state, 3), 'text', 'ADA', 'ΑΔΑ', 'outlined', this.state.ADA, true, { width: '300px' }, false, null, { shrink: true }, this.setTextValue)}
        </div>
      </div>
    }
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
                            {item.ADA ? <span>με ΑΔΑ {item.ADA}</span> : ''}
                            <span style={{ marginLeft: '10px' }}></span>
                            {item.Content ? <span style={{ fontStyle: 'italic' }}>{item.Content}</span> : ''}
                          </span>
                          <span onClick={this.gotoAdministration} style={{ textAlign: 'center', padding: '0px', justifyContent: 'end' }}>
                            <IconButton size="medium" color="inherit">
                              <SettingsIcon />
                            </IconButton>
                          </span>
                          {this.getDeleteOption(index, this.state.DecisionBoard.length)}
                        </div>
                      </Typography>
                    </Paper>
                  </Grid>)
                }) : <></>
              }
            </div>
          </div>
          {this.getFormEditDecisionBoard(this.state.DecisionBoard)}
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', backgroundColor: '#fff', background: 'lightgrey', justifyContent: 'center' }}>
            <Button style={{ fontSize: '18px', textAlign: 'center' }} onClick={() => { this.setState({ addNewItem: true }) }}>ΠΡΟΣΘΗΚΗ</Button>
          </div>
        </div>
      </ContractsPopup >
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

export default connect(mapStateToProps, null)(DecisionBoardView)