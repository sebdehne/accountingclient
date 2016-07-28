import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";
import Header from "./Header";
import Drawer from "./Drawer";

export const App = React.createClass({
  mixins: [PureRenderMixin],
  getAccountName: function (accountId) {
    for (let account of this.props.accounts) {
      if (account.get('id') === accountId) {
        return account.get('name');
      }
    }
    return "Unknown"
  },
  getPageTitle: function () {
    if (this.props.location.pathname.indexOf("/account/") === -1) {
      return "Start page"
    } else {
      return "Account - " + this.getAccountName(this.props.params.accountId)
    }
  },
  render: function () {
    return <div className="mdl-layout--fixed-header mdl-js-layout mdl-layout">
      <Header title={this.getPageTitle()}/>
      <Drawer accounts={this.props.accounts}/>

      <main className="mdl-layout__content">
        <div className="page-content">
          {React.cloneElement(this.props.children, {accounts: this.props.accounts})}
        </div>
      </main>
    </div>;
  }
});

function mapStateToProps(state) {
  return {
    accounts: state.get('accounts')
  };
}

export const AppContainer = connect(mapStateToProps)(App);

