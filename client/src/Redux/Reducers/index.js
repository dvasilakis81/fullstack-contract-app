import { combineReducers } from 'redux';
import parametricdata_reducer from './parametricdata_reducer';
import contracts_reducer from './contracts_reducer';
import account_reducer from './account_reducer';
import token_reducer from './token_reducer';

const rootReducer = combineReducers({
  contracts_reducer,
  parametricdata_reducer,
  account_reducer,
  token_reducer
})

export default rootReducer;