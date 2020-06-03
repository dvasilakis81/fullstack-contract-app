import React from 'react';
import { getDateFormatForDocument } from '../../../Helper/helpermethods';
import '../../../Styles/styles.css';

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


  //Διαβιβαστικό
  //4.	Δύο (2) φωτοαντίγραφα της με Α.Π. 177724/10-7-2018 Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής
  //Λογαριασμός
  //4.	Τη με Α.Π. 177724/10-7-2018 Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής για τη νόμιμη λήψη της 866/14-6-2018 Α.Δ.Σ.

  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Διαβιβαστικό)</div>
    <div>
      <span style={useStyles.tooltip}>	Δύο (2) φωτοαντίγραφα της με Α.Π. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής.</span>
      <span style={useStyles.tooltip}>{state.ADA ? ' με ΑΔΑ ' : ''}</span>
      <span style={style3}>{state.ADA ? state.ADA : ''}</span>
    </div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <div>
      <span style={useStyles.tooltip}>Τη με Α.Π. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>

      <span style={useStyles.tooltip}> Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής</span>
      <span style={useStyles.tooltip}>{state.ADA ? ' με ΑΔΑ ' : ''}</span>
      <span style={style3}>{state.ADA ? state.ADA : ''}</span>
      <span style={useStyles.tooltip}> για τη νόμιμη λήψη της  Α.Δ.Σ.</span>
    </div>
  </>)
}