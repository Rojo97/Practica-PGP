import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Plantilla from './Plantilla';

class Login extends Component {
    render() {
        return (
            <div class="login-box">
                <div class="login-logo">
                    <a href="../plantilla.html"><b>Aqui</b>VaElNombre</a>
                </div>
                <div class="login-box-body">
                    <p class="login-box-msg">Inicie sesión</p>
                    {/* <form method="post"> */}
                    <form action="plantilla.html">
                        <div class="form-group has-feedback">
                            <input type="email" class="form-control" placeholder="Email" />
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input type="password" class="form-control" placeholder="Password" />
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div class="col-xs-14">
                            <button type="submit" class="btn btn-primary btn-block btn-flat">Iniciar sesión</button>
                        </div>
                    </form>
                    <Link to="/plantilla">Plantilla</Link>
                </div>
            </div>
        )
    }
}


export default Login;

