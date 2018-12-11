function init(app, dbPool, db) {

    app.post('/api/proyecto', (req, res) => {
        console.log(req.body);
        var args = [req.body.nombreProyecto, req.body.resumen];
        var args2 = [req.body.nombreProyecto, req.body.nickUsuario];
        const query = db.querys.proyectos.insert;
        const query2 = db.querys.participacion.insertParticipacionJefe;
        function onResults(error, results, response) {
            if (!error) {
                db.execQuery(dbPool, query2, args2, onResults2, response);
            }
        };
        function onResults2(error, results, response) {
            console.log("Segunda consulta")
            if (!error) {
                response.status(201).json({});
            } response.status(500).json({});
        };
        db.execQuery(dbPool, query, args, onResults, res);  
        
    })
}

module.exports = init;