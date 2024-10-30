const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tu_usuario',  // Cambia por tu usuario de MySQL
    password: 'tu_contraseña', // Cambia por tu contraseña de MySQL
    database: 'tu_base_de_datos' // Cambia por el nombre de tu base de datos
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Rutas para cada página
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/iniciar-sesion.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'iniciar-sesion.html'));
});

// Otras rutas...

// Rutas para registro e inicio de sesión
app.post('/registro', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Usuario registrado');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length > 0) {
            res.send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
