import React, { Component } from 'react';
import Moment from 'moment';

export default class ProjectDetailsAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyecto: [],
            estados: ["En curso", "Finalizado", "Cerrado", "Aprobado"],
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
            .catch(function (data) { console.log(data) });
    }
    render() {
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
                                        <h4>-Jefe de proyecto: {this.state.proyecto.jefeProyecto}</h4>
                                        <h4>-Fecha de inicio: {Moment(this.state.proyecto.fechaInicial).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin Real: {Moment(this.state.proyecto.fechaFin).format('DD/MM/YYYY')}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>-Estado actual: {this.state.estados[this.state.proyecto.estado]}</h4>
                                        <h4>-Presupuesto: {this.state.proyecto.presupuesto}</h4>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <h3>Resumen:</h3>
                                    <h4>{this.state.proyecto.resumen}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}