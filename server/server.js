const express = require('express');
const cors = require('cors');
const { conn } = require('./db');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./credentialFirebase.json');

class Server {
    constructor() {
        this.app = express();
        this.port = 8080;
        this.productsPath = '/api/products';
        this.usersPath = '/api/users';
        this.reviewsPath = '/api/reviews';
        this.testimonyPath = '/api/testimony';
        this.authPath = '/api/auth';
        this.purchasePath = '/api/purchase';
        this.paymentPath = '/api/payment';
        this.cartPath = '/api/cart';
        // Conectar a la base de datos
        // Conectar a base de datos
        this.conectarDB();
        // Inicializar Firebase Admin
        this.inicializarFirebaseAdmin();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    conectarDB() {
        conn.sync({ force: false }).then(() => {
            console.log('Base de datos conectada');
        });
    }

    inicializarFirebaseAdmin() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            // Otras opciones de configuración, si las necesitas
        });

        console.log('Firebase Admin inicializado');
    }

    middlewares() {
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
                    'Authorization',
                ],
                credentials: true,
                origin: [
                    'http://localhost:3000',
                    '*',
                    'https://ocean-allies.vercel.app',
                ],
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
            })
        );
    }

    routes() {
        this.app.use(this.productsPath, require('./routes/productRoute'));
        this.app.use(this.usersPath, require('./routes/userRoute'));
        this.app.use(this.testimonyPath, require('./routes/testimonyRoute'));
        this.app.use(this.authPath, require('./routes/authRoute'));
        this.app.use(this.reviewsPath, require('./routes/reviewRoute'));
        this.app.use(this.purchasePath, require('./routes/purchaseRoute'));
        this.app.use(this.paymentPath, require('./routes/paymentRoute'));
        this.app.use(this.cartPath, require('./routes/cartRoute'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;
