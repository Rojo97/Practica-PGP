import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';
import CrearUsuario from '../components/CrearUsuario';
import SelectProject from '../components/SelectProject';
import ShowActivity from '../components/ShowActivity';

class Plantilla extends Component {
  render() {
    return (
      <div className="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/createUser" component={CrearUsuario} />
          <Route exact path="/createProject" component={Content} />
          <Route exact path="/selectProject" component={SelectProject}/>
          <Route exact path="/proyecto/:nombre/actividades" component={ShowActivity}/>
        </Switch>
      </div>
    );
  }
}

export default Plantilla;