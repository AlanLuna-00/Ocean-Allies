const { User } = require('../../db');
const bcryptjs = require('bcryptjs');
const generateJwt = require('../../utils/generateJwt');
const admin = require('firebase-admin');

const register = async (req, res) => {
    try {
        const { name, email, password, role, google, image } = req.body;


        // Verificar si el correo electrónico ya está en uso en Firebase Authentication y en la base de datos
        const userRecord = await admin
            .auth()
            .getUserByEmail(email)
            .catch(() => null);

        const emailExists = await User.findOne({
            where: {
                email,
            },
        });


        // Si el usuario ya existe en Firebase Authentication y no es un registro con Google, enviar error
        // if (userRecord && !google) {
        //     return res.status(401).json({
        //         msg: 'El correo electrónico ya está registrado',
        //     });
        // }
        // // si es un registro con Google y ya existe en firebase, enviar error
        // if (userRecord && google) {
        //     return res.status(401).json({
        //         msg: 'El correo electrónico ya está registrado',
        //     });
        // }

        if (userRecord) {
            let userExist = User.findOne({
                where: {
                    email: userRecord.email,
                },
            });
            const exist = await userExist;
            if (exist) {
                return res.status(401).json({
                    msg: 'El correo electrónico ya está registrado',
                });
            }
        }



        // Generar el hash de la contraseña
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Crear usuario en la base de datos
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            image,
        });

        // Crear usuario en Firebase Authentication
        if (!google) {
            const userRecord = await admin.auth().createUser({
                email,
                password: hashedPassword,
                displayName: name,
                uid: user.id.toString(), // Usar el ID del usuario de la base de datos como UID en Firebase
            });
        }

        // Generar el token JWT
        const token = await generateJwt(user.id);

        // Enviar la respuesta
        res.status(201).json({
            msg: 'Usuario creado',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
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

module.exports = register;
