var VerifyToken = require('../auth/VerifyToken');

function init(app, dbPool, db) {

    app.get('/api/informeSemanal', VerifyToken,(req, res) => {
        const numeroInforme = req.params.numeroInforme;
        var query = db.querys.informeSemanal.getInformeDesarrollador;
        var args = [req.body.nombreProyecto, req.body.nombreActividad, req.body.nickUsuario];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Informe enviado");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.post('/api/informeSemanal', VerifyToken, (req, res) => {

        var args = [req.body.nombreActividad, req.body.nombreProyecto, req.body.nickUsuario, req.body.informeTareasPersonales, req.body.horas];
        const query = db.querys.informeSemanal.insert;

        function onResults(error, results, response) {
            if (!error) {
                console.log("Informe creado");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.put('/api/informeSemanal', VerifyToken, (req, res) => {

        var args = [req.body.estado, req.body.informeTareasPersonales, req.body.horas, req.body.numeroInforme];
        const query = db.querys.informeSemanal.updateEstado;

        function onResults(error, results, response) {
            if (!error) {
                console.log("Informe actualizado");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;