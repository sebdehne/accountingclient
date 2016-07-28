import {setTransactions} from "./action_creators";

export default store => next => action => {

  switch (action.type) {
    case 'LOAD_TRANSACTIONS':
      fetch('/accounting/v1/account/' + action.accountId + '/transactions')
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          store.dispatch(setTransactions(json))
        })
        .catch(function (ex) {
          console.log('parsing failed', ex)
        });
  }

  console.log('in middleware', action);
  return next(action);
}