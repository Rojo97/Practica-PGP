import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user:'',
            password:'',
            xaccesstoken:'',
            logged: 0
        }
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        fetch(`http://virtual.lab.inf.uva.es:27014/api/login`, {
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
                this.setState({logged : 1});
            })
            .catch(function (res) { console.log(res) });
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value

        });
        console.log(this.state);
    }

    render() {
        let redirection;
        if (this.state.logged === 0) {
            redirection = '';
        } else {
            redirection = <Redirect to="/inicio"></Redirect>;
        }

        return (
            <div className="login-box">
                <div className="login-logo">
                    <a><b>Gea</b>Pros</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Inicie sesión</p>
                    {/* <form method="post"> */}
                    <form>
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" placeholder="nick" name="user" value={this.state.user} onChange={this.handleChange}/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="col-xs-14">
                        <Link to="/palntilla"><button type="submit" class="btn btn-primary btn-block btn-flat" onClick={this.handleFormSubmit}>Iniciar sesión</button></Link>
                        {redirection}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;

