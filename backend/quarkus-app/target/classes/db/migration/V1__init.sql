-- V1__init.sql
-- Schema for Gestión de Insectos Benéficos y Evaluación de Nematodos (MySQL)

CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT,
    nombre_completo VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    priv_insectos_beneficos TINYINT DEFAULT 0,
    priv_evaluacion_nematodos TINYINT DEFAULT 0,
    PRIMARY KEY (id_usuario),
    CONSTRAINT fk_roles_id_rol_usuarios FOREIGN KEY (id_rol) REFERENCES roles(id_rol) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- Datos de prueba
INSERT INTO roles (id_rol, nombre_rol) VALUES (1, 'Administrador');
INSERT INTO roles (id_rol, nombre_rol) VALUES (2, 'Usuario');

-- Usuario de prueba: email: admin@test.com, password: 0000
INSERT INTO usuarios (id_usuario, nombre_completo, correo_electronico, password_hash, id_rol, priv_insectos_beneficos, priv_evaluacion_nematodos) 
VALUES (1, 'Administrador Test', 'admin@test.com', '0000', 1, 1, 1);
