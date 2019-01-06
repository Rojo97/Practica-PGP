var VerifyToken = require('../auth/VerifyToken');
function init(app, dbPool, db) {
    app.get('/api/actividad/:nickUsuario/:nombreProyecto', VerifyToken ,(req, res) => {
        var query = db.querys.actividades.getActividadesUsuario;

        const nickUsuario = req.params.nickUsuario;
        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreProyecto, nickUsuario];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Actividades del usuario enviadas");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/actividad/:nombreActividad/proyecto/:nombreProyecto', VerifyToken, (req, res) => {
        var query = db.querys.actividades.getActividadesById;

        const nombreActividad = req.params.nombreActividad;
        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreActividad,nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Actividad enviada");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.put('/api/actividad', VerifyToken, (req, res) => {
        var query = db.querys.actividades.updateActividad;

        const fechaFin = req.body.fechaFin;
        const estado = req.body.estado;
        const nombreActividad = req.body.nombreActividad;
        const nombreProyecto = req.body.nombreProyecto;
        const duracionReal = req.body.duracionReal;
        var args = [fechaFin, estado, duracionReal, nombreActividad, nombreProyecto];

        function onResults(error, results, response) {
            if (!error) {
                console.log("Actividad creada");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;