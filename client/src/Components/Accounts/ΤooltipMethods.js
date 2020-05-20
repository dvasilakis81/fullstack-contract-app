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
};

export function getLawArticleTooltip( state, contractDetails) {
  //1.	Τη με Α.Π. 260100/17-10-2018 Προγραμματική Σύμβαση και ειδικότερα το άρθρο 5 “Πόροι – Χρηματοδότηση – Προϋπολογισμός” αυτής.
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</div>
    <div style={useStyles.tooltip}>
      <span style={useStyles.tooltip}>1. Τη με Α.Π. {contractDetails.ProtocolNumber}/{getDateFormatForDocument(contractDetails.ProtocolDate)} Προγραμματική Σύμβαση και ειδικότερα το άρθρο </span>
      <span style={useStyles.tooltipIndicate}> {state.DownpaymentLawArticle ? state.DownpaymentLawArticle : '__'}</span>
      <span style={useStyles.tooltip}> “Πόροι – Χρηματοδότηση – Προϋπολογισμός” αυτής.</span>
    </div>
  </>)
}

export function getDocumentDateTooltipTemplate(state) {

  return (<>
    <span style={useStyles.tooltip}>Ημερομηνία δημιουργίας των εγγράφων </span>
    <span style={useStyles.tooltipIndicate}>{state.DocumentDate ? getDateFormatForDocument(state.DocumentDate) : '__-__-____'}</span>
  </>)
}

export function getAccountStartDateTooltipTemplate(state) {

  return (<>
    <span style={useStyles.tooltip}>Ημερομηνία έναρξης του λογαριασμού </span>
    <span style={useStyles.tooltipIndicate}>{state.Start ? getDateFormatForDocument(state.Start) : '__-__-____'}</span>
  </>)
}
export function getAccountEndDateTooltipTemplate(state) {

  return (<>
    <span style={useStyles.tooltip}>Ημερομηνία λήξης του λογαριασμού </span>
    <span style={useStyles.tooltipIndicate}>{state.End ? getDateFormatForDocument(state.End) : '__-__-____'}</span>
  </>)
}

//#region CC - suspended
export function getCCTooltipTemplate(CC1Value1, CC1Value2, CC2Value1, CC2Value2, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)

  return (<>
    <table>
      <tr>
        <td width='50px' style={{ fontWeight: 900 }}>KOIN:</td>
        <td width='200px'>
          <span style={{ fontWeight: 900 }}>1. </span>
          <span style={useStyles.tooltip}>Διεύθυνση </span>
          <span style={style1}>{CC1Value1 ? CC1Value1 : 'Επιλ. Δ/νση'} </span>
          <span style={style2}>{CC1Value2 ? '- Τμήμα ' + CC1Value2 : ''} </span>
        </td>
      </tr>
    </table>
  </>)
}
//#endregion

