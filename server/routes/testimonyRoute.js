const { Router } = require('express');
const {
    getAllTestimonies,
    getTestimonyById,
    createTestimony,
    deleteTestimony,
    updateTestimony,
} = require('../controllers/testimony.controller');
const verifyJWT = require('../middlewares/verifyJwt');

const testimonyRoute = Router();

testimonyRoute.get('/', getAllTestimonies);
testimonyRoute.get('/:id', getTestimonyById);
testimonyRoute.post('/', createTestimony);
testimonyRoute.delete('/:id', verifyJWT, deleteTestimony);
testimonyRoute.put('/:id', verifyJWT, updateTestimony);

module.exports = testimonyRoute;
