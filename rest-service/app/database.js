const db = {
    conf: {
        connectionLimit: 10,
        host: 'jair.lab.inf.uva.es',
        user: 'PGP_grupo01',
        password: 'NU57B0S2',
        database: 'PGP_grupo01'
    },
    querys: {
        usuarios: {
            getUsuarios: 'SELECT * FROM Usuario',
            getUsuariosByNick: 'SELECT * FROM Usuario U WHERE U.nickUsuario = ?',
            getUsuariosByCategoria: 'SELECT * FROM Usuario U WHERE U.categoriaUsuario = ?',
            getJefesSinProyecto: 'SELECT DISTINCT U.nickUsuario FROM Usuario U '+
                                 'INNER JOIN Participacion P ON P.nickUsuario = U.nickUsuario ' +
                                 'INNER JOIN Proyecto Pr ON Pr.nombreProyecto = P.nombreProyecto '+
                                 'WHERE U.categoriaUsuario = 1 AND Pr.estado = 2',
            insert: 'INSERT INTO Usuario(nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,tipoUsuario,categoriaUsuario) VALUES (?,?,?,?,?,?,?,?,?)'
        },
        proyectos: {
            insert: 'INSERT INTO Proyecto(nombreProyecto,fechaInicial,estado,resumen) VALUES (?,NOW(),0,?)',
            countProyectosByNombre:'SELECT COUNT(*) AS numeroProyectos FROM Proyecto Pr WHERE Pr.nombreProyecto = ?'

        },
        participacion: {
        
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
