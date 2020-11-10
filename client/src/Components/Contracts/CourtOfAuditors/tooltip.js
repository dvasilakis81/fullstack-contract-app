import React from 'react';
import '../../../Styles/styles.css';
import { getCopiesPhrase } from '../TooltipMethods';
import { extractYearFromDate } from '../../../Helper/helpermethods';

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

function getProtocolInfo(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip);
  if (state.ProtocolNumber)
    return <>
      <span style={style1}>{state.ProtocolNumber || '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate || '____'}</span>
      <span style={useStyles.tooltip}> της </span>
    </>
  else
    return <></>
}

export function getCourtOfAuditorsTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style5 = (ind === 5 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style6 = (ind === 6 ? useStyles.tooltipIndicate : useStyles.tooltip);
  var style7 = (ind === 7 ? useStyles.tooltipIndicate : useStyles.tooltip);  

  //Αρχείο Διαβιβαστικού
  //6.	Πρωτότυπο και φωτοαντίγραφο της Κοινοποίησης της με αρ. 329/2018 Πράξης του Ζ΄ Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. 243357/2-10-2018) 
  //Αρχείο λογαριασμού
  //6.	Τη με αρ. 329/2018 Πράξη του Ζ΄ Κλιμακίου του Ελεγκτικού Συνεδρίου περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης.
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Έγγραφο διαβιβαστικού)</div>
    <div>
      <span style={style7}>{getCopiesPhrase(state.NoPrototype, state.NoPhotocopy)}</span>
      <span style={useStyles.tooltip}> της Κοινοποίησης της με αρ. </span>
      {getProtocolInfo(state, ind)}      
      <span style={style3}>{state.NumberAction}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{extractYearFromDate(state.ProtocolDate)}</span>
      <span style={useStyles.tooltip}> Πράξη του </span>
      <span style={style4}>{state.ScaleNumber || '__'}</span>
      <span style={useStyles.tooltip}> Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. </span>
      <span style={style5}>{state.APDANumber || '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style6}>{state.APDADate || '__-__-__'}</span>
      <span style={useStyles.tooltip}>).</span>
    </div>
    <div style={useStyles.tooltip}>-------------------------------------------------------</div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Έγγραφο λογαριασμού)</div>
    <div>
      <span style={useStyles.tooltip}>Τη με αρ. </span>
      {getProtocolInfo(state, ind)}
      <span style={style3}>{state.NumberAction}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{extractYearFromDate(state.ProtocolDate)}</span>
      <span style={useStyles.tooltip}> Πράξη του </span>
      <span style={style4}>{state.ScaleNumber || '__'}</span>
      <span style={useStyles.tooltip}> Κλιμακίου του Ελεγκτικού Συνεδρίου </span>
      <span style={style5}>{state.ContentAccount || 'π.χ. περί μή __________'}</span>
    </div>
  </>)
}