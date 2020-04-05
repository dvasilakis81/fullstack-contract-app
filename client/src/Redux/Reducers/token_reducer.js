export default function (state = {}, action) {

  switch (action.type) {
    case 'RESET_ACTION':
      state = {}
      break;
    case 'GET_TOKEN_JWT_PENDING':      
       console.log('TOKEN_REDUCER: GET_TOKEN_JWT_PENDING')
      state = { ...state, tokenPending: 'token pending', tokenRejected: undefined, token: undefined };
      break;
    case 'GET_TOKEN_JWT_FULFILLED':      
      console.log('TOKEN_REDUCER: GET_TOKEN_JWT_FULFILLED')
      state = { ...state, tokenPending: undefined, tokenRejected: undefined, token: action.payload };
      break;
    case 'GET_TOKEN_JWT_REJECTED':      
      console.log('TOKEN_REDUCER: GET_TOKEN_JWT_REJECTED')
      state = { ...state, tokenPending: undefined, tokenRejected: action.payload };
      break;
    case 'RESET_TOKEN_JWT_REJECTED':
      console.log('TOKEN_REDUCER: RESET_TOKEN_JWT_REJECTED')
      state = { ...state, tokenPending: undefined, tokenRejected: action.payload };
      break;    
    default:      
      break;
  }

  return state;
}