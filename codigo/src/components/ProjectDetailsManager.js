import React, { Component } from 'react';
import Moment from 'moment';

export default class ProjectDetailsManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyecto: [],
            estado: "ver",
            fechaFin: "",
            informeTemporal: "",
            resumen: "",
            tipoInforme:"",
            estadoProyecto: "",
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

    render() {
        let botones;
        let edicion;
        let informes;

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
            informes = <form>
                <div className="box ">
                    <div className="box-header with-border">
                        <h3 className="box-title">Generar informe</h3>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <label>Tipo de informe:</label>
                            <select className="form-control" name="tipoInforme" value={this.state.tipoInforme} onChange={this.handleInputChange} >
                                <option disabled value=''> -- Seleccione informe -- </option>
                                <option value="WIP">WIP</option> {/*TODO AÑADIR TIPOS DE INFORME */}
                            </select>
                        </div>
                    </div>
                    <div className="box-footer">
                        <button className="btn btn-info pull-right">Generar</button>
                    </div>
                </div>
            </form>;
        }

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Poryecto {this.state.proyecto.nombreProyecto}</h1>
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
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}