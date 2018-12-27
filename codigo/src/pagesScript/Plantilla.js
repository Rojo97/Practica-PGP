import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';
import CrearUsuario from '../components/CrearUsuario';
import selectProject from '../components/SelectProject';

class Plantilla extends Component {
  render() {
    return (
      <div class="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/createUser" component={CrearUsuario} />
          <Route exact path="/createProject" component={Content} />
          <Route exact path="/selectProject" component={selectProject}/>
        </Switch>
      </div>
    );
  }
}

export default Plantilla;