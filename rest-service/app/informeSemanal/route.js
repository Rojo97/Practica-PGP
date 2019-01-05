var VerifyToken = require('../auth/VerifyToken');

function init(app, dbPool, db) {
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
        console.log(req.body);

        var args = [re.body.estado, req.body.nombreActividad, req.body.nickUsuario, req.body.nombreProyecto];
        const query = db.querys.informeSemanal.updateEstado;

        function onResults(error, results, response) {
            if (!error) {
                console.log("Informe creado");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;