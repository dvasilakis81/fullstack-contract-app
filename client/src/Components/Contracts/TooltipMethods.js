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
      <span style={useStyles.tooltip}>Τη με Α.Π. {state.contractInfo.ProtocolNumber}/{getDateFormatForDocument(state.contractInfo.ProtocolDate)} Προγραμματική Σύμβαση και ειδικότερα το άρθρο </span>
      <span style={useStyles.tooltipIndicate}> {state.contractInfo.LawArticle ? state.contractInfo.LawArticle : 'π.χ. 5 “Πόροι – Χρηματοδότηση – Προϋπολογισμός” '}</span>
      <span style={useStyles.tooltip}> αυτής.</span>
    </div>
  </>)
}

function getNumberLectical(number, startWithCapital) {
  var ret = ''; 

  if (number == 1)
    ret = (startWithCapital === true ? 'Ένα (1)' : 'ένα (1)');
  else if (number == 2)
    ret = (startWithCapital === true ? 'Δύο (2)' : 'δύο (2)');
  else if (number == 3)
    ret = (startWithCapital === true ? 'Τρία (3)' : 'τρία (3)');
  else if (number == 4)
    ret = (startWithCapital === true ? 'Τέσσερα (4)' : 'τέσσερα (4)');
  else if (number == 5)
    ret = (startWithCapital === true ? 'Πέντε (5)' : 'πέντε (5)');
  else if (number == 6)
    ret = (startWithCapital === true ? 'Έξι (6)' : 'έξι (6)');
  else if (number == 7)
    ret = (startWithCapital === true ? 'Εφτά (7)' : 'εφτά (7)');
  else if (number == 8)
    ret = (startWithCapital === true ? 'Οκτώ (8)' : 'οκτώ (8)');
  else if (number == 9)
    ret = (startWithCapital === true ? 'Εννιά (9)' : 'εννιά (9)');
  
  return ret;
}

export function getCopiesPhrase(NoPrototype, NoPhotocopy) {
  var ret = '';
  
  if (NoPrototype > 0)
    ret = getNumberLectical(NoPrototype, true) + (NoPrototype == 1 ? ' πρωτότυπo' : ' πρωτότυπα');

  if (ret)
    ret += ' και ';

  if (NoPhotocopy > 0)
    ret += getNumberLectical(NoPhotocopy, (ret ? false : true)) + (NoPhotocopy == 1 ? ' φωτοαντίγραφo' : ' φωτοαντίγραφα');

  return ret;
}