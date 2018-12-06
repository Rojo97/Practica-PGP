import React, { Component } from 'react';

export default class CrearUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            password2: '',
            dni: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            fechanacimiento: '',
            tipo: '',
            categoria: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.chane = this.chane.bind(this);
    }

    chane(event) {
        window.alert("CAMBIO");
    }

    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        console.log(value);
        this.setState(prevState => {
            return {
                ...prevState, [name]: value
            }
        }, () => console.log(this.state)
        )
    }

    addUser = _ => {
        fetch(`http://localhost:8080/usuario/post?nickUsuario=${this.state.login}&contrasenia=${this.state.password}&dni=${this.state.dni}&nombre=${this.state.nombre}&apellido1=${this.state.apellido1}&apellido2=${this.state.apellido2}&fechaNacimiento=${this.state.fechanacimiento}&tipoUsuario=${this.state.tipo}&categoriaUsuario=${this.state.categoria}`)
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
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form>
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Datos del usuario</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="inputNombre">Nombre</label>
                                                <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleInputChange} />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputApellido1">Primer apellido</label>
                                                <input type="text" class="form-control" name="apellido1" placeholder="Primer apellido" value={this.state.apellido1} onChange={this.handleInputChange} />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputApellido2">Segundo apellido</label>
                                                <input type="text" class="form-control" name="apellido2" placeholder="Segundo apellido" value={this.state.apellido2} onChange={this.handleInputChange} />
                                            </div>
                                            <div class="form-group">
                                                <label>Fecha de nacimiendo:</label>
                                                <div class="input-group date">
                                                    <div class="input-group-addon">
                                                        <i class="fa fa-calendar"></i>
                                                    </div>
                                                    <input type="date" class="form-control pull-right" name="fechanacimiento" value={this.state.fechanacimiento} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="dni">DNI</label>
                                                <input type="password" class="form-control" name="dni" placeholder="DNI" value={this.state.dni} onChange={this.handleInputChange}/>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="inputLogin">Nombre de usuario</label>
                                                <input type="text" class="form-control" name="login" placeholder="Intorduzca el nombre de usuario" value={this.state.login} onChange={this.handleInputChange} />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword">Contraseña</label>
                                                <input type="password" class="form-control" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleInputChange} />
                                            </div>
                                            <div class="form-group">
                                                <label for="inputPassword2">Repetir contraseña</label>
                                                <input type="password" class="form-control" name="password2" placeholder="Repetir contraseña" value={this.state.password2} onChange={this.handleInputChange} />
                                            </div>
                                            <div class="form-group">
                                                <label>Tipo de usuario</label>
                                                <select class="form-control" name="tipo" value={this.state.tipo} onChange={this.handleInputChange}>
                                                    <option disabled selected value> -- Seleccione un tipo de usuario -- </option>
                                                    <option value="0">Administrador</option>
                                                    <option value="1">Jefe de proyecto</option>
                                                    <option value="2">Desarrollador</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Categoria</label>
                                                <select class="form-control" name="categoria" value={this.state.categoria} onChange={this.handleInputChange}>
                                                    <option disabled selected value> -- Seleccione una categoría -- </option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
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
