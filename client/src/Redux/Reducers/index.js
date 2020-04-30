import { combineReducers } from 'redux';
import parametricdata_reducer from './parametricdata_reducer';
import contracts_reducer from './contracts_reducer';
import account_reducer from './account_reducer';
import token_reducer from './token_reducer';

const RootReducer = combineReducers({
  parametricdata_reducer,
  contracts_reducer,  
  account_reducer,
  token_reducer
})
export default RootReducer;

// export default (state = {}, action) => {
//   return {
//     parametricdata_reducer: parametricdata_reducer({}, action, state),
//     contracts_reducer: contracts_reducer({}, action, state),
//     decisionboard_reducer: decisionboard_reducer({}, action, state),
//     account_reducer: account_reducer({}, action, state),
//     token_reducer: token_reducer({}, action, state),
//   };
// };