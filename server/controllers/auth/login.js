const { User } = require('../../db');
const bcryptjs = require('bcryptjs');
const generateJwt = require('../../utils/generateJwt');
const admin = require('firebase-admin');

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // Verificar credenciales con Firebase Authentication
        const userRecord = await admin.auth().getUserByEmail(email);
        console.log(userRecord);

        const user = await User.findOne({ email }); // Obtener el usuario de tu base de datos

        if (!user || !user.password) {
            return res.status(400).json({
                msg: 'No se encontró el hash de la contraseña en el usuario',
            });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email o contraseña incorrectos',
            });
        }

        // Generar el token JWT
        const token = await generateJwt(userRecord.uid);

        // Establecer la cookie con el token JWT
        res.cookie('token', token, {
            maxAge: 4 * 60 * 60 * 1000, // 4 horas en milisegundos
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

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
