const { Router } = require('express');
const {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} = require('../controllers/user.controller');
//const verifyJWT = require('../middlewares/verifyJwt');

const userRoute = Router();

userRoute.get('/', /*verifyJWT*/ getAllUsers);
userRoute.get('/:id', /*verifyJWT*/ getUserById);
userRoute.post('/', createUser);
userRoute.delete('/:id', /*verifyJWT*/ deleteUser);
userRoute.put('/:id', /*verifyJWT*/ updateUser);

module.exports = userRoute;
