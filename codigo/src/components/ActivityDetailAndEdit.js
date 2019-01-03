import React, { Component } from 'react';
import Moment from 'moment';

export default class ActivityDetailAndEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividad: [],
            edit: 0,
            estados: ["En curso", "Finalizada", "Cerrada", "Aprobada"]
        }

        this.activeEdit = this.activeEdit.bind(this);
    }

    componentDidMount() {
        const nombre = this.props.match.params.nombre

        fetch(`http://virtual.lab.inf.uva.es:27014/api/actividad/${nombre}/proyecto/ProyectoA`, {
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
            .then(responseJson => this.setState({ actividad: responseJson.data[0] }))
            .catch(function (data) { console.log(data) });
    }

    activeEdit(event) {
        this.setState({ edit: 1 });
        console.log(this.state);
    }

    render() {
        let edit;
        let editmenu;

        if (this.state.edit == 0) {
            edit =
                <div className="box-footer">
                    <button type="submit" className="btn btn-info pull-right" onClick={this.activeEdit}>Editar</button>
                </div>;
            editmenu = "";
        } else {
            edit = "";
            editmenu =
                <form>
                    <div className="box ">
                        <div className="box-header with-border">
                            <h3 className="box-title">Editar actividad</h3>
                        </div>
                        <div className="box-body">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Fecha de finalización:</label>
                                    <div className="input-group date">
                                        <div className="input-group-addon">
                                            <i className="fa fa-calendar"></i>
                                        </div>
                                        <input type="date" className="form-control pull-right" name="fechafin" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Estado</label>
                                    <select className="form-control" name="tipo" >
                                        <option disabled value=''> -- Seleccione estado -- </option>
                                        <option value="0">En curso</option>
                                        <option value="1">Finalizada</option>
                                        <option value="2">Cerrada</option>
                                        <option value="3">Aprobada</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h1>Tema usuarios</h1>{/*TODO Aun por ver como se implementa */}
                                <h3>Aqui saldran los usuarios y existirá la posibilidad de añadir y eliminar</h3>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-info pull-right" onClick={this.activeEdit}>Editar</button>
                        </div>
                    </div>
                </form>
        }

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Actividad numero {this.state.actividad.numeroActividad}</h1> {/*TODO nombre dinamico*/}
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box ">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Detalles de la actividad</h3>
                                </div>
                                <div className="box-body">
                                    <div className="col-md-6">
                                        <h4>-Proyecto : {this.state.actividad.nombreProyecto}</h4>
                                        <h4>-Participantes: {this.state.actividad.nickUsuario}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>-Fecha de inicio: {Moment(this.state.actividad.fechaInicio).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin estimada: {Moment(this.state.actividad.fechaFinEstimada).format('DD/MM/YYYY')}</h4>
                                        <h4>-Estado actual: {this.state.estados[this.state.actividad.estado]}</h4>
                                    </div>
                                    <div className="box-body">
                                        <h3>Descripción:</h3>
                                        <h4>{this.state.actividad.descripcion}</h4>
                                    </div>
                                </div>
                                {edit}
                            </div>
                            {editmenu}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}