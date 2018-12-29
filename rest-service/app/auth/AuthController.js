var jwt = require('jsonwebtoken');
var config = require('../../config');

function init(app, dbPool, db) {
    app.get('/api/login', function (req, res) {

        const nickUsuario = req.body.nickUsuario;
        const password = req.body.password;
        const payload = req.body;

        //Aqui habría que hacer la consulta para ver si existe el usuario o no
        //if (err) return res.status(500).send('Error on the server.');
        //if (No existe usuario) return res.status(404).send('No user found.');
        //if (Constraseña no valida)return res.status(401).send("Error autenticando el usuario").send({ auth: false, token: null });

        // crear token de autenticacion
        var token = jwt.sign(payload, config.secret, {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).send({ auth: true, token: token });
    });
}

module.exports = init;