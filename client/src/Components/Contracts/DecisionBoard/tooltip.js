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

// export function getDecisionBoardTooltip(state, ind) {
//   var style1 = (ind === 1 ? "tooltipIndicate" : "tooltip")
//   var style2 = (ind === 2 ? "tooltipIndicate" : "tooltip")
//   var style3 = (ind === 3 ? "tooltipIndicate" : "tooltip")

//   //Διαβιβαστικό
//   //2.	Δύο (2) φωτοαντίγραφα της με αρ. 866/14-6-2018 Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.) με Α.Δ.Α.
//   //Λογαριασμός
//   //2.	Τη με αρ. 866/14-6-2018 Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης.

//   return (<>
//     <div className={tooltipStyle.tooltipStyle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Διαβιβαστικό)</div>
//     <div>
//       <span className="tooltip">2. Δύο (2) φωτοαντίγραφα της με αρ. </span>
//       <span className={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
//       <span className="tooltip">/</span>
//       <span className={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
//       <span className="tooltip"> Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.)</span>
//       <span className="tooltip">{state.ADA ? 'με ΑΔΑ' : ''}</span>
//       <span className={style3}>{state.DecisionDS1ADA ? state.ADA : '____'}</span>
//     </div>
//     <div className="tooltipTitle">ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
//     <div>
//       <span className="tooltip">2.	Τη με αρ. </span>
//       <span className={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
//       <span className="tooltip">/</span>
//       <span className={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
//       {
//         ind === 1 ?
//           <span className="tooltip"> Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης.</span> :
//           <>
//             <span className="tooltip"> Α.Δ.Σ. με την οποία διορθώθηκε η ανωτέρω Α.Δ.Σ. </span>
//             <span className={style3}>{state.Content ? '“' + state.Content + '”.' : 'π.χ. “ως προς τον Κ.Α. του προϋπολογισμού και ως προς το λεκτικό της δαπάνης”.'}</span>
//           </>
//       }
//     </div>
//   </>)
// }

export function getDecisionBoardTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)

  //Διαβιβαστικό
  //2.	Δύο (2) φωτοαντίγραφα της με αρ. 866/14-6-2018 Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.) με Α.Δ.Α.
  //Λογαριασμός
  //2.	Τη με αρ. 866/14-6-2018 Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. 

  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Διαβιβαστικό)</div>
    <div>
      <span style={useStyles.tooltip}>2. Δύο (2) φωτοαντίγραφα της με αρ. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}>{state.ADA ? ' (ΑΔΑ ' : ''}</span>
      <span style={style3}>{state.ADA ? state.ADA : ''}</span>
      <span style={useStyles.tooltip}>) </span>
      <span style={useStyles.tooltip}> Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.) </span>
      <span style={style4}>{state.ContentTrasmission ? state.ContentTransmission : 'π.χ. περί έγκρισης ...'}</span>
    </div>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
    <div>
      <span style={useStyles.tooltip}>2.	Τη με αρ. </span>
      <span style={style1}>{state.ProtocolNumber ? state.ProtocolNumber : '___'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.ProtocolDate ? getDateFormatForDocument(state.ProtocolDate) : '__-__-____'}</span>
      {
        ind === 1 ?
          <span style={useStyles.tooltip}> Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης.</span> :
          <>
            <span style={useStyles.tooltip}> Α.Δ.Σ. με την οποία διορθώθηκε η ανωτέρω Α.Δ.Σ. </span>
            <span style={style4}>{state.ContentAccount ? state.ContentAccount : 'π.χ. “ως προς τον Κ.Α. του προϋπολογισμού και ως προς το λεκτικό της δαπάνης”.'}</span>
          </>
      }
    </div>
  </>)
}