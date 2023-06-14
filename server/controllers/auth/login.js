const { User } = require('../../db');
const bcryptjs = require('bcryptjs');
const { generateJwt } = require('../../utils/generateJwt');
const { serialize } = require('cookie');

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                msg: 'Email o contraseña incorrectos - email',
            });
        }

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Email o contraseña incorrectos - password',
            });
        }

        // Generar el token
        const token = await generateJwt(user.id);

        // Configurar la cookie
        const cookieOptions = {
            maxAge: 4 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        };

        // Establecer la cookie
        res.cookie('token', token, cookieOptions);

        // Enviar la respuesta
        res.json({
            user,
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
