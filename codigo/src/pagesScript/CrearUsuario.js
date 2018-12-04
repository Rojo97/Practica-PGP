import React, { Component } from 'react';

export default class CrearUsuario extends Component {
    constructor(props){
        super(props);
        this.state={
            login:'Rojo',
            password:'soylapuñeterapass',
            dni:'soyeldni',
            nombre:'Corde',
            apellido1:'benito',
            apellido2:'camelas',
            fechaNacimiento:'2018-12-3',
            tipo:'0',
            categoria:'3',
        }
    }

    addUser = _ => {
        fetch(`http://localhost:8080/usuario/post?nickUsuario=${this.state.login}&contrasenia=${this.state.password}&dni=${this.state.dni}&nombre=${this.state.nombre}&apellido1=${this.state.apellido1}&apellido2=${this.state.apellido2}&fechaNacimiento=${this.state.fechaNacimiento}&tipoUsuario=${this.state.tipo}&categoriaUsuario=${this.state.categoria}`)
        .then(response => response.json())
        .catch(err => console.error(err));
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Crear usuario</h3>
                                </div>
                                <form>
                                    <div className="box-body">
                                        <row>
                                            <column>
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Email address</label>
                                                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                </div>
                                            </column>
                                            <column>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input class="form-control" type="text" placeholder="Default input" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input class="form-control" type="text" placeholder="Default input" />
                                                </div>
                                                <div class="form-group">
                                                    <label for="exampleInputPassword1">Password</label>
                                                    <input class="form-control" type="text" placeholder="Default input" />
                                                </div>
                                                <div class="form-group">
                                                    <label>Date:</label>
                                                    <div class="input-group date">
                                                        <div class="input-group-addon">
                                                            <i class="fa fa-calendar"></i>
                                                        </div>
                                                        <input type="text" class="form-control pull-right" id="datepicker"/>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label>Select</label>
                                                    <select class="form-control">
                                                        <option>option 1</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>Select</label>
                                                    <select class="form-control">
                                                        <option>option 1</option>
                                                        <option>option 2</option>
                                                        <option>option 3</option>
                                                        <option>option 4</option>
                                                        <option>option 5</option>
                                                    </select>
                                                </div>
                                            </column>
                                        </row>
                                    </div>
                                    <div className="box-footer">
                                        <div>
                                            <button type="submit" class="btn btn-primary" onClick={this.addUser}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
