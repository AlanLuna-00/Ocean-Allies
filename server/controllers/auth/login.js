const { User } = require('../../db');
const bcryptjs = require('bcryptjs');
const generateJwt = require('../../utils/generateJwt');
const admin = require('firebase-admin');

const login = async (req, res) => {
    const { id, email, password, google } = req.body;

    try {
        let userRecord;

        try {
            // Verificar credenciales con Firebase Authentication
            userRecord = await admin.auth().getUserByEmail(email);
        } catch (error) {
            console.log('error', error);
            return res.status(401).json({
                msg: 'Email is not registered',
            });
        }

        const userId = userRecord.uid;
        const userEmail = userRecord.email;


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
                    msg: 'The user does not exist, please register. GOOGLE',
                });
            }

            if (user.active === false) {
                return res.status(401).json({
                    msg: 'deactivated user',
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
                    msg: 'The user does not exist, please register.',
                });
            }

            if (user.active === false) {
                return res.status(401).json({
                    msg: 'Deactivated user',
                });
            }

            const validPassword = await bcryptjs.compare(
                password,
                user.password
            );


            if (!validPassword) {
                return res.status(401).json({
                    msg: 'Wrong email or password',
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
            msg: 'Talk to the administrator',
        });
    }
};

module.exports = login;
