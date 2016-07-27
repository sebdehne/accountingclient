import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import Account from "./components/Account";

ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>

                <IndexRoute component={Home}/>

                <Route path="/account/:accountId" component={Account}/>
            </Route>
        </Router>),
    document.getElementById('app')
);
