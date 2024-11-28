-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS people_db;

-- Seleção do banco de dados
USE people_db;

-- Criação da tabela 'people' caso ela não exista
CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Inserção de dados iniciais, se não existirem
INSERT INTO people (name) SELECT 'Alice Dias' WHERE NOT EXISTS (SELECT 1 FROM people WHERE name = 'Alice Dias');
INSERT INTO people (name) SELECT 'Wilson Aguiar' WHERE NOT EXISTS (SELECT 1 FROM people WHERE name = 'Wilson Aguiar');
INSERT INTO people (name) SELECT 'Joseph Blink' WHERE NOT EXISTS (SELECT 1 FROM people WHERE name = 'Joseph Blink');
