const {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    updateUserPasswordService,
} = require('../services/user.services.js');

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const user = await createUserService(name, email, password, role);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const cloudinary = require('../middleware/cloudinary.js');
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, active, role } = req.body;

    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Crear objeto `updates` con los campos a actualizar
        const updates = {};
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (active) updates.active = active;
        if (role) updates.role = role;

        // Verificar si se cargó una imagen
        if (req.file) {
            // Subir la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            // Guardar la URL de la imagen en `updates`
            updates.image = result.secure_url;
        }

        // Actualizar el usuario
        const updatedUser = await updateUserService(userId, updates);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await getUserByIdService(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Eliminar el usuario
        await deleteUserService(userId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserPassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        const result = await updateUserPasswordService(
            id,
            oldPassword,
            newPassword
        );
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ha ocurrido un error inesperado' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserPassword,
};
