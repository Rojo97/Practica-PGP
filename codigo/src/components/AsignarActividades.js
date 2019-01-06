import React, { Component } from 'react';

export default class AsignarActividades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: '',
            idActividad: '',
            rol: '',
            listaParticipantes: [],
            listaActividades: [],

            //Es una manera de evitar implementar la consulta para todos los informes del proyecto
            listaInformes0: [],
            listaInformes1: [],
            listaInformes2: [],
            listaInformes3: [],
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.assignActivitie = this.assignActivitie.bind(this);

    }

    //Acciones que se realizan antes de montar el componente
    componentDidMount() {
        this.getActividades();
        this.getInformes();
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

    //Se cargan los candidatos a la actividad
    cargaParticipantesCandidatos = () => {
        //Se comprueba el nombre de la actividad
        var x1 = document.forms["formularioProyecto"]["idActividad"].value;
        if (x1 !== '') {
            this.getParticipantes();
        }

        var lista = this.state.listaActividades;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].nombreActividad.localeCompare(x1) === 0) {
                this.setState({rol: lista[i].rol.toString()});
                break;
            }
        }
    }

    validaFormulario() {
        //Se comprueba el nombre de la actividad
        var x1 = document.forms["formularioProyecto"]["idActividad"].value;
        if (x1 == '') {
            alert("Seleccione una actividad");
            return false;
        }

        //Se comprueba el nombre
        var x1 = document.forms["formularioProyecto"]["idUsuario"].value;
        if (x1 == '') {
            alert("Seleccione un usuario");
            return false;
        }

        return true;
    }

    //Se extraen del backend los participantes del proyecto
    getParticipantes() {
        const nombre = this.props.match.params.proyecto;
        const actividad = this.state.idActividad;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/actividad/${actividad}/candidatos`, {
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
                        this.setState({ listaParticipantes: [] });
                        alert("No hay participantes para esta actividad");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaParticipantes: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });
    }

    //Se extraen del backend los jefes de proyecto que no tienen ningún proyecto activo asociado
    getActividades() {
        const nombre = this.props.match.params.proyecto

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/actividades`, {
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
                        this.setState({ listaCandidatos: [] });
                        alert("No hay actividades en el proyecto");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaActividades: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });
    }

    //Se extraen del backend los participantes del proyecto
    getInformes() {
        const nombre = this.props.match.params.proyecto

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/informesSemanales?estado=0`, {
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
                        this.setState({ listaInformes0: [] });
                        //alert("No hay participantes en el proyecto");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaInformes0: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/informesSemanales?estado=1`, {
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
                        this.setState({ listaInformes1: [] });
                        //alert("No hay participantes en el proyecto");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaInformes1: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/informesSemanales?estado=2`, {
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
                        this.setState({ listaInformes2: [] });
                        //alert("No hay participantes en el proyecto");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaInformes2: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/informesSemanales?estado=3`, {
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
                        this.setState({ listaInformes3: [] });
                        //alert("No hay participantes en el proyecto");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaInformes3: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });
    }

    //Manda el proyecto con todos sus datos validados al backend
    assignActivitie(event) {
        event.preventDefault();

        //Se comprueba primero que todos los campos del formulario sean validos
        if (this.validaFormulario()) {
            const nombre = this.props.match.params.proyecto

            fetch(`http://virtual.lab.inf.uva.es:27014/api/informeSemanal`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    nombreActividad: this.state.idActividad,
                    nombreProyecto: nombre,
                    nickUsuario: this.state.idUsuario,
                })
            }).then((response) => {
                //console.log("Codigo de estado: " + response.status);
                switch (response.status) {
                    case 201:
                        alert("Actividad asignada");

                        //Una vez creado el proyecto se resetean los campos del formulario
                        this.setState({ idUsuario: '' });
                        this.setState({ idActividad: '' });
                        this.setState({ listaParticipantes: [] });

                        document.forms["formularioProyecto"]["idUsuario"].value = "";
                        //this.getParticipantes();
                        this.getInformes();
                        break;

                    //TODO Falta ver que codigo de error es
                    // case 409:
                    //     alert("Existe un proyecto con ese nombre");
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
                        Asignar actividades
                    </h1>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form name="formularioProyecto">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Asignar actividad</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label>Actividad</label>
                                            <select class="form-control" name="idActividad" value={this.state.idActividad} onChange={this.handleInputChange} onClick={this.cargaParticipantesCandidatos}>
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {this.state.listaActividades.map(actividad => (
                                                    <option value={actividad.nombreActividad}>{actividad.nombreActividad}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <select class="form-control" name="idUsuario" value={this.state.idUsuario} onChange={this.handleInputChange} >
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {this.state.listaParticipantes.map(participante => (
                                                    <option value={participante.nickUsuario}>{participante.nickUsuario}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right" onClick={this.assignActivitie}>Añadir participación</button>
                                    </div>
                                </div>
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Participantes actuales</h3>
                                    </div>
                                    <div class="box-body">
                                        {this.state.listaInformes0.map(informe => (
                                            <div className="small-box bg-green">
                                                <div className="inner">
                                                    <h3>{informe.numeroInforme}</h3>
                                                    <p>Actividad: {informe.nombreActividad}</p>
                                                    <p>Usuario: {informe.nickUsuario}</p>
                                                    <p>Estado: {informe.estado}</p>
                                                    <p>Horas: {informe.horas}</p>
                                                    <p>Informe: {informe.informeTareasPersonales}</p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fa fa-gear"></i>
                                                </div>
                                            </div>
                                        ))}

                                        {this.state.listaInformes1.map(informe => (
                                            <div className="small-box bg-red">
                                                <div className="inner">
                                                    <h3>{informe.numeroInforme}</h3>
                                                    <p>Actividad: {informe.nombreActividad}</p>
                                                    <p>Usuario: {informe.nickUsuario}</p>
                                                    <p>Estado: {informe.estado}</p>
                                                    <p>Horas: {informe.horas}</p>
                                                    <p>Informe: {informe.informeTareasPersonales}</p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fa fa-gear"></i>
                                                </div>
                                            </div>
                                        ))}

                                        {this.state.listaInformes2.map(informe => (
                                            <div className="small-box bg-blue">
                                                <div className="inner">
                                                    <h3>{informe.numeroInforme}</h3>
                                                    <p>Actividad: {informe.nombreActividad}</p>
                                                    <p>Usuario: {informe.nickUsuario}</p>
                                                    <p>Estado: {informe.estado}</p>
                                                    <p>Horas: {informe.horas}</p>
                                                    <p>Informe: {informe.informeTareasPersonales}</p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fa fa-gear"></i>
                                                </div>
                                            </div>
                                        ))}

                                        {this.state.listaInformes3.map(informe => (
                                            <div className="small-box bg-black">
                                                <div className="inner">
                                                    <h3>{informe.numeroInforme}</h3>
                                                    <p>Actividad: {informe.nombreActividad}</p>
                                                    <p>Usuario: {informe.nickUsuario}</p>
                                                    <p>Estado: {informe.estado}</p>
                                                    <p>Horas: {informe.horas}</p>
                                                    <p>Informe: {informe.informeTareasPersonales}</p>
                                                </div>
                                                <div className="icon">
                                                    <i className="fa fa-gear"></i>
                                                </div>
                                            </div>
                                        ))}
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
