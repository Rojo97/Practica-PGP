import React, { Component } from 'react';
import Moment from 'moment';

export default class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividad: [],
            informe: [],
            informeEdit: 0,
            texto: '',
            horas: '',
            estadosInforme: ["Aceptado", "Rechazado", "Enviado y pendiente de aceptación", "Pendiente de envio"],
            estados: ["En curso", "Finalizada", "Cerrada", "Aprobada"],
            roles: ["Administrador", "Jefe de proyecto", "Analista", "Diseñador, Analista-Programador o Responsable del equipo de pruebas", "Programador o probador"],
        }
    }

    /*Al montar el componente se carga la actividad */
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
            .catch(function (data) { console.log(data) });
    }

    /*Actualizacion de la actividad */
    putInforme =  estadoInforme => {
        fetch(`http://virtual.lab.inf.uva.es:27014/api/informeSemanal`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                estado: estadoInforme,
                numeroInforme: this.state.informe.numeroInforme,
                informeTareasPersonales: this.state.texto,
                horas: this.state.horas,
            })
        }).then(function (res) { console.log(res) })
            .then(() => {
                if (estadoInforme == 3) {
                    alert("Informe guardado")
                } else {
                    alert("Informe enviado");
                }
            })
            .catch(function (res) { console.log(res) });
    }

    /*Obtine el informe semanal y habilita su edicion */
    activeInforme = event => {
        const proyecto = this.props.match.params.proyecto;
        const actividad = this.props.match.params.actividad;
        const user = window.sessionStorage.getItem('user');

        fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario/${user}/proyecto/${proyecto}/actividad/${actividad}/informeSemanal`, {
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
            .then(responseJson =>{ 
                this.setState({ informe: responseJson.data[0] });
            }).then(()=>{
                if(this.state.informe.estado === 3 || this.state.informe.estado === 1){
                    this.setState({ informeEdit: 1 });
                    this.setState({ texto: this.state.informe.informeTareasPersonales });
                    this.setState({ horas: this.state.informe.horas })
                    console.log(this.state);
                }else{
                    alert("El informe ya ha sido " + this.state.estadosInforme[this.state.informe.estado]);
                    this.setState({ informeEdit: 2 });
                }
            })
            .catch(function (data) { console.log(data) });
        
    }
    
    /*Actualiza el estado cuando se cambia un input */
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

    /*Actualiza el estado cuando se cambia un input y lo que se introduce es un numero */
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

    /*Genera la vista */
    render() {
        let nuevoInforme;
        let botonInforme;

        if (this.state.informeEdit === 0) { //Si no hemos accedido al inorme
            nuevoInforme = '';
            botonInforme =
                <div className="box-footer">
                    <button type="submit" className="btn btn-info pull-right" onClick={this.activeInforme}>Informe de desarrollador</button>
                </div>;
        } else if(this.state.informeEdit === 1){ //edicion de informe activada
            botonInforme = '';
            nuevoInforme =
                    <div className="box ">
                        <div className="box-header with-border">
                            <h3 className="box-title">Editar informe semanal</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group">
                                <label htmlFor="inputDuracion">Horas trabajadas</label>
                                <input type="input" className="form-control" name="horas" placeholder="Horas trabajadas" value={this.state.horas} onChange={this.handleInputChangeNumber} />
                            </div>
                            <div className="form-group">
                                <label>Comentarios</label>
                                <textarea className="form-control" rows="3" placeholder="Texto del informe" name="texto" value={this.state.texto} onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button className="btn btn-info pull-right" onClick={()=>{this.putInforme(2)}}>Enviar informe</button>
                            <button className="btn btn-info pull-left" onClick={()=>{this.putInforme(3)}}>Guardar sin enviar</button>
                        </div>
                    </div>;
        }else{ //Informe enviado o aprobado
            botonInforme = '';
            nuevoInforme =
                    <div className="box ">
                        <div className="box-header with-border">
                            <h3 className="box-title">Informe semanal</h3>
                        </div>
                        <div className="box-body">
                            <h4>Horas trabajadas: {this.state.informe.horas}</h4>
                            <h4>Comentarios: {this.state.informe.informeTareasPersonales}</h4>
                        </div>
                    </div>;
        }

        return ( //Vista base
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
                                {botonInforme}
                            </div>
                            {nuevoInforme}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}