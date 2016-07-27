import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
    mixins: [PureRenderMixin],
    getAccount: function () {
        var result = {id: '', name: 'Unknown account'}

        for (let account of this.props.accounts) {
            if (this.props.params.accountId === account.id) {
                result = account;
            }
        }

        return result
    },
    render: function () {
        return <h2>In Account</h2>;
    }
});
