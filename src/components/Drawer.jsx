import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {Link} from "react-router";

export default React.createClass({
  mixins: [PureRenderMixin],
  getAccountList: function () {
    return this.props.accounts || [];
  },
  render: function () {
    return <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Title</span>
      <nav className="mdl-navigation">
        <Link className="mdl-navigation__link" to="/">Home</Link>
        {this.getAccountList().map(entry =>
          <Link key={entry.get('id')} className="mdl-navigation__link"
                to={"/account/" + entry.get('id')}>{entry.get('name')}</Link>
        )}
      </nav>
    </div>;
  }
});
