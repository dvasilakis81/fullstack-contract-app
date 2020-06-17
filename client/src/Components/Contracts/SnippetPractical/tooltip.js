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
export function getTooltipTemplate(state, concassionaireName, protocolDateLex, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
 
  //Διαβιβαστικό
  // Το από 11 Φεβρουαρίου 2019 Απόσπασμα Πρακτικού ΔΣ 3/11-02-2019 της ΔΑΕΜ Α.Ε. περί έγκρισης σύναψης Προγραμματικής Σύμβασης 
  // με το Δήμο Αθηναίων βάσει της 108/31-01-2019 ΑΔΣ

  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <span style={useStyles.tooltip}>Τo από </span>
    <span style={style2}>{protocolDateLex ? protocolDateLex : '___________'}</span>
    <span style={useStyles.tooltip}> Απόσπασμα Πρακτικού ΔΣ </span>
    <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
    <span style={useStyles.tooltip}> της {concassionaireName} περί έγκρισης σύναψης Προγραμματικής Σύμβασης με το Δήμο Αθηναίων βάσει της </span>
    <span style={style3}>{state.DecisionBoardProtocol ? state.DecisionBoardProtocol : '____/_____'}</span>
    <span style={useStyles.tooltip}> ΑΔΣ.</span>
  </>)
}
//#endregion