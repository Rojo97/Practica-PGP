import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment'; //TODO npm install moment --save

export default class ShowActivitiesManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
        }
    }

    componentDidMount() {
        const nombre = this.props.match.params.nombre

        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/actividades`)
            .then(function (response) { 
                console.log(response);
                return response.json()
             })
            .then(responseJson => this.setState({ actividades: responseJson.data }))
            .catch(function (data) { console.log(data) });
    }



    render() {
        return (
            <div className="content-wrapper">
                <div className="content-header">
                    <h1>
                        Actividades 
                    </h1>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                {this.state.actividades.map(actividad => (
                                    <div className="small-box bg-purple">
                                    <div className="inner">
                                        <h3>{actividad.numeroActividad}</h3>
                                        <p>{actividad.descripcion}</p>
                                        <p style={{float: 'left'}} align="left">Inicio: {Moment(actividad.fechaInicio).format('DD/MM/YYYY')}</p>
                                        <p style={{clear: 'right'}} align="right">Estado: {actividad.estado}</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-gear"></i>
                                    </div>
                                    <Link to={"/projectManager/activity/"+actividad.numeroActividad} className="small-box-footer">Ver y editar <i className="fa fa-arrow-circle-right"></i></Link>
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