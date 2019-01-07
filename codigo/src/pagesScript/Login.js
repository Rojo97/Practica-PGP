import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            xaccesstoken: '',
            categoria: '',
            tipoUser: '',
            loged: 0,
            datosUser: [],
        }
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        let variable = await fetch(`http://virtual.lab.inf.uva.es:27014/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickUsuario: this.state.user,
                password: this.state.password,
            })
        }).then(function (res) { console.log(res); return res.json(); })
            .then(responseJson => { this.setState({ xaccesstoken: responseJson.token }) })
            .then(() => {
                window.sessionStorage.setItem('token', this.state.xaccesstoken);
                window.sessionStorage.setItem('user', this.state.user);
            })
            .catch(function (res) { console.log(res); alert("Usuario o contraseña incorrectos"); });
        let variable2 = await fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario/${this.state.user}/categoria`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then(function (response) {
                console.log(response);
                return response.json()
            })
            .then(responseJson => this.setState({ categoria: responseJson.data[0].categoriaUsuario }))
            .catch(function (data) { console.log(data) });

        let variable3 = await fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario/${this.state.user}/participaciones`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then(function (response) {
                console.log(response);
                return response.json()
            })
            .then(responseJson => this.setState({ datosUser: responseJson.data[0] }))
            .catch(function (data) { console.log(data) });


        if (this.state.categoria === 0) {
            window.sessionStorage.setItem('tipoUser', 0);
            this.setState({ tipoUser: 0 });
        } else if (this.state.categoria === 1 && this.state.datosUser.rol === 1) {
            window.sessionStorage.setItem('tipoUser', 1);
            window.sessionStorage.setItem('proyecto', this.state.datosUser.nombreProyecto);
            this.setState({ tipoUser: 1 });
        } else {
            window.sessionStorage.setItem('tipoUser', 2);
            this.setState({ tipoUser: 2 });
        }
        
        this.setState({loged: 1});
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value

        });
        console.log(this.state);
    }

    render() {
        let redirection;
        let tipoUser = this.state.tipoUser;

        if (this.state.loged === 0) {
            redirection = '';
        } else {
            if (tipoUser == 0) {
                redirection = <Redirect to="/admin/createUser"></Redirect>;
            } else if (tipoUser == 1) {
                redirection = <Redirect to={"/projectManager/project/" + window.sessionStorage.getItem('proyecto')}></Redirect>;
            } else if (tipoUser == 2) {
                redirection = <Redirect to="/developer/selectProject"></Redirect>;
            }
        }

        return (
            <div className="login-box">
                <div className="login-logo">
                    <a><b>Gea</b>Pros</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Inicie sesión</p>
                    <form>
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" placeholder="nick" name="user" value={this.state.user} onChange={this.handleChange} />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="col-xs-14">
                            <button type="submit" class="btn btn-primary btn-block btn-flat" onClick={this.handleFormSubmit}>Iniciar sesión</button>
                            {redirection}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;

