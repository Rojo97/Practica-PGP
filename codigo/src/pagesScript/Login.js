import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ContextConsumer, ContextProvider } from '../App';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            user:'',
            password:'',
            xaccesstoken:''
        }
    }

    handleFormSubmit = async event =>{
        event.preventDefault();
        fetch(`http://virtual.lab.inf.uva.es:27014/api/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickUsuario: this.state.user,
                password: this.state.password,
            })
        }).then(function (res) { console.log(res); return res.json();})
        .then(responseJson => {this.setState({xaccesstoken: responseJson.token})})
        .catch(function (res) { console.log(res) });
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value

        });
        console.log(this.state);
    }

    render() {
        return (
            <ContextConsumer>
            {({user, xaccesstoken, setToken})=>(
            <div className="login-box">
                <div className="login-logo">
                    <a><b>Gea</b>Pros</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Inicie sesión</p>
                    {/* <form method="post"> */}
                    <form onSubmit={() => {this.handleFormSubmit(); setToken(this.state.xaccesstoken)}}>
                        <div className="form-group has-feedback">
                            <input type="text" className="form-control" placeholder="nick" name="user" value={this.state.user} onChange={this.handleChange}/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="col-xs-14">
                        <button type="submit" class="btn btn-primary btn-block btn-flat">Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </div>)}
            </ContextConsumer>
        )
    }
}


export default Login;

