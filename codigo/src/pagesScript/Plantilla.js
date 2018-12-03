import React, { Component } from 'react';
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
        {/* TODO switch de redirecciones en content */}
        {/* <Content /> */}
        <CrearUsuario/>
      </div>
    );
  }
}

export default Plantilla;