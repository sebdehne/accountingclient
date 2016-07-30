import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {Link} from "react-router";
import {Map} from "immutable";

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function () {
    return <div className="mdl-layout__drawer">
      <span className="mdl-layout-title">Title</span>
      <nav className="mdl-navigation">
        <Link className="mdl-navigation__link" to="/">Home</Link>
        {(this.props.accounts || Map()).toArray().map(entry =>
          <Link key={entry.get('id')} className="mdl-navigation__link"
                to={"/account/" + entry.get('id')}>{entry.get('name')}</Link>
        )}
      </nav>
    </div>;
  }
});
