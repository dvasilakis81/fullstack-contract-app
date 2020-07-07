export default function (state = {}, action) {

  switch (action.type) {
    case 'RESET_ACTION':
      state = {}
      break;
    case 'GET_ACCOUNT_PENDING':
      state = { ...state, getAccountPending: 'Account pending', getAccountRejected: undefined, account: undefined };
      break;
    case 'GET_ACCOUNT_REJECTED':
      state = { ...state, getAccountPending: undefined, getAccountRejected: action.payload, account: undefined };
      break;
    case 'GET_ACCOUNT_FULFILLED':
      state = { ...state, getAccountPending: undefined, getAccountRejected: undefined, account: action.payload };
      break;
    case 'RESET_UPDATE_ACCOUNT':
      state = { ...state, updateAccountPending: undefined, updateAccountRejected: undefined };
      break;
    case 'UPDATE_ACCOUNT_PENDING':
      state = { ...state, updateAccountPending: 'Update account pending', updateAccountRejected: undefined };
      break;
    case 'UPDATE_ACCOUNT_REJECTED':
      state = { ...state, updateAccountPending: undefined, updateAccountRejected: action.payload, account: undefined };
      break;
    case 'UPDATE_ACCOUNT_FULFILLED':
      state = { ...state, updateAccountPending: undefined, updateAccountRejected: undefined, account: action.payload.data };
      break;
    default:
      break;
  }

  return state;
}