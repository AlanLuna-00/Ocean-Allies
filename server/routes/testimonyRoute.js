const { Router } = require('express');
const {
    getAllTestimonies,
    getTestimonyById,
    createTestimony,
    deleteTestimony,
    updateTestimony
} = require('../controllers/testimony.controller');

const testimonyRoute = Router();

testimonyRoute.get('/', getAllTestimonies);
testimonyRoute.get('/:id', getTestimonyById);
testimonyRoute.post('/', createTestimony);
testimonyRoute.delete('/:id', deleteTestimony);
testimonyRoute.put('/:id', updateTestimony);

module.exports = testimonyRoute;
