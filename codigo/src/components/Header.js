import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header class="main-header">
                {/* <!-- Logo --> */}
                <Link to="/plantilla" class="logo">
                    {/* <!-- mini logo for sidebar mini 50x50 pixels --> */}
                    <span class="logo-mini"><b>G</b>P</span>
                    {/* <!-- logo for regular state and mobile devices --> */}
                    <span class="logo-lg"><b>Gea</b>Pros</span>
                </Link>
                {/* <!-- Header Navbar: style can be found in header.less --> */}
                <nav class="navbar navbar-static-top">
                    {/* <!-- Sidebar toggle button--> */}
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            {/* <!-- User Account: style can be found in dropdown.less --> */}
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="./oneUser.png" class="user-image" alt="User Image" />
                                    <span class="hidden-xs">User on Develop</span>
                                </a>
                                <ul class="dropdown-menu">
                                    {/* <!-- User image --> */}
                                    <li class="user-header">
                                        <img src="oneUser.png" class="img-circle" alt="User Image" />
                                        <p>User on Develop<small>Here goes the rol</small></p>
                                    </li>
                                    {/* <!-- Menu Footer--> */}
                                    <li class="user-footer">
                                        <div class="pull-right">
                                            <Link to="/" class="btn btn-default btn-flat">Sign out</Link>
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