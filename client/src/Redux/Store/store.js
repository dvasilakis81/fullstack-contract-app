import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxPromiseMiddleware from 'redux-promise-middleware'
import RootReducer from '../Reducers/index'
// import parametricdata_reducer from '../Reducers/parametricdata_reducer';
// import contracts_reducer from '../Reducers/contracts_reducer';
// import account_reducer from '../Reducers/account_reducer';
// import token_reducer from '../Reducers/token_reducer';
//import promiseMiddleware from 'redux-promise';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

// const store = createStore(combineReducers({ parametricdata_reducer, contracts_reducer, account_reducer, token_reducer }), persistedState, applyMiddleware(reduxPromiseMiddleware, logger));
//const store = createStore(combineReducers({ parametricdata_reducer, contracts_reducer, account_reducer, token_reducer }), persistedState, applyMiddleware(reduxPromiseMiddleware));
const store = createStore(RootReducer, persistedState, applyMiddleware(reduxPromiseMiddleware));

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;