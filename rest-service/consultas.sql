SELECT  U.nickUsuario FROM Usuario U 
                                 INNER JOIN Participacion P ON P.nickUsuario = U.nickUsuario 
                                 INNER JOIN Proyecto Pr ON Pr.nombreProyecto = P.nombreProyecto 
                                 WHERE U.categoriaUsuario = 1 AND Pr.estado = 2
                                 INTERSECT
                                 SELECT  U.nickUsuario
                                 FROM Usuario U
                                 WHERE U.nickUsuario NOT IN (SELECT nickUsuario FROM Participacion);

with NParticipaciones AS (SELECT P.nickUsuario, COUNT(*) AS npart
                         FROM Participacion P
                         WHERE P.estado = 2
                         GROUP BY P.nickUsuario)
            
SELECT U.nickUsuario
FROM Usuario U, NParticipaciones NP
WHERE U.categoriaUsuario = 1 AND NP.npart = 0;

SELECT *
FROM  Participacion P, Proyecto Pr
WHERE Pr.nombreProyecto = P.nombreProyecto AND
      P.estado = 0 AND
      P.nickUsuario = 'chicho';

SELECT A.nombreActividad, A.nombreProyecto, A.descripcion, A.duracionEstimada, A.duracionReal, A.fechaInicio, A.fechaFin, A.estado, A.rol
FROM Actividad A, InformeSemanal I
WHERE A.nombreActividad = I.nombreActividad AND A.nombreProyecto = I.nombreProyecto AND A.nombreProyecto = 'ProyectoA' AND I.nickUsuario = 'ivan';

SELECT DISTINCT U.* FROM Usuario U, Participacion P, Proyecto Pr,(SELECT U2.*, COUNT(*) as numActividades FROM Usuario U2, InformeSemanal Inf2, Actividad A2 WHERE U2.nickUsuario = Inf2.nickUsuario AND A2.nombreActividad = Inf2.nombreActividad AND A2.fechaInicio = (SELECT A3.fechaInicio FROM Actividad A3 WHERE A3.nombreActividad = A2.nombreActividad) GROUP BY U2.nickUsuario) Num WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto AND U.nickUsuario NOT IN (SELECT Inf.nickUsuario FROM InformeSemanal Inf NATURAL JOIN Actividad A WHERE A.rol = P.rol AND A.nombreActividad = ?) AND Num.numActividades < 4 AND Pr.nombreProyecto = ?;


SELECT U2.*, COUNT(*) as numActividades FROM Usuario U2, InformeSemanal Inf2, Actividad A2 WHERE U2.nickUsuario = Inf2.nickUsuario AND A2.nombreActividad = Inf2.nombreActividad AND A2.fechaInicio = (SELECT A3.fechaInicio FROM Actividad A3 WHERE A3.nombreActividad = A2.nombreActividad) GROUP BY U2.nickUsuario

SELECT DISTINCT U.* 
FROM Usuario U, Participacion P, Proyecto Pr,(SELECT U2.*, COUNT(*) as numActividades 
                                              FROM Usuario U2, InformeSemanal Inf2, Actividad A2 
                                              WHERE U2.nickUsuario = Inf2.nickUsuario 
                                              AND A2.nombreActividad = Inf2.nombreActividad 
                                              AND A2.fechaInicio = (SELECT A3.fechaInicio 
                                                                    FROM Actividad A3 
                                                                    WHERE A3.nombreActividad = A2.nombreActividad) 
                                              GROUP BY U2.nickUsuario) Num 
WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto 
AND U.nickUsuario NOT IN (SELECT Inf.nickUsuario 
                          FROM InformeSemanal Inf NATURAL JOIN Actividad A 
                          WHERE A.rol = P.rol AND A.nombreActividad = 'A') 
AND Num.numActividades < 4 AND Pr.nombreProyecto = 'ProyectoA';

SELECT U.*
FROM Usuario U, Participacion P, Proyecto Pr 
WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto AND
U.nickUsuario NOT IN (SELECT Inf.nickUsuario 
                      FROM InformeSemanal Inf NATURAL JOIN Actividad A
                      WHERE A.rol = P.rol AND A.nombreActividad = 'A')
AND P.nombreProyecto = 'ProyectoA';


SELECT U.* FROM Usuario U, Participacion P,(SELECT U2.*, COUNT(*) as numActividades FROM Usuario U2, InformeSemanal Inf2, Actividad A2 WHERE U2.nickUsuario = Inf2.nickUsuario AND A2.nombreActividad = Inf2.nombreActividad AND A2.nombreProyecto = Inf2.nombreProyecto AND A2.nombreActividad = ? AND A2.nombreProyecto = ? AND A2.fechaInicio = (SELECT A3.fechaInicio FROM Actividad A3 WHERE A3.nombreActividad = A2.nombreActividad) GROUP BY U2.nickUsuario) temp, Proyecto Pr WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto AND U.nickUsuario NOT IN (SELECT Inf.nickUsuario FROM InformeSemanal Inf,Actividad A WHERE A.nombreActividad = Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto AND A.nombreActividad = ? AND A.nombreProyecto = ?)AND P.rol = (SELECT A2.rol FROM Actividad A2 WHERE A2.nombreActividad = ? AND A2.nombreProyecto = ?) AND temp.numActividades < 4 AND Pr.nombreProyecto = ?;

SELECT U.*
FROM Usuario U, Participacion P,(SELECT U2.*, COUNT(*) as numActividades 
                                 FROM Usuario U2, InformeSemanal Inf2, Actividad A2 
                                 WHERE U2.nickUsuario = Inf2.nickUsuario 
                                 AND A2.nombreActividad = Inf2.nombreActividad 
                                 AND A2.nombreProyecto = Inf2.nombreProyecto
                                 AND A2.nombreActividad = 'PruebaB'
                                 AND A2.nombreProyecto = 'ProyectoDeIsma'
                                 AND A2.fechaInicio = (SELECT A3.fechaInicio 
                                                       FROM Actividad A3 
                                                       WHERE A3.nombreActividad = A2.nombreActividad) 
                                 GROUP BY U2.nickUsuario) temp, Proyecto Pr
WHERE U.nickUsuario = P.nickUsuario AND Pr.nombreProyecto = P.nombreProyecto 
AND U.nickUsuario NOT IN (SELECT Inf.nickUsuario
                            FROM InformeSemanal Inf,Actividad A
                            WHERE A.nombreActividad = Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto
                            AND A.nombreActividad = 'PruebaB' AND A.nombreProyecto = 'ProyectoDeIsma')
AND P.rol = (SELECT A2.rol
            FROM Actividad A2
            WHERE A2.nombreActividad = 'PruebaB' AND A2.nombreProyecto = 'ProyectoDeIsma')
AND temp.numActividades < 4
AND Pr.nombreProyecto = 'ProyectoDeIsma';

SELECT A.nombreActividad FROM Actividad A, (SELECT Inf.nombreActividad, SUM(Inf.horas) AS horasTotales FROM InformeSemanal Inf,Actividad A WHERE A.nombreActividad = Inf.nombreActividad AND A.nombreProyecto = Inf.nombreProyecto) Horas WHERE A.nombreProyecto = ? AND A.duracionEstimada < Horas.horasTotales;