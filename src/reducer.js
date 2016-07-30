import {fromJS, Map, OrderedMap} from "immutable";
import "whatwg-fetch";

export default function (state = fromJS({accounts: []}), action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return state.set('transactions', action.data);
    case 'SET_ACCOUNTS':
      return state.set('accounts', toOrderedMapById(action.data));
    case 'SET_PARTIES':
      return state.set('parties', toMapById(action.data));
    case 'SET_CATEGORIES':
      return state.set('categories', toMapById(action.data));
  }
  return state;
}

function toMapById(someList) {
  var result = Map();
  someList.forEach(item => {
    result = result.set(item.get('id'), item);
  });
  return result;
}

function toOrderedMapById(someList) {
  var result = OrderedMap();
  someList.forEach(item => {
    result = result.set(item.get('id'), item);
  });
  return result;
}