const bcryptjs = require('bcryptjs');
const { User } = require('../../db');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const userExists = await User.findOne({
            where: {
                email,
            },
        });

        if (userExists) {
            return res.status(400).json({
                msg: 'El email ya está registrado',
            });
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            msg: 'User created',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = register;
