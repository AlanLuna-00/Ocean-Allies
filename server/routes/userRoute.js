const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
    updateUserPassword,
} = require('../controllers/user.controller');
const verifyJWT = require('../middlewares/verifyJwt');

const userRoute = Router();

userRoute.use(verifyJWT);

userRoute.get('/', getAllUsers);
userRoute.get('/:id', getUserById);
userRoute.post('/', createUser);
userRoute.delete('/:id', deleteUser);
userRoute.put('/:id', updateUser);
userRoute.put('/password/:id', updateUserPassword);

module.exports = userRoute;
