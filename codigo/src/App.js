import React, { Component } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";
import Login from './pagesScript/Login';
import Plantilla from './pagesScript/Plantilla';
class App extends Component {
    render() {
        return (
            <Switch> {/*Si la url es / redirige a login */}
                <Route exact path="/" component={Login} />
                <Route component={Plantilla} />
            </Switch>
        );
    }
}

export default App;
