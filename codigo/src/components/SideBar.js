import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
  render() {
    return (
      <aside class="main-sidebar">
        {/* <!-- sidebar: style can be found in sidebar.less --> */}
        <section class="sidebar">
          {/* <!-- sidebar menu: : style can be found in sidebar.less --> */}
          <ul class="sidebar-menu" data-widget="tree">
            <li class="header">Menú</li>
            <li><Link to="/"><i class="fa fa-female"></i> <span>Login</span></Link></li>
            <li class="active treeview">
              <a href="#">
                <i class="fa fa-dashboard"></i> <span>Administrador</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li class="active"><Link to="/createUser"><i class="fa fa-circle-o"></i>Crear Usuario</Link></li>
                <li class="active"><Link to="/createProject"><i class="fa fa-circle-o"></i>Crear Proyecto</Link></li>
              </ul>
            </li>
            <li class="active treeview">
              <a href="#">
                <i class="fa fa-dashboard"></i> <span>Desarrollador</span>
                <span class="pull-right-container">
                  <i class="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul class="treeview-menu">
                <li class="active"><Link to="/selectProject"><i class="fa fa-circle-o"></i>Seleccionar proyecto</Link></li>
              </ul>
            </li>
            <li><a href="https://adminlte.io/docs"><i class="fa fa-book"></i> <span>Documentation</span></a></li>
          </ul>
        </section>
      </aside>
    )
  }
}