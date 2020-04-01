import React, { Component } from 'react';
import axios from 'axios';
var downloadjs = require('downloadjs');

class Logariasmos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetExpenditureYear: '2019',
      documentDate: '12/04/2019',
      documentConfirmationDate: '29-3-2019',
      dateDeliveryGoods: '29-3-2019',
      direction: [{
        name: 'ΣΤΡΑΤΗΓΙΚΟΥ ΣΧΕΔΙΑΣΜΟΥ,ΑΝΘΕΚΤΙΚΟΤΗΤΑΣ, ΚΑΙΝΟΤΟΜΙΑΣ & ΤΕΚΜΗΡΙΩΣΗΣ',
        nameInLower: 'Στρατηγικού Σχεδιασμού,Ανθεκτικότητας, Καινοτομίας & Τεκμηρίωσης',
        department: [{ name: 'ΤΕΧΝΟΛΟΓΙΑΣ, ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΕΠΙΚΟΙΝΩΝΙΩΝ', nameInLower: 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών' }]
      }],
      contract: [{
        contractTypeName: 'Δημόσιας', //Προγραμματικής
        contractType: 'Δημόσια Σύμβαση Ανάθεσης',
        concessionaire: [{ article: 'THN', name: 'COSMOS BUSINESS SYSTEMS Α.Ε.Β.Ε.' }],
        title: [{ article: 'τη', value: 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής Δεδομένων (LAN-WAN) του Δήμου Αθηναίων' }],
        protocol: [{ number: '93942', date: '30-3-2017' }],
        kae: '6264.005',
        actor: '10',
        codeDirection: '18',
        clearAmount: '33.120,00€',
        fpa: '7.948,80€',
        totalAmount: '41.068,80€',
        paidAmount: '27.600,00€',
        paidAmountFpa: '6.624,00€',
        paidAmountTotal: '34.224,00€'
      }],
      account: [{
        number: '6',
        clearAmount: '5.520,00€',
        fpa: '1.324,80€',
        totalAmount: '6.844,80€',
        startDate: '1-12-2018',
        endDate: '29-3-2019',
        mixedRemainApproval: '0,00€',
        words: 'ΕΞΙ ΧΙΛΙΑΔΩΝ ΟΚΤΑΚΟΣΙΩΝ ΣΑΡΑΝΤΑ ΤΕΣΣΑΡΩΝ ΕΥΡΩ ΚΑΙ ΟΓΔΟΝΤΑ ΛΕΠΤΩΝ',
        invoice: [{ number: 'ΤΥΠΒ022942', date: '29-3-2019' }],
        reservations: [{ eaadisi: '3.1€', stamp: '3.1€', stamp_oga: '0.1€', aepp: '3.4€', fe: '3.4€', total: '3.4€' }],
        AYY: [{ value: 'Α00488', protocolNumber: '56142', date: '20-2-2019', ead_number: '487' }]
      }],
      accounts: [
        ['1', '5.520,00€', '1.324,80€', '6.844,80€'],
        ['2', '5.520,00€', '1.324,80€', '6.844,80€'],
        ['3', '5.520,00€', '1.324,80€', '6.844,80€']
      ],
      signature: [
        {
          kaa: 'κ.α.α.',
          writer_type: 'Η ΣΥΝΤΑΞΑΣΑ',
          writer: 'ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ',
          foremanDepartment_type: 'Ο ΠΡΟΪΣΤΑΜΕΝΟΣ ΤΜΗΜΑΤΟΣ',
          foremanDepartment: 'ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ',
          foremanDirection_type: 'Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ',
          foremanDirection: 'ΠΑΠΑΚΩΝΣΤΑΝΤΙΝΟΥ – ΠΑΠΑΔΟΠΟΥΛΟΥ ΕΛΛΗ'
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

  handleCreateDocumentWithDataOnClick() {
    var headers = {
      'Content-Type': 'application/json'
    }
    axios.post('http://127.0.0.1:3000/log', this.state, { headers: headers, responseType: 'arraybuffer' })
      .then(function (response) {
        var blob = new Blob([response.data]);
        downloadjs(blob, 'out2_raw.docx', 'application/octet-stream')
      })
  }

  handleDownloadFileOnClick() {

    axios.get('http://127.0.0.1:3000/download',
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/octet-stream'
        }
      }
    ).then(function (response) {
      var blob = new Blob([response.data]);
      downloadjs(blob, 'out2_raw.docx', 'application/octet-stream')
    })
  }

  render() {
    return (
      <div>
        {/* <button title='Get data' onClick={this.handleGetDataOnClick.bind(this)}>Get data</button> */}
        <button
          title='Post data'
          onClick={this.handleCreateDocumentWithDataOnClick.bind(this)}
          style={{ padding: '20px', background: 'lightGreen', fontSize: '16px' }}>
          Δημιουργία αρχείου λογαριασμού
          </button>
        <button
          title='Post data'
          onClick={this.handleDownloadFileOnClick.bind(this)}
          style={{ padding: '20px', background: 'lightGreen', fontSize: '16px' }}>Κατέβασμα αρχείου λογαριασμού</button>
      </div>
    );
  }
}

export default Logariasmos;
