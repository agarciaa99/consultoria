CREATE DATABASE consultora_db;
USE consultora_db;

-- 1. Tabla de Roles (Admin vs Cliente)
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL -- 'admin' o 'client'
);

-- 2. Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Siempre encriptada con bcrypt
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 3. Tabla para los correos/mensajes del formulario
CREATE TABLE mensajes_contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_remitente VARCHAR(100),
    email_remitente VARCHAR(100),
    asunto VARCHAR(150),
    mensaje TEXT,
    leido BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar roles iniciales
INSERT INTO roles (nombre) VALUES ('admin'), ('client');