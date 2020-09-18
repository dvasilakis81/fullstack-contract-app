import React from 'react';
import { getDateFormatForDocument } from '../../../Helper/helpermethods';
import '../../../Styles/styles.css';
import { getCopiesPhrase } from '../TooltipMethods';

const useStyles = {
  tooltip: {
    fontSize: "16px",
    color: 'white'
  },
  tooltipTitle: {
    margin: '2px',
    fontSize: '16px',
    color: 'black',
    fontWeight: 'bold'
  },
  tooltipIndicate: {
    fontSize: "16px",
    color: '#00ff3e'
  }
};

export function getDecisionCoordinatorDecentrilizedAdministrationTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 5 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style6 = (ind === 6 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style7 = (ind === 7 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style8 = (ind === 8 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style9 = (ind === 9 ? useStyles.tooltipIndicate : useStyles.tooltip)

  //Διαβιβαστικό
  //4.	Δύο (2) φωτοαντίγραφα της με Α.Π. 177724/10-7-2018 Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής
  //Λογαριασμός
  //4.	Τη με Α.Π. 177724/10-7-2018 Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής για τη νόμιμη λήψη της 866/14-6-2018 Α.Δ.Σ.
  // Δύο (2) φωτοαντίγραφα της υπ' αριθ. 14935/4426/13-03-2019 Απόφασης του Συντονιστή Αποκεντρωμένης Διοίκησης Αττικής περί έγκρισης της 108/2019 ΑΔΣ (Α.Π.Δ.Α. 096406/29-03-2019)
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Διαβιβαστικό)</div>
    <div>
      <span style={style9}>{getCopiesPhrase(state.NoPrototype, state.NoPhotocopy)}</span>
      <span style={useStyles.tooltip}> της με Α.Π. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής </span>
      { state.ADA ? <span style={style3}>(ΑΔΑ: {state.ADA}) </span> : <></> }
      <span style={style4}>{state.ActionTransmission ? state.ActionTransmission : '_______'}</span>
      <span style={style6}>{state.DecisionBoardProtocol ? state.DecisionBoardProtocol : ' _______'}</span>
      <span style={useStyles.tooltip}> ΑΔΣ </span>
      <span style={useStyles.tooltip}>(Α.Π.Δ.Α. </span>
      <span style={style7}>{state.APDA_ProtocolNumber ? state.APDA_ProtocolNumber : '__'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style8}>{state.APDA_ProtocolDate ? getDateFormatForDocument(state.APDA_ProtocolDate) : '__-__-____'}</span>
    </div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <div>
      <span style={useStyles.tooltip}>Τη με Α.Π. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής </span>
      { state.ADA ? <span style={style3}>(ΑΔΑ: {state.ADA}) </span> : <></> }
      <span style={style5}>{state.ActionAccount ? state.ActionAccount : '___________'}</span>
      <span style={style6}>{state.DecisionBoardProtocol ? state.DecisionBoardProtocol : ' _______'}</span>
      <span style={useStyles.tooltip}> ΑΔΣ.</span>
    </div>
  </>)
}