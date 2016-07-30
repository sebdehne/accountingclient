import React from "react";
import {connect} from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import * as actionCreators from "../action_creators";
import {TransactionRowContainer} from "./TransactionRow";

export const Account = React.createClass({
  mixins: [PureRenderMixin],
  loadTransaction: function () {
    this.props.loadTransactions(this.props.params.accountId)
  },
  componentDidMount: function () {
    // fetch transactions now
    this.loadTransaction();
  },
  componentDidUpdate: function (prevProps) {
    if (prevProps.params.accountId !== this.props.params.accountId) {
      this.loadTransaction();
      window.scrollTo(0,document.body.scrollHeight);
    }
  },
  render: function () {
    return <div>
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col"></div>
      </div>
      {this.props.transactions.transactions.map(tx =>
        <TransactionRowContainer key={tx.id} tx={tx}/>
      )}
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col"></div>
      </div>
    </div>;
  }
});


function mapStateToProps(state) {
  return {
    transactions: state.get('transactions', {base_amount: 0, transactions: []}),
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  actionCreators
)(Account);
