import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
    mixins: [PureRenderMixin],
    render: function () {
        return <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">{this.props.title}</span>
                <div className="mdl-layout-spacer"></div>
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                    <a className="mdl-navigation__link" href="">Link</a>
                </nav>
            </div>
        </header>;
    }
});
