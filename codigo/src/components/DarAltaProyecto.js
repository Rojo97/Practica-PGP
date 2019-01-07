import React, { Component } from 'react';

//Implementacion de la vista para dar de alta un nuevo proyecto
export default class DarAltaProyecto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            idJefeProyecto: '',
            descripccion: '',
            listaJefes: [],

            //Formato del JSon que contendrá los datos de cada jefe de proyecto
            jefe: {
                nickUsuario: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addProject = this.addProject.bind(this);

    }

    //Acciones que se realizan antes de montar el componente
    componentDidMount() {
        this.getJefesProyecto();
    }

    //Actualiza el valor de this.state con cada cambio en el formulario
    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        //console.log(value);
        this.setState(prevState => {
            return {
                ...prevState, [name]: value
            }
        }
            , () => console.log(this.state)
        )
    }

    //Se comprueban los datos del formulario para poder crear el proyecto
    validaFormulario() {
        //Se comprueba el nombre
        var x = document.forms["formularioProyecto"]["nombre"].value;
        if (x === '') {
            alert("Introduzca un nombre de proyecto");
            return false;
        }

        //Se comprueba el jefe de proyecto
        x = document.forms["formularioProyecto"]["idJefeProyecto"].value;
        if (x === '') {
            alert("Seleccione un jefe de proyecto");
            return false;
        }

        //Se comprueba la descripcción
        x = document.forms["formularioProyecto"]["descripccion"].value;
        if (x === '') {
            alert("Introduzca una descripcción");
            return false;
        }

        return true;
    }

    //Se extraen del backend los jefes de proyecto que no tienen ningún proyecto activo asociado
    getJefesProyecto() {
        fetch('http://virtual.lab.inf.uva.es:27014/api/usuario?selectableAsJefe=1', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then((response) => {
                switch (response.status) {
                    case 200:
                        console.log(response);
                        break;
                    case 404:
                        this.setState({ listaJefes: [] });
                        alert("No hay jefes de proyecto disponibles");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaJefes: responseJson.data })
            })
            .catch(function (data) {
                console.log(data)
            });
    }

    //Render para añadir los jefes como opcion del desplegable
    renderJefe = ({ nickUsuario }) => <option value={nickUsuario}>{nickUsuario}</option>

    //Manda el proyecto con todos sus datos validados al backend
    addProject(event) {
        event.preventDefault();

        //Se comprueba primero que todos los campos del formulario sean validos
        if (this.validaFormulario()) {
            fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    nombreProyecto: this.state.nombre,
                    descripcion: this.state.descripccion,
                    nickUsuario: this.state.idJefeProyecto,
                })
            }).then((response) => {
                //console.log("Codigo de estado: " + response.status);
                switch (response.status) {
                    case 201:
                        alert("Proyecto creado");

                        //Una vez creado el proyecto se resetean los campos del formulario
                        this.setState({ nombre: '' });
                        this.setState({ idJefeProyecto: '' });
                        this.setState({ descripccion: '' });

                        //Se actualizan los jefes de proyecto restantes 
                        //y se cambia la opcion seleccionada en el desplegable
                        this.getJefesProyecto();
                        document.forms["formularioProyecto"]["idJefeProyecto"].value = "";
                        break;

                    //TODO Falta ver que codigo de error es
                    case 409:
                        alert("Existe un proyecto con ese nombre");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                return response.json();
            }).catch(function (res) { console.log(res) });
        }

    }

    render() {
        return (
            <div className="content-wrapper">
                <section class="content-header">
                    <h1>
                        Dar de alta proyecto
                    </h1>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form name="formularioProyecto">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Datos del proyecto</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label for="nombre">Nombre</label>
                                            <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleInputChange} />
                                        </div>
                                        <div class="form-group">
                                            <label>Jefe de proyecto</label>
                                            <select class="form-control" name="idJefeProyecto" value={this.state.jefeProyecto} onChange={this.handleInputChange} >
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {this.state.listaJefes.map(this.renderJefe)}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Descripcción</label>
                                            <textarea class="form-control" rows="3" name="descripccion" placeholder="Descripccion del proyecto" value={this.state.descripccion} onChange={this.handleInputChange}></textarea>
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right" onClick={this.addProject}>Dar de alta</button>
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
