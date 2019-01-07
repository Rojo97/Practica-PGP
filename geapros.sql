DROP TABLE  IF EXISTS InformeSemanal;
DROP TABLE  IF EXISTS Participacion;
DROP TABLE  IF EXISTS Usuario;
DROP TABLE  IF EXISTS Predecesora;
DROP TABLE  IF EXISTS Actividad;
DROP TABLE  IF EXISTS Proyecto;
DROP TABLE  IF EXISTS Rol;
DROP TABLE  IF EXISTS Estado;
DROP TABLE  IF EXISTS EstadoInforme;

CREATE TABLE Rol(
    rol INTEGER,
    valorRol CHAR(50),
    UNIQUE (valorRol),
    CONSTRAINT pk_rol PRIMARY KEY (rol)
);

CREATE TABLE Estado
(
    estado INTEGER,
    valorEstado CHAR(50),
    UNIQUE (valorEstado),
    CONSTRAINT pk_estado PRIMARY KEY(estado)
);

CREATE TABLE Proyecto
(
    nombreProyecto CHAR(50) NOT NULL,
    fechaInicial DATE NOT NULL,
    fechaFin DATE,
    estado INTEGER,
    presupuesto REAL,
    informeDeSeguimientoTemporal CHAR(50),
    resumen CHAR(50),
    descripcion CHAR(50),
    CONSTRAINT fk_proyecto FOREIGN KEY (estado) REFERENCES Estado(estado)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT pk_proyecto PRIMARY KEY (nombreProyecto)
);


CREATE TABLE Usuario
(
    nickUsuario CHAR(50),
    contrasenia CHAR(50) NOT NULL,
    dni CHAR(11) NOT NULL,
    nombre CHAR(50) NOT NULL,
    apellido1 CHAR(50),
    apellido2 CHAR(50),
    fechaNacimiento DATE,
    categoriaUsuario INTEGER NOT NULL,
    UNIQUE (dni),
    CONSTRAINT pk_usuario PRIMARY KEY (nickUsuario),
    CONSTRAINT nacimiento CHECK(fechaNacimiento < NOW())
);


CREATE TABLE Actividad
(
    nombreActividad CHAR(50),
    nombreProyecto CHAR(50),
    descripcion CHAR(50),
    duracionEstimada REAL,
    duracionReal REAL,
    fechaInicio DATE,
    fechaFin DATE,
    estado INTEGER,
    rol INTEGER NULL,
    FOREIGN KEY (nombreProyecto) REFERENCES Proyecto(nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (estado) REFERENCES Estado(estado)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (rol) REFERENCES Rol(rol)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT pk_actividad PRIMARY KEY (nombreActividad,nombreProyecto)
);

CREATE TABLE EstadoInforme
(
    estado INTEGER,
    valorEstado CHAR(50),
    UNIQUE (valorEstado),
    CONSTRAINT pk_estado PRIMARY KEY(estado)
);

CREATE TABLE InformeSemanal
(
    numeroInforme INTEGER AUTO_INCREMENT,
    nombreActividad CHAR(50),
    nombreProyecto CHAR(50),
    nickUsuario CHAR(50),
    informeTareasPersonales CHAR (200),
    estado INTEGER,
    horas REAL,
    FOREIGN KEY (nombreActividad, nombreProyecto) REFERENCES Actividad (nombreActividad,nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nickUsuario) REFERENCES Usuario (nickUsuario)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (estado) REFERENCES EstadoInforme (estado)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,   
    CONSTRAINT pk_informeSemanal PRIMARY KEY (numeroInforme)
);

CREATE TABLE Predecesora
(
    precedida CHAR(50),
    predecesora CHAR(50),
    nombreProyecto CHAR(50),
    FOREIGN KEY (precedida) REFERENCES Actividad(nombreActividad)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (predecesora) REFERENCES Actividad(nombreActividad)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nombreProyecto) REFERENCES Actividad(nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT par_actividades UNIQUE (precedida,predecesora),
    CONSTRAINT pk_predecesora PRIMARY KEY (precedida,predecesora,nombreProyecto)
);

CREATE TABLE Participacion
(
    fechaParticipacion DATE,
    porcentajeParticipacion REAL,
    nombreProyecto CHAR(50),
    nickUsuario CHAR(50),
    estado INTEGER,
    rol INTEGER,
    FOREIGN KEY (nombreProyecto) REFERENCES Proyecto(nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (estado) REFERENCES Estado (estado)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nickUsuario)  REFERENCES Usuario(nickUsuario)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (rol)  REFERENCES Rol(rol)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT pk_participacion PRIMARY KEY (nombreProyecto,nickUsuario,fechaParticipacion)
);

INSERT INTO Rol (rol,valorRol) VALUES (1, 'Jefe de proyecto'),
                                      (2,'Analista'),
                                      (3,'Diseñador'),
                                      (4,'Analista-Programador'),
                                      (5,'Responsable del equipo de pruebas'),
                                      (6,'Programador'),
                                      (7,'Probador');

INSERT INTO Estado
    (estado,valorEstado)
VALUES
    (0, 'En curso'),
    (1, 'Finalizado'),
    (2, 'Cerrado'),
    (3, 'Pendiente');

INSERT INTO Usuario
    (nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,categoriaUsuario)
VALUES
    ('admin', 'admin', '11111111A', 'admin', 'admin', 'admin', '1990-01-01', 0);

INSERT INTO EstadoInforme
    (estado, valorEstado)
VALUES
    (0, 'Aceptado'),
    (1, 'Rechazado'),
    (2, 'PendienteAceptacion'),
    (3, 'PendienteEnvio');