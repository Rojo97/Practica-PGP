import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }

    handleFormSubmit = async event =>{
        event.preventDefault();
        let userdata = this.state;

        fetch("htt://",{
            method: "POST",
            body: JSON.stringify(userdata),
            headers: {
                'Acept' : 'application/json',
                'Content-type': 'aplication/json'
            },
        }).then(response => {
            response.json().then(data =>{
                console.log("Successful" + data);
            })
        })
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div class="hold-transition login-page">
            <div class="login-box">
                <div class="login-logo">
                    <a><b>Gea</b>Pros</a>
                </div>
                <div class="login-box-body">
                    <p class="login-box-msg">Inicie sesión</p>
                    {/* <form method="post"> */}
                    <form moSubmit={this.handleFormSubmit}>
                        <div class="form-group has-feedback">
                            <input type="email" class="form-control" placeholder="Email" name="email" value={this.props.email} onChange={this.handleChange}/>
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div class="form-group has-feedback">
                            <input type="password" class="form-control" placeholder="Password" name="password" value={this.props.password} onChange={this.handleChange}/>
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div class="col-xs-14">
                            <button type="submit" class="btn btn-primary btn-block btn-flat">Iniciar sesión</button>
                        </div>
                    </form>
                    <Link to="/plantilla/createUser">Plantilla</Link>
                </div>
            </div>
           </div>
        )
    }
}


export default Login;

