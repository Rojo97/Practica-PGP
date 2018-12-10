function init(app, dbPool, db) {
    app.post('/proyecto', (req, res) => {
        console.log(req.body);
        var args = [req.body.nombreProyecto, req.body.resumen];
        var args2 = [req.body.nombreProyecto, req.body.nickUsuario];
        const query = db.querys.proyectos.insert;
        const query2 = db.querys.participacion.insertParticipacionJefe;

        function onResults(error, results, response) {
            if (!error) {
                response.status(201).json({});
            }
        };

        db.execQuery(dbPool, query, args, onResults, res);
        db.execQuery(dbPool, query2, args2, onResults, res);
    })
}

module.exports = init;