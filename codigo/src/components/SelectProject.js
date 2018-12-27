import React, { Component } from 'react';

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
                            <div class="small-box bg-purple">
                                <div class="inner">
                                    <h3>Tu puto proyecto 1</h3>

                                    <p>Soy la fucking descripción</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-ge"></i>
                                </div>
                                <a href="#" class="small-box-footer">Seleccionar <i class="fa fa-arrow-circle-right"></i></a>
                            </div>

                            <div class="small-box bg-purple">
                                <div class="inner">
                                    <h3>Tu puto proyecto 2</h3>

                                    <p>Soy la fucking descripción</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-rebel"></i>
                                </div>
                                <a href="#" class="small-box-footer">Seleccionar <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}