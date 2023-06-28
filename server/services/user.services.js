const { User, Purchase } = require('../db');

const createUserService = async (name, email, password, role) => {
    try {
        const user = await User.create({ name, email, password, role });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear el usuario');
    }
};

const getAllUsersService = async () => {
    try {
        const users = await User.findAll({
            include: {
                model: Purchase,
                attributes: ['id', 'productId', 'userId'],
            },
        });
        return users;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
};

const getUserByIdService = async (userId) => {
    try {
        const user = await User.findByPk(userId, {
            include: {
                model: Purchase,
                attributes: [
                    'id',
                    'productId',
                    'userId',
                    'quantity',
                    'total',
                    'sizes',
                ],
            },
        });
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario');
    }
};

const updateUserService = async (userId, updates) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Actualizar los campos proporcionados en el objeto `updates`
        Object.keys(updates).forEach((key) => {
            user[key] = updates[key];
        });

        // Guardar los cambios en la base de datos
        await user.save();

        return user;
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
};

const deleteUserService = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.update({ active: false });
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
};

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
};
