import React from "react";
import {List} from "immutable";
import Header from './Header'
import Drawer from './Drawer'

const accounts = List.of({
    id: 'acct1',
    name: 'Regningskonto'
}, {
    id: 'acct2',
    name: 'Felles sparekonto'
});

export default React.createClass({
    render: function () {
        return <div className="mdl-layout--fixed-header mdl-js-layout mdl-layout">
            <Header/>
            <Drawer accounts={accounts}/>

            <main className="mdl-layout__content">
                <div className="page-content">
                    {React.cloneElement(this.props.children, {accounts: accounts})}
                </div>
            </main>
        </div>;
    }
});
