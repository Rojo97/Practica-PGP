import React, { Component } from 'react';

export default class CrearUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            dni: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            fechanacimiento: '',
            categoria: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addUser = this.addUser.bind(this);
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

    addUser(event) {
        event.preventDefault();
        fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                nickUsuario: this.state.login,
                contrasenia: this.state.password,
                dni: this.state.dni,
                nombre: this.state.nombre,
                apellido1: this.state.apellido1,
                apellido2: this.state.apellido2,
                fechaNacimiento: this.state.fechanacimiento,
                categoriaUsuario: this.state.categoria,
            })
        }).then(function (res) { console.log(res) })
            .then(() => { alert("Usuario enviado a la DB") })
            .catch(function (res) { console.log(res) });

    }

    render() {
        return (
            <div className="content-wrapper" >
                <section className="content-header">
                    <h1>
                        Crear usuario
                    </h1>
                </section>
                <section className="content">
                    <div className="row">
                        <form>
                            <div className="col-md-12">
                                <div className="box">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Datos del usuario</h3>
                                    </div>
                                    <div className="box-body">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="inputNombre">Nombre</label>
                                                <input type="text" className="form-control" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputApellido1">Primer apellido</label>
                                                <input type="text" className="form-control" name="apellido1" placeholder="Primer apellido" value={this.state.apellido1} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputApellido2">Segundo apellido</label>
                                                <input type="text" className="form-control" name="apellido2" placeholder="Segundo apellido" value={this.state.apellido2} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Fecha de nacimiendo:</label>
                                                <div className="input-group date">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-calendar"></i>
                                                    </div>
                                                    <input type="date" className="form-control pull-right" name="fechanacimiento" value={this.state.fechanacimiento} onChange={this.handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="dni">DNI</label>
                                                <input type="text" className="form-control" name="dni" placeholder="DNI" value={this.state.dni} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputLogin">Nombre de usuario</label>
                                                <input type="text" className="form-control" name="login" placeholder="Intorduzca el nombre de usuario" value={this.state.login} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputPassword">Contraseña</label>
                                                <input type="password" className="form-control" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleInputChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>Categoria</label>
                                                <select className="form-control" name="categoria" value={this.state.categoria} onChange={this.handleInputChange}>
                                                    <option disabled value=''> -- Seleccione una categoría -- </option>
                                                    <option value="0">0</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-info pull-right" onClick={this.addUser}>Enviar</button>
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
