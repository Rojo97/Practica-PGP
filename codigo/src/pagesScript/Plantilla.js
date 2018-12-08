import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from '../components/Header';
import Sidebar from '../components/SideBar';
import Content from '../components/Content';
import CrearUsuario from './CrearUsuario';
import DarAltaProyecto from './DarAltaProyecto';

class Plantilla extends Component {
  render() {
    return (
      <div class="hold-transition skin-purple sidebar-mini">
        <Header />
        <Sidebar />
        <DarAltaProyecto />
      </div>
    );
  }
}

export default Plantilla;