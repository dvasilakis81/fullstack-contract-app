import axios from 'axios';
import { getHostUrl } from '../../Helper/helpermethods';

const URL = getHostUrl();

export function getContracts(tokenData, offset, limit) {
  const request = axios.get(`${URL}/contracts?loginuserid=` + tokenData.id + '&offset=' + offset + '&limit=' + limit, { headers: { Authorization: 'Bearer ' + tokenData.token } })
    .then(response => response.data)
  return { type: 'GET_CONTRACTS', payload: request }
}

export function searchContracts(tokenData, filter) {
  const request = axios.get(`${URL}/searchcontracts?filter=` + filter + '&loginuserid=' + tokenData.id, { headers: { Authorization: 'Bearer ' + tokenData.token } })
    .then(response => response.data)
  return {
    type: 'SEARCH_CONTRACTS',
    payload: request
  }
}

// export function deleteContract(tokenData) {
//   const request = axios.get(`${URL}/contracts?loginuserid=` + tokenData.id + '&offset=' + offset + '&limit=' + limit, { headers: { Authorization: 'Bearer ' + tokenData.token } })
//     .then(response => response.data)
//   return { type: 'GET_CONTRACTS', payload: request }
// }

export function deleteContract(data, token) {

  const request = axios.post(`${URL}/deletecontract`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'DELETE_CONTRACT',
    payload: request
  }
}


export function getAccount(token, contractId, accountNumber) {
  const request = axios.get(`${URL}/account?ci=` + contractId + '&an=' + accountNumber, { headers: { Authorization: 'Bearer ' + token } }).then(response => response.data)

  return {
    type: 'GET_ACCOUNT',
    payload: request
  }
}

export function login(username, password) {
  var url = `${URL}/login?u=` + username + '&p=' + password;
  const request = axios.get(url)
  return {
    type: 'GET_TOKEN_JWT',
    payload: request
  }
}

export function updateUser(data) {

  const request = axios.post(`${URL}/updateuser`, data)
  return {
    type: 'UPDATE_USER',
    payload: request
  }
}

export function createAccount(data, token) {

  const request = axios.post(`${URL}/insertaccount`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'INSERT_ACCOUNT',
    payload: request
  }
}

export function updateAccount(data, token) {

  const request = axios.post(`${URL}/updateaccount`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'UPDATE_ACCOUNT',
    payload: request
  }
}

export function processContractInfo(data, token, command) {

  if (command.startsWith('insert')) {
    const request = axios.post(`${URL}/` + command, data, { headers: { Authorization: 'Bearer ' + token } })
    return {
      type: 'INSERT_CONTRACTINFO',
      payload: request
    }
  }
  else if (command.startsWith('update')) {
    const request = axios.post(`${URL}/` + command, data, { headers: { Authorization: 'Bearer ' + token } })
    return {
      type: 'UPDATE_CONTRACTINFO',
      payload: request
    }
  }
  else if (command.startsWith('delete')) {
    const request = axios.post(`${URL}/` + command, data, { headers: { Authorization: 'Bearer ' + token } })
    return {
      type: 'DELETE_CONTRACTINFO',
      payload: request
    }
  }
}

export function createCourtOfAuditors(data, token) {

  const request = axios.post(`${URL}/insertcourtofauditors`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'INSERT_CONTRACTINFO',
    payload: request
  }
}

export function updateCourtOfAuditors(data, token) {

  const request = axios.post(`${URL}/updatecourtofauditors`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'UPDATE_CONTRACTINFO',
    payload: request
  }
}

export function deleteCourtOfAuditors(data, token) {

  const request = axios.post(`${URL}/deletecourtofauditors`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'DELETE_CONTRACTINFO',
    payload: request
  }
}

export function getCCFromPreviousAccount(data, token) {

  const request = axios.post(`${URL}/getccfrompreviousaccount`, data, { headers: { Authorization: 'Bearer ' + token } })
  return {
    type: 'GET_CC_PREVIOUS_ACCOUNT',
    payload: request
  }
}




