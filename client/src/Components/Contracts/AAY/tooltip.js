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
  },
  tooltipIndicateBold: {
    fontSize: "16px",
    fontWeight: 'bold',
    color: '#00ff3e'
  },
  tooltipBold: {
    fontSize: "16px",
    fontWeight: 'bold',
    color: 'white'
  },
};

//#region AAY
export function getAayTooltipTemplate(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 5 ? useStyles.tooltipIndicateBold : useStyles.tooltipBold)

  //Διαβιβαστικό
  //IP: Πρωτότυπο και φωτοαντίγραφο της με αριθμ. Α00661/070524/30-03-2020/ΕΑΔ 661 ΑΔΑ ΨΛΓΘΩ6Μ-Ο5Η Απόφασης Ανάληψης Υποχρέωσης 
  //(Προκαταβολή)  7.	Πρωτότυπο και φωτοαντίγραφο της με αρ. Π00799/2018 (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ-9ΩΠ Απόφασης Ανάληψης Υποχρέωσης
  //Πρωτότυπο και φωτ/φο της με Α.Π. 56142/20-2-2019 (Α00488) Απόφασης Ανάληψης Υποχρέωσης με ΑΔΑ: 9Ξ4ΔΩ6Μ-ΡΥ4.

  //Λογαριασμός
  // IP: Τη με αρ. Α01197/254432/08-10-2019 ΕΑΔ 1196 (ΑΔΑ 6ΡΗ5Ω6Μ-ΨΗΚ) Απόφαση Ανάληψης Υποχρέωσης
  //Προκαταβολή 7.	Τη με αρ. Π00799/2018 (Αριθμός ΑΑΥ) (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ-9ΩΠ Απόφαση Ανάληψης Υποχρέωσης
  //Τη με Α.Π. 56142/20-2-2019 (υπ’ αριθμ. Α00488 – ΕΑΔ 487) Απόφαση Aνάληψης Yποχρέωσης.

  // if (ind === 2)
  //   return (<>
  //     <div style={useStyles.tooltip}>ΑΑΥ/ΕΤΟΣ (ΕΑΔ) :</div>
  //     <span style={style1}>{state.AayValue ? state.AayValue : '____'}</span>
  //     <span style={useStyles.tooltip}>/</span>
  //     <span style={style2}>{state.AayYear ? state.AayYear : '___'}</span>
  //     <span style={style3}>{state.AayEadNumber ? state.AayEadNumber : '___'}</span>
  //   </>)
  // else
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <span style={useStyles.tooltip}>Τη με Α.Π. </span>
    <span style={style1}>{state.AayValue ? state.AayValue : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{state.ProtocolNumber ? state.ProtocolNumber : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style3}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
    <span style={useStyles.tooltip}>/ΕΑΔ </span>
    <span style={style4}>{state.EadNumber ? state.EadNumber : '___'}</span>
    <span style={useStyles.tooltip}> ΑΔΑ </span>
    <span style={style5}>{state.ADA ? state.ADA : '____'}</span>
    <span style={useStyles.tooltip}> Απόφαση Aνάληψης Yποχρέωσης</span>
  </>)
}

export function getAayOverthrowTooltipTemplate(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicateBold : useStyles.tooltipBold)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)

  //Διαβιβαστικό
  //IP: Πρωτότυπο και φωτοαντίγραφο της με αριθμ. Α00661/070524/30-03-2020/ΕΑΔ 661 ΑΔΑ ΨΛΓΘΩ6Μ-Ο5Η Απόφασης Ανάληψης Υποχρέωσης 
  //(Προκαταβολή)  7.	Πρωτότυπο και φωτοαντίγραφο της με αρ. Π00799/2018 (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ-9ΩΠ Απόφασης Ανάληψης Υποχρέωσης
  //Πρωτότυπο και φωτ/φο της με Α.Π. 56142/20-2-2019 (Α00488) Απόφασης Ανάληψης Υποχρέωσης με ΑΔΑ: 9Ξ4ΔΩ6Μ-ΡΥ4.

  //Λογαριασμός
  // IP: Την υπ΄ αριθμ. 333293/31-12-2019 (ΑΔΑ ΨΘΡΨΩ6Μ-Λ3Υ) ΑΠΟΦΑΣΗ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ (παρ.2 άρθρο 4 ΠΔ 80/2016), της Α01197/2019 Α.Α.Υ. 

  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <span style={useStyles.tooltip}>Την υπ΄ αριθμ. </span>
    <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
    <span style={useStyles.tooltip}> (ΑΔΑ </span>
    <span style={useStyles.tooltip}> (ΑΔΑ {state.ADA ? state.ADA : '______'})</span>
    <span style={useStyles.tooltip}> ΑΠΟΦΑΣΗ ΑΝΑΤΡΟΠΗΣ ΑΝΑΛΗΨΗΣ ΥΠΟΧΡΕΩΣΗΣ (παρ.2 άρθρο 4 ΠΔ 80/2016), της </span>
    <span style={style4}>{state.Overthrow ? state.Overthrow : '____'}</span>
    <span style={useStyles.tooltip}> Α.Α.Υ.</span>
  </>)
}
//#endregion