import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        return <div className="tx-row">

            <div className="tx-side-space tx-column debug-border" style={{float:'left'}}>side-space</div>
            <div>center</div>
            <div className="tx-side-space tx-column debug-border" style={{float:'right'}}>side-space</div>

        </div>;
    }
});