import {fromJS, Map, OrderedMap, List} from "immutable";
import "whatwg-fetch";

export default function (state = fromJS({accounts: []}), action) {
  switch (action.type) {

    case 'SET_TRANSACTIONS':
      if (action.replaceAll) {
        state = state.delete('transactions');
      }
      var txs = state.get('transactions', Map()).get('transactions', List());
      txs = txs.concat(fromJS(action.data.transactions));
      return state.set('transactions', Map.of('base_amount', action.data.base_amount, 'transactions', txs));

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