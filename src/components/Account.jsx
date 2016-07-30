import React from "react";
import {connect} from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import * as actionCreators from "../action_creators";
import {TransactionRowContainer} from "./TransactionRow";
import $ from "jquery";
import {fromJS} from "immutable";

export const Account = React.createClass({
  mixins: [PureRenderMixin],
  switchAccount: function (replaceAll) {
    this.props.scrollState.isNewPage = true;
    this.props.loadTransactions(this.props.params.accountId, replaceAll)
  },
  componentDidMount: function () {
    // fetch transactions now
    this.switchAccount(true);
  },
  componentDidUpdate: function (prevProps) {
    if (prevProps.params.accountId !== this.props.params.accountId) {
      this.switchAccount(true);
    }

    // transactions for new account loaded, scroll down
    if (this.props.scrollState.isNewPage) {
      var mainDiv = $(".mdl-layout__content");
      mainDiv.scrollTop(mainDiv.height() + document.body.scrollWidth);
      this.props.scrollState.isNewPage = false;
    }
  },
  render: function () {
    return <div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col"></div>
      </div>
      {this.props.transactions.get('transactions').map(tx =>
        <TransactionRowContainer key={tx.get('id')} tx={tx}/>
      )}
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col"></div>
      </div>
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    transactions: state.get('transactions', fromJS({base_amount: 0, transactions: []})),
    scrollState: {isNewPage: true}
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  actionCreators
)(Account);
