import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment';

export default class ProjectsFinalized extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyectos: [],
        }
    }

    componentDidMount() {

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto?estado=1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            }})
            .then(function (response) { 
                console.log(response);
                return response.json()
             })
            .then(responseJson => this.setState({ proyectos: responseJson.data }))
            .catch(function (data) { console.log(data) });
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <h1>
                        Proyectos finalizados 
                    </h1>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                {this.state.proyectos.map(proyecto => (
                                    <div className="small-box bg-green">
                                    <div className="inner">
                                        <h3>{proyecto.nombreProyecto}</h3>
                                        <p>{proyecto.descripcion}</p>
                                        <p style={{float: 'left'}} align="left">Inicio: {Moment(proyecto.fechaInicio).format('DD/MM/YYYY')}</p>
                                        <p style={{clear: 'right'}} align="right">Fin: {Moment(proyecto.fin).format('DD/MM/YYYY')}</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-gear"></i>
                                    </div>
                                    <Link to={"/projectsFinalized/"+proyecto.nombreProyecto} className="small-box-footer">Ver resumen y detalles<i className="fa fa-arrow-circle-right"></i></Link>
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