import React from 'react';
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

export function getCourtOfAuditorsTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 5 ? useStyles.tooltipIndicate : useStyles.tooltip)

  var number = state.HasSecondDecisionDS === true ? 6 : 4
  //Αρχείο Διαβιβαστικού
  //6.	Πρωτότυπο και φωτοαντίγραφο της Κοινοποίησης της με αρ. 329/2018 Πράξης του Ζ΄ Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. 243357/2-10-2018) 
  //Αρχείο λογαριασμού
  //6.	Τη με αρ. 329/2018 Πράξη του Ζ΄ Κλιμακίου του Ελεγκτικού Συνεδρίου περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης.
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Έγγραφο διαβιβαστικού)</div>
    <div>
      <span style={useStyles.tooltip}>{number}.	Πρωτότυπο και φωτοαντίγραφο της Κοινοποίησης της με αρ. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolYear ? state.ProtocolYear : '____'}</span>
      <span style={useStyles.tooltip}> Πράξη του </span>
      <span style={style3}>{state.ScaleNumber ? state.ScaleNumber : '__'}</span>
      <span style={useStyles.tooltip}> Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. </span>
      <span style={style4}>{state.APDANumber ? state.APDANumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style5}>{state.APDADate ? state.APDADate : '__-__-__'}</span>
      <span style={useStyles.tooltip}>).</span>
    </div>
    <div style={useStyles.tooltip}>-------------------------------------------------------</div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Έγγραφο λογαριασμού)</div>
    <div>
      <span style={useStyles.tooltip}>{number}.	Τη με αρ. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolYear ? state.ProtocolYear : '____'}</span>
      <span style={useStyles.tooltip}> Πράξη του </span>
      <span style={style3}>{state.ScaleNumber ? state.ScaleNumber : '__'}</span>
      <span style={useStyles.tooltip}> Κλιμακίου του Ελεγκτικού Συνεδρίου περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης.</span>
    </div>
  </>)
}