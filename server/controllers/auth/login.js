const { User } = require('../../db');
const bcryptjs = require('bcryptjs');
const generateJwt = require('../../utils/generateJwt');
const admin = require('firebase-admin');

const login = async (req, res) => {
    const { id, email, password, google } = req.body;
    console.log(req.body);
    try {
        // Verificar credenciales con Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(email);

        const userId = userRecord.uid;
        const userEmail = userRecord.email;
        console.log('userId', userId);

        let user = {};

        if (google) {
            // Buscar usuario en la base de datos
            user = await User.findOne({
                where: {
                    email: userEmail,
                },
            });
        } else {
            // Buscar usuario en la base de datos
            user = await User.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user || !user.password) {
                return res.status(400).json({
                    msg: 'No se encontró el hash de la contraseña en el usuario',
                });
            }

            const validPassword = await bcryptjs.compare(
                password,
                user.password
            );
            console.log(validPassword);

            if (!validPassword) {
                return res.status(400).json({
                    msg: 'Email o contraseña incorrectos',
                });
            }
        }

        console.log('MEEJEC', user);

        // Generar el token JWT
        const token = await generateJwt(userRecord.uid);

        // Enviar la respuesta
        res.json({
            user: {
                id: userRecord.uid,
                email: userRecord.email,
                name: userRecord.displayName,
                id: user.id,
                role: user.role,
                photoUrl: userRecord.photoURL,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = login;
