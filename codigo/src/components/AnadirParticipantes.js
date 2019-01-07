import React, { Component } from 'react';

//Implementación de la vista para añadir participantes a un proyecto
export default class AnadirParticipantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUsuario: '',
            participacion: '',
            rol: '',
            rolSeleccionado: '',
            listaParticipantes: [],
            listaCandidatos: [],
            listaRoles: [],
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addParticipacion = this.addParticipacion.bind(this);

    }

    //Acciones que se realizan antes de montar el componente
    componentDidMount() {
        this.getParticipantes();
        this.getCandidatos();
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

    //Carga los roles correspondientes a la categoria del usuario
    cargaRoles = () => {
        this.setState({rolSeleccionado: ''});
        document.forms["formularioProyecto"]["rolSeleccionado"].value = "";

        var x1 = this.state.idUsuario;
        console.log("Ei: " + x1);
        var lista = this.state.listaCandidatos;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].nickUsuario.localeCompare(x1) === 0) {
                // this.setState({rol: lista[i].categoriaUsuario.toString()});
                this.state.rol = lista[i].categoriaUsuario.toString();
                break;
            }
        }

        switch (this.state.rol) {
            case "4":
                this.setState({ listaRoles: [1] });
                break;
            case "3":
                this.setState({ listaRoles: [1, 2] });
                break;
            case "2":
                this.setState({ listaRoles: [1, 2, 3, 4, 5] });
                break;
            case "1":
                this.setState({ listaRoles: [1, 2, 3, 4, 5, 6, 7] });
                break;
        }


    }

    //Validacion de los campos del formulario para añadir la participacion
    validaFormulario() {
        //Se comprueba el nombre
        var x1 = document.forms["formularioProyecto"]["idUsuario"].value;
        if (x1 === '') {
            alert("Seleccione un usuario");
            return false;
        }

        //Se comprueba el jefe de proyecto
        var x = document.forms["formularioProyecto"]["participacion"].value;
        if (x === '') {
            alert("Introduzca un porcentaje de participación");
            return false;
        } else if (isNaN(Number(x))) {
            alert("Introduzca un porcentaje de participación válido");
            return false;
        } else if (x <= 0) {
            alert("Introduzca un porcentaje de participación mayor que 0");
            return false;
        } else if (x > 1) {
            alert("Introduzca un porcentaje de participación menor que 1");
            return false;
        }

        var lista = this.state.listaCandidatos;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].nickUsuario.localeCompare(x1) === 0) {
                console.log("Nick: " + lista[i].nickUsuario);
                if (lista[i].participacion + Number(x) > 1) {
                    alert("La suma de participaciones es mayor que 1");
                    return false;
                } else {
                    // console.log("Rol: " + lista[i].categoriaUsuario);
                    this.state.rol = lista[i].categoriaUsuario.toString();
                    console.log(this.state);
                    break;
                }
            }
        }



        return true;
    }

    //Se extraen del backend los participantes del proyecto
    getParticipantes() {
        const nombre = this.props.match.params.proyecto

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/participantes`, {
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
                        alert("No hay participantes en el proyecto");
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
    getCandidatos() {
        const nombre = this.props.match.params.proyecto

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/candidatos`, {
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
                        alert("No hay candidatos para asociar al proyecto");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                console.log(response);
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaCandidatos: responseJson.data })
                console.log(this.state);
            })
            .catch(function (data) {
                console.log(data)
            });
    }

    //Añade la participación con todos sus datos validados
    addParticipacion(event) {
        event.preventDefault();

        //Se comprueba primero que todos los campos del formulario sean validos
        if (this.validaFormulario()) {
            const nombre = this.props.match.params.proyecto

            fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/participacion`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    nickUsuario: this.state.idUsuario,
                    rol: this.state.rolSeleccionado,
                    porcentajeParticipacion: this.state.participacion,
                })
            }).then((response) => {
                switch (response.status) {
                    case 201:
                        alert("Participacion creada");

                        //Una vez creado el proyecto se resetean los campos del formulario
                        this.setState({ idUsuario: '' });
                        this.setState({ participacion: '' });
                        this.setState({ rol: '' });
                        this.setState({listaRoles: []});

                        document.forms["formularioProyecto"]["idUsuario"].value = "";
                        document.forms["formularioProyecto"]["rolSeleccionado"].value = "";
                        this.getParticipantes();
                        this.getCandidatos();
                        break;

                    default:
                        throw new Error("Bad response from server");
                }
                return response.json();
            }).catch(function (res) { console.log(res) });
        }

    }

    //Se renderiza la vista
    render() {
        return (
            <div className="content-wrapper">
                <section class="content-header">
                    <h1>
                        Participantes del proyecto
                    </h1>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form name="formularioProyecto">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Añadir participantes</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <select class="form-control" name="idUsuario" value={this.state.idUsuario} onChange={this.handleInputChange} onClick={this.cargaRoles}>
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {this.state.listaCandidatos.map(candidato => (
                                                    <option value={candidato.nickUsuario}>{candidato.nickUsuario} - Rol: {candidato.categoriaUsuario} - Participación: {candidato.participacion}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Rol en el proyecto</label>
                                            <select class="form-control" name="rolSeleccionado" value={this.state.rolSeleccionado} onChange={this.handleInputChange} >
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {this.state.listaRoles.map(rol => (
                                                    <option value={rol}>{rol}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="participacion">Porcentaje de participacion</label>
                                            <input type="text" class="form-control" name="participacion" placeholder="Participacion" value={this.state.participacion} onChange={this.handleInputChange} />
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right" onClick={this.addParticipacion}>Añadir participación</button>
                                    </div>
                                </div>
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Participantes actuales</h3>
                                    </div>
                                    <div class="box-body">
                                        {this.state.listaParticipantes.map(participante => (
                                            <div className="small-box bg-green">
                                                <div className="inner">
                                                    <h3>{participante.nickUsuario}</h3>
                                                    <p>Nombre: {participante.nombre} {participante.apellido1} {participante.apellido2}</p>
                                                    <p>Porcentaje participacion: {participante.porcentajeParticipacion}</p>
                                                    <p>Rol participación: {participante.rol}</p>
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
