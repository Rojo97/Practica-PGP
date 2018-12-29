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
            <div className="login-box">
                <div className="login-logo">
                    <a><b>Gea</b>Pros</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Inicie sesión</p>
                    {/* <form method="post"> */}
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={this.props.email} onChange={this.handleChange}/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={this.props.password} onChange={this.handleChange}/>
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="col-xs-14">
                            <button type="submit" className="btn btn-primary btn-block btn-flat">Iniciar sesión</button>
                        </div>
                    </form>
                    <Link to="/plantilla">Plantilla</Link>
                </div>
            </div>
        )
    }
}


export default Login;

