function init(app, dbPool, db) {
    app.get('/usuario', (req, res) => {
        var query = db.querys.usuarios.getUsuarios;
        var args = [];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    return res.status(200).json({
                        data: results
                    })
                }
            }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/usuario/:nickUsuario', (req, res) => {
        const nickUsuario = req.params.nickUsuario;
        var query = db.querys.usuarios.getUsuariosByNick;
        console.log(nickUsuario);
        var args = [nickUsuario];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    return res.status(200).json({
                        data: results
                    })
                }
            }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.post('/usuario', (req, res) => {
        console.log(req.body);
        var args = [req.body.nickUsuario, req.body.contrasenia, req.body.dni, req.body.nombre, req.body.apellido1, req.body.apellido2, req.body.fechaNacimiento, req.body.tipoUsuario, req.body.categoriaUsuario];
        const query = db.querys.usuarios.insert;

        function onResults(error, results, response) {
            if (!error) {
                response.status(201).json({});
            }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;