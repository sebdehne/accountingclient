import React from "react";
import {connect} from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import * as actionCreators from "../action_creators";

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
    }
  },
  render: function () {
    return <h2>Loaded {this.props.transactions.transactions.length} transactions</h2>;
  }
});


function mapStateToProps(state) {
  return {
    accounts: state.get('accounts'),
    transactions: state.get('transactions', {base_amount: 0, transactions: []})
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  actionCreators
)(Account);
