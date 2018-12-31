import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
  render() {
    return (
      <aside className="main-sidebar">
        {/* <!-- sidebar: style can be found in sidebar.less --> */}
        <section className="sidebar">
          {/* <!-- sidebar menu: : style can be found in sidebar.less --> */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">Menú</li>
            <li><Link to="/"><i className="fa fa-female"></i> <span>Login</span></Link></li>
            <li className="active treeview">
              <a href="#">
                <i className="fa fa-dashboard"></i> <span>Administrador</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li className="active"><Link to="/admin/createUser"><i className="fa fa-circle-o"></i>Crear Usuario</Link></li>
                <li className="active"><Link to="/admin/createProject"><i className="fa fa-circle-o"></i>Crear Proyecto</Link></li>
              </ul>
            </li>
            <li className="active treeview">
              <a href="#">
                <i className="fa fa-dashboard"></i> <span>Desarrollador</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li className="active"><Link to="/developer/selectProject"><i className="fa fa-circle-o"></i>Seleccionar proyecto</Link></li>
                <li className="active"><Link to="/developer/project/ProyectoA/activities"><i className="fa fa-circle-o"></i>Ver actividades</Link></li>
                <li className="active"><Link to="/developer/activity/1"><i className="fa fa-circle-o"></i>Actividad</Link></li>
              </ul>
            </li>
            <li className="active treeview">
              <a href="#">
                <i className="fa fa-dashboard"></i> <span>Jefe de proyecto</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
              <ul className="treeview-menu">
                <li className="active"><Link to="/projectManager/project/ProyectoA/activities"><i className="fa fa-circle-o"></i>Ver actividades</Link></li>
              </ul>
            </li>
            <li><a href="https://adminlte.io/docs"><i className="fa fa-book"></i> <span>Documentation</span></a></li>
          </ul>
        </section>
      </aside>
    )
  }
}