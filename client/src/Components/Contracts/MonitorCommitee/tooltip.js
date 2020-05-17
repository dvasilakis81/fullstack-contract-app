import React from 'react';
import { getDateFormatForDocument } from '../../../Helper/helpermethods';
import '../../../Styles/styles.css';

export function getMonitoringCommitteeTooltip(useStyles, state, conc, an, ind) {
  var style1 = (ind === 1 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style2 = (ind === 2 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style3 = (ind === 3 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style4 = (ind === 4 ? useStyles.tooltipIndicate : useStyles.tooltip)
  var style5 = (ind === 5 ? useStyles.tooltipIndicate : useStyles.tooltip)


  //Διαβιβαστικό
  //6)	Δύο (2) φωτοαντίγραφα της Απόφασης Δημάρχου με Α.Π. 312848/6.12.2019 για τον ορισμό
// των μελών της Επιτροπής Παρακολούθησης.
// 7)	Δύο (2) φωτοαντίγραφα του από  06.12.2019 Πρακτικού της (2ης) δεύτερης συνεδρίασης 
// της Επιτροπής Παρακολούθησης της Προγραμματικής Σύμβασης. 
// 8)	Δύο (2) φωτοαντίγραφα του με ΑΠ. 318192/12.12.2019 εγγράφου της Τεχνόπολις του Δήμου Αθηναίων με το οποίο διαβιβάζονται :
// 	Το πρακτικό της 2ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος «Το παιδί, Η πόλη και τα Μνημεία» που πραγματοποιήθηκε στις 06.12.2019.
// 	Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο πρώτο τετράμηνο, Ιούνιος-Οκτώβριος  2019

  //Λογαριασμός
  // 6)	Την Απόφαση Δημάρχου με Α.Π. 312848/06.12.2019 για τον ορισμό των μελών 
  // της Επιτροπής Παρακολούθησης. 
  // 7)	Το από  06.12.2019 πρακτικό της (2ης) δεύτερης συνεδρίασης Επιτροπής Παρακολούθησης της Προγραμματικής Σύμβασης.
  // 8)	Το με ΑΠ. 318192/12.12.2019 έγγραφο της Τεχνόπολις του Δήμου Αθηναίων με το οποίο διαβιβάζονται:
  // 	Το πρακτικό της 2ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση για το σχεδιασμό και υλοποίηση του Προγράμματος 
  // «Το παιδί, Η πόλη και τα Μνημεία» που πραγματοποιήθηκε στις 06.12.2019.
  // 	Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο πρώτο τετράμηνο, Ιούνιος-Οκτώβριος  2019.


  return (<>
    {/* Το με ΑΠ. 48685/26.02.2020 έγγραφο της Τεχνόπολις του Δήμου Αθηναίων με το οποίο διαβιβάζονται:
	Το Πρακτικό της 3ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση 
	Τα περιεχόμενα του παραδοτέου του φυσικού αντικειμένου, που αφορά στο πρώτο τετράμηνο, Νοέμβριος 2019-Φεβρουάριος 2020, καθώς και το σχετικό υλικό, σε δύο (2) αντίτυπα.
 */}
    <div style={useStyles.tooltipTitle}>ΣΥΝΗΜΜΕΝΑ ΔΙΚΑΙΟΛΟΓΗΤΙΚΑ</div>
    <span style={useStyles.tooltip}>To με Α.Π. </span>
    <span style={style1}>{state.MonitoringCommitteeDocumentProtocolNumber ? state.MonitoringCommitteeDocumentProtocolDate : '____'}</span>
    <span style={useStyles.tooltip}>/</span>
    <span style={style2}>{state.InvoiceDeliveredDateProtocolDate ? getDateFormatForDocument(state.InvoiceDeliveredDateProtocolDate) : '__-__-____'}</span>
    <span style={useStyles.tooltip}> έγγραφο της {conc}, με το οποίο διαβιβάζονται:<br />-Το πρακτικό της {an}ης συνεδρίασης της Επιτροπής Παρακολούθησης για την Προγραμματική Σύμβαση
          <br />-Τα περιεχόμενα του παραδοτέου έργου του φυσικού αντικειμένου, που αφορά στο δεύτερο τετράμηνο, Νοέμβριος 2019- Φεβρουάριος 2020, καθώς και το σχετικό υλικό, σε δύο (2) αντίτυπα.
    </span>    
  </>)
}