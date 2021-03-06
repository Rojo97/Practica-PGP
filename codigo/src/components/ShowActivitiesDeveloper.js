import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment'; //TODO npm install moment --save

export default class ShowActivitiesDeveloper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
            estados: ["En curso", "Finalizada", "Cerrada", "Aprobada"]
        }
    }

    //Obtiene las actividades de un proyecto
    componentDidMount() {
        const proyecto = this.props.match.params.proyecto
        window.sessionStorage.setItem('proyecto', proyecto);

        fetch(`http://virtual.lab.inf.uva.es:27014/api/actividad/${window.sessionStorage.getItem('user')}/${proyecto}`, {
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
            .then(responseJson => this.setState({ actividades: responseJson.data }))
            .catch(function (data) { console.log(data) });
    }

    //Cambia el color dependiendo del estado
    color = estado =>{
        if(estado === 0){
            return "small-box bg-yellow";
        }else if(estado === 1){
            return "small-box bg-green";
        }else if(estado === 2){
            return "small-box bg-purple";
        }else if(estado === 3){
            return "small-box bg-red";
        }
    }

    //Genera la vista
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
                                    <div className={this.color(actividad.estado)}>
                                    <div className="inner">
                                        <h3>{actividad.nombreActividad}</h3>
                                        <p>{actividad.descripcion}</p>
                                        <p style={{float: 'left'}} align="left">Inicio: {Moment(actividad.fechaInicio).format('DD/MM/YYYY')}</p>
                                        <p style={{clear: 'right'}} align="right">Estado: {this.state.estados[actividad.estado]}</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-gear"></i>
                                    </div>
                                    <Link to={"/developer/project/"+this.props.match.params.proyecto+"/activities/"+actividad.nombreActividad} className="small-box-footer">Ver mas y acceso informes<i className="fa fa-arrow-circle-right"></i></Link>
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