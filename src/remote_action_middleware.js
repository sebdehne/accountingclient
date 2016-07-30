import {setTransactions} from "./action_creators";
import {fetchJson} from "./api";

export default store => next => action => {

  switch (action.type) {

    case 'LOAD_TRANSACTIONS':
      fetchJson('/accounting/v1/account/' + action.accountId + '/transactions?limit=20', function (json) {
        store.dispatch(setTransactions(json, action.replaceAll))
      });
  }

  console.log('in middleware', action);
  return next(action);
}