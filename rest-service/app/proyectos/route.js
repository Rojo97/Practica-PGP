var VerifyToken = require('../auth/VerifyToken');
function init(app, dbPool, db) {

    app.get('/api/proyecto/:nombreProyecto', VerifyToken, (req, res) => {
        var query = db.querys.proyectos.getProyectoByNombre;

        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Devuelto proyecto");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/actividades/:fechaInicio/:fechaFin', VerifyToken, (req, res) => {
        const nombreProyecto = req.params.nombreProyecto;
        const fechaInicio = req.params.fechaInicio;
        const fechaFin = req.params.fechaFin;

        if (req.query.estado) {
            var query = db.querys.actividades.getActividadIntervaloByEstado;
            var args = [nombreProyecto, req.query.estado, fechaInicio, fechaFin];
        }
        else {
            var query = db.querys.actividades.getActividadIntervalo;
            var args = [nombreProyecto, fechaInicio, fechaFin];
        }


        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Actividades enviadas");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/actividades/pasadasDeTiempo', VerifyToken, (req, res) => {
        const nombreProyecto = req.params.nombreProyecto;

        var query = db.querys.actividades.getActividadCritica;
        var args = [nombreProyecto];



        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Actividades enviadas");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/actividad/:nombreActividad/candidatos', VerifyToken, (req, res) => {
        var query = db.querys.actividades.getCandidatosActividad;

        const nombreProyecto = req.params.nombreProyecto;
        const nombreActividad = req.params.nombreActividad;
        var args = [nombreActividad, nombreProyecto, nombreActividad, nombreProyecto, nombreActividad, nombreProyecto, nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Candidatos enviados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/informesSemanales', VerifyToken, (req, res) => {
        var query = db.querys.informeSemanal.getInformeByEstado;

        const nombreProyecto = req.params.nombreProyecto;
        var args = [req.query.estado, nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Informes semanales enviados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })


    app.get('/api/proyecto', VerifyToken, (req, res) => {
        if (req.query.estado) {
            var query = db.querys.proyectos.getProyectosByEstado;
            var args = [req.query.estado];
        } else {
            var query = db.querys.proyectos.getProyectos;
            var args = [];
        }
        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Devueltos proyectos finalizados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else {
                res.status(500).send('Error on the server.');
            }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.post('/api/proyecto/:nombreProyecto/participacion', VerifyToken, (req, res) => {
        const query = db.querys.participacion.insertParticipacionUsuario;
        var nombreProyecto = req.params.nombreProyecto;
        var args = [req.body.porcentajeParticipacion, nombreProyecto, req.body.nickUsuario, req.body.rol];

        function onResults(error, results, response) {
            if (!error) {
                console.log("Participacion creada");
                response.status(201).json({});
            } else {
                res.status(409).send('Ya existe una participacion con ese nombre');
            }
        };


        db.execQuery(dbPool, query, args, onResults, res);

    })

    app.post('/api/proyecto', VerifyToken, (req, res) => {
        var args = [req.body.nombreProyecto, req.body.resumen];
        var args2 = [req.body.nombreProyecto, req.body.nickUsuario];
        const query = db.querys.proyectos.insert;
        const query2 = db.querys.participacion.insertParticipacionJefe;

        function onResults(error, results, response) {
            if (!error) {
                db.execQuery(dbPool, query2, args2, onResults2, res);
            } else { res.status(500).send('Error on the server.'); }
        };

        function onResults2(error, results, response) {
            if (!error) {
                console.log("Proyecto creado");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };


        db.execQuery(dbPool, query, args, onResults, res);

    })

    app.put('/api/proyecto/:nombreProyecto', VerifyToken, (req, res) => {
        const query = db.querys.proyectos.updateProyecto;
        const query2 = db.querys.participacion.updateEstadoParticipacion;

        const nombreProyecto = req.params.nombreProyecto;
        var args = [req.body.fechaFin, req.body.estado, req.body.informeDeSeguimientoTemporal, req.body.resumen, nombreProyecto];
        var args2 = [req.body.estado, nombreProyecto]

        function onResults(error, results, response) {
            if (!error) {
            } else { res.status(500).send('Error on the server.'); }
        };

        function onResults2(error, results, response) {
            if (!error) {
                console.log("Proyecto actualizado");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };


        db.execQuery(dbPool, query, args, onResults, res);
        db.execQuery(dbPool, query2, args2, onResults2, res);

    })



    app.post('/api/proyecto/:nombreProyecto/cargaPlan', VerifyToken, (req, res) => {

        var nombreProyecto = req.params.nombreProyecto;
        var actividades = req.body.actividades;
        var presupuesto = req.body.presupuesto;
        var fechaComienzo = req.body.fechaComienzo;

        query1 = db.querys.actividades.insert;
        query2 = db.querys.actividades.insertPredecesora;
        query3 = db.querys.proyectos.updateCargaProyecto;

        function onResults(error, results, response) {
            if (error) console.log(error);
        };

        function onResults2(error, results, response) {
            if (!error) {
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };

        actividades.forEach(actividad => {
            args = [actividad.nombre, nombreProyecto, actividad.descripcion, actividad.duracion, actividad.rol];
            db.execQuery(dbPool, query1, args, onResults, res);

        });

        actividades.forEach(actividad => {
            actividad.actividadesPredecesoras.forEach(predecesora => {
                args2 = [actividad.nombre, predecesora.nombre, nombreProyecto];
                db.execQuery(dbPool, query2, args2, onResults, res);
            });
        });

        args3 = [fechaComienzo, presupuesto, nombreProyecto];
        db.execQuery(dbPool, query3, args3, onResults2, res);
        console.log("Plan cargado");
    })

    app.get('/api/proyecto/:nombreProyecto/actividades', VerifyToken, (req, res) => {
        var query = db.querys.proyectos.getActividadesProyecto;

        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Actividades enviadas");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/participantes', VerifyToken, (req, res) => {
        const nombreProyecto = req.params.nombreProyecto;

        if (req.query.rol) {
            var query = db.querys.proyectos.getParticipantesProyectoConRol;
            var args = [nombreProyecto, req.query.rol];
        } else {
            var query = db.querys.proyectos.getParticipantesProyecto;
            var args = [nombreProyecto];
        }


        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Participantes del proyecto enviados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/candidatos', VerifyToken, (req, res) => {
        const nombreProyecto = req.params.nombreProyecto;

        var query = db.querys.proyectos.getCandidatos;
        var args = [nombreProyecto];


        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Candidatos enviados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;