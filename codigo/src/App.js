import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './pagesScript/Login';
import Plantilla from './pagesScript/Plantilla';
import CrearUsuario from './pagesScript/CrearUsuario';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Plantilla} />
                <Route exact path="/plantilla" component={Plantilla} />
            </Switch>
        );
    }
}

export default App;
