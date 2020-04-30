import React, { Component } from 'react';
import axios from 'axios';
import MySnackbar from '../../Components/Common/MySnackbar'
import { getServerErrorResponseMessage } from '../../Helper/helpermethods' 

var downloadjs = require('downloadjs');

class DownpaymentTransmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMessage: false,
      message: '',
      variant: '',      
      submitButtonDisabled: false,
      navigateToEditAccount: false,
      disabled: false
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

  postTransmissionDocumentData() {
    this.setState({ disabled: true })
    var dataToPost = {
      DocumentDate: '12 ΑΠΡΙΛΙΟΥ 2019',
      Direction: [{
        Name: 'ΣΤΡΑΤΗΓΙΚΟΥ ΣΧΕΔΙΑΣΜΟΥ,ΑΝΘΕΚΤΙΚΟΤΗΤΑΣ, ΚΑΙΝΟΤΟΜΙΑΣ & ΤΕΚΜΗΡΙΩΣΗΣ',
        NameInLower: 'Στρατηγικού Σχεδιασμού,Ανθεκτικότητας, Καινοτομίας & Τεκμηρίωσης',
        Department: [{
          Name: 'ΤΕΧΝΟΛΟΓΙΑΣ, ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΕΠΙΚΟΙΝΩΝΙΩΝ',
          NameInLower: 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών',
          Address: 'Λιοσίων 22',
          PostalCode: '104 38',
          City: 'Αθήνα',
          Supervisor: [{ Name: 'Χατζηευστρατίου Ιωάννης', Tel: '210.5277169', Email: 'i.chatzieustratiou@athens.gr' }]
        }]
      }],
      CC: [{
        CC1: 'Διεύθυνση Προμηθειών και Αποθηκών',
        CC2: 'Διεύθυνση Στρατηγικού Σχεδιασμού, Ανθεκτικότητας, Καινοτομίας Τεκμηρίωσης-Τμήμα Τεχνολογίας, Πληροφορικής Επικοινωνιών'
      }],
      Contract: [{
        ContractType: 'Δημόσιας Σύμβασης Ανάθεσης',
        Concessionaire: [{ Article: 'της', Name: 'COSMOS BUSINESS SYSTEMS ΑΕΒΕ', Afm: '094223430' }],
        Title: [{ Article: 'τη', Value: 'Συντήρηση του Ενεργού Εξοπλισμού Δικτύου Φωνής Δεδομένων (LAN-WAN) του Δήμου Αθηναίων' }],
        Protocol: [{ Number: '93942', Date: '30-3-2017' }],
        Kae: '6264.005',
        Actor: '10',
        CodeDirection: '18',
        Date: [{ Start: '30-3-2017', End: '29-3-2019' }],
        Award: [{ Number: '1448', Date: '21-12-2016', Ada: '75Η2Ω6Μ-ΝΙΩ' }],
        CPV: [{ Code: '', Title: 'Συντήρηση Εξοπλισμού Δικτύου Δεδομένων' }],
        Balance: '0,00€'
      }],
      DecisionDS: [{
        //Protocol: [{ Number: '866', Date: '14-6-2018' }, { Number: '959', Date: '28-6-2018' }],
        Protocol: [{ Number: '866', Date: '14-6-2018' }]
      }],
      DecisionSADA: [{
        Protocol: [{ Number: '177724', Date: '10-7-2018' }, { Number: '209641', Date: '24-8-2018' }],
      }],
      CourtOfAuditors: [{
        Action: [{ Number: '329', Year: '2018' }],
        Scale: [{ Letter: "Z'" }],
        APDA: [{ Number: '243357', Date: '2-10-2018' }],
      }],
      Account: [{
        Number: '1',
        NumberWord: 'πρώτου',
        Start: '1-12-2018',
        End: '29-3-2019',
        Amount: '6.844,80€',
        Invoice: [{ Number: 'ΤΥΠΒ022942', Date: '29-3-2019', DeliveredDate: '1-4-2019', Protocol: [{ Number: '866', Date: '14-6-2018' }] }],
        AYY: [{ Value: 'Π00799', Year: '2018 ', ProtocolNumber: '179391', ProtocolDate: '11-7-2018', EADNumber: '487', PreviousYearValue: '', ADA: 'ΩΨ6ΡΩ6Μ-9ΩΠ' }]
      }],
      Signature: [{
        SignatoryTitle: 'Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ',
        kaa: '',
        SignatoryName: 'Δρ. Ουρανία Β. ΚΑΚΡΙΔΑ'
      }],
      PrototypeNumber: '4'
    }
    var config = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR2YXNpbGFraXMiLCJpYXQiOjE1NzE4MjU1NDQsImV4cCI6MTU3MTg1NDM0NH0.pMJJssuvGdv6bXTVKTEuINHw11rmAW83ZwEYcbf8Mdg'
      },
      responseType: 'arraybuffer'
    };

    axios.post('http://127.0.0.1:7845/getDownpaymentTransmissionFile', dataToPost, config).then(res => {
      this.setState({ disabled: false })
      var blob = new Blob([res.data]);
      var fileName = 'Διαβαστικό Προκαταβολής Λογαριασμός.docx';
      downloadjs(blob, fileName, 'application/octet-stream');
      this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
    }).catch(error => {            
      var msg = 'Αποτυχής προσπάθεια δημιουργίας αρχείου!' + error;
      this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false, disabled: false });
    });
  }

  postAccountDocumentData() {
    this.setState({ disabled: true })

    var dataToPost = {
      BudgetExpenditureYear: '2018',
      DocumentDate: '12/04/2019',
      LawArticle: '5',
      Direction: [{
        Name: 'ΣΤΡΑΤΗΓΙΚΟΥ ΣΧΕΔΙΑΣΜΟΥ,ΑΝΘΕΚΤΙΚΟΤΗΤΑΣ, ΚΑΙΝΟΤΟΜΙΑΣ & ΤΕΚΜΗΡΙΩΣΗΣ',
        NameInLower: 'Στρατηγικού Σχεδιασμού,Ανθεκτικότητας, Καινοτομίας & Τεκμηρίωσης',
        Department: [{ Name: 'ΤΕΧΝΟΛΟΓΙΑΣ, ΠΛΗΡΟΦΟΡΙΚΗΣ ΚΑΙ ΕΠΙΚΟΙΝΩΝΙΩΝ', NameInLower: 'Τεχνολογίας, Πληροφορικής και Επικοινωνιών' }]
      }],
      Contract: [{
        ContractTypeName: 'Δημόσιας', //Προγραμματικής
        ContractType: 'Δημόσια Σύμβαση Ανάθεσης',
        Concessionaire: [{ Article: 'THΣ', Name: 'Δ.Α.Ε.Μ. Α.Ε.' }],
        Title: [{ Article: 'τη', Value: 'την συμμόρφωση των κεντρικών υπολογιστικών συστημάτων με τον Ευρωπαϊκό Γενικό Κανονισμό για την Προστασία Δεδομένων GDPR (Genaral Data Protection Regulation) για το Δήμο Αθηναίων' }],
        Protocol: [{ Number: '260100', Date: '17-10-2018' }],
        Kae: '6737.062',
        Actor: '0',
        CodeDirection: '18',
        AmountPure: '1.168.064,52€',
        AmountFpa: '280.335,48€',
        AmountTotal: '1.448.400,00€',
        PaidAmountPure: '0',
        PaidAmountFpa: '0',
        PaidAmountTotal: '0'
      }],
      Account: [{
        Number: '1',
        AmountPure: '120.967,74€',
        AmountFpa: '29.032,26€',
        AmountTotal: '150.000,00€',
        StartDate: '1-12-2018',
        EndDate: '29-3-2019',
        MixedRemainApproval: '1.298.400,00€',
        Protocol: [{ Number: '260100', Date: '17-10-2018' }],
        AmountInWords: 'εκατόν πενήντα χιλιάδων ευρώ',
        AmountInWordsCapital: 'ΕΚΑΤΟΝ ΠΕΝΗΝΤΑ ΧΙΛΙΑΔΩΝ ΕΥΡΩ',
        Invoice: [{ Number: '5', Date: '17-10-2018' }],
        Reservations: [{ eaadisi: '3.1€', stamp: '3.1€', stamp_oga: '0.1€', aepp: '3.4€', fe: '3.4€', total: '3.4€' }],
        AYY: [{ Value: 'Π00799', Year: '2018 ', ProtocolNumber: '179391', ProtocolDate: '11-7-2018', EADNumber: '487', PreviousYearValue: '', ADA: 'ΩΨ6ΡΩ6Μ-9ΩΠ' }],
        FpaValue: '24%'
      }],
      Accounts:
        [{ "number": 1, "AmountPure": 120967.74, "AmountFpa": 29032.26, "AmountTotal": 150000 }]
      ,
      DecisionBoard: [{
        Id: '2',
        Protocol: [{ Number: '866', Date: '14-6-2018' }, { Number: '959', Date: '28-6-2018' }],
        //Protocol: [{ Number: '866', Date: '14-6-2018' }]
      }],
      DecisionSADA: [{
        Protocol: [{ Number: '177724', Date: '10-7-2018' }, { Number: '209641', Date: '24-8-2018', Content: 'ως προς τον Κ.Α. του προϋπολογισμού και ως προς το λεκτικό της δαπάνης' }],
      }],
      CourtOfAuditors: [{
        Id: '3',
        Action: [{ Number: '329', Year: '2018' }],
        Scale: [{ Letter: "Z'" }],
        APDA: [{ Number: '243357', Date: '2-10-2018' }],
      }],
      Signature: [
        {
          Kaa: '',
          WriterTitle: 'Η ΣΥΝΤΑΞΑΣΑ',
          WriterName: 'ΦΩΤΕΙΝΗ ΤΣΟΤΡΑ',
          ForemanDepartmentTitle: 'Ο ΠΡΟΪΣΤΑΜΕΝΟΣ ΤΜΗΜΑΤΟΣ',
          ForemanDepartmentName: 'ΙΩΑΝΝΗΣ ΧΑΤΖΗΕΥΣΤΡΑΤΙΟΥ',
          ForemanDirectionTitle: 'Η ΠΡΟΪΣΤΑΜΕΝΗ ΔΙΕΥΘΥΝΣΗΣ',
          ForemanDirectionName: 'Δρ. ΟΥΡΑΝΙΑ Β. ΚΑΚΡΙΔΑ'
        }]
    }

    var config = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR2YXNpbGFraXMiLCJpYXQiOjE1NzE4MjU1NDQsImV4cCI6MTU3MTg1NDM0NH0.pMJJssuvGdv6bXTVKTEuINHw11rmAW83ZwEYcbf8Mdg'
      },
      responseType: 'arraybuffer'
    };

    axios.post('http://127.0.0.1:7845/getDownpaymentAccountWordDocument', dataToPost, config).then(res => {
      this.setState({ disabled: false })
      var blob = new Blob([res.data]);
      var fileName = 'Λογαριασμός 1ου Τιμολογίου.docx';
      downloadjs(blob, fileName, 'application/octet-stream');
      this.setState({ message: '', openMessage: false, variant: 'success', submitButtonDisabled: false });
    }).catch(error => {
      var msg = 'Αποτυχής προσπάθεια δημιουργίας αρχείου!' + error;
      this.setState({ message: <><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false, disabled: false });
    });
  }

  render() {

    return (
      <div>
        <button
          onClick={this.postTransmissionDocumentData.bind(this)}
          style={{ padding: '20px', background: 'lightBlue', fontSize: '16px' }}>
          Δημιουργία αρχείου διαβιβαστικού προκαταβολής
        </button>
        <button
          onClick={this.postAccountDocumentData.bind(this)}
          style={{ padding: '20px', margin: '20px', background: 'lightBlue', fontSize: '16px' }}
          disabled={this.state.disabled}>
          Δημιουργία αρχείου προκαταβολής-λογαριασμού
        </button>
        <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='right' useScreenDimensions={true} />
      </div>


    );
  }
}

export default DownpaymentTransmission;
