const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/user.controller');

const userRoute = Router();

userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUserById);
userRoute.post('/', createUser);
userRoute.delete('/:id', deleteUser);
userRoute.put('/:id', updateUser);

module.exports = userRoute;
