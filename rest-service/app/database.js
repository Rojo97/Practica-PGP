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
            getJefesSinProyecto: 'select U.nickUsuario FROM Usuario U WHERE U.categoriaUsuario = 1 AND U.nickUsuario NOT IN (SELECT P.nickUsuario FROM Participacion P WHERE P.estado = 0 OR P.estado = 1)',
            getProyectosActualesUsuario:'SELECT * FROM Participacion P, Proyecto Pr WHERE Pr.nombreProyecto = P.nombreProyecto AND P.estado = 0 AND P.nickUsuario = ?',
            getProyectosUsuario :'SELECT * FROM Participacion P, Proyecto Pr WHERE Pr.nombreProyecto = P.nombreProyecto AND P.nickUsuario = ?',
            getParticipaciones : 'SELECT U.categoriaUsuario,P.nombreProyecto, P.rol FROM Usuario U NATURAL JOIN Participacion P WHERE U.nickUsuario = ? AND P.estado = 0',
            insert: 'INSERT INTO Usuario(nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,categoriaUsuario) VALUES (?,?,?,?,?,?,?,?)'
        },
        proyectos: {
            getProyectos: 'SELECT * FROM Proyecto',
            getProyectosByEstado: 'SELECT * FROM Proyecto P WHERE P.estado = ?',
            getProyectoByNombre: 'SELECT P.nickUsuario as jefeProyecto, Pr.* FROM Proyecto Pr,Participacion P WHERE Pr.nombreProyecto = P.nombreProyecto AND P.rol = 1 AND Pr.nombreProyecto = ?',
            insert: 'INSERT INTO Proyecto(nombreProyecto,fechaInicial,estado,resumen,descripcion) VALUES (?,NOW(),0,NULL,?)',
            countProyectosByNombre: 'SELECT COUNT(*) AS numeroProyectos FROM Proyecto Pr WHERE Pr.nombreProyecto = ?',
            getActividadesProyecto:'SELECT * FROM Actividad A WHERE A.nombreProyecto = ?',
            getParticipantesProyecto : 'SELECT U.nickUsuario,U.dni,U.nombre,U.apellido1,U.apellido2,P.porcentajeParticipacion,P.rol FROM Usuario U, Participacion P, Proyecto Pr WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto AND P.estado = 0 AND P.nombreProyecto = ?',
            getParticipantesProyectoConRol : 'SELECT U.nickUsuario,U.dni,U.nombre,U.apellido1,U.apellido2,P.porcentajeParticipacion,P.rol FROM Usuario U, Participacion P, Proyecto Pr WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto AND P.estado=0 AND P.nombreProyecto = ? AND P.rol <= ?',
            getCandidatos :'SELECT * FROM (SELECT U.*, sum(P.porcentajeParticipacion) as participacion FROM Participacion P, (SELECT * FROM Usuario U WHERE U.categoriaUsuario = 1 AND NOT EXISTS (SELECT * FROM Participacion P WHERE P.estado = 0 AND P.nickUsuario = U.nickUsuario AND P.rol = 1) UNION SELECT * FROM Usuario U WHERE U.categoriaUsuario>1) U, (SELECT U.nickUsuario as nick, COUNT(*) as nProyectos FROM Participacion P, Usuario U WHERE P.estado = 0 AND P.rol > 1 AND U.nickUsuario = P.nickUsuario AND NOT EXISTS (SELECT * FROM Participacion P WHERE P.estado = 0 AND P.nickUsuario = U.nickUsuario AND P.rol = 1)GROUP BY P.nickUsuario) t1 WHERE P.estado=0 and P.nickUsuario = U.nickUsuario and P.nickUsuario = t1.nick and t1.nProyectos<2 and NOT EXISTS (select * where P.nombreProyecto = ? and P.estado = 0 and P.nickUsuario = U.nickUsuario) GROUP BY P.nickUsuario) t2 WHERE t2.participacion<1 UNION SELECT U.*, 0 as participacion FROM Usuario U WHERE U.categoriaUsuario>0 AND NOT EXISTS (SELECT * FROM Participacion P WHERE P.nickUsuario=U.nickUsuario AND P.estado = 0)',
            updateProyecto : 'UPDATE Proyecto SET fechaFin = ?, estado = ?, informeDeSeguimientoTemporal = ?, resumen = ? WHERE nombreProyecto = ?',
            updateCargaProyecto : 'UPDATE Proyecto SET fechaInicial = ?, presupuesto = ? WHERE nombreProyecto = ?'
        },
        participacion: {
            insertParticipacionJefe : 'INSERT INTO Participacion VALUES (NOW(),1,?,?,0,1)',
            insertParticipacionUsuario :'INSERT INTO Participacion VALUES (NOW(),?,?,?,0,?)' ,
            updateEstadoParticipacion : 'UPDATE Participacion SET estado = ? WHERE nombreProyecto = ?'
        },
        actividades : {
            getActividadesUsuario : 'SELECT A.nombreActividad, A.nombreProyecto, A.descripcion, A.duracionEstimada, A.duracionReal, A.fechaInicio, A.fechaFin, A.estado, A.rol FROM Actividad A, InformeSemanal I WHERE A.nombreActividad = I.nombreActividad AND A.nombreProyecto = I.nombreProyecto AND A.nombreProyecto = ? AND I.nickUsuario = ?',
            getActividadesById : 'SELECT * FROM Actividad A WHERE A.nombreActividad = ? AND A.nombreProyecto = ?',
            getCandidatosActividad : 'SELECT U.* FROM Usuario U, Participacion P,(SELECT U2.*, COUNT(*) as numActividades FROM Usuario U2, InformeSemanal Inf2, Actividad A2 WHERE U2.nickUsuario = Inf2.nickUsuario AND A2.nombreActividad = Inf2.nombreActividad AND A2.nombreProyecto = Inf2.nombreProyecto AND A2.nombreActividad = ? AND A2.nombreProyecto = ? AND A2.fechaInicio = (SELECT A3.fechaInicio FROM Actividad A3 WHERE A3.nombreActividad = A2.nombreActividad) GROUP BY U2.nickUsuario) temp, Proyecto Pr WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto AND U.nickUsuario NOT IN (SELECT Inf.nickUsuario FROM InformeSemanal Inf,Actividad A WHERE A.nombreActividad = Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto AND A.nombreActividad = ? AND A.nombreProyecto = ?)AND P.rol = (SELECT A2.rol FROM Actividad A2 WHERE A2.nombreActividad = ? AND A2.nombreProyecto = ?) AND temp.numActividades < 4 AND Pr.nombreProyecto = ?',
            getActividadIntervalo : 'SELECT Inf.nickUsuario, A.nombreActividad FROM InformeSemanal Inf, Actividad A WHERE A.nombreActividad = Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto AND A.nombreProyecto = ? AND A.fechaInicio >= ? AND A.fechaInicio < ?',
            getActividadIntervaloByEstado : 'SELECT Inf.nickUsuario, A.nombreActividad FROM InformeSemanal Inf, Actividad A WHERE A.nombreActividad = Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto AND A.nombreProyecto = ? AND A.estado = ? AND A.fechaInicio >= ? AND A.fechaInicio < ?',
            updateActividad : 'UPDATE Actividad SET fechaFin = ?, estado = ?, duracionReal = ? WHERE nombreActividad = ? AND nombreProyecto=?',
            insert : 'INSERT INTO Actividad (nombreActividad,nombreProyecto,descripcion,duracionEstimada,estado, rol) VALUES (?,?,?,?,0,?)',
            insertPredecesora : 'INSERT INTO Predecesora (precedida,predecesora,nombreProyecto) VALUES (?,?,?)'
        },
        informeSemanal :{
            insert: 'INSERT INTO InformeSemanal (nombreActividad,nombreProyecto,nickUsuario,informeTareasPersonales,estado,horas) VALUES (?,?,?,?,3,?)',
            getInformeByEstado : 'SELECT Inf.*, A.fechaInicio FROM InformeSemanal Inf, Actividad A WHERE A.nombreActividad =Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto AND Inf.estado = ? AND Inf.nombreProyecto = ?',
            getInformeDesarrollador :'SELECT * FROM InformeSemanal WHERE nombreProyecto = ? AND nombreActividad = ? AND nickUsuario = ?',
            getInformeIntervalo : 'SELECT Inf.* FROM Usuario U, InformeSemanal Inf, Actividad A WHERE U.nickUsuario = Inf.nickUsuario AND A.nombreActividad = Inf.nombreActividad AND U.nickUsuario = ? AND A.fechaInicio >= ? AND A.fechaInicio < ?',
            updateEstado : 'UPDATE InformeSemanal SET estado = ?, informeTareasPersonales = ?, horas = ? WHERE numeroInforme = ?'
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