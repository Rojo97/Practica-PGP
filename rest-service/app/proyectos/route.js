function init(app, dbPool, db) {

    app.post('/api/proyecto', (req, res) => {
        console.log(req.body);
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
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };


        db.execQuery(dbPool, query, args, onResults, res);

    })

    app.get('/api/proyecto/:nombreProyecto/actividades', (req, res) => {
        var query = db.querys.proyectos.getActividadesProyecto;

        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Peticion recibida");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/proyecto/:nombreProyecto/participantes', (req, res) => {
        const nombreProyecto = req.params.nombreProyecto;

        if (req.query.rol != null) {
            var query = db.querys.proyectos.getParticipantesProyectoConRol;
            var args = [nombreProyecto, rol];
        } else {
            var query = db.querys.proyectos.getParticipantesProyecto;
            var args = [nombreProyecto];
        }


        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Peticion recibida");
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