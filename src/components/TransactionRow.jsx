import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {Map, fromJS} from "immutable";
import {connect} from "react-redux";
import * as actionCreators from "../action_creators";
import {amountToString, unixTimestampToDateString} from "../formaters";

export const TransactionRow = React.createClass({
  mixins: [PureRenderMixin],
  getTitle: function () {
    var unknown = fromJS({
      id: "unknown",
      name: "unknown"
    });

    var result = "";
    if (this.props.tx.get('amount') > 0) {
      result += "Fra: ";
    } else {
      result += "Til: ";
    }

    if (this.props.tx.get('remote_account_id')) {
      result += this.props.accounts.get(this.props.tx.get('remote_account_id'), unknown).get('name');
    } else {
      result += this.props.parties.get(this.props.tx.get('remote_party_id'), unknown).get('name');
    }

    return result;
  },
  getCategory: function (catId) {
    return this.props.categories.get(catId, fromJS({name: ""})).get("name");
  },
  genId: function () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16);
  },
  render: function () {
    return <div className="tx-row">

      <div className="tx-side-space-right"/>

      <div className="tx-center-phone">phone</div>

      <div className="tx-center-large">

        <div className="tx-center-large tx-sub-row">
          <div className="tx-date-large tx-field ">{unixTimestampToDateString(this.props.tx.get('date'))}</div>
          <div className="tx-payee-large tx-field">{this.getTitle()}</div>
          <div className="tx-amount-large tx-field amount">{amountToString(this.props.tx.get('amount'))}</div>
          <div className="tx-saldo-large tx-field amount">{amountToString(this.props.tx.get('account_balance'))}</div>
        </div>

        {this.props.tx.get('details').map(split =>
          <div key={this.props.tx.get('id') + "-" + this.genId()} className="tx-center-large tx-sub-row">
            <div className="tx-category-large tx-field">{this.getCategory(split.get('category_id'))}</div>
            <div className="tx-memo-large tx-field">{split.get('description', "")}</div>
            <div className="tx-split-amount-large tx-field amount">{amountToString(split.get('amount'))}</div>
            <div className="tx-saldo-large tx-field-space"></div>
          </div>
        )}

      </div>

      <div className="tx-side-space-right"/>

    </div>;
  }
});

function mapStateToProps(state) {
  return {
    parties: state.get('parties', Map()),
    categories: state.get('categories', Map()),
    accounts: state.get('accounts', Map()),
  };
}

export const TransactionRowContainer = connect(
  mapStateToProps,
  actionCreators
)(TransactionRow);