export function getFirstTrasmissionProtocolTooltip(pn, pd, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)

  return (<>
    <span style={useStyles.tooltip}>ΑΡ.ΠΡΩΤ.ΠΡΩΤΟΥ ΔΙΑΒΙΒΑΣΤΙΚΟΥ ΕΓΓΡΑΦΟΥ (αν είναι συνεχιζόμενη δαπάνη): </span>
    <span style={style1}>{pn ? pn : '___'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{pd ? getDateFormatForDocument(pd) : '__-__-____'}</span>
  </>)
}
export function getAccountProtocolTooltip(pn, pd, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)

  return (<>
    <span style={useStyles.tooltip}>ΑΡ.ΠΡΩΤ.ΔΙΑΒΙΒΑΣΤΙΚΟΥ ΕΓΓΡΑΦΟΥ: </span>
    <span style={style1}>{pn ? pn : '12345'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{pd ? getDateFormatForDocument(pd) : '01-01-2019'}</span>
  </>)
}
export function getWorkConfirmationDateTooltip(wcd) {
  //4.	Δύο (2) πρωτότυπα της από {dcd} Βεβαίωσης Έργου του Τμήματος {dep_name_lower} της Διεύθυνσης {dir_name_lower} αναφορικά με την υλοποίηση της Σύμβασης από την {c_conc} κατά το χρονικό διάστημα από {a_sd} έως και {a_ed}
  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</div>
    <div style={useStyles.tooltip}>...</div>
    <div style={useStyles.tooltip}>
      <span style={useStyles.tooltip}>4. Δύο (2) πρωτότυπα τη από</span>
      <span style={useStyles.tooltipIndicate}> {wcd ? getDateFormatForDocument(wcd) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> Βεβαίωσης Έργου του Τμήματος ....</span>
    </div>
  </>)
}
export function getDeliveredGoodDateTooltip(dgd) {

  return (<>
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</div>
    <div style={useStyles.tooltip}>
      <span style={useStyles.tooltip}>5. Δύο (2) πρωτότυπα του από</span>
      <span style={useStyles.tooltipIndicate}> {dgd ? getDateFormatForDocument(dgd) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.</span>
    </div>
  </>)
}

function getNumberLectical(number) {
  var ret = ''
  if (number === 1)
    ret = 'πρώτης'
  else if (number === 2)
    ret = 'δεύτερης'
  else if (number === 3)
    ret = 'τρίτης'
  else if (number === 4)
    ret = 'τέταρτης'
  else if (number === 5)
    ret = 'πέμπτης'
  else if (number === 6)
    ret = 'έκτης'
  else if (number === 7)
    ret = 'έβδομης'
  else if (number === 8)
    ret = 'όγδοοης'
  else if (number === 9)
    ret = 'ένατης'
  else if (number === 10)
    ret = 'δέκατης'

  return ret;
}

export function getMayorDecisionProtocolTooltip(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  //6)	Την Απόφαση Δημάρχου με Α.Π. 312848/06.12.2019 για τον ορισμό των μελών της Επιτροπής Παρακολούθησης
  var pn = state.MayorDecisionForMembersProtocolNumber;
  var pd = state.MayorDecisionForMembersProtocolDate;

  return (<>
    <span style={useStyles.tooltip}> Την Απόφαση Δημάρχου με Α.Π. </span>
    <span style={style1}>{pn ? pn : '_____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{pd ? getDateFormatForDocument(pd) : '__-__-____'}</span>
    <span style={useStyles.tooltip}> για τον ορισμό των μελών της Επιτροπής Παρακολούθησης. </span>
  </>)
}

export function getMonitoringCommitteePracticalTooltip(state, an, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  return (<>
    {/* 7)	Το από  06.12.2019 πρακτικό της (2ης) δεύτερης συνεδρίασης Επιτροπής Παρακολούθησης της Προγραμματικής Σύμβασης. */}
    <span style={useStyles.tooltip}>Το από </span>
    <span style={style1}>{state.MonitoringCommitteePracticalDate ? getDateFormatForDocument(state.MonitoringCommitteePracticalDate) : '__-__-_____'}</span>
    <span style={useStyles.tooltip}> πρακτικό της ({an}ης)  {getNumberLectical(an)} συνεδρίασης Επιτροπής Παρακολούθησης της Προγραμματικής Σύμβασης</span>
  </>)
}

//6)	Την Απόφαση Δημάρχου με Α.Π. 312848/06.12.2019 για τον ορισμό των μελών 
//της Επιτροπής Παρακολούθησης

export function getMonitoringCommitteeTooltipTemplate(state, contractDetails, an, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)

  // 8)	Το με ΑΠ. 318192/12.12.2019 έγγραφο της Τεχνόπολις του Δήμου Αθηναίων με το οποίο διαβιβάζονται:
  // 	Το πρακτικό της 2ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος 
  // «Το παιδί, Η πόλη και τα Μνημεία» που πραγματοποιήθηκε στις 06.12.2019.
  // 	Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο πρώτο τετράμηνο, Ιούνιος-Οκτώβριος  2019.
  var title = contractDetails.Title;
  var conc = contractDetails.ConcessionaireName;

  return (<>
    <span style={useStyles.tooltip}>To με Α.Π. </span>
    <span style={style1}>{state.TransmissionDocumentProtocolNumber ? state.TransmissionDocumentProtocolNumber : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{state.TransmissionDocumentProtocolDate ? getDateFormatForDocument(state.TransmissionDocumentProtocolDate) : '__-__-____'}</span>
    <span style={useStyles.tooltip}> έγγραφο της {conc}, με το οποίο διαβιβάζονται: <br /></span>
    <span style={useStyles.tooltip}>- Το πρακτικό της {an}ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος «{title}» που πραγματοποιήθηκε στης </span>
    <span style={useStyles.tooltip}>{state.MonitoringCommitteePracticalDate ? getDateFormatForDocument(state.MonitoringCommitteePracticalDate) : ' __-__-____'}<br /></span>
    <span style={useStyles.tooltip}>-Τα περιεχόμενα του παραδοτέου έργου του φυσικού αντικειμένου, που αφορά στο </span>
    <span style={style3}>{state.MonitoringCommitteeContentGivenWorkTime ? state.MonitoringCommitteeContentGivenWorkTime : ' π.χ. πρώτο τετράμηνο, Νοέμβριος 2019-Φεβρουάριος 2020'}</span>
    <span style={useStyles.tooltip}>, καθώς και το σχετικό υλικό, σε δύο (2) αντίτυπα.</span>
  </>)
}

export function getInvoiceTooltipTemplate(state, conc, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 5 ? useStyles.tooltipIndicate : useStyles.tooltip)

  // var numberTrasmissionAttachment = 3
  // if (state.isDownpayment)
  //   numberTrasmissionAttachment = state.HasSecondDecisionDS ? 8 : 6

  // var numberAccountAttacment = 3
  // if (state.isDownpayment)
  //   numberAccountAttacment = state.HasSecondDecisionDS ? 8 : 6

  //Διαβιβαστικό
  //8.	Πρωτότυπο & φωτ/φο του με αριθμ. ΤΥΠΒ022942/29-3-2019 Τιμολογίου Παροχής Υπηρεσιών της COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.
  //Λογαριασμός
  // 8.	Το με Α.Π. 260342/18-10-2018 διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. 5/17-10-2018 Τιμολόγιο της Δ.Α.Ε.Μ. Α.Ε στις 01-01-2019. 

  return (<>
    {/* Το με Α.Π. 260342/18-10-2018 διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. 5/17-10-2018 Τιμολόγιο της Δ.Α.Ε.Μ. Α.Ε. */}
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</div>
    <span style={useStyles.tooltip}>To με Α.Π. </span>
    <span style={style3}>{state.InvoiceDeliveredDateProtocolNumber ? state.InvoiceDeliveredDateProtocolNumber : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style4}>{state.InvoiceDeliveredDateProtocolDate ? getDateFormatForDocument(state.InvoiceDeliveredDateProtocolDate) : '__-__-____'}</span>
    <span style={useStyles.tooltip}> διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. </span>
    <span style={style1}>{state.InvoiceNumber ? state.InvoiceNumber : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{state.InvoiceDate ? state.InvoiceDate : '__-__-____'}</span>
    <span style={useStyles.tooltip}> Τιμολόγιο της {conc} στης </span>
    <span style={style5}>{state.InvoiceDeliveredDate ? state.InvoiceDeliveredDate : '__-__-____'}</span>
  </>)
}

//#region AAY
export function getAayTooltipTemplate(state, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 5 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style6 = (ind === 6 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var number = (state.isDownpayment === true ? 2 : (state.HasSecondDecisionDS ? 7 : 5))

  //Διαβιβαστικό
  //(Προκαταβολή)  7.	Πρωτότυπο και φωτοαντίγραφο της με αρ. Π00799/2018 (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ-9ΩΠ Απόφασης Ανάληψης Υποχρέωσης
  //Πρωτότυπο και φωτ/φο της με Α.Π. 56142/20-2-2019 (Α00488) Απόφασης Ανάληψης Υποχρέωσης με ΑΔΑ: 9Ξ4ΔΩ6Μ-ΡΥ4.

  //Λογαριασμός
  //Προκαταβολή 7.	Τη με αρ. Π00799/2018 (Αριθμός ΑΑΥ) (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ-9ΩΠ Απόφαση Ανάληψης Υποχρέωσης
  //Τη με Α.Π. 56142/20-2-2019 (υπ’ αριθμ. Α00488 – ΕΑΔ 487) Απόφαση Aνάληψης Yποχρέωσης.

  if (ind === 2)
    return (<>
      <div style={useStyles.tooltip}>ΑΑΥ/ΕΤΟΣ (ΕΑΔ) :</div>
      <span style={style1}>{state.AayValue ? state.AayValue : '____'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style2}>{state.AayYear ? state.AayYear : '___'}</span>
      <span style={style3}>{state.AayEadNumber ? state.AayEadNumber : '___'}</span>
    </>)
  else
    return (<>
      <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Διαβιβαστικό)</div>
      <span style={useStyles.tooltip}>{number}.{state.IsFirstOfTheYear ? ' Πρωτότυπο και φωτ/φο' : ' Δύο (2) φωτ/φα'} της με Α.Π. </span>
      <span style={style4}>{state.AayProtocolNumber ? state.AayProtocolNumber : '_____'}</span>
      <span style={useStyles.tooltip}>/</span>
      <span style={style5}>{state.AayProtocolDate ? getDateFormatForDocument(state.AayProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> (</span>
      <span style={style1}>{state.AayValue ? state.AayValue : '_____'}</span>
      <span style={useStyles.tooltip}>)</span>
      <span style={useStyles.tooltip}> Απόφασης Ανάληψης Υποχρέωσης με ΑΔΑ: </span>
      <span style={style6}>{state.AayADA ? state.AayADA : '______'}.</span>

      <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ(Λογαριασμός)</div>
      <span style={useStyles.tooltip}>{number}. Τη με Α.Π. </span>
      <span style={style4}>{state.AayProtocolNumber ? state.AayProtocolNumber : '____'}</span>
      <span>/</span>
      <span style={style5}>{state.AayProtocolDate ? getDateFormatForDocument(state.AayProtocolDate) : '__-__-____'}</span>
      <span style={useStyles.tooltip}> (υπ’ αριθμ. </span>
      <span style={style1}>{state.AayValue ? state.AayValue : '____'}</span>
      <span style={useStyles.tooltip}> - ΕΑΔ </span>
      <span style={style3}>{state.AayEadNumber ? state.AayEadNumber : '___'}</span>
      <span style={useStyles.tooltip}>) </span>
      <span style={useStyles.tooltip}>Απόφαση Aνάληψης Yποχρέωσης</span>
    </>)
}
//#endregion

// *** _____________________ ***
// *** Έγγραφο Διαβιβαστικού ***
// *** _____________________ ***

  //ΠΡΟΚΑΤΑΒΟΛΗ
//   1.	Πρωτότυπο και φωτοαντίγραφο της με Α.Π. 260100/17-10-2018 Προγραμματικής Σύμβασης.
// 2.	Δύο (2) φωτοαντίγραφα της με αρ. 866/14-6-2018 Απόφασης του Δημοτικού Συμβουλίου (Α.Δ.Σ.) με Α.Δ.Α.
// 3.	Δύο (2) φωτοαντίγραφα της με αρ. 959/28-6-2018 Α.Δ.Σ. με Α.Δ.Α. (Αν υπάρχει δεύτερη απόφαση δημοτικού συμβουλίου
// 4.	Δύο (2) φωτοαντίγραφα της με Α.Π. 177724/10-7-2018 Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής
// 5.	Δύο (2) φωτοαντίγραφα της με Α.Π. 209641/24-8-2018 Απόφασης του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής (Αν υπάρχει το 3)
// 6.	Πρωτότυπο και φωτοαντίγραφο της Κοινοποίησης της με αρ. 329/2018 Πράξης του Ζ΄ Κλιμακίου του Ελεγκτικού Συνεδρίου (Α.Π.Δ.Α. 243357/2-10-2018) (Αν υπάρχει ελεγκτικό συνέδριο)
// 7.	Πρωτότυπο και φωτοαντίγραφο της με αρ. Π00799/2018 (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ - 9ΩΠ Απόφασης Ανάληψης Υποχρέωσης
// 8.	Πρωτότυπο και φωτοαντίγραφο του με αρ. 5/17-10-2018 Τιμολογίου Παροχής Υπηρεσιών της Δ.Α.Ε.Μ. Α.Ε.
// 9.	Τέσσερα (4) πρωτότυπα του 1ου Λογαριασμού
// 10.	Τέσσερα (4) πρωτότυπα του 1ου Λογαριασμού
// 11.	Ενημερωτικός Πίνακας της με Α.Π.260100/17-10-2018 Προγραμματικής Σύμβασης

//  1. Δύο (2) φωτ/φα της με Α.Π. 93942/30-3-2017 Δημόσιας Σύμβασης Ανάθεσης.   
//  2. Πρωτότυπο και φωτ/φο της με Α.Π. 56142/20-2-2019 (Α00488) Απόφασης Ανάληψης Υποχρέωσης με ΑΔΑ: 9Ξ4ΔΩ6Μ-ΡΥ4. 
//  3. Πρωτότυπο & φωτ/φο του με αριθμ. ΤΥΠΒ022942/29-3-2019 Τιμολογίου Παροχής Υπηρεσιών της COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.
//  4. Δύο (2) πρωτότυπα της από 29-3-2019 Βεβαίωσης Έργου του Τμήματος Τεχνολογίας, Πληροφορικής και Επικοινωνιών της Διεύθυνσης Στρατηγικού Σχεδιασμού, Ανθεκτικότητας Καινοτομίας και Τεκμηρίωσης αναφορικά με την υλοποίηση της Σύμβασης από την COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε κατά το χρονικό διάστημα από 1-12-2018 έως και 29-3-2019.
//  5. Δύο (2) πρωτότυπα του από 29-3-2019 Πρωτοκόλλου Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής.
//  6. Τέσσερα (4) πρωτότυπα του έκτου (6ου)  Λογαριασμού.

// *** ___________________ ***
// *** Έγγραφο λογαριασμού ***
// *** ___________________ ***

//ΠΡΟΚΑΤΑΒΟΛΗ
// Έχοντας υπόψη : 
// 1.	Τη με Α.Π. 260100/17-10-2018 Προγραμματική Σύμβαση και ειδικότερα το άρθρο 5 “ Πόροι – Χρηματοδότηση – Προϋπολογισμός” αυτής.
// 2.	Τη με αρ. 866/14-6-2018 Απόφαση του Δημοτικού Συμβουλίου (Α.Δ.Σ.) Αθηναίων με την οποία εγκρίθηκαν: η υπογραφή των όρων, το σχέδιο και τα ανά έτος ποσά της προαναφερθείσας Προγραμματικής Σύμβασης. 
// 3.	Τη με αρ. 959/28-6-2018 Α.Δ.Σ. με την οποία διορθώθηκε η ανωτέρω Α.Δ.Σ. “ως προς τον Κ.Α. του προϋπολογισμού και ως προς το λεκτικό της δαπάνης”. (Αν υπάρχει δεύτερη απόφαση δημοτικού συμβουλίου) θα ανοίγει τεχτ για να το συμπληρώσει ο χρήστης.
// 4.	Τη με Α.Π. 177724/10-7-2018 Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής για τη νόμιμη λήψη της 866/14-6-2018(ίδιο με το 2) Α.Δ.Σ.
// 5.	Τη με Α.Π. 209641/24-8-2018 Απόφαση του Συντονιστή της Αποκεντρωμένης Διοίκησης Αττικής για τη νόμιμη λήψη της 959/28-6-2018 Α.Δ.Σ. 
// 6.	Τη με αρ. 329/2018 Πράξη του Ζ΄ Κλιμακίου του Ελεγκτικού Συνεδρίου περί μη κωλύματος της υπογραφής του σχεδίου της εν θέματι Προγραμματικής Σύμβασης.
// 7.	Τη με αρ. Π00799/2018 (Αριθμός ΑΑΥ) (Α.Π. 179391/11-7-2018) και ΑΔΑ ΩΨ6ΡΩ6Μ-9ΩΠ Απόφαση Ανάληψης Υποχρέωσης.
// 8.	Το με Α.Π. 260342/18-10-2018 διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. 5/17-10-2018 Τιμολόγιο της Δ.Α.Ε.Μ. Α.Ε., 

// Έχοντας υπόψη : 
// 1.	Τη με Α.Π. 93942/30-3-2017 Δημόσια Σύμβαση Ανάθεσης.  
// 2.	Τη με Α.Π. 56142/20-2-2019 (υπ’ αριθμ. Α00488 – ΕΑΔ 487) Απόφαση Aνάληψης Yποχρέωσης.
// 3.	Το με αριθμ. ΤΥΠΒ022942/29-3-2019 Τιμολόγιο Παροχής Υπηρεσιών της COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.
// 4.	Την από 29-3-2019 Βεβαίωση Έργου του Τμήματος Τεχνολογίας, Πληροφορικής και Επικοινωνιών της Διεύθυνσης Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας και Τεκμηρίωσης περί της ορθής υλοποίησης της εν λόγω Σύμβασης κατά το χρονικό διάστημα από 1-12-2018 έως και 29-3-2019.
// 5.	Το από 29-3-2019 Πρωτόκολλο Οριστικής Παραλαβής Εργασιών (για το εν λόγω χρονικό διάστημα υλοποίησης της Σύμβασης) της τριμελούς Επιτροπής Παραλαβής,

// 8.	Το με Α.Π. 260342/18-10-2018 διαβιβαστικό έγγραφο, με το οποίο μας διαβιβάστηκε το υπ’ αριθ. 5/17-10-2018 Τιμολόγιο της Δ.Α.Ε.Μ. Α.Ε.,
// 3.	Το με αριθμ. ΤΥΠΒ022942/29-3-2019 Τιμολόγιο Παροχής Υπηρεσιών της COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.

