DROP TABLE TipoUsuario;
DROP TABLE EstadoActividad;
DROP TABLE EstadoProyecto;
DROP TABLE Participacion;
DROP TABLE Predecesora;
DROP TABLE Actividad;
DROP TABLE Usuario;
DROP TABLE Proyecto;

CREATE TABLE Proyecto(
    nombre CHAR(50),
    fecha_inicial DATE,
    estado INTEGER,
    presupuesto REAL,
    informeDeSeguimiento CHAR(50),
    resumen CHAR(50)
);
