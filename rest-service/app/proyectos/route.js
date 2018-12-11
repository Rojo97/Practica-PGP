function init(app, dbPool, db) {

    app.post('/api/proyecto', (req, res) => {
        console.log(req.body);
        var args = [req.body.nombreProyecto, req.body.resumen];
        var args2 = [req.body.nombreProyecto, req.body.nickUsuario];
        const query = db.querys.proyectos.insert;
        const query2 = db.querys.participacion.insertParticipacionJefe;
        function onResults(error, results, response) {
            if (!error) {
                response.status(201).json({});
            }
        };
        comprobarNombreProyecto(req.body.nombreProyecto,function(count){
            if (count == 0) {
                console.log("Entro bien");
                db.execQuery(dbPool, query, args, onResults, res);
                db.execQuery(dbPool, query2, args2, onResults, res);
            } else {
                console.log("El proyecto ya existe");
            }
        });
        
    })

    //ToDo: Comprobar que no exista el nombre de un proyecto cuando se va a crear
    function comprobarNombreProyecto(nombreProyecto, callback) {
        //La consulta devuelve un conteo con el nombre del proyecto introducido. Si es distinto de 0, el proyecto no puede crearse.
        var args = [nombreProyecto];
        var query = db.querys.proyectos.countProyectosByNombre;
        dbPool.getConnection(function (err, connection) {
            if (err) {
                console.log("Error en la conexión");
            } else {
                connection.query(query, args, function (error, results, fields) {
                    connection.release();
                    if (error) {
                        console.log("Error");
                    } else {
                        callback(results[0].numeroProyectos);
                    }
                })
            }
        });
    }
}

module.exports = init;