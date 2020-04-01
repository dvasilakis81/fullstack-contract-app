import React, { Component } from 'react';
import axios from 'axios';

class DiavivastikoLogariasmou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DocumentDate: '12 ΑΠΡΙΛΙΟΥ 2019',
      DocumentConfirmationDate: '29-3-2019',
      DateDeliveryGoods: '29-3-2019',
      Attachments2: [{ startPhrase: 'Πρωτότυπο και φωτ/φο' }], //if not the first account of this year then 'Δύο(2) φωτ/φα'
      direction: [{
        name: 'ΣΤΡΑΤΗΓΙΚΟΥ ΣΧΕΔΙΑΣΜΟΥ,ΑΝΘΕΚΤΙΚΟΤΗΤΑΣ, ΚΑΙΝΟΤΟΜΙΑΣ & ΤΕΚΜΗΡΙΩΣΗΣ',
        nameInLower: 'Στρατηγικού Σχεδιασμού,Ανθεκτικότητας, Καινοτομίας & Τεκμηρίωσης',
        department: [{
          name: 'ΤΕΧΝΟΛΟΓΙΑΣ, ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΕΠΙΚΟΙΝΩΝΙΩΝ',
          nameInLower: 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών',
          address: 'Λιοσίων 22',
          postalCode: '104 38',
          city: 'Αθήνα',
          supervisor: [{ name: 'Χατζηευστρατίου Ιωάννης', tel: '210.5277169', email: 'i.chatzieustratiou@athens.gr' }]
        }]
      }],
      cc: [{
        cc1: 'Διεύθυνση Προμηθειών και Αποθηκών',
        cc2: 'Διεύθυνση Στρατηγικού Σχεδιασμού,  Ανθεκτικότητας, Καινοτομίας & Τεκμηρίωσης-Τμήμα Τεχνολογίας, Πληροφορικής & Επικοινωνιών'
      }],
      contract: [{
        contractType: 'Δημόσιας Σύμβασης Ανάθεσης',
        concessionaire: [{ article: 'της', name: 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', afm: '094223430' }],
        title: [{ article: 'τη', value: 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής & Δεδομένων (LAN-WAN) του Δήμου Αθηναίων' }],
        protocol: [{ number: '93942', date: '30-3-2017' }],
        kae: '6264.005',
        actor: '10',
        code_direction: '18',
        date: [{ start: '30-3-2017', end: '29-3-2019' }],
        award: [{ number: '1448', date: '21-12-2016', ada: '75Η2Ω6Μ-ΝΙΩ' }],
        CPV: [{ code: '50312310-1', title: 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων' }],
        balance: '0,00€'
      }],
      Account: [{
        Number: '6',
        numberWord: 'έκτου',
        lastMessage: '(και τελευταίου)',
        start_date: '1-12-2018',
        end_date: '29-3-2019',
        amount: '6.844,80€',
        Invoice: [{
          Number: 'ΤΥΠΒ022942',
          Date: '29-3-2019',          
          Protocol: [{ Number: '97620', Date: '1-4-2019' }]
        }],
        firstTransitory: [{ protocolNumber: '250866', protocolDate: '6-9-2017' }],
        AYY: [{ value: 'Α00488', year: '2019', protocolNumber: '56142', protocolDate: '20-2-2019', EAD_number: '487', previousYearValue: '', ADA: '9Ξ4ΔΩ6Μ-ΡΥ4' }],

      }],
      signature: [{
        signatory_type: 'Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ',
        kaa: 'κ.α.α.',
        signatory_name: 'Παπακωνσταντίνου – Παπαδοπούλου Έλλη'
      }]
    }
  }

  handleGetDataOnClick() {

    try {
      axios.get('http://127.0.0.1:3000/').then(res => console.log('Response from get: ' + res.data));
    }
    catch (error) {
      console.log(error);
    }
  }

  handlePostDataOnClick() {
    axios.post('http://127.0.0.1:3000/diavlog', this.state).then(res => console.log('Response from get: ' + res.data));
  }

  render() {
    return (
      <div>
        {/* <button title='Get data' onClick={this.handleGetDataOnClick.bind(this)}>Get data</button> */}
        <button
          title='Post data'
          onClick={this.handlePostDataOnClick.bind(this)}
          style={{ padding: '20px', background: 'lightGreen', fontSize: '16px' }}>
          Δημιουργία αρχείου διαβιβαστικού λογαριασμού
          </button>
      </div>
    );
  }
}

export default DiavivastikoLogariasmou;
