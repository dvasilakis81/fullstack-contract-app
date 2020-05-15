import React from 'react';
import { getDateFormatForDocument } from '../../Helper/helpermethods';

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
}

export function getLawArticleTooltip(state) {
  //1.	Τη με Α.Π. 260100/17-10-2018 Προγραμματική Σύμβαση και ειδικότερα το άρθρο 5 “Πόροι – Χρηματοδότηση – Προϋπολογισμός” αυτής.
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</div>
    <div style={useStyles.tooltip}>
      <span style={useStyles.tooltip}>Τη με Α.Π. {state.ProtocolNumber}/{getDateFormatForDocument(state.ProtocolDate)} Προγραμματική Σύμβαση και ειδικότερα το άρθρο </span>
      <span style={useStyles.tooltipIndicate}> {state.LawArticle ? state.LawArticle : 'π.χ. 5 “Πόροι – Χρηματοδότηση – Προϋπολογισμός” '}</span>
      <span style={useStyles.tooltip}> αυτής.</span>
    </div>
  </>)
}
