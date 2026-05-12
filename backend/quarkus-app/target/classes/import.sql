-- Datos de prueba para H2
INSERT INTO roles (id_rol, nombre_rol) VALUES (1, 'Administrador');
INSERT INTO roles (id_rol, nombre_rol) VALUES (2, 'Usuario');

-- Usuario de prueba: email: admin@test.com, password: 0000
INSERT INTO usuarios (id_usuario, nombre_completo, correo_electronico, password_hash, id_rol, priv_insectos_beneficos, priv_evaluacion_nematodos) 
VALUES (1, 'Administrador Test', 'admin@test.com', '0000', 1, 1, 1);
