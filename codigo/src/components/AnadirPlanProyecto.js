import React, { Component } from 'react';

//Implementación de la vista para añadir el plan de proyecto a un proyecto
export default class DarAltaProyecto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaComienzo: '',
            presupuesto: '',
            listaActividades: [],

            //Formato del JSon que contendrá los datos de las actividades
            actividad: {
                nombre: '',
                descripccion: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addDetallesProyecto = this.addDetallesProyecto.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);

    }

    //Actualiza el valor de this.state con cada cambio en el formulario
    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        //console.log(value);
        this.setState(prevState => {
            return {
                ...prevState, [name]: value
            }
        }
            , () => console.log(this.state)
        )
    }


    //Se valida el json y se carga en la lista de actividades
    cargaJson(content) {
        try {
            var json = JSON.parse(content);

            //Se realiza la validacion de los atributos del json
            for (let i in json) {
                for (let j in json[i]) {
                    let a = json[i][j];
                    if (a.nombre !== "" && a.descripcion !== "" && a.duracion !== "") {
                        if(isNaN(Number(a.duracion)) || Number(a.duracion)<0){
                            throw "Argument invalid";
                        }else if(a.duracion!=="0" && (isNaN(Number(a.rol)) || a.rol<1 || a.rol>3)){
                            console.log(a.duracion);
                            throw "Argument invalid";
                        }
                    }else{
                        throw "Argument invalid";
                    }
                }
            }
            this.setState({ listaActividades: json });
            alert("Se ha cargado el plan de proyecto satisfactoriamente");
            console.log(this.state.listaActividades);
        } catch (err) {
            alert("Ha habido un error al cargar el archivo json");
            document.getElementById("archivoPlanProyecto").value = "";
            this.setState({ listaActividades: [] });
            console.log(this.state);
        }
    }

    //Se carga el archivo seleccionado como plan de proyecto
    handleFileSelect(evt) {
        let files = evt.target.files;
        if (!files.length) {
            alert('No file select');
            return;
        }
        let file = files[0];
        let that = this;
        let reader = new FileReader();

        //Se asigna la función que se realiza al cargar el archivo
        reader.onload = function (e) {
            that.cargaJson(e.target.result);
        };
        reader.readAsText(file);
    }

    //Se validan los campos del formulario y se suben las actividades y detalles del proyecto
    validaFormulario() {
        //Se comprueba el nombre
        var x = document.forms["formularioProyecto"]["archivoPlanProyecto"].value;
        if (x === '') {
            alert("Cargue un plan de proyecto");
            return false;
        }

        //Se comprueba la fecha de comienzo
        //Si se introduce una fecha que no existe el formulario devuelve '' también
        x = document.forms["formularioProyecto"]["fechaComienzo"].value;
        if (x === '') {
            alert("Introduzca una fecha válida");
            return false;
        }
        //Se comprueba que la fecha sea posterior o igual a la actual
        var today = new Date();
        var fechaIntroducida = new Date(x);
        if(fechaIntroducida<=today){
            alert("Introduzca una posterior a la actual");
            return false;
        }

        //Se comprueba el presupuesto
        x = document.forms["formularioProyecto"]["presupuesto"].value;
        //console.log("Ahi va: " + Number(x));
        if (x === '') {
            alert("Introduzca un presupuesto");
            return false;
        } else if (isNaN(Number(x))) {
            alert("Introduzca un presupuesto válido");
            return false;
        } else if (x < 1) {
            alert("Introduzca un presupuesto mayor que 0");
            return false;
        }

        return true;
    }

    //Manda la lista de actividades y los detalles del proyecto validados al backend
    addDetallesProyecto(event) {
        event.preventDefault();

        //Se comprueba primero que todos los campos del formulario sean validos
        if (this.validaFormulario()) {
            const nombre = this.props.match.params.proyecto

            fetch(`http://virtual.lab.inf.uva.es:27014/api/proyecto/${nombre}/cargaPlan`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    presupuesto: this.state.presupuesto,
                    fechaComienzo: this.state.fechaComienzo,
                    actividades: this.state.listaActividades.actividades,
                })
            }).then((response) => {
                switch (response.status) {
                    case 201:
                        console.log(this.state.listaActividades.actividades);
                        alert("Detalles de proyecto cargados correctamente");

                        //Una vez creado el proyecto se resetean los campos del formulario
                        this.setState({ listaActividades: [] })
                        this.setState({ fechaComienzo: '' });
                        this.setState({ presupuesto: '' });

                        document.getElementById("archivoPlanProyecto").value = "";

                        break;

                    default:
                        alert("Algo ha pasado");
                        throw new Error("Bad response from server");
                }
                return response.json();
            }).catch(function (res) { console.log(res) });
        }

    }

    render() {
        return (
            <div className="content-wrapper">
                <section class="content-header">
                    <h1>
                        Añadir plan de proyecto
                    </h1>
                </section>
                <section class="content">
                    <div class="row box-body">
                        <form name="formularioProyecto">
                            <div class="col-md-12">
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Plan de proyecto</h3>
                                    </div>
                                    <div class="box-body">
                                        <div class="form-group">
                                            <input type="file" class="form-control" ref="file" accept=".json" name="archivoPlanProyecto" id="archivoPlanProyecto" aria-describedby="fileHelp"
                                                onChange={this.handleFileSelect} />
                                        </div>
                                    </div>
                                </div>
                                <div class="box box-primary">
                                    <div class="box-body">
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
                                    </div>

                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-right" onClick={this.addDetallesProyecto}>Cargar detalles</button>
                                    </div>
                                    <div>

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
