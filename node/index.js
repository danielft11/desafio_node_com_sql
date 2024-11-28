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
const queryDatabase = (query, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting connection from pool:', err);
                return reject(err);
            }
            connection.query(query, values, (err, result) => {
                connection.release(); // Libera a conexão após a query
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
};

// Endpoint para listar os nomes cadastrados
app.get('/users', async (req, res) => {
    try {
        const result = await queryDatabase('SELECT * FROM people', []);
        let response = '<h1>Full Cycle Rocks!</h1>';
        response += '<p>Usuários:</p>';
        response += '<ul>';
        result.forEach(row => {
            response += `<li>${row.name}</li>`;
        });
        response += '</ul>';
        res.send(response);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Error querying the database');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
