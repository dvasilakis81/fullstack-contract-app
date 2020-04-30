import store from '../Store/store';
import cr from './contracts_reducer';
export default function (state = {}, action) {
  switch (action.type) {
    case 'RESET_ACTION':
      state = {}
      break;
    
    default:
      break;
  }

  return state;
}