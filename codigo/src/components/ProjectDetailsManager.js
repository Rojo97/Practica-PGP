import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment';

export default class ProjectDetailsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyecto: [], //Proyecto
            estado: "ver", //Estado principal (ver, editar o informes)
            fechaInicioIntervalo: "", //Fechas del intervalo para los informes que lo necesiten
            fechaFinIntervalo: "",
            informeTemporal: "", //Segimiento temporal del proyecto
            resumen: "", //Resumen del proyecto
            tipoInforme: "", //Tipo de informe que se esta mostrando
            tipoInformeTmp: "", //Informe marcado en el select
            subEstado: "", //Esta a 1 cuando se va a mostar un inorme (Se muestra segunda parte)
            estadoProyecto: "", //Estado proyecto
            datosInforme: [], //Variable donde guardamos el fetch de los datos del proyecto
            informeSeleccionado: 1,
            estados: ["En curso", "Finalizado", "Cerrado", "Aprobado"],
            roles: ["Administrador", "Jefe de proyecto", "Analista", "Diseñador, Analista-Programador o Responsable del equipo de pruebas", "Programador o probador"],
        }
    }

    componentDidMount() {
        const proyecto = this.props.match.params.proyecto;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        })
            .then(function (response) {
                console.log(response);
                return response.json()
            })
            .then(responseJson => this.setState({ proyecto: responseJson.data[0] }))
            .then(() => {
                this.setState({ informeTemporal: this.state.proyecto.informeDeSeguimientoTemporal });
                this.setState({ estadoProyecto: this.state.proyecto.estado });
                this.setState({ resumen: this.state.proyecto.resumen });
                this.setState({ fechaFin: Moment(this.state.proyecto.fechaFin).format('YYYY-MM-DD') });
            })
            .catch(function (data) { console.log(data) });
    }

    editProject = event => {
        event.preventDefault();
        const proyecto = this.props.match.params.proyecto;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                fechaFin: this.state.fechaFin,
                estado: this.state.estadoProyecto,
                informeDeSeguimientoTemporal: this.state.informeTemporal,
                resumen: this.state.resumen,
            })
        }).then(function (res) { console.log(res) })
            .then(() => { alert("Proyecto modificado"); window.location.reload(false); })
            .catch(function (res) { console.log(res) });

    }

    handleInputChange = event => {
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

    handleInputChangeNumber = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (isNaN(value) === false) {
            console.log(value);
            this.setState(prevState => {
                return {
                    ...prevState, [name]: value
                }
            }, () => console.log(this.state)
            )
        }
    }

    activeEdit = event => {
        this.setState({ estado: "editar" });
        console.log(this.state);
    }

    activeInformes = event => {
        this.setState({ estado: "generarInformes" });
        console.log(this.state);
    }

    seleccionarInforme = () => {
        this.setState({ subEstado: 1 });
        this.setState({ tipoInforme: this.state.tipoInformeTmp });
        this.setState({ datosInforme: [] });
        //Aqui en caso de que el informe necesita el fetch se llama a la funcion del fetch

        var informe = this.state.tipoInformeTmp;
        console.log(informe !== "trabajadoresActividades" && informe !== "actividadesActivas" && informe !== "actividadesFinalizadas");
        if (informe !== "trabajadoresActividades" && informe !== "actividadesActivas" && informe !== "actividadesFinalizadas") {
            this.cargaDatos();
        }
    }

    cargaDatos = () => {
        var tipoInforme;
        tipoInforme = this.state.tipoInformeTmp;

        switch (tipoInforme) {
            case "trabajadoresActividades":
                this.informeTrabajadores();
                break;
            case "informesPendientesEnvio":
                this.informesActividadesPendientesDeEnvio();
                break;
            case "informesPendientesAprobacion":
                this.informesActividadesPendientesDeAprobacion();
                break;
            case "actividadesActivas":
                this.informesActividadesActivasOFinalizadas(0);
                break;
            case "actividadesFinalizadas":
                this.informesActividadesActivasOFinalizadas(2);
                break;
            case "actividadesCriticas":
                this.actividadesCriticas();
                break;
            case "actividadesARealizar":
                break;
            case "actividadesPeriodoTiempoPosterior":
                break;
        }

        console.log(this.state);

    }

    actividadesCriticas = () => {
        const proyecto = this.props.match.params.proyecto;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}/actividades/criticas`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            switch (response.status) {
                case 200:
                    console.log(response);
                    break;
                case 404:
                    alert("No hay actividades criticas");
                    this.setState({datosInforme: []});
                    break;
                default:
                    throw new Error("Bad response from server");
            }
            return response.json()
        })
            .then((responseJson) => {
                this.setState({ datosInforme: responseJson.data });
                console.log(responseJson.data);
            })
            .catch(function (data) { console.log(data) });
    }

    informesActividadesActivasOFinalizadas = (x) => {
        const proyecto = this.props.match.params.proyecto;

        console.log(x);

        if (this.state.fechaFinIntervalo == '') {
            this.state.fechaFinIntervalo = this.state.fechaInicioIntervalo;
        }

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}/actividades/${this.state.fechaInicioIntervalo}/${this.state.fechaFinIntervalo}?estado=${x}}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        }).then(function (response) {

            switch (response.status) {
                case 200:
                    console.log(response);
                    break;
                case 404:
                    if(x==0){
                        alert("No hay actividade activas en dicho intervalo");
                    }else if(x==2){
                        alert("No hay actividades finalizadas en dicho intervalo");
                    }
                    this.setState({datosInforme: []});
                    break;
                default:
                    throw new Error("Bad response from server");
            }
            return response.json()
        })
            .then((responseJson) => {
                this.setState({ datosInforme: responseJson.data });
                console.log(responseJson.data);
            })
            .catch(function (data) { console.log(data) });
    }

    informesActividadesPendientesDeAprobacion = () => {
        const proyecto = this.props.match.params.proyecto;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}/informesSemanales?estado=2}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        }).then(function (response) {

            switch (response.status) {
                case 200:
                    console.log(response);
                    break;
                case 404:
                    alert("No hay actividades pendientes de aprobación");
                    this.setState({datosInforme: []});
                    break;
                default:
                    throw new Error("Bad response from server");
            }
            return response.json()
        })
            .then((responseJson) => {
                this.setState({ datosInforme: responseJson.data });
                console.log(responseJson.data);
            })
            .catch(function (data) { console.log(data) });
    }

    informesActividadesPendientesDeEnvio = () => {
        const proyecto = this.props.match.params.proyecto;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}/informesSemanales?estado=3}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            switch (response.status) {
                case 200:
                    console.log(response);
                    break;
                case 404:
                    alert("No hay actividades pendientes de envío");
                    this.setState({datosInforme: []});
                    break;
                default:
                    throw new Error("Bad response from server");
            }
            return response.json()
        })
            .then((responseJson) => {
                this.setState({ datosInforme: responseJson.data });
                console.log(responseJson.data);
            })
            .catch(function (data) { console.log(data) });
    }

    informeTrabajadores = () => {
        const proyecto = this.props.match.params.proyecto;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}/actividades/${this.state.fechaInicioIntervalo}/${this.state.fechaFinIntervalo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }
        }).then(function (response) {
            console.log(response);
            return response.json()
        })
            .then(responseJson => this.setState({ datosInforme: responseJson.data }))
            .catch(function (data) { console.log(data) });
    }

    render() {
        let botones;
        let edicion;
        let informes;
        let intervalo;
        let datos = '';

        if (this.state.estado === "ver") {
            botones =
                <div className="box-footer">
                    <button className="btn btn-info pull-right" onClick={this.activeEdit}>Editar</button>
                    <button className="btn btn-info pull-left" onClick={this.activeInformes}>Generar informes</button>
                </div>;
            edicion = "";
            informes = "";
        } else if (this.state.estado === "editar") {
            botones =
                <div className="box-footer">
                    <button className="btn btn-info pull-left" onClick={this.activeInformes}>Generar informes</button>
                </div>;
            edicion = <form>
                <div className="box ">
                    <div className="box-header with-border">
                        <h3 className="box-title">Editar proyecto</h3>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Fecha de finalización:</label>
                            <div className="input-group date">
                                <div className="input-group-addon">
                                    <i className="fa fa-calendar"></i>
                                </div>
                                <input type="date" className="form-control pull-right" name="fechaFin" value={this.state.fechaFin} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <select className="form-control" name="estadoProyecto" value={this.state.estadoProyecto} onChange={this.handleInputChange} >
                                <option disabled value=''> -- Seleccione estado -- </option>
                                <option value="0">En curso</option>
                                <option value="1">Finalizado</option>
                                <option value="2">Cerrado</option>
                                <option value="3">Aprobado</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Informe de seguimiento temporal</label>
                            <textarea className="form-control" rows="3" placeholder="Texto del informe" name="informeTemporal" value={this.state.informeTemporal} onChange={this.handleInputChange}></textarea>
                        </div>
                        <div className="form-group">
                            <label>Resumen</label>
                            <textarea className="form-control" rows="3" placeholder="Texto del informe" name="resumen" value={this.state.resumen} onChange={this.handleInputChange}></textarea>
                        </div>
                    </div>
                    <div className="box-footer">
                        <button className="btn btn-info pull-right" onClick={this.editProject}>Editar</button>
                    </div>
                </div>
            </form>;
            informes = "";
        } else if (this.state.estado === "generarInformes") {
            botones =
                <div className="box-footer">
                    <button className="btn btn-info pull-right" onClick={this.activeEdit}>Editar</button>
                </div>;
            edicion = "";
            intervalo = "";
            informes =
                <div className="box ">
                    <div className="box-header with-border">
                        <h3 className="box-title">Generar informe</h3>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Tipo de informe:</label>
                            <select className="form-control" name="tipoInformeTmp" value={this.state.tipoInformeTmp} onChange={this.handleInputChange} >
                                <option disabled value=''> -- Seleccione informe -- </option>
                                <option value="trabajadoresActividades">Trabajadores de las actividades</option>
                                <option value="informesPendientesEnvio">Informes pendientes de envío</option>
                                <option value="informesPendientesAprobacion">Informes pendientes de aprobación</option>
                                <option value="actividadesActivas">Actividades activas</option>
                                <option value="actividadesFinalizadas">Actividades finalizadas</option>
                                <option value="actividadesCriticas">Actividades con demasiado consumo de tiempo</option>
                                {/* <option value="actividadesARealizar">Actividades a realizar</option>
                                <option value="actividadesPeriodoTiempoPosterior">Personas con actividades asignadas</option> */}
                            </select>
                        </div>
                    </div>
                    <div className="box-footer">
                        <button className="btn btn-info pull-right" onClick={this.seleccionarInforme}>Generar</button>
                    </div>
                </div>;
        }

        if (this.state.subEstado == 1) {
            var informe = this.state.tipoInforme;
            if (informe == "trabajadoresActividades" || informe == "actividadesActivas" || informe == "actividadesFinalizadas") {
                intervalo = <div className="box ">
                    <div className="box-header with-border">
                        <h3 className="box-title">Periodo</h3>
                    </div>
                    <div className="box-body">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Desde:</label>
                                <div className="input-group date">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar"></i>
                                    </div>
                                    <input type="date" className="form-control pull-right" name="fechaInicioIntervalo" value={this.state.fechaInicioIntervalo} onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Hasta:</label>
                                <div className="input-group date">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar"></i>
                                    </div>
                                    <input type="date" className="form-control pull-right" name="fechaFinIntervalo" value={this.state.fechaFinIntervalo} onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-footer">
                        <button type="submit" className="btn btn-info pull-right" name="botonBuscar" onClick={this.cargaDatos}>Buscar</button>
                    </div>
                </div>;
                if (this.state.tipoInforme == "trabajadoresActividades") {
                    datos =

                        <div className="box">
                            <div className="box-body">
                                {this.state.datosInforme.map(datos => (
                                    <div className="small-box bg-green">
                                        <div className="inner">
                                            <h3>Actividad: {datos.nombreActividad}, Participante: {datos.nickUsuario}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>;
                } else if (informe == "actividadesActivas" || informe == "actividadesFinalizadas") {
                    datos =

                        <div className="box">
                            <div className="box-body">
                                {this.state.datosInforme.map(datos => (
                                    <div className="small-box bg-green">
                                        <div className="inner">
                                            <h3>Actividad: {datos.nombreActividad}, Participante: {datos.nickUsuario}</h3>
                                            <h3>Horas estimadas: {datos.duracionEstimada}, Horas usadas: {datos.duracionReal}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>;
                }
            } else if (informe == "informesPendientesEnvio") {
                intervalo = "";
                datos =
                    <div className="box">
                        <div className="box-body">
                            {this.state.datosInforme.map(datos => (
                                <div className="small-box bg-green">
                                    <div>
                                        <h3>Trabajador: {datos.nickUsuario}, Actividad: {datos.nombreActividad}</h3>
                                        <h3>Fecha: {datos.fechaInicio.substring(0, 10)}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>;
            } else if (informe == "informesPendientesAprobacion") {
                intervalo = "";
                datos =
                    <div className="box">
                        <div className="box-body">
                            <Link to={"/projectManager/project/" + this.props.match.params.proyecto + "/informes"} className="small-box-footer"><button className="btn btn-info">Ver detalles informes</button></Link>
                            {this.state.datosInforme.map(datos => (
                                <div className="small-box bg-green">
                                    <div>
                                        <h3>Trabajador: {datos.nickUsuario}, Actividad: {datos.nombreActividad}</h3>
                                        <h3>Fecha: {datos.fechaInicio.substring(0, 10)}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>;
            } else if (informe == "actividadesCriticas") {
                intervalo = "";
                datos =

                    <div className="box">
                        <div className="box-body">
                            {this.state.datosInforme.map(datos => (
                                <div className="small-box bg-green">
                                    <div className="inner">
                                        <h3>Actividad: {datos.nombreActividad}</h3>
                                        <h3>Horas estimadas: {datos.duracionEstimada}, Horas usadas: {datos.duracionReal}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>;
            }
        }

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Proyecto {this.state.proyecto.nombreProyecto}</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box ">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Detalles del proyecto</h3>
                                </div>
                                <div className="box-body">
                                    <div className="col-md-6">
                                        <h4>-Fecha de inicio: {Moment(this.state.proyecto.fechaInicial).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin Real: {Moment(this.state.proyecto.fechaFin).format('DD/MM/YYYY')}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>-Estado actual: {this.state.estados[this.state.proyecto.estado]}</h4>
                                        <h4>-Presupuesto: {this.state.proyecto.presupuesto}</h4>
                                    </div>
                                    <div className="box-body">
                                        <h3>Informe de seguimiento temporal:</h3>
                                        <h4>{this.state.proyecto.informeDeSeguimientoTemporal}</h4>
                                    </div>
                                </div>
                                {botones}
                            </div>
                            {edicion}
                            {informes}
                            {intervalo}
                            {datos}
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}