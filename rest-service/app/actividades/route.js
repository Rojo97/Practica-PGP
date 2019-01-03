var VerifyToken = require('../auth/VerifyToken');
function init(app, dbPool, db) {
    app.get('/api/actividad/:nickUsuario/:nombreProyecto', VerifyToken ,(req, res) => {
        var query = db.querys.actividades.getActividadesUsuario;

        const nickUsuario = req.params.nickUsuario;
        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreProyecto, nickUsuario];

        function onResults(error, results, response) {
            if (!error) {
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/actividad/:nombreActividad/proyecto/:nombreProyecto', (req, res) => {
        var query = db.querys.actividades.getActividadesById;

        const nombreActividad = req.params.nombreActividad;
        const nombreProyecto = req.params.nombreProyecto;
        var args = [nombreActividad,nombreProyecto];

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

    app.put('/api/actividad', (req, res) => {
        var query = db.querys.actividades.updateActividad;

        const fechaFin = req.body.fechaFin;
        const estado = req.body.estado;
        const nombreActividad = req.body.nombreActividad;
        const nombreProyecto = req.body.nombreProyecto;
        var args = [fechaFin, estado, nombreActividad, nombreProyecto];

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