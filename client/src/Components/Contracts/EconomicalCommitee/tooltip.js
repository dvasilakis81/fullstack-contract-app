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

export function getEconomicalCommiteeTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)

  //Διαβιβαστικό
  //2. Δύο (2) φωτ/φα της με αριθμ. 73/1-2-2018 Πράξης της Οικονομικής Επιτροπής

  //Λογαριασμός
  // Τη με αριθμ. 73/1-2-2018 Πράξη της Οικονομικής Επιτροπής.
  // Τη με αριθμ. 212/26-2-2018 Πράξη της Οικονομικής Επιτροπής περί μερικής ανατροπής της ανωτέρω Απόφασης Ανάληψης Υποχρέωσης

  return (<>

    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Διαβιβαστικό)</div>
    <div>
      <span style={style5}>{getCopiesPhrase(state.NoPrototype, state.NoPhotocopy)}</span>
      <span style={useStyles.tooltip}>(2) φωτοαντίγραφα της με αρ. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      <span style={style3}>{state.ADA ? ' (ΑΔΑ: ' + state.ADA + ')' : ''}</span>
      <span style={useStyles.tooltip}>Πράξης της Οικονομικής Επιτροπής.</span>
      {
        state.Content ?
          <span style={style4}>{state.Content ? state.Content : 'π.χ. περί ...'}</span> :
          <></>
      }
    </div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <div>
      <span style={useStyles.tooltip}>2.	Τη με αρ. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> Πράξης της Οικονομικής Επιτροπής. </span>
      <span style={style4}>{state.ContentAccount}</span>
    </div>
  </>)
}