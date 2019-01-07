import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            tipoUser: ["Administrador", "Jefe de proyecto", "Desarrollador"],
            logOut:0,
        }
    }

    //Limpia la sesion y hace logOut
    logOut = () => {
        window.sessionStorage.clear();
        this.setState({logOut: 1});
    }

    //Genera la vista
    render() {
        let redirect = '';
        if(this.state.logOut === 1){ //Si hemos hecho logOut nos manda al login
            redirect = <Redirect to="/"></Redirect>
        }
        return (
            <header className="main-header">
                {/* <!-- Logo --> */}
                <Link to="/plantilla" className="logo">
                    {/* <!-- mini logo for sidebar mini 50x50 pixels --> */}
                    <span className="logo-mini"><b>G</b>P</span>
                    {/* <!-- logo for regular state and mobile devices --> */}
                    <span className="logo-lg"><b>Gea</b>Pros</span>
                </Link>
                {/* <!-- Header Navbar: style can be found in header.less --> */}
                <nav className="navbar navbar-static-top">
                    {/* <!-- Sidebar toggle button--> */}
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>

                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            {/* <!-- User Account: style can be found in dropdown.less --> */}
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="./oneUser.png" className="user-image" alt="User Image" />
                                    <span className="hidden-xs">{window.sessionStorage.getItem('user')}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    {/* <!-- User image --> */}
                                    <li className="user-header">
                                        <img src="oneUser.png" className="img-circle" alt="User Image" />
                                        <p>{window.sessionStorage.getItem('user')}<small>{this.state.tipoUser[window.sessionStorage.getItem('tipoUser')]}</small></p>
                                    </li>
                                    {/* <!-- Menu Footer--> */}
                                    <li className="user-footer">
                                        <div className="pull-right">
                                            <button className="btn btn-default btn-flat" onClick={()=>{this.logOut()}} >Sign out</button>
                                            {redirect}
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}