function init(app, dbPool, db) {
    app.get('/usuario/categoria', (req, res) => {
        const { cat } = req.query;
        var query = db.querys.usuarios.getUsuariosCategoriaUno;
        console.log(cat);
        var args = [cat];

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

    app.get('/usuario/post', (req, res) => {
        const { nickUsuario, contrasenia, dni, nombre, apellido1, apellido2, fechaNacimiento, tipoUsuario, categoriaUsuario
        } = req.query;
        console.log(nickUsuario, contrasenia, dni, nombre, apellido1, apellido2, fechaNacimiento, tipoUsuario, categoriaUsuario);
        var args = [nickUsuario, contrasenia, dni, nombre, apellido1, apellido2, fechaNacimiento, tipoUsuario, categoriaUsuario];
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