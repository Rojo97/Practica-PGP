function init(app, dbPool, db) {
    app.get('/api/actividad/:nickUsuario/:nombreProyecto', (req, res) => {
        var query = db.querys.actividades.getActividadesUsuario;

        const nickUsuario = req.params.nickUsuario;
        const nombreProyecto = req.params.nombreProyecto;
        var args = [nickUsuario, nombreProyecto];

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