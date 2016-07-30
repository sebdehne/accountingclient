import React from "react";
import {connect} from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import * as actionCreators from "../action_creators";
import {TransactionRowContainer} from "./TransactionRow";
import $ from "jquery";
import {fromJS} from "immutable";

export const Account = React.createClass({
  mixins: [PureRenderMixin],

  loadMoreTransactions: function (accountSwitched, whenDone) {
    this.props.loadingState.loading = true;

    var offset = this.props.transactions.get('next_offset', 0);
    if (accountSwitched) {
      offset = 0;
    }

    var that = this;
    this.props.loadTransactions(this.props.params.accountId, offset, function () {
      that.props.loadingState.loading = false;
      if (whenDone) {
        whenDone();
      }
    });
  },

  componentDidMount: function () {
    // install scroll listener
    var mainDiv = $('.mdl-layout__content');
    var that = this;
    mainDiv.on("scroll", function () {
      if (!that.props.loadingState.loading && mainDiv.scrollTop() < 100 && that.props.transactions.get('skipped_transactions')) {
        console.log("Need to load more!!!!");
        that.loadMoreTransactions(false);
      }
    });

    // fetch first transactions now
    this.loadMoreTransactions(true, function () {
      // transactions for new account loaded, scroll down
      var mainDiv = $(".mdl-layout__content");
      mainDiv.scrollTop(mainDiv.height() + document.body.scrollWidth);
    });
  },

  componentWillUnmount: function () {
    $('.mdl-layout__content').off("scroll")
  },

  componentDidUpdate: function (prevProps) {
    if (prevProps.params.accountId !== this.props.params.accountId) {
      this.loadMoreTransactions(true);
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
    loadingState: {loading: false}
  };
}

export const AccountContainer = connect(
  mapStateToProps,
  actionCreators
)(Account);
