import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {fromJS} from "immutable";
import reducer from "./reducer";
import {AppContainer} from "./components/App";
import Home from "./components/Home";
import Account from "./components/Account";
import "whatwg-fetch";

const store = createStore(reducer);
store.dispatch({
  type: 'SET_STATE',
  state: {
    accounts: fromJS([])
  }
});

fetch('/accounting/v1/accounts').then(function (response) {
  return response.json()
}).then(function (json) {
  store.dispatch({type: 'SET_STATE', state: {accounts: fromJS(json)}})
}).catch(function (ex) {
  console.log('parsing failed', ex)
});

ReactDOM.render((
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={AppContainer}>

          <IndexRoute component={Home}/>

          <Route path="/account/:accountId" component={Account}/>
        </Route>
      </Router>
    </Provider>),
  document.getElementById('app')
);
