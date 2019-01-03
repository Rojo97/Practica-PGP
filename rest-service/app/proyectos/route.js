var VerifyToken = require('../auth/VerifyToken');
function init(app, dbPool, db) {

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
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };


        db.execQuery(dbPool, query, args, onResults, res);

    })

    app.post('/api/proyecto/:nombreProyecto/cargaPlan', (req, res) => {

        var nombreProyecto = req.params.nombreProyecto;
        var actividades = req.body.actividades;

        query1 = db.querys.actividades.insert;
        query2 = db.querys.actividades.insertPredecesora;

        function onResults(error, results, response) {
            if (error) console.log(error);
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
        res.status(201).json({});
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
                    console.log("Peticion recibida");
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