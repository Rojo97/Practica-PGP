import React, { Component } from 'react';

export default class DarAltaProyecto extends Component {
    //     constructor(props){
    //         super(props);
    //         this.state={
    //             login:'Rojo',
    //             password:'soylapuñeterapass',
    //             dni:'soyeldni',
    //             nombre:'Corde',
    //             apellido1:'benito',
    //             apellido2:'camelas',
    //             fechaNacimiento:'2018-12-3',
    //             tipo:'0',
    //             categoria:'3',
    //         }
    //     }

    //     addUser = _ => {
    //         fetch(`http://localhost:8080/usuario/post?nickUsuario=${this.state.login}&contrasenia=${this.state.password}&dni=${this.state.dni}&nombre=${this.state.nombre}&apellido1=${this.state.apellido1}&apellido2=${this.state.apellido2}&fechaNacimiento=${this.state.fechaNacimiento}&tipoUsuario=${this.state.tipo}&categoriaUsuario=${this.state.categoria}`)
    //         .then(response => response.json())
    //         .catch(err => console.error(err));
    //     }

    render() {
        return (
            <div className="content-wrapper">
                <section class="content-header">
                    <h1>
                        Dar de alta proyecto
                    </h1>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form role="form">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Datos del proyecto</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label for="nombre">Nombre</label>
                                            <input type="text" class="form-control" id="nombre" placeholder="Nombre" />
                                        </div>
                                        <div class="form-group">
                                            <label>Fecha de comienzo:</label>

                                            <div class="input-group">
                                                <div class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </div>
                                                <input type="text" class="form-control" data-inputmask="'alias': 'dd-mm-yyyy'" data-mask />
                                            </div>
                                        </div>
                                        <label for="nombre">Presupuesto</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">€</span>
                                            <input type="text" class="form-control" id="presupuesto" placeholder="Presupuesto"/>
                                            <span class="input-group-addon">.00</span>
                                        </div>
                                        <label></label>
                                        <div class="form-group">
                                            <label>Jefe de proyecto</label>
                                            <select class="form-control" id="idJefeProyecto">
                                                <option selected value> -- Sin determinar -- </option>
                                                <option>Jefe 1</option>
                                                <option>Jefe 2</option>
                                                <option>Jefe 3</option>
                                            </select>
                                        </div>
                                        
                                    </div>

                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right">Dar de alta</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div >
        )
    }
}
