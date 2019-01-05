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
    descripcion CHAR(50)
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
    (1, 'Cerrado'),
    (2, 'Finalizado'),
    (3, 'Pendiente');

INSERT INTO Proyecto
    (nombreProyecto,fechaInicial,fechaFin,estado,presupuesto,informeDeSeguimientoTemporal,resumen,descripcion)
VALUES
    ('ProyectoA', '18-01-01', NULL, 0, 2000.0, 'InformeDeSeguimiento', 'Resumen','Descripcion'),
    ('ProyectoB', '18-01-01', NULL , 0, 2000.0, 'InformeDeSeguimiento', 'Resumen','Descripcion'),
    ('ProyectoC', '18-01-01', '18-12-01' , 2, 2000.0, 'InformeDeSeguimiento', 'Resumen','Descripcion');

INSERT INTO Usuario
    (nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,categoriaUsuario)
VALUES
    ('admin', 'admin', '23456789A', 'fulanito', 'fulano', 'fulanete', '1990-01-01', 0),
    ('ivan', 'ivan', '12345678A', 'ivan', 'gonzalez', 'rincon', '94-10-17', 1),
    ('pepe', 'pepe', '32456798B', 'pepe', 'el', 'tramas', '90-10-16', 1),
    ('chicho', 'pepe', '32456799B', 'pepe', 'el', 'tramas', '90-10-16', 1),
    ('El jefe', 'pepe', '33456799B', 'pepe', 'el', 'tramas', '90-10-16', 1);

INSERT INTO Actividad
    (nombreActividad,nombreProyecto,descripcion,duracionEstimada,duracionReal,fechaInicio,fechaFin,estado,rol)
VALUES
    ('A', 'ProyectoA', 'Descripcion', 25, 50, '18-12-01', '18-12-07', 2, 1),
    ('B','ProyectoA', 'Descripcion', 25 , 50, '18-12-07', '14-12-18', 2, 1);

INSERT INTO Predecesora
    (precedida,predecesora,nombreProyecto)
VALUES
    ('B', 'A', 'ProyectoA');

INSERT INTO Participacion
    (fechaParticipacion,porcentajeParticipacion,nombreProyecto,nickUsuario,estado,rol)
VALUES
    ('18-12-01', '0.25', 'ProyectoA', 'ivan', 0, 2),
    ('18-12-01', '0.25', 'ProyectoA', 'pepe', 0, 2),
    ('17-12-01', '0.25', 'ProyectoC', 'chicho', 2, 2);

INSERT INTO EstadoInforme
    (estado, valorEstado)
VALUES
    (0, 'Aceptado'),
    (1, 'Rechazado'),
    (2, 'PendienteAceptacion'),
    (3, 'PendienteEnvio');
INSERT INTO InformeSemanal
    ( nombreActividad,nombreProyecto,nickUsuario,informeTareasPersonales,estado,horas)
VALUES
    ( 'A', 'ProyectoA', 'ivan', 'informe', 0, 10);