import React, { Component } from 'react';

export default class DarAltaProyecto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            fechaComienzo: '',
            presupuesto: '',
            idJefeProyecto: '',
            descripccion: '',
            listaJefes: [],
            jefe: {
                nickUsuario: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addProject = this.addProject.bind(this);

    }

    componentDidMount() {
        this.getJefesProyecto();
    }

    handleInputChange(event) {
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

    getJefesProyecto() {
        fetch('http://virtual.lab.inf.uva.es:27014/api/usuario?selectableAsJefe=1')
            .then((response) => {
                switch (response.status) {
                    case 200:
                        console.log(response);
                        break;
                    case 404:
                        this.setState({ listaJefes: [] });
                        alert("No hay jefes de proyecto disponibles");
                        break;
                    default:
                        throw new Error("Bad response from server");
                }
                return response.json();

            }).then((responseJson) => {
                this.setState({ listaJefes: responseJson.data })
            })
            .catch(function (data) {
                console.log(data)
            });
    }

    renderJefe = ({ nickUsuario }) => <option value={nickUsuario}>{nickUsuario}</option>

    addProject(event) {
        event.preventDefault();
        fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreProyecto: this.state.nombre,
                resumen: this.state.descripccion,
                nickUsuario: this.state.idJefeProyecto,
            })
        }).then((response) => {
            switch (response.status) {
                case 201:
                    alert("Proyecto creado");
                    console.log(response);
                    this.setState({ nombre: '' });
                    this.setState({ fechaComienzo: '' });
                    this.setState({ presupuesto: '' });
                    this.setState({ idJefeProyecto: '' });
                    this.setState({ descripccion: '' });
                    this.getJefesProyecto();
                    break;
                default:
                    throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (responseJson) {
            console.log(responseJson)
        }).catch(function (res) { console.log(res) });
    }

    render() {
        console.log("Renderiza");
        return (
            <div className="content-wrapper">
                <section class="content-header">
                    <h1>
                        Dar de alta proyecto
                    </h1>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form role="form" id="formularioProyecto">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Datos del proyecto</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <label for="nombre">Nombre</label>
                                            <input type="text" class="form-control" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleInputChange} />
                                        </div>
                                        <div class="form-group">
                                            <label>Fecha de comienzo:</label>
                                            <div class="input-group date">
                                                <div class="input-group-addon">
                                                    <i class="fa fa-calendar"></i>
                                                </div>
                                                <input type="date" class="form-control pull-right" name="fechaComienzo" value={this.state.fechaComienzo} onChange={this.handleInputChange} />
                                            </div>
                                        </div>
                                        <label for="nombre">Presupuesto</label>
                                        <div class="input-group">
                                            <span class="input-group-addon">€</span>
                                            <input type="text" class="form-control" name="presupuesto" placeholder="Presupuesto" value={this.state.presupuesto} onChange={this.handleInputChange} />
                                            <span class="input-group-addon">.00</span>
                                        </div>
                                        <label></label>
                                        <div class="form-group">
                                            <label>Jefe de proyecto</label>
                                            <select class="form-control" name="idJefeProyecto" value={this.state.jefeProyecto} onChange={this.handleInputChange} >
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {this.state.listaJefes.map(this.renderJefe)}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Descripcción</label>
                                            <textarea class="form-control" rows="3" name="descripccion" placeholder="Descripccion del proyecto" value={this.state.descripccion} onChange={this.handleInputChange}></textarea>
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right" onClick={this.addProject}>Dar de alta</button>
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
