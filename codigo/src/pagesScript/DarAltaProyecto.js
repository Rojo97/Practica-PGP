import React, { Component } from 'react';
// import axios from 'axios'

export default class DarAltaProyecto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            fechaComienzo: '',
            presupuesto: '',
            idJefeProyecto: '',
            descripccion: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addProject = this.addProject.bind(this);
        this.getJefesProyecto = this.getJefesProyecto.bind(this);
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

    // handleClick() {
    //     axios.get('http://virtual.lab.inf.uva.es:27014/api/usuario?selectableAsJefe=true')
    //         .then(response => console.log(response))
    // }

    getJefesProyecto(event) {
        console.log("ESTOY VIVO")
        event.preventDefault();
        fetch('virtual.lab.inf.uva.es:27014/api/usuario?selectableAsJefe=true')
            .then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                    console.log("Mensaje");
                }else{
                    console.log("hOLAAAA");
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);
            });
    }



    // getJefesProyecto(event) {
    //     fetch(`http://virtual.lab.inf.uva.es:27014/api/usuario?selectableAsJefe=true`)
    //         .then(response => response.json())
    //         .catch(function (res) { console.log(res) });
    // }

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
        }).then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) });

    }

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
                                    <button onClick={this.getJefesProyecto}>Pulsa</button>
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
                                            <select class="form-control" name="idJefeProyecto" value={this.state.jefeProyecto} onChange={this.handleInputChange} onClick={this.getJefesProyecto}>
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                <option value="1">Jefe 1</option>
                                                <option value="2">Jefe 2</option>
                                                <option value="3">Jefe 3</option>
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
