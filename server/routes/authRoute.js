const { Router } = require('express');
const login = require('../controllers/auth/login');
const logout = require('../controllers/auth/logout');
const register = require('../controllers/auth/register');

const authRoute = Router();

authRoute.get('/', (req, res) => {
    res.json({
        msg: 'authRoute works',
    });
});
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/register', register);

module.exports = authRoute;
