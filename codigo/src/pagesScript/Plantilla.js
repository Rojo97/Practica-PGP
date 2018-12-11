import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';
import CrearUsuario from './CrearUsuario';

class Plantilla extends Component {
  render() {
    return (
      <div class="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/plantilla/createUser" component={CrearUsuario} />
          <Route exact path="/plantilla/createProject" component={Content} />
        </Switch>
      </div>
    );
  }
}

export default Plantilla;