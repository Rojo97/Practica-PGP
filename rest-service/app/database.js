const db = {
    conf: {
        connectionLimit: 10,
        host: 'jair.lab.inf.uva.es',
        user: 'PGP_Grupo01',
        password: 'NU57B0S2',
        database: 'PGP_Grupo01'
    },
    querys: {
        usuarios: {
            getUsuariosCategoriaUno: 'SELECT * FROM Usuario U WHERE U.categoriaUsuario = ?',
            insert: 'INSERT INTO Usuario(nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,tipoUsuario,categoriaUsuario) VALUES (?,?,?,?,?,?,?,?,?)'
        },
        proyectos: {
            insert: 'INSERT INTO Proyecto(nombreProyecto) VALUES (?)'
        }
    },
    execQuery: function (dbPool, query, args, cb, res) {
        dbPool.getConnection(function (err, connection) {
            if (err) {
                cb(err);
            } else {
                connection.query(query, args, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        cb(error);
                    } else {
                        cb(null, results, res);
                    }
                })
            }
        });
    }
}

module.exports = db;
