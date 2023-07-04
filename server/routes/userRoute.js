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
const upload = require('../middleware/multer');

const userRoute = Router();

//userRoute.use(verifyJWT);

userRoute.get('/', verifyJWT, getAllUsers);
userRoute.get('/:id', verifyJWT, getUserById);
userRoute.post('/', verifyJWT, createUser);
userRoute.delete('/:id', verifyJWT, deleteUser);
userRoute.put('/:id', upload.single('image'), updateUser);
userRoute.put('/password/:id', updateUserPassword);

module.exports = userRoute;
