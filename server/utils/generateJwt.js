require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        console.log(process.env.SECRETORPRIVATEKEY);

        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el JWT');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = { generateJwt };
