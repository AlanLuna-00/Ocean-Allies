const { Router } = require('express');
const {
    createReview,
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
} = require('../controllers/reviews.controller');
//const verifyJWT = require('../middlewares/verifyJwt');

const reviewRoute = Router();

//reviewRoute.use(verifyJWT);

reviewRoute.get('/', getAllReview);
reviewRoute.post('/', createReview);
reviewRoute.get('/:id', getReviewById);
reviewRoute.put('/:id', updateReview);
reviewRoute.delete('/:id', deleteReview);

module.exports = reviewRoute;
