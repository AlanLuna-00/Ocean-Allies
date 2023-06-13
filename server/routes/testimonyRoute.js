const { Router } = require('express');

const testimonyRoute = Router();

testimonyRoute.get('/', getAllTestimony);
testimonyRoute.get('/:id', getTestimonyById);
testimonyRoute.post('/', createTestimony);
testimonyRoute.delete('/:id', deleteTestimony);
testimonyRoute.put('/:id', updateTestimony);

module.exports = testimonyRoute;
