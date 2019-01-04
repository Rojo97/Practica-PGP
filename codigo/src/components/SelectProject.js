import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class SelectProject extends Component {
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
                            <div className="small-box bg-purple">
                                <div className="inner">
                                    <h3>Tu puto proyecto 1</h3>
                                    <p>Soy la fucking descripción</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-ge"></i>
                                </div>
                                <Link to="#" className="small-box-footer">Seleccionar <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                            <div className="small-box bg-purple">
                                <div className="inner">
                                    <h3>Tu puto proyecto 2</h3>
                                    <p>Soy la fucking descripción</p>
                                </div>
                                <div className="icon">
                                    <i className="fa fa-rebel"></i>
                                </div>
                                <Link to="#" className="small-box-footer">Seleccionar <i className="fa fa-arrow-circle-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}