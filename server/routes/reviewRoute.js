const { Router } = require('express');
const {
    createReview,
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
} = require('../controllers/reviews.controller');

const reviewRoute = Router();

reviewRoute.get('/', getAllReview);
reviewRoute.post('/', createReview);
reviewRoute.get('/:id', getReviewById);
reviewRoute.put('/:id', updateReview);
reviewRoute.delete('/:id', deleteReview);

module.exports = reviewRoute;
