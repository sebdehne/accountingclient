import React from "react";
import {List} from "immutable";
import Header from "./Header";
import Drawer from "./Drawer";

const accounts = List.of({
  id: 'acct1',
  name: 'Regningskonto'
}, {
  id: 'acct2',
  name: 'Felles sparekonto'
});

export default React.createClass({
  getAccountName: function (accountId) {
    for (let account of accounts) {
      if (account.id === accountId) {
        return account.name;
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
      <Drawer accounts={accounts}/>

      <main className="mdl-layout__content">
        <div className="page-content">
          {React.cloneElement(this.props.children, {accounts: accounts})}
        </div>
      </main>
    </div>;
  }
});
