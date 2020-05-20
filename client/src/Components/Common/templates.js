import React from 'react'
import './template.css'
import { getFooterHeight, getDateFormat, tokenExpiresAt } from '../../Helper/helpermethods';
import Header from "../Header/header";

export function getFailedConnectionWithServer() {
  return showGenericMessage('Αποτυχία σύνδεσης με τον διακομιστή!', true)
}


export function showErrorMessageFromServer(error) {
  return showGenericMessage(error, true, false)
}

export function showGenericMessage(errorMessage, isError, hasHeader) {
  var className = isError ? 'centered errormessage' : 'centered infomessage'

  return (<div style={{ width: '100%', height: '100%', position: 'relative' }}>
    {hasHeader === true ? <Header
      title="Διαβίβαση παρασταστικών κ' δικαιολογητικών για ενταλματοποίηση της δαπάνης"
      showAdministrationOption={false}
      showNewContractOption={false} /> : <></>}
    <div className={className}>
      {errorMessage}
    </div>
  </div>)
}

export function getFooterTemplate(token) {
  //'#03ebfc'

  return <div style={{ display: 'flex', flexFlow: 'row', backgroundColor: '#dddddd', height: getFooterHeight() }}>
    <div style={{ display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: '1', justifyContent: 'flex-start', marginRight: '30px' }}>
      <span style={{ fontWeight: '900', paddingTop: '5px' }}>{tokenExpiresAt(token)}</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', flexBasis: '100%', flex: '1', justifyContent: 'flex-end', marginRight: '30px' }}>
      <span style={{ fontWeight: '900', paddingTop: '5px' }}>{getDateFormat(new Date())} Δήμος Αθηναίων</span>
    </div>
  </div>
}