import {setTransactions} from "./action_creators";
import {fetchJson} from "./api";

const pageSize = 20;

export default store => next => action => {

  switch (action.type) {
    case 'LOAD_NEXT_TRANSACTIONS':
      fetchJson('/accounting/v1/account/' + action.accountId + '/transactions?limit=' + pageSize + '&offset=' + action.offset, function (json) {
        store.dispatch(setTransactions(json, action.offset === 0));

        if (action.whenDone) {
          action.whenDone();
        }
      });
      break;
  }

  console.log('in middleware', action);
  return next(action);
}