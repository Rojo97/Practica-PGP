import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import CrearUsuario from '../components/CrearUsuario';
import SelectProject from '../components/SelectProject';
import ShowActivitiesDeveloper from '../components/ShowActivitiesDeveloper';
import ShowActivitiesManager from '../components/ShowActivitiesManager';
import DarAltaProyecto from '../components/DarAltaProyecto';
import AnadirPlanProyecto from '../components/AnadirPlanProyecto';
import ActivityDetail from '../components/ActivityDetail';
import ActivityDetailAndEdit from '../components/ActivityDetailAndEdit';
import ProjectDetailsManager from '../components/ProjectDetailsManager';
import ProjectsFinalized from '../components/ProjectsFinalized';
import ProjectDetailsAll from '../components/ProjectDetailsAll';
import AnadirParticipantes from '../components/AnadirParticipantes';
import AsignarActividades from '../components/AsignarActividades';
import InformesSemanales from '../components/InformesSemanales';
import InformeTiempoDedicado from '../components/InformeTiempoDedicado';

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
          <Route exact path="/developer/project/:proyecto/activities" component={ShowActivitiesDeveloper}/>
          <Route exact path="/developer/project/:proyecto/activities/:actividad" component={ActivityDetail}/>
          <Route exact path="/developer/timeDedicated" component={InformeTiempoDedicado}/>
          <Route exact path="/projectManager/project/:proyecto/activities" component={ShowActivitiesManager}/>
          <Route exact path="/projectManager/project/:proyecto/activities/:actividad" component={ActivityDetailAndEdit}/>
          <Route exact path="/projectManager/project/:proyecto" component={ProjectDetailsManager}/>
          <Route exact path="/projectManager/project/:proyecto/informes" component={InformesSemanales}/>
          <Route exact path="/projectManager/project/:proyecto/loadProjectPlan" component={AnadirPlanProyecto}/>
          <Route exact path="/projectManager/project/:proyecto/loadParticipants" component={AnadirParticipantes}/>
          <Route exact path="/projectManager/project/:proyecto/assignActivities" component={AsignarActividades}/>
          <Route exact path="/projectsFinalized" component={ProjectsFinalized}/>
          <Route exact path="/projectsFinalized/:proyecto" component={ProjectDetailsAll}/>
        </Switch>
      </div>
    );
  }
}

export default Plantilla;