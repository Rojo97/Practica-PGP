import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment'; //TODO npm install moment --save

export default class InformesSemanales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            informes: [],
            estados: ["Aceptado", "Rechazado", "Pendiente de aceptación", "Pendiente de envio"]
        }
    }

    componentDidMount() {
        const proyecto = this.props.match.params.proyecto

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${proyecto}/informesSemanales?estado=2`, {
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

    updateInforme = (informe, estadoInforme) =>{
        fetch(`http://virtual.lab.inf.uva.es:27014/api/informeSemanal`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                estado : estadoInforme,
                informeTareasPersonales: informe. informeTareasPersonales,
                horas: informe.horas,
                numeroInforme: informe.numeroInforme
            })
        })
        .then(function (res) { console.log(res) })
        .then(() => { alert("Informe modificado") })
        .catch(function (res) { console.log(res) });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <h1>
                        Informes sin aprobar del proyecto {this.props.match.params.proyecto}
                    </h1>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                {this.state.informes.map(informe => (
                                    <div className="box ">
                                        <div className="box-header with-border">
                                            <h3 className="box-title">Inorme numero: {informe.numeroInforme}</h3>
                                        </div>
                                        <div className="box-body">
                                            <div className="col-md-6">
                                                <h4>-Actividad: {informe.nombreActividad}</h4>
                                                <h4>-Usuario: {informe.nickUsuario}</h4>
                                            </div>
                                            <div className="col-md-6">
                                                <h4>-Horas trabajadas: {informe.horas}</h4>
                                            </div>
                                        </div>
                                        <div className="box-body">
                                            <div className="col-md-12">
                                                <h3>Comentario:</h3>
                                                <h4>{informe.informeTareasPersonales}</h4>
                                            </div>
                                        </div>
                                        <div className="box-footer">
                                            <button type="submit" className="btn btn-success pull-right" onClick={()=>{this.updateInforme(informe, 0)}}>Aceptar</button>
                                            <button type="submit" className="btn btn-danger pull-left"  onClick={()=>{this.updateInforme(informe,1)}}>Rechazar</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}