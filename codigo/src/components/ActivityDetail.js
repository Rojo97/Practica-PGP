import React, { Component } from 'react';
import Moment from 'moment';

export default class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividad: [],
            informe: 0,
            estados: ["En curso", "Finalizada", "Cerrada", "Aprobada"],
            roles: ["Administrador", "Jefe de proyecto", "Analista", "Diseñador, Analista-Programador o Responsable del equipo de pruebas", "Programador o probador"],
        }
    }

    componentDidMount() {
        const nombre = this.props.match.params.nombre

        fetch(`http://virtual.lab.inf.uva.es:27014/api/actividad/${nombre}/proyecto/ProyectoA`, {
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

    render() {
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
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right">Informe de desarrollador</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}