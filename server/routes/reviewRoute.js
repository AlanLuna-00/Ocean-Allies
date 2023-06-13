const { Router } = require('express')

const reviewRoute = Router();

reviewRoute.get('/', getAllReviews);
reviewRoute.get('/:id', getReviewById);
reviewRoute.post('/', createReview);
reviewRoute.delete('/:id', deleteReview);
reviewRoute.put('/:id', updateReview);


module.exports = reviewRoute;