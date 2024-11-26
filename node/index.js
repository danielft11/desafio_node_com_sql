const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const config = {
    host: 'mysql-container', 
    user: 'root',
    password: 'root',
    database: 'people_db'
};

// Conexão com o banco de dados MySQL
const pool = mysql.createPool(config);

// Função para executar queries no banco de dados
const queryDatabase = (query, values, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting connection from pool:', err);
            return callback(err);
        }
        connection.query(query, values, (err, result) => {
            connection.release(); // Libera a conexão após a query
            callback(err, result);
        });
    });
};

// Criação do banco de dados, caso não exista
const createDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS people_db';
queryDatabase(createDatabaseQuery, [], (err, result) => {
    if (err) {
        console.error('Error creating database:', err);
        return;
    }
    console.log('Database "people_db" is ready.');

    // Criação da tabela "people", caso não exista
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS people (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        );
    `;
    
    queryDatabase(createTableQuery, [], (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table "people" is ready.');

        // Inserir nomes, verificando duplicatas
        const names = ['Alice Dias', 'Wilson Aguiar', 'Joseph Blink'];
        names.forEach(name => {
            const checkExistQuery = 'SELECT * FROM people WHERE name = ?';
            queryDatabase(checkExistQuery, [name], (err, result) => {
                if (err) {
                    console.error('Error checking for existing name:', err);
                    return;
                }
                if (result.length === 0) { // Se o nome não existir, insira
                    const insertQuery = 'INSERT INTO people (name) VALUES (?)';
                    queryDatabase(insertQuery, [name], (err, result) => {
                        if (err) {
                            console.error('Error inserting name:', err);
                            return;
                        }
                        console.log(`Name ${name} inserted successfully!`);
                    });
                } else {
                    console.log(`Name ${name} already exists.`);
                }
            });
        });
    });
});

// Rota para listar os nomes cadastrados
app.get('/', (req, res) => {
    queryDatabase('SELECT * FROM people', [], (err, result) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).send('Error querying the database');
        }
        let response = '<h1>Full Cycle Rocks!</h1>';
        response += '<p>Usuários:</p>'
        response += '<ul>';
        result.forEach(row => {
            response += `<li>${row.name}</li>`;
        });
        response += '</ul>';
        res.send(response);
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
