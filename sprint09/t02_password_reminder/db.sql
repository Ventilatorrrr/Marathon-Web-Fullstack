CREATE DATABASE IF NOT EXISTS sword;
USE sword;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('admin', 'user') NOT NULL DEFAULT 'user'
    );

INSERT INTO users (login, password, full_name, email, status) VALUES
    ('admin', 'admin123', 'Admin User', 'admin@example.com', 'admin'),
    ('IronMan', 'mark', 'Tony Stark', 'tony@example.com', 'user');