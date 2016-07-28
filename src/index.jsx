import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {fromJS} from "immutable";
import reducer from "./reducer";
import remoteActionMiddleware from "./remote_action_middleware";
import {AppContainer} from "./components/App";
import Home from "./components/Home";
import {AccountContainer} from "./components/Account";
import "whatwg-fetch";


const store = applyMiddleware(remoteActionMiddleware)(createStore)(reducer);

function start() {
  ReactDOM.render((
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={AppContainer}>

            <IndexRoute component={Home}/>

            <Route path="/account/:accountId" component={AccountContainer}/>
          </Route>
        </Router>
      </Provider>),
    document.getElementById('app'));
}

fetch('/accounting/v1/accounts')
  .then(function (response) {
    return response.json()
  })
  .then(function (json) {
    store.dispatch({type: 'SET_ACCOUNTS', accounts: fromJS(json)});

    start();
  })
  .catch(function (ex) {
    console.log('parsing failed', ex)
  });

