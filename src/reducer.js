import {fromJS} from "immutable";
import "whatwg-fetch";

export default function (state = fromJS({accounts: []}), action) {
  switch (action.type) {
    case 'SET_ACCOUNTS':
      return state.set('accounts', action.accounts);
    case 'SET_TRANSACTIONS':
      return state.set('transactions', action.transactions)
  }
  return state;
}
