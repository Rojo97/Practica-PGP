import React, { Component } from 'react';
import Moment from 'moment';

export default class InformeTiempoDedicado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            informes: [],
            fechaInicio: '',
            fechaFin: '',
            estados: ["Aceptado", "Rechazado", "Pendiente de aceptación", "Pendiente de envio"]
        }
    }

    getInformes = () => {
        fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario/${window.sessionStorage.getItem('user')}/informes/${this.state.fechaInicio}/${this.state.fechaFin}`, {
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
            .then(responseJson => this.setState({ informes: responseJson.data }))
            .catch(function (data) { console.log(data) });
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

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Consultar informes de trabajo</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box ">
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
                                                <input type="date" className="form-control pull-right" name="fechaInicio" value={this.state.fechaInicio} onChange={this.handleInputChange} />
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
                                                <input type="date" className="form-control pull-right" name="fechaFin" value={this.state.fechaFin} onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <button type="submit" className="btn btn-info pull-right" onClick={() => { this.getInformes() }}>Buscar</button>
                                </div>
                            </div>
                            {this.state.informes.map(informe => (
                                    <div className="box ">
                                        <div className="box-header with-border">
                                            <h3 className="box-title">Informe numero: {informe.numeroInforme}</h3>
                                        </div>
                                        <div className="box-body">
                                            <div className="col-md-6">
                                                <h4>-Actividad: {informe.nombreActividad}</h4>
                                                <h4>-Proyecto: {informe.nombreProyecto}</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <h4>-Horas trabajadas: {informe.horas}</h4>
                                                <h4>-Estado actual: {this.state.estados[informe.estado]}</h4>
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="col-md-12">
                                                <h3>Comentario:</h3>
                                                <h4>{informe.informeTareasPersonales}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}