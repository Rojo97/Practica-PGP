import React, { Component } from 'react';
import Moment from 'moment';

export default class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividad: [],
            informe: 0,
            fecha: '',
            texto: '',
            horas: '',
            estados: ["En curso", "Finalizada", "Cerrada", "Aprobada"],
            roles: ["Administrador", "Jefe de proyecto", "Analista", "Diseñador, Analista-Programador o Responsable del equipo de pruebas", "Programador o probador"],
        }
    }

    componentDidMount() {
        const proyecto = this.props.match.params.proyecto;
        const actividad = this.props.match.params.actividad;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/actividad/${actividad}/proyecto/${proyecto}`, {
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
            .then(responseJson => this.setState({ actividad: responseJson.data[0] }))
            .catch(function (data) { console.log(data) });
    }

    activeInforme = event => {
        this.setState({ informe: 1 });
        console.log(this.state);
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

    render() {
        let nuevoInforme;
        let botonInforme;

        if (this.state.informe === 0) {
            nuevoInforme = '';
            botonInforme =
                <div className="box-footer">
                    <button type="submit" className="btn btn-info pull-right" onClick={this.activeInforme}>Informe de desarrollador</button>
                </div>;
        } else {
            botonInforme = '';
            nuevoInforme =
                <form>
                    <div className="box ">
                        <div className="box-header with-border">
                            <h3 className="box-title">Crear informe semanal</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <label>Fecha:</label>
                                <div className="input-group date">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar"></i>
                                    </div>
                                    <input type="date" className="form-control pull-right" name="fecha" value={this.state.fecha} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDuracion">Horas trabajadas</label>
                                <input type="input" className="form-control" name="horas" placeholder="Horas trabajadas" value={this.state.horas} onChange={this.handleInputChangeNumber} />
                            </div>
                            <div className="form-group">
                                <label>Comentarios</label>
                                <textarea className="form-control" rows="3" placeholder="Texto del informe" name="texto" value={this.state.texto} onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-info pull-right">Enviar informe</button>
                        </div>
                    </div>
                </form>;
        }

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Actividad {this.state.actividad.nombreActividad}</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box ">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Detalles de la actividad</h3>
                                </div>
                                <div className="box-body">
                                    <div className="col-md-6">
                                        <h4>-Proyecto : {this.state.actividad.nombreProyecto}</h4>
                                        <h4>-Participantes: {this.state.actividad.nickUsuario}</h4>
                                        <h4>-Duración estimada: {this.state.actividad.duracionEstimada}</h4>
                                        <h4>-Duración real: {this.state.actividad.duracionReal}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>-Fecha de inicio: {Moment(this.state.actividad.fechaInicio).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin estimada: {Moment(this.state.actividad.fechaFinEstimada).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin Real: {Moment(this.state.actividad.fechaFin).format('DD/MM/YYYY')}</h4>
                                        <h4>-Estado actual: {this.state.estados[this.state.actividad.estado]}</h4>
                                        <h4>-Rol: {this.state.roles[this.state.actividad.rol]}</h4>
                                    </div>
                                    <div className="box-body">
                                        <h3>Descripción:</h3>
                                        <h4>{this.state.actividad.descripcion}</h4>
                                    </div>
                                </div>
                                {botonInforme}
                            </div>
                            {nuevoInforme}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}