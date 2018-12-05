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
                <section class="content-header">
                    <h1>
                        Crear usuario
                    </h1>
                    <ol class="breadcrumb">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                        <li><a href="#">Forms</a></li>
                        <li class="active">General Elements</li>
                    </ol>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form role="form">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Datos del usuario</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="inputNombre">Nombre</label>
                                                <input type="text" class="form-control" id="inputNombre" placeholder="Nombre" />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputApellido1">Primer apellido</label>
                                                <input type="text" class="form-control" id="inputApellido1" placeholder="Primer apellido" />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputApellido2">Segundo apellido</label>
                                                <input type="text" class="form-control" id="inputApellido2" placeholder="Segundo apellido" />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword">Contraseña</label>
                                                <input type="password" class="form-control" id="inputPassword" placeholder="Contraseña" />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword2">Repetir contraseña</label>
                                                <input type="password" class="form-control" id="inputPassword2" placeholder="Repetir contraseña" />
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="inputLogin">Nombre de usuario</label>
                                                <input type="text" class="form-control" id="inputLogin" placeholder="Intorduzca el nombre de usuario" />
                                            </div>
                                            <div class="form-group">
                                                <label>Fecha de nacimiendo:</label>

                                                <div class="input-group">
                                                    <div class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </div>
                                                    <input type="text" class="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label>Tipo de usuario</label>
                                                <select class="form-control">
                                                    <option disabled selected value> -- Seleccione un tipo de usuario -- </option>
                                                    <option>Administrador</option>
                                                    <option>Jefe de proyecto</option>
                                                    <option>Desarrollador</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Categoria</label>
                                                <select class="form-control">
                                                    <option disabled selected value> -- Seleccione una categoría -- </option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right">Enviar</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div >
        )
    }
}
