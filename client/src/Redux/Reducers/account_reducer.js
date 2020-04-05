export default function (state = {}, action) {
  
  switch (action.type) {
    case 'RESET_ACTION':
      console.log('RESET_ACTION')
      state = {}
      break;
    case 'GET_ACCOUNT_PENDING':
      state = { ...state, accountPending: 'Account pending', accountRejected: undefined, account: undefined };
      break;
    case 'GET_ACCOUNT_FULFILLED':
      state = { ...state, accountPending: undefined, accountRejected: undefined, account: action.payload };
      break;
    case 'GET_ACCOUNT_REJECTED':
      state = { ...state, accountPending: undefined, accountRejected: action.payload };
      break;    
    default:
      break;
  }

  return state;
}