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
            listaActividades: [],

            //Formato del JSon que contendrá los datos de cada jefe de proyecto
            actividad: {
                nombre: '',
                descripccion: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addProject = this.addProject.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);

    }


    //Acciones que se realizan antes de montar el componente
    componentDidMount() {
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
            //, () => console.log(this.state)
        )
    }

    displayData(content) {
        console.log(content);
    }

    cargaJson(content){
        try{
            var json = JSON.parse(content);
            for(let i in json){
                for(let j in json[i]){
                    let a = json[i][j];
                    if (a.nombre!="" && a.descripccion!="" && a.duracion!="") {
                        console.log("Bien "+j);
                    }
                }
            }
            this.setState({listaActividades: json});
            alert("Se ha cargado el plan de proyecto satisfactoriamente");
            console.log(this.state.listaActividades);
        }catch(err){
            alert("Ha habido un error al cargar el archivo json");
            document.getElementById("archivoPlanProyecto").value="";
        }
        //console.log(json);
    }

    handleFileSelect(evt) {
        let files = evt.target.files;
        if (!files.length) {
            alert('No file select');
            return;
        }
        let json;
        let file = files[0];
        let that = this;
        let reader = new FileReader();
        reader.onload = function (e) {
            //that.displayData(e.target.result);
            that.cargaJson(e.target.result);
        };
        reader.readAsText(file);
    }

    validaFormulario() {
        //Se comprueba el nombre
        var x = document.forms["formularioProyecto"]["nombre"].value;
        if (x == '') {
            alert("Introduzca un nombre de proyecto");
            return false;
        }

        //Se comprueba la fecha de comienzo
        //Si se introduce una fecha que no existe el formulario devuelve '' también
        x = document.forms["formularioProyecto"]["fechaComienzo"].value;
        if (x == '') {
            alert("Introduzca una fecha válida");
            return false;
        }

        //Se comprueba el presupuesto
        x = document.forms["formularioProyecto"]["presupuesto"].value;
        //console.log("Ahi va: " + Number(x));
        if (x == '') {
            alert("Introduzca un presupuesto");
            return false;
        } else if (isNaN(Number(x))) {
            alert("Introduzca un presupuesto válido");
            return false;
        } else if (x < 1) {
            alert("Introduzca un presupuesto mayor que 0");
            return false;
        }

        //Se comprueba el jefe de proyecto
        x = document.forms["formularioProyecto"]["idJefeProyecto"].value;
        if (x == '') {
            alert("Seleccione un jefe de proyecto");
            return false;
        }

        //Se comprueba la descripcción
        x = document.forms["formularioProyecto"]["descripccion"].value;
        if (x == '') {
            alert("Introduzca una descripcción");
            return false;
        }

        return true;
    }

    //Render para añadir los jefes como opcion del desplegable
    renderJefe = ({ nickUsuario }) => <option value={nickUsuario}>{nickUsuario}</option>

    //Manda el proyecto con todos sus datos validados al backend
    addProject(event) {
        event.preventDefault();

        //Se comprueba primero que todos los campos del formulario sean validos
        if (this.validaFormulario()) {
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
                    presupuesto: this.state.presupuesto,
                    fechaInicial: this.state.fechaComienzo,
                })
            }).then((response) => {
                //console.log("Codigo de estado: " + response.status);
                switch (response.status) {
                    case 201:
                        alert("Proyecto creado");

                        //Una vez creado el proyecto se resetean los campos del formulario
                        this.setState({ nombre: '' });
                        this.setState({ fechaComienzo: '' });
                        this.setState({ presupuesto: '' });
                        this.setState({ idJefeProyecto: '' });
                        this.setState({ descripccion: '' });

                        //Se actualizan los jefes de proyecto restantes 
                        //y se cambia la opcion seleccionada en el desplegable
                        this.getJefesProyecto();
                        document.forms["formularioProyecto"]["idJefeProyecto"].value = "";
                        break;

                    //TODO Falta ver que codigo de error es
                    case 5000:
                        alert("Existe un proyecto con ese nombre");
                    default:
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
                        <form role="form" name="formularioProyecto">
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
                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info" onClick={this.cargaPlan}>Cargar</button>
                                    </div>
                                </div>
                                <div class="box box-primary">
                                    <div class="box-header with-border">
                                        <h3 class="box-title">Asignar actividades</h3>
                                    </div>
                                    <div class="box-body">
                                        <label></label>
                                        <div class="form-group">
                                            <label>Actividad</label>
                                            <select class="form-control" name="idJefeProyecto" value={this.state.jefeProyecto} onChange={this.handleInputChange} >
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {/* {this.state.listaJefes.map(this.renderJefe)} */}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label>Empleado</label>
                                            <select class="form-control" name="idJefeProyecto" value={this.state.jefeProyecto} onChange={this.handleInputChange} >
                                                <option disabled selected value=""> -- Sin determinar -- </option>
                                                {/* {this.state.listaJefes.map(this.renderJefe)} */}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="box-footer">
                                        <button type="submit" class="btn btn-info pull-left" onClick={this.addProject}>Asignar</button>
                                        <button type="submit" class="btn btn-info pull-right" onClick={this.addProject}>Guardar</button>
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
