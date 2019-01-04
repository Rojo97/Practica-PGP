import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import CrearUsuario from '../components/CrearUsuario';
import SelectProject from '../components/SelectProject';
import ShowActivitiesDeveloper from '../components/ShowActivitiesDeveloper';
import ShowActivitiesManager from '../components/ShowActivitiesManager';
import DarAltaProyecto from '../components/DarAltaProyecto';
<<<<<<< HEAD
import AnadirPlanProyecto from '../components/AnadirPlanProyecto';
=======
import ActivityDetail from '../components/ActivityDetail';
import ActivityDetailAndEdit from '../components/ActivityDetailAndEdit';
>>>>>>> origin/develop

class Plantilla extends Component {
  render() {
    return (
      <div className="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/admin/createUser" component={CrearUsuario} />
          <Route exact path="/admin/createProject" component={DarAltaProyecto} />
          <Route exact path="/developer/selectProject" component={SelectProject}/>
          <Route exact path="/developer/project/:nombre/activities" component={ShowActivitiesDeveloper}/>
          <Route exact path="/developer/activity/:nombre" component={ActivityDetail}/>
          <Route exact path="/projectManager/project/:nombre/activities" component={ShowActivitiesManager}/>
<<<<<<< HEAD
          <Route exact path="/projectManager/project/:nombre/loadProyectPlan" component={AnadirPlanProyecto}/>
=======
          <Route exact path="/projectManager/activity/:nombre" component={ActivityDetailAndEdit}/>
>>>>>>> origin/develop
        </Switch>
      </div>
    );
  }
}

export default Plantilla;