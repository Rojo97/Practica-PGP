const db = {
    conf: {
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: 'trebuchet',
        database: 'pgp'
    },
    querys: {
        usuarios: {
            getUsuarios: 'SELECT * FROM Usuario',
            getUsuariosByNick: 'SELECT * FROM Usuario U WHERE U.nickUsuario = ?',
            getUsuariosByCategoria: 'SELECT * FROM Usuario U WHERE U.categoriaUsuario = ?',
            getJefesSinProyecto: 'select U.nickUsuario FROM Usuario U WHERE U.categoriaUsuario = 1 AND U.nickUsuario NOT IN (SELECT P.nickUsuario FROM Participacion P WHERE P.estado = 0 OR P.estado = 1)',
            getProyectosActualesUsuario:'SELECT * FROM Participacion P, Proyecto Pr WHERE Pr.nombreProyecto = P.nombreProyecto AND P.estado = 0 AND P.nickUsuario = ?',
            getProyectosUsuario :'SELECT * FROM Participacion P, Proyecto Pr WHERE Pr.nombreProyecto = P.nombreProyecto AND P.nickUsuario = ?',
            insert: 'INSERT INTO Usuario(nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,categoriaUsuario) VALUES (?,?,?,?,?,?,?,?)'
        },
        proyectos: {
            insert: 'INSERT INTO Proyecto(nombreProyecto,fechaInicial,estado,resumen) VALUES (?,NOW(),0,?)',
            countProyectosByNombre: 'SELECT COUNT(*) AS numeroProyectos FROM Proyecto Pr WHERE Pr.nombreProyecto = ?'

        },
        participacion: {
            insertParticipacionJefe : 'INSERT INTO Participacion VALUES (NOW(),1,?,?,0)'
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