const { User } = require('../../db');
const bcryptjs = require('bcryptjs');
const generateJwt = require('../../utils/generateJwt');
const admin = require('firebase-admin');

const login = async (req, res) => {
    const { id, email, password, google } = req.body;
    console.log(req.body);
    try {
        let userRecord;

        try {
            // Verificar credenciales con Firebase Authentication
            userRecord = await admin.auth().getUserByEmail(email);
        } catch (error) {
            console.log('error', error);
            return res.status(401).json({
                msg: 'El correo electrónico no está registrado',
            });
        }

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

            if (!user) {
                return res.status(401).json({
                    msg: 'El usuario no existe, registrese. GOOGLE',
                });
            }

            if (user.active === false) {
                return res.status(401).json({
                    msg: 'Usuario desactivado',
                });
            }
        } else {
            // Buscar usuario en la base de datos
            user = await User.findOne({
                where: {
                    id: userId,
                },
            });

            if (!user) {
                return res.status(401).json({
                    msg: 'El usuario no existe, registrese.',
                });
            }

            if (user.active === false) {
                return res.status(401).json({
                    msg: 'Usuario desactivado',
                });
            }

            const validPassword = await bcryptjs.compare(
                password,
                user.password
            );
            console.log(validPassword);

            if (!validPassword) {
                return res.status(401).json({
                    msg: 'Email o contraseña incorrectos',
                });
            }
        }

        // Generar el token JWT
        const token = await generateJwt(userRecord.uid);

        // Crear el objeto de respuesta
        const response = {
            user: {
                id: userRecord.uid,
                email: userRecord.email,
                name: userRecord.displayName,
                id: user.id,
                role: user.role,
                photoUrl: userRecord.photoURL,
            },
            token,
        };

        // Enviar la respuesta
        res.json(response);
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = login;
