import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContractsPopup from '../../../HOC/Contracts/ContractsPopup';
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingOverlay from 'react-loading-overlay'
import Icon from '@material-ui/core/Icon';

import { Box, List, ListItem, Grid, Paper, Typography, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NumberFormat from 'react-number-format';

import { getDateFormat, getDateFormatForDocument, getServerErrorResponseMessage, getDateFormatForActivities, getFpaLabel } from '../../../Helper/helpermethods';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MyTextField from '../../CustomControls/MyTextField';

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
    background: '#fff',
    width: '100%'
  },
  paperActiveContractInfo: {
    padding: '10px',
    background: '#b8d5dc'
  },
  noActiveExpansionSummary: {
    margin: '0px',
    padding: '0px',
    background: '#FFFFFF'
  },
  activeExpansionSummary: {
    margin: '0px',
    padding: '0px',
    background: '#b8d5dc'
  }
};

const summaryStyles = {
  root: {
    minHeight: 7 * 4,
    "&$expanded": {
      minHeight: 7 * 4
    }
  },
  content: {
    margin: "4px 0",
    "&$expanded": {
      margin: "4px 0"
    },
    color: 'blue'
  },
  expandIcon: {
    padding: 3
  },
  expanded: {}
};

const CompactExpansionPanelSummary = withStyles(summaryStyles)(
  ExpansionPanelSummary
);
CompactExpansionPanelSummary.muiName = "ExpansionPanelSummary";

class ActivitiesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUserInfo: this.props.token.user,
      contractId: this.props.contractDetails.Id,
      filterKey: 1,
      filterValues: [{ key: 1, value: 'Επεξεργασία Σύμβασης' }, { key: 2, value: 'Τεκμηριωμένο Αίτημα του Διατάκτη' }]
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  getContractUserTemplate(OwnerName, color) {
    return <div style={{ background: color, color: 'black', fontWeight: 'normal', width: 'auto', paddingLeft: '3px', padding: '3px', marginLeft: '5px', marginRight: '5px', textAlign: 'center', borderRadius: '10px' }}>
      <span><AccountCircleIcon /></span>
      <span style={{ verticalAlign: 'top' }}>{OwnerName}</span>
    </div>
  }

  getLawArticle(contractInfo) {
    let ret = '';

    if (contractInfo.ContractTypeId.toString() === '2')
      ret = <span style={{ marginLeft: '5px' }}><b>Άρθρο προγραμματικής</b> {contractInfo.LawArticle || ''}</span>
    else
      ret = <></>

    return ret;
  }
  getCPVTemplate(contractInfo) {
    if (contractInfo.contracttype && contractInfo.contracttype[0].ContractTypeId.toString() === "1")
      return (<Grid item>
        <Paper style={styles.paperMoreContractInfo} square={true}>
          <Typography>
            <b>CPV Code</b> {contractInfo.CpvCode}
            <span style={{ marginLeft: '10px' }}></span>
            <b>Title</b> {contractInfo.CpvTitle}
          </Typography>
        </Paper>
      </Grid>)
    else
      return <></>
  }
  getDirectionAndDepartmentTemplate(item) {
    var directionName = item.Direction;
    var departmentName = item.Department;

    return <>
      <Grid item>
        <Paper style={styles.paperMoreContractInfo} square={true}>
          <Typography>
            <span><b>Διεύθυνση</b> {directionName || ''}</span>
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Paper style={styles.paperMoreContractInfo} square={true}>
          <Typography>
            <span><b>Τμήμα</b> {departmentName || ''}</span>
          </Typography>
        </Paper>
      </Grid>
    </>
  }

  getDifferences(item, items, index) {
    var ret;
    var i = 0;
    var itemToCompare;
    for (i = index + 1; i < items.length; i++) {
      if (item.Type === items[i].Type) {
        itemToCompare = items[i];
        break;
      }
    }

    if (itemToCompare) {
      if (item.Type === 'EditContract') {

        var itemInfo = JSON.parse(item.Info);
        var itemToCompareInfo = JSON.parse(itemToCompare.Info);

        console.log('itemInfo.Direction: ' + itemInfo.Direction);
        console.log('itemToCompareInfo.Direction: ' + itemToCompareInfo.Direction);
        ret = <>
          <div>{itemInfo.Direction !== itemToCompareInfo.Direction ? 'Αλλαγή διεύθυνσης από ' + itemToCompareInfo.Direction + ' σε ' + itemInfo.Direction : ''}</div>
          <div>{itemInfo.Department !== itemToCompareInfo.Department ? 'Αλλαγή τμήματος από ' + itemToCompareInfo.Department + ' σε ' + itemInfo.Department : ''}</div>
          <div>{itemInfo.ProtocolNumber !== itemToCompareInfo.ProtocolNumber ? 'Αλλαγή Α.Π. σύμβασης από ' + itemToCompareInfo.ProtocolNumber + '/' + itemToCompareInfo.ProtocolDate + ' σε ' + itemInfo.ProtocolNumber + '/' + itemToCompareInfo.ProtocolDate : ''}</div>
          <div>{itemInfo.ProtocolDate !== itemToCompareInfo.ProtocolDate ? 'Αλλαγή Α.Α.Κ. από ' + itemToCompareInfo.ProtocolDate + '/' + itemToCompareInfo.ProtocolDate + ' σε ' + itemInfo.ProtocolDate + '/' + itemToCompareInfo.ProtocolDate : ''}</div>
          <div>{itemInfo.Title !== itemToCompareInfo.Title ? 'Αλλαγή τίτλου από ' + itemToCompareInfo.Title + ' σε ' + itemInfo.Title : ''}</div>
          <div>{itemInfo.ConcessionaireName !== itemToCompareInfo.ConcessionaireName ? 'Αλλαγή αναδόχου από ' + itemToCompareInfo.ConcessionaireName + ' σε ' + itemInfo.ConcessionaireName : ''}</div>
          <div>{itemInfo.ConcessionaireAFM !== itemToCompareInfo.ConcessionaireAFM ? 'Αλλαγή Α.Φ.Μ. αναδόχου από ' + itemToCompareInfo.ConcessionaireAFM + ' σε ' + itemInfo.ConcessionaireAFM : ''}</div>
          <div>{itemInfo.Start !== itemToCompareInfo.Start ? 'Αλλαγή ημερομηνίας έναρξης από ' + itemToCompareInfo.Start + ' σε ' + itemInfo.Start : ''}</div>
          <div>{itemInfo.End !== itemToCompareInfo.End ? 'Αλλαγή ημερομηνίας λήξης από ' + itemToCompareInfo.End + ' σε ' + itemInfo.End : ''}</div>
          <div>{itemInfo.AmountPure !== itemToCompareInfo.AmountPure ? 'Αλλαγή καθαρού ποσού, από  ' + itemToCompareInfo.AmountPure + '€ σε ' + itemInfo.AmountPure + '€' : ''}</div>
          <div>{itemInfo.AmountFpa !== itemToCompareInfo.AmountFpa ? 'Αλλαγή Φ.Π.Α. από  ' + itemToCompareInfo.AmountFpa + '€ σε ' + itemInfo.AmountFpa : '€'}</div>
          <div>{itemInfo.AmountTotal !== itemToCompareInfo.AmountTotal ? 'Αλλαγή τελικού ποσού από  ' + itemToCompareInfo.AmountTotal + '€ σε ' + itemInfo.AmountTotal : '€'}</div>
          <div>{itemInfo.LawArticle !== itemToCompareInfo.LawArticle ? 'Αλλαγή άρθρου προγραμματικής από  ' + itemToCompareInfo.LawArticle + ' σε ' + itemInfo.LawArticle : ''}</div>
          <div>{(itemInfo.CpvTitle || '') !== (itemToCompareInfo.CpvTitle || '') ? 'Αλλαγή CPV τίτλου από  ' + itemToCompareInfo.CpvTitle + ' σε ' + itemInfo.CpvTitle : ''}</div>
          <div>{(itemInfo.CpvCode || '') !== (itemToCompareInfo.CpvCode || '') ? 'Αλλαγή CPV κωδικού από  ' + itemToCompareInfo.CpvCode + ' σε ' + itemInfo.CpvCode : ''}</div>
          <div>{itemInfo.KAE !== itemToCompareInfo.KAE ? 'Αλλαγή K.A.E. κωδικού από  ' + itemToCompareInfo.KAE + ' σε ' + itemInfo.KAE : ''}</div>
          <div>{itemInfo.Actor !== itemToCompareInfo.Actor ? 'Αλλαγή φορέα από  ' + itemToCompareInfo.Actor + ' σε ' + itemInfo.Actor : ''}</div>
          <div>{itemInfo.CodeDirection !== itemToCompareInfo.CodeDirection ? 'Αλλαγή κωδικού διεύθυνσης από  ' + itemToCompareInfo.CodeDirection + ' σε ' + itemInfo.CodeDirection : ''}</div>
          <div>{(itemInfo.AwardNumber !== itemToCompareInfo.AwardNumber || getDateFormatForDocument(itemInfo.AwardDate) !== getDateFormatForDocument(itemToCompareInfo.AwardDate)) ? 'Αλλαγή Α.Α.Κ. από ' + itemToCompareInfo.AwardNumber + '/' + getDateFormatForDocument(itemToCompareInfo.AwardDate) + ' σε ' + itemInfo.AwardNumber + '/' + getDateFormatForDocument(itemToCompareInfo.AwardDate) : ''}</div>
          <div>{(itemInfo.AwardAda || '') !== (itemToCompareInfo.AwardAda || '') ? 'Αλλαγή ΑΔΑ Α.Α.Κ. από ' + itemToCompareInfo.AwardAda : ' σε ' + itemInfo.AwardAda}</div>
        </>
      }
    } else {
      ret = 'Δεν βρέθηκε αντικείμενο για σύγκριση';
    }

    return ret;
  }

  getItemInfoTemplate(item) {
    if (item) {
      if (item.Type === 'EditContract') {
        var contractInfo = JSON.parse(item.Info);
        if (contractInfo) {
          return <>
            <Grid container xl style={{ flexGrow: '1', flexFlow: 'column', alignItems: 'stretch', height: '100%', overflowX: 'hidden' }}>

              <Grid item>
                <Paper style={styles.paperContractInfo} square={true}>
                  <Typography>
                    <List style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px' }}>
                      <ListItem style={{ width: 'auto', margin: '0px', padding: '0px', wordWrap: 'normal', whiteSpace: 'noWrap' }}><b>Δημιουργός σύμβασης</b></ListItem>
                      <ListItem>
                        <List style={{ display: 'flex', flexDirection: 'row', padding: '0px', flexWrap: 'wrap' }}>
                          {contractInfo.OwnerId || ''}
                        </List>
                      </ListItem>
                    </List>
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={styles.paperContractInfo} square={true}>
                  <Typography>
                    <Box display="flex" flexdirection="row" alignItems="stretch" padding="1">
                      <Box style={{ marginRight: '5px' }}><b>Καθαρό ποσό:</b> {contractInfo.AmountPure} € </Box>
                      <Box style={{ marginRight: '5px' }}><b>Ποσό Φ.Π.Α.:</b> {contractInfo.AmountFpa} €</Box>
                      <Box style={{ marginRight: '5px' }}><b>Τελικό Ποσό:</b> {contractInfo.AmountTotal} €</Box>
                    </Box>
                  </Typography>
                </Paper>
              </Grid>
              {this.getDirectionAndDepartmentTemplate(contractInfo)}
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>K.A.E.</b> {contractInfo.KAE}
                    <span style={{ marginLeft: '10px' }}></span>
                    <b>Φ.</b>{contractInfo.Actor}
                    <span style={{ marginLeft: '10px' }}></span>
                    <b>Δ.</b>{contractInfo.CodeDirection}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>Τύπος</b> {contractInfo.ContractTypeId === '2' ? 'Προγραμματική' : 'Δημόσια Σύμβαση'}
                    {this.getLawArticle(contractInfo)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>Έναρξη</b> {getDateFormat(contractInfo.Start)}
                    <span style={{ marginLeft: '10px' }}></span>
                    <b>Λήξη</b> {getDateFormat(contractInfo.End)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>Ανάδοχος</b> {contractInfo.ConcessionaireName}  <b style={{ marginLeft: '5px' }}>Α.Φ.Μ.</b>: {contractInfo.ConcessionaireAFM}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>Τίτλος</b> {contractInfo.Title}
                  </Typography>
                </Paper>
              </Grid>
              {this.getCPVTemplate(contractInfo)}
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>Α.Π.</b> {contractInfo.ProtocolNumber}/{getDateFormatForDocument(contractInfo.ProtocolDate)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={styles.paperMoreContractInfo} square={true}>
                  <Typography>
                    <b>Αρ.Απόφασης Κατακύρωσης</b> {contractInfo.AwardNumber}/{getDateFormatForDocument(contractInfo.AwardDate)}{' '}(ΑΔΑ: {contractInfo.AwardAda})
            		</Typography>
                </Paper>
              </Grid>

            </Grid>
          </>
        } else
          return <></>
      }
      else if (item.Type === 'AuthorDocumentRequest') {

      }
    }
  }

  getItemBgStyle(item) {
    var style = styles.paperContractInfo;
    if (item.IsActive === true)
      style = styles.paperActiveContractInfo;
    return style;
  }

  loadCategories() {
    var ret;

    // let ret = filterValues.map((data, index) => {
    //   if (this.state.contractInfo.AccountPer === data.key)
    //     return <option key={data.key} value={data.key} selected>{data.value}</option>
    //   else
    //     return <option key={data.key} value={data.key}>{data.value}</option>

    // })

    ret = this.state.filterValues.map((data, index) => {

      if (this.state.filter === data.value)
        return <option key={data.key} value={data.key} selected>{data.value}</option>
      else
        return <option key={data.key} value={data.key}>{data.value}</option>

    })

    return ret;
  }
  getItemExpansionBgColor(item) {
    var style = styles.noActiveExpansionSummary;
    if (item.IsActive === true)
      style = styles.activeExpansionSummary;
    return style;
  }
  getKeyFromAction(action) {
    var ret = 1;

    if (action === 'Επεξεργασία Σύμβασης')
      ret = 1;
    else if (action.indexOf('Διατάκτη') >= 0)
      ret = 2;

    return ret;
  }
  render() {
    var length = this.props.contractDetails.authordocumentedrequest ? this.props.contractDetails.authordocumentedrequest.length : 0;

    return (

      <ContractsPopup
        header={this.props.header}
        openMessage={this.state.openMessage}
        message={this.state.message}
        variant={this.state.variant}>

        <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'scroll', overflowX: 'auto', flexWrap: 'nowrap', alignContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', height: 'auto'}}>
            <MyTextField title='Επιλέξτε κατηγορία' id='filterKey' stateValue={this.state.filterKey} values={this.loadCategories()} InputProps={{ inputProps: { style: { textAlignLast: 'center' } } }} isRequired={true} isDisabled={false} onChange={this.onChange} select={true} width='80%' />
          </div>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            {
              this.props.contractDetails.activities ? this.props.contractDetails.activities.map((item, index) => {
                if (this.state.filterKey == this.getKeyFromAction(item.Action)) {
                  return (<Grid item key={index}>
                    <Paper style={this.getItemBgStyle(item)} square={true}>
                      <Typography>
                        <div>
                          <span style={{ color: 'black', textAlign: 'left', marginRight: '10px' }}><b>{index + 1}.</b></span>
                          <span style={{ fontWeight: 'normal', width: 'auto', marginRight: '5px' }}>{item.Action}</span>
                          <span style={{ fontWeight: 'normal', width: 'auto', marginRight: '5px' }}> από τον χρήστη <i>{item.Username}</i> στης {getDateFormatForActivities(item.Created)}</span>
                        </div>
                        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', fontSize: '18px', flexWrap: 'nowrap' }}>
                          <ExpansionPanel style={this.getItemExpansionBgColor(item)}>
                            <CompactExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Προβολή Στοιχειών</Typography>
                            </CompactExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <div>{this.getItemInfoTemplate(item)}</div>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                          <ExpansionPanel style={this.getItemExpansionBgColor(item)}>
                            <CompactExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>Διαφορές</Typography>
                            </CompactExpansionPanelSummary>
                            <ExpansionPanelDetails>
                              <Paper style={styles.paperMoreContractInfo} square={true}>
                                <Typography>
                                  {this.getDifferences(item, this.props.contractDetails.activities, index)}
                                </Typography>
                              </Paper>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        </div>
                      </Typography>
                    </Paper>
                  </Grid>)
                }
              }) : <></>
            }
          </div>
        </div>
      </ContractsPopup >
    )
  }
}

function mapStateToProps(state) {
  return {
    screenDimensions: state.parametricdata_reducer.screenDimensions,
    municipalityDirections: state.parametricdata_reducer.municipalityDirections,
    contractDetails: state.contracts_reducer.contractDetails,
    searchContractsList: state.contracts_reducer.searchContractsList,
    contractDetailsSearchMode: state.contracts_reducer.contractDetailsSearchMode,
    token: state.token_reducer.token
  }
}

function mapDispatchToProps(dispatch) {
  // return bindActionCreators({ processContractInfo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ActivitiesView))