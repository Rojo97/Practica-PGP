var jwt = require('jsonwebtoken');
var config = require('../../config');

function init(app, dbPool, db) {
    app.post('/api/login', function (req, res) {

        const nickUsuario = req.body.nickUsuario;
        const password = req.body.password;
        const payload = req.body;
        const query = db.querys.usuarios.getUsuariosByNick;
        console.log(req.body);

        var args = [nickUsuario];

        //Aqui habría que hacer la consulta para ver si existe el usuario o no
        function onResults(error, results, response) {
            if (!error) {
                if (results.length == 0) {
                    res.status(404).send('No user found.');;
                } else {
                    console.log("Peticion recibida");
                    if (password != results[0].contrasenia){
                        res.status(401).send("Error autenticando el usuario");
                    }else {
                        // crear token de autenticacion
                        var token = jwt.sign(payload, config.secret, {
                            expiresIn: 86400 // 24 horas
                        });

                        res.status(200).send({
                            auth: true,
                            token: token
                        });
                    }


                }
            } else {
                res.status(500).send('Error on the server.');
            }
        }

        db.execQuery(dbPool, query, args, onResults, res);
        //if (err) return res.status(500).send('Error on the server.');
        //if (No existe usuario) return res.status(404).send('No user found.');
        //if (Constraseña no valida)return res.status(401).send("Error autenticando el usuario").send({ auth: false, token: null });


    });
}

module.exports = init;