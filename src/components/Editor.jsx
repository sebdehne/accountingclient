import React from "react";
import {connect} from "react-redux";
import PureRenderMixin from "react-addons-pure-render-mixin";
import * as actionCreators from "../action_creators";
import {fromJS} from "immutable";

export const Editor = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return <div onDoubleClick={() => this.props.closeEditor(this.props.tx.get('id'))}>Editor!</div>;
  }
});


function mapStateToProps(state) {
  return {
    transactions: state.get('transactions', fromJS({base_amount: 0, transactions: []})),
    loadingState: {loading: false}
  };
}

export const EditorContainer = connect(
  mapStateToProps,
  actionCreators
)(Editor);
