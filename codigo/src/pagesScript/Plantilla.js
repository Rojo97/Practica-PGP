import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';
import CrearUsuario from '../components/CrearUsuario';
import SelectProject from '../components/SelectProject';
import ShowActivitiesDeveloper from '../components/ShowActivitiesDeveloper';
import ShowActivitiesManager from '../components/ShowActivitiesManager';

class Plantilla extends Component {
  render() {
    return (
      <div className="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/admin/createUser" component={CrearUsuario} />
          <Route exact path="/admin/createProject" component={Content} />
          <Route exact path="/developer/selectProject" component={SelectProject}/>
          <Route exact path="/developer/project/:nombre/activities" component={ShowActivitiesDeveloper}/>
          <Route exact path="/projectManager/project/:nombre/activities" component={ShowActivitiesManager}/>
        </Switch>
      </div>
    );
  }
}

export default Plantilla;