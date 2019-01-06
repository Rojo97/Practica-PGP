import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      proyecto: '',
      tipoUser: ''
    }
  }

  componentDidMount() {
    this.setState({ user: window.sessionStorage.getItem('user') });
    this.setState({ tipoUser: window.sessionStorage.getItem('tipoUser') });
    this.setState({ proyecto: window.sessionStorage.getItem('proyecto') });
  }

  render() {
    let links;
    if (this.state.tipoUser == 0) {
      links =
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
    } else if (this.state.tipoUser == 1) {
      links =
        <li className="active treeview">
          <a href="#">
            <i className="fa fa-dashboard"></i> <span>Jefe de proyecto</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li className="active"><Link to={"/projectManager/project/"+this.state.proyecto}><i className="fa fa-circle-o"></i>Detalles del proyecto</Link></li>
            <li className="active"><Link to={"/projectManager/project/"+this.state.proyecto+"/activities"}><i className="fa fa-circle-o"></i>Ver actividades</Link></li>
            <li className="active"><Link to={"/projectManager/project/"+this.state.proyecto+"/informes"}><i className="fa fa-circle-o"></i>Informes sin aprobar</Link></li>
          </ul>
        </li>
    } else if (this.state.tipoUser == 2) {
      links =
        <li className="active treeview">
          <a href="#">
            <i className="fa fa-dashboard"></i> <span>Desarrollador</span>
            <span className="pull-right-container">
              <i className="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul className="treeview-menu">
            <li className="active"><Link to="/developer/selectProject"><i className="fa fa-circle-o"></i>Seleccionar proyecto</Link></li>
            <li className="active"><Link to={"/developer/project/"+this.state.proyecto+"/activities"}><i className="fa fa-circle-o"></i>Ver actividades</Link></li>
            <li className="active"><Link to="/developer/timeDedicated"><i className="fa fa-circle-o"></i>Ver informes</Link></li>
          </ul>
        </li>
    }
    return (
      <aside className="main-sidebar">
        {/* <!-- sidebar: style can be found in sidebar.less --> */}
        <section className="sidebar">
          {/* <!-- sidebar menu: : style can be found in sidebar.less --> */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">Menú</li>
            {links}
            <li><Link to="/projectsFinalized"><i className="fa fa-gear"></i> <span>Proyectos finalizados</span></Link></li>
          </ul>
        </section>
      </aside>
    )
  }
}