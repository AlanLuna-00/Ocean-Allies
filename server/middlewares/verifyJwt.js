require('dotenv').config();
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers.authorization;

    console.log(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }

    console.log(process.env.SECRETORPRIVATEKEY);

    jwt.verify(token, process.env.SECRETORPRIVATEKEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        // Agregar la información del usuario decodificada a la solicitud
        req.user = decoded;
        next();
    });
}

module.exports = verifyJWT;
