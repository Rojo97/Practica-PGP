function init(app, dbPool, db) {
    app.get('/proyecto/post', (req, res) => {
        const { nombreProyecto} = req.query;
        console.log(nombreProyecto);
        var args = [nombreProyecto];
        const query = db.querys.proyectos.insert;

        function onResults(error, results, response) {
            if (!error) {
                response.status(201).json({});
            }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;