const express = require('express');
const cors = require('cors');
const { conn } = require('../db');
const cookieParser = require('cookie-parser');

class Server {
    constructor() {
        this.app = express();
        this.port = 8080;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        this.dbPath = '/api/db';
        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    conectarDB() {
        conn().sync({ force: false });
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
        // Cookie parser
        this.app.use(cookieParser());
        // CORs
        this.app.use(
            cors({
                allowedHeaders: [
                    'Origin',
                    'X-Requested-With',
                    'Content-Type',
                    'Accept',
                ],
                credentials: true,
                origin: ['http://localhost:3000'],
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
            })
        );
    }

    routes() {}

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;
