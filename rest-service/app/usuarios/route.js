function init(app, dbPool, db) {
    app.get('/api/usuario', (req, res) => {
        if(req.query.selectableAsJefe == 1){
            var query = db.querys.usuarios.getJefesSinProyecto;
        }else{
            var query = db.querys.usuarios.getUsuarios;
        }
        var args = [];

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

    app.get('/api/usuario/:nickUsuario', (req, res) => {
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

    app.get('/api/usuario/:nickUsuario/proyectos', (req, res) => {
        const nickUsuario = req.params.nickUsuario;
        if(req.query.actual == 1){
            var query = db.querys.usuarios.getProyectosActualesUsuario;
        }else{
            var query =  db.querys.usuarios.getProyectosUsuario;
        }
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

    app.post('/api/usuario', (req, res) => {
        console.log(req.body);
        var args = [req.body.nickUsuario, req.body.contrasenia, req.body.dni, req.body.nombre, req.body.apellido1, req.body.apellido2, req.body.fechaNacimiento, req.body.categoriaUsuario];
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