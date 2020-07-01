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
    default:
      break;
  }

  return state;
}