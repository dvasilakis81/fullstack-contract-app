import React from 'react';
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

export function getTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  
  //Αρχείο Διαβιβαστικού
  // Πρωτότυπο και φωτοαντίγραφο του υπ΄ αριθμ. 061640/12-03-20 Τεκμηριωμένου Αιτήματος του Διατάκτη
  //Αρχείο λογαριασμού
  // Το με Α.Π. 245924/27-09-2019 Τεκμηριωμένο Αίτημα του Διατάκτη
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Έγγραφο διαβιβαστικού)</div>
    <div>
      <span style={style4}>{getCopiesPhrase(state.itemInfo.NoPrototype, state.itemInfo.NoPhotocopy)} </span>
      <span style={style1}>{state.itemInfo.ProtocolNumber ? state.itemInfo.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.itemInfo.ProtocolDate || '____'}</span>
      <span style={style3}> (ΑΔΑ {state.itemInfo.ADA || '______'})</span>
      <span style={useStyles.tooltip}> Τεκμηριωμένου Αιτήματος του Διατάκτη. </span>
      
    </div>
    <div style={useStyles.tooltip}>-------------------------------------------------------</div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ (Έγγραφο λογαριασμού)</div>
    <div>
      <span style={useStyles.tooltip}>Το με Α.Π. </span>
      <span style={style1}>{state.itemInfo.ProtocolNumber || '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.itemInfo.ProtocolDate || '____'}</span>
      <span style ={style3}> (ΑΔΑ {state.itemInfo.ADA || '______'})</span>
      <span style={useStyles.tooltip}> Τεκμηριωμένου Αιτήματος του Διατάκτη. </span>
    </div>
  </>)
}