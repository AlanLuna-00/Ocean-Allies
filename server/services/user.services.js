const { User, Purchase } = require('../db');
const bcrypt = require('bcryptjs');

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

const updateUserPasswordService = async (id, oldPassword, newPassword) => {
    // Buscar al usuario en la base de datos
    const user = await User.findById(id);
  
    if (!user) {
      throw new Error('El usuario no existe');
    }
  
    // Verificar que la contraseña antigua sea correcta
    const isMatch = await bcrypt.compare(oldPassword, user.password);
  
    if (!isMatch) {
      throw new Error('La contraseña antigua es incorrecta');
    }
  
    // Generar el hash de la contraseña nueva y actualizar la base de datos
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
  
    user.password = hash;
    await user.save();
  
    return { message: 'Contraseña actualizada correctamente' };
  };

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    updateUserPasswordService,
};
