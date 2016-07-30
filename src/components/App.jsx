import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";
import {fromJS} from "immutable";
import Header from "./Header";
import Drawer from "./Drawer";
import * as actionCreators from "../action_creators";

export const App = React.createClass({
  mixins: [PureRenderMixin],
  componentDidMount: function () {
    componentHandler.upgradeDom();
  },
  getPageTitle: function () {
    if (this.props.location.pathname.indexOf("/account/") === -1) {
      return "Start page"
    } else {
      return "Account - " + this.props.accounts.get(this.props.params.accountId, fromJS({name: "Unknown"})).get("name");
    }
  },
  render: function () {
    return <div className="mdl-layout--fixed-header mdl-js-layout mdl-layout">
      <Header title={this.getPageTitle()}/>
      <Drawer accounts={this.props.accounts}/>

      <main className="mdl-layout__content">
        {React.cloneElement(this.props.children)}
      </main>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    accounts: state.get('accounts')
  };
}

export const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);

