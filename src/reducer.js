import {fromJS, Map, OrderedMap, List} from "immutable";
import "whatwg-fetch";

export default function (state = fromJS({accounts: []}), action) {
  switch (action.type) {

    case 'SET_TRANSACTIONS':
      if (action.replaceAll) {
        state = state.delete('transactions');
      }

      var inData = fromJS(action.data);
      var existing = state.get('transactions', Map());

      // prepend the next page of transactions in front of the existing
      var txs = existing.get('transactions', List());
      txs = fromJS(inData.get('transactions')).concat(txs);

      inData = inData.set('transactions', txs);
      inData = inData.set('next_offset', txs.size);

      return state.set('transactions', inData);

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