import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {fromJS} from "immutable";
import {fetchAccounts, fetchCategories, fetchPayees} from "./api";
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

fetchAccounts(json => {
  store.dispatch({type: 'SET_ACCOUNTS', data: fromJS(json)});

  fetchPayees(json => {
    store.dispatch({type: 'SET_PARTIES', data: fromJS(json)});

    fetchCategories(json => {
      store.dispatch({type: 'SET_CATEGORIES', data: fromJS(json)});

      start();
    });
  });
});