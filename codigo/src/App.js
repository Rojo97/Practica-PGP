import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './pagesScript/Login';
import Plantilla from './pagesScript/Plantilla';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/plantilla" component={Plantilla} />
            </Switch>
        );
    }
}

export default App;
