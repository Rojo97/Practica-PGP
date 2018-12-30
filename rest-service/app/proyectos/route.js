var VerifyToken = require('../auth/VerifyToken');
function init(app, dbPool, db) {

    app.post('/api/proyecto', VerifyToken, (req, res) => {
        console.log(req.body);
        var args = [req.body.nombreProyecto, req.body.resumen];
        var args2 = [req.body.nombreProyecto, req.body.nickUsuario];
        const query = db.querys.proyectos.insert;
        const query2 = db.querys.participacion.insertParticipacionJefe;

        function onResults(error, results, response) {
            if (!error) {
                db.execQuery(dbPool, query2, args2, onResults2, res);
            }
        };

        function onResults2(error, results, response) {
            if (!error) {
                response.status(201).json({});
            }
        };


        db.execQuery(dbPool, query, args, onResults, res);

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
            }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;