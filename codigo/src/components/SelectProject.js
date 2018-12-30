import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class SelectProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proyectos: [],
        }
    }

    componentDidMount() {
        fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario/ivan/proyectos?actual=1`)
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
                        Seleccionar proyecto
                    </h1>
                </div>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                {this.state.proyectos.map(proyecto => (
                                    <div className="small-box bg-purple">
                                    <div className="inner">
                                        <h3>{proyecto.nombreProyecto}</h3>
                                        <p>{proyecto.resumen}</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-gear"></i>
                                    </div>
                                    <Link to={`/proyecto/${proyecto.nombreProyecto}`} className="small-box-footer">Seleccionar <i className="fa fa-arrow-circle-right"></i></Link>
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