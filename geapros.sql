DROP TABLE IF EXISTS TipoUsuario;
DROP TABLE  IF EXISTS EstadoActividad;
DROP TABLE  IF EXISTS EstadoProyecto;
DROP TABLE  IF EXISTS Participacion;
DROP TABLE  IF EXISTS Predecesora;
DROP TABLE  IF EXISTS Actividad;
DROP TABLE  IF EXISTS Usuario;
DROP TABLE  IF EXISTS Proyecto;

CREATE TABLE EstadoProyecto(
    estado INTEGER,
    valorEstado CHAR(50),
    UNIQUE (valorEstado),
    CONSTRAINT pk_estadoProyecto PRIMARY KEY(estado)
);

CREATE TABLE Proyecto(
    nombreProyecto CHAR(50) NOT NULL,
    fechaInicial DATE NOT NULL,
    estado INTEGER,
    presupuesto REAL,
    informeDeSeguimiento CHAR(50),
    resumen CHAR(50),
    CONSTRAINT fk_proyecto FOREIGN KEY (estado) REFERENCES EstadoProyecto(estado),
    CONSTRAINT pk_proyecto PRIMARY KEY (nombreProyecto)
);

CREATE TABLE TipoUsuario(
    tipoUsuario INTEGER,
    valorTipo CHAR(50),
    UNIQUE (valorTipo),
    CONSTRAINT pk_tipoUsuario PRIMARY KEY (tipoUsuario)
);

CREATE TABLE Usuario(
    nickUsuario CHAR(50),
    contrasenia CHAR(50) NOT NULL,
    dni CHAR(11) NOT NULL,
    nombre CHAR(50) NOT NULL,
    apellido1 CHAR(50),
    apellido2 CHAR(50),
    fechaNacimiento DATE,
    tipoUsuario INTEGER NOT NULL,
    categoriaUsuario INTEGER NOT NULL,
    UNIQUE (dni),
    FOREIGN KEY (tipoUsuario) REFERENCES TipoUsuario
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT pk_usuario PRIMARY KEY (nickUsuario),
    CONSTRAINT nacimiento CHECK(fechaNacimiento < NOW())
);

CREATE TABLE EstadoActividad(
    estado INTEGER,
    valorEstado CHAR(50) NOT NULL,
    UNIQUE (valorEstado),
    CONSTRAINT pk_estadoActividad PRIMARY KEY (estado)
);

CREATE TABLE Actividad(
    numeroActividad INTEGER,
    nombreProyecto CHAR(50),
    nickUsuario CHAR(50),
    descripcion CHAR(50),
    fechaInicio DATE,
    fechaFinEstimada DATE,
    fechaFinReal DATE,
    estado INTEGER,
    FOREIGN KEY (nombreProyecto) REFERENCES Proyecto
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nickUsuario) REFERENCES Usuario
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (estado) REFERENCES EstadoActividad 
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT pk_actividad PRIMARY KEY (numeroActividad,nombreProyecto,nickUsuario)
);

CREATE TABLE Predecesora(
    precedida INTEGER,
    predecesora INTEGER,
    nombreProyecto CHAR(50),
    FOREIGN KEY (precedida, predecesora, nombreProyecto) REFERENCES Actividad
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT pk_predecesora PRIMARY KEY (precedida,predecesora,nombreProyecto)
);

CREATE TABLE Participacion(
    fechaParticipacion DATE,
    porcentajeParticipacion REAL,
    nombreProyecto CHAR(50),
    nickUsuario CHAR(50),
    FOREIGN KEY (nombreProyecto) REFERENCES Proyecto
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nickUsuario)  REFERENCES Usuario
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT pk_participacion PRIMARY KEY (nombreProyecto,nickUsuario,fechaParticipacion)
);