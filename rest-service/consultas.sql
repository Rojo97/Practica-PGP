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
FROM Usuario U 
WHERE U.categoriaUsuario = 1 AND NP.npart = 0;