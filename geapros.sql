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
    CONSTRAINT fk_proyecto FOREIGN KEY (estado) REFERENCES EstadoProyecto(estado)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
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
    FOREIGN KEY (tipoUsuario) REFERENCES TipoUsuario(tipoUsuario)
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
    FOREIGN KEY (nombreProyecto) REFERENCES Proyecto(nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nickUsuario) REFERENCES Usuario(nickUsuario)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (estado) REFERENCES EstadoActividad(estado)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT pk_actividad PRIMARY KEY (numeroActividad,nombreProyecto,nickUsuario)
);

CREATE TABLE Predecesora(
    precedida INTEGER,
    predecesora INTEGER,
    nombreProyecto CHAR(50),
    FOREIGN KEY (precedida) REFERENCES Actividad(numeroActividad)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (predecesora) REFERENCES Actividad(numeroActividad)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nombreProyecto) REFERENCES Actividad(nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    CONSTRAINT pk_predecesora PRIMARY KEY (precedida,predecesora,nombreProyecto)
);

CREATE TABLE Participacion(
    fechaParticipacion DATE,
    porcentajeParticipacion REAL,
    nombreProyecto CHAR(50),
    nickUsuario CHAR(50),
    FOREIGN KEY (nombreProyecto) REFERENCES Proyecto(nombreProyecto)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (nickUsuario)  REFERENCES Usuario(nickUsuario)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    CONSTRAINT pk_participacion PRIMARY KEY (nombreProyecto,nickUsuario,fechaParticipacion)
);

INSERT INTO EstadoProyecto(estado,valorEstado) VALUES (0,'En curso'),
                                                      (1,'Cerrado'),
                                                      (2,'Finalizado');

INSERT INTO EstadoActividad(estado,valorEstado) VALUES (0,'En curso'),
                                                      (1,'Cerrada'),
                                                      (2,'Aprobada'),
                                                      (3,'Finalizada');

INSERT INTO TipoUsuario(tipoUsuario,valorTipo) VALUES (0,'Administrador'),
                                                      (1,'Jefe de proyecto'),
                                                      (2,'Desarrollador');
                                                    
INSERT INTO Proyecto(nombreProyecto,fechaInicial,estado,presupuesto,informeDeSeguimiento,resumen)
VALUES ('ProyectoA','01-12-18',0,2000.0,'InformeDeSeguimiento','Resumen'),
       ('ProyectoB','01-12-18',0,2000.0,'InformeDeSeguimiento','Resumen');

INSERT INTO Usuario(nickUsuario,contrasenia,dni,nombre,apellido1,apellido2,fechaNacimiento,tipoUsuario,categoriaUsuario)
VALUES  ('admin','admin','23456789A','fulanito','fulano','fulanete','01-01-1990',0,0),
        ('ivan','ivan','12345678A','ivan','gonzalez','rincon','17-10-94',1,1);

INSERT INTO Actividad(numeroActividad,nombreProyecto,nickUsuario,descripcion,fechaInicio,fechaFinEstimada,fechaFinReal,estado)
VALUES (1,'ProyectoA','ivan','Descripcion','01-12-18','07-12-18',null,0),
       (2,'ProyectoA','ivan','Descripcion','07-12-18','14-12-18',null,1);

INSERT INTO Predecesora(precedida,predecesora,nombreProyecto) VALUES (2,1,'ProyectoA');

INSERT INTO Participacion(fechaParticipacion,porcentajeParticipacion,nombreProyecto,nickUsuario)
VALUES ('01-12-18','0.25','ProyectoA','ivan');

