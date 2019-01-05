import React, { Component } from 'react';
import Moment from 'moment';

export default class ActivityDetailAndEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividad: [],
            edit: 0,
            fechaFin: '',
            estado: '',
            duracionReal: '',
            estados: ["En curso", "Finalizada", "Cerrada", "Aprobada"],
            roles: ["Administrador", "Jefe de proyecto", "Analista", "Diseñador, Analista-Programador o Responsable del equipo de pruebas", "Programador o probador"],
        }

        this.activeEdit = this.activeEdit.bind(this);
        this.editActivity = this.editActivity.bind(this);
    }

    componentDidMount() {
        const proyecto = this.props.match.params.proyecto;
        const actividad = this.props.match.params.actividad;

        fetch(`http://virtual.lab.inf.uva.es:27014/api/actividad/${actividad}/proyecto/${proyecto}`, {
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
            .then(() => {
                this.setState({ fechaFin: Moment(this.state.actividad.fechaFin).format('YYYY-MM-DD') });
                this.setState({ estado: this.state.actividad.estado });
                this.setState({ duracionReal: this.state.actividad.duracionReal });
            })
            .catch(function (data) { console.log(data) });
    }

    activeEdit(event) {
        this.setState({ edit: 1 });
        console.log(this.state);
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

    handleInputChangeNumber = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (isNaN(value) === false) {
            console.log(value);
            this.setState(prevState => {
                return {
                    ...prevState, [name]: value
                }
            }, () => console.log(this.state)
            )
        }
    }

    editActivity(event) {
        event.preventDefault();
        fetch(`http://virtual.lab.inf.uva.es:27014/api/actividad`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                nombreActividad: this.state.actividad.nombreActividad,
                nombreProyecto: this.state.actividad.nombreProyecto,
                descripcion: this.state.actividad.descripcion,
                duracionEstimada: this.state.actividad.duracionEstimada,
                duracionReal: this.state.duracionReal,
                fechaInicio: this.state.actividad.fechaInicio,
                fechaFin: this.state.fechaFin,
                estado: this.state.estado,
                rol: this.state.actividad.rol,
            })
        }).then(function (res) { console.log(res) })
            .then(() => { alert("Actividad modificada"); window.location.reload(false); })
            .catch(function (res) { console.log(res) });

    }

    render() {
        let edit;
        let editmenu;

        if (this.state.edit === 0) {
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
                            <div className="form-group">
                                <label>Fecha de finalización:</label>
                                <div className="input-group date">
                                    <div className="input-group-addon">
                                        <i className="fa fa-calendar"></i>
                                    </div>
                                    <input type="date" className="form-control pull-right" name="fechaFin" value={this.state.fechaFin} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDuracion">Duración real</label>
                                <input type="input" className="form-control" name="duracionReal" placeholder="Duracion Real" value={this.state.duracionReal} onChange={this.handleInputChangeNumber} />
                            </div>
                            <div className="form-group">
                                <label>Estado</label>
                                <select className="form-control" name="estado" value={this.state.estado} onChange={this.handleInputChange} >
                                    <option disabled value=''> -- Seleccione estado -- </option>
                                    <option value="0">En curso</option>
                                    <option value="1">Finalizada</option>
                                    <option value="2">Cerrada</option>
                                    <option value="3">Aprobada</option>
                                </select>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button type="submit" className="btn btn-info pull-right" onClick={this.editActivity}>Editar</button>
                        </div>
                    </div>
                </form>
        }

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Actividad {this.state.actividad.nombreActividad}</h1>
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
                                        <h4>-Duración estimada: {this.state.actividad.duracionEstimada}</h4>
                                        <h4>-Duración real: {this.state.actividad.duracionReal}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <h4>-Fecha de inicio: {Moment(this.state.actividad.fechaInicio).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin estimada: {Moment(this.state.actividad.fechaFinEstimada).format('DD/MM/YYYY')}</h4>
                                        <h4>-Fecha de fin Real: {Moment(this.state.actividad.fechaFin).format('DD/MM/YYYY')}</h4>
                                        <h4>-Estado actual: {this.state.estados[this.state.actividad.estado]}</h4>
                                        <h4>-Rol: {this.state.roles[this.state.actividad.rol]}</h4>
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