var VerifyToken = require('../auth/VerifyToken');

function init(app, dbPool, db) {
    app.get('/api/usuario', VerifyToken, (req, res) => {
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
                    console.log("Usuarios enviados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/usuario/:nickUsuario', VerifyToken,(req, res) => {
        const nickUsuario = req.params.nickUsuario;
        var query = db.querys.usuarios.getUsuariosByNick;
        var args = [nickUsuario];

        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    response.sendStatus(404);
                } else {
                    console.log("Usuario enviado");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(500).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.get('/api/usuario/:nickUsuario/proyectos', VerifyToken,(req, res) => {
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
                    console.log("Proyectos enviados");
                    return res.status(200).json({
                        data: results
                    })
                }
            } else { res.status(409).send('Error on the server.'); }
        }

        db.execQuery(dbPool, query, args, onResults, res);
    })

    app.post('/api/usuario', VerifyToken, (req, res) => {
        console.log(req.body);
        var args = [req.body.nickUsuario, req.body.contrasenia, req.body.dni, req.body.nombre, req.body.apellido1, req.body.apellido2, req.body.fechaNacimiento, req.body.categoriaUsuario];
        const query = db.querys.usuarios.insert;

        function onResults(error, results, response) {
            if (!error) {
                console.log("Usuario creado");
                response.status(201).json({});
            } else { res.status(500).send('Error on the server.'); }
        };

        db.execQuery(dbPool, query, args, onResults, res);
    })
}

module.exports = init;