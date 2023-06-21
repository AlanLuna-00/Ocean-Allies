const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/user.controller');
const verifyJWT = require('../middlewares/verifyJwt');

const userRoute = Router();

userRoute.use(verifyJWT);

userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUserById);
userRoute.post('/', createUser);
userRoute.delete('/:id', deleteUser);
userRoute.put('/:id', updateUser);

module.exports = userRoute;
