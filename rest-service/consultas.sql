SELECT DISTINCT U.nickUsuario FROM Usuario U 
                                 INNER JOIN Participacion P ON P.nickUsuario = U.nickUsuario 
                                 INNER JOIN Proyecto Pr ON Pr.nombreProyecto = P.nombreProyecto 
                                 WHERE U.categoriaUsuario = 1 AND Pr.estado = 2
                                 INTERSECT
                                 SELECT U.nickUsuario
                                 FROM Usuario U
                                 WHERE U.nickUsuario NOT IN (SELECT nickUsuario FROM Participacion);