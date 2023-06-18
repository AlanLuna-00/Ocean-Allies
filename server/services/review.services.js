const { Review } = require('../db');
const { Product, User } = require('../db');

const createReviewService = async (rating, comment, productId, userId) => {
    try {
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            throw new Error('El producto o el usuario no existen');
        }

        const review = await Review.create({
            rating,
            comment,
        });

        await review.setUser(user);
        await review.setProduct(product);

        return review;
    } catch (error) {
        throw new Error('Error al crear la review');
    }
};

const getAllReviewService = async () => {
    try {
        const reviews = await Review.findAll();
        return reviews;
    } catch (error) {
        throw new Error('Error al obtener las reviews');
    }
};

const getReviewByIdService = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        return review;
    } catch (error) {
        throw new Error('Error al obtener la review');
    }
};

const updateReviewService = async (reviewId, rating, comment) => {
    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review no encontrada');
        }
        review.rating = rating;
        review.comment = comment;
        await review.save();
        return review;
    } catch (error) {
        throw new Error('Error al actualizar la review');
    }
};

const deleteReviewService = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review no encontrada');
        }
        await review.destroy();
    } catch (error) {
        throw new Error('Error al eliminar la review');
    }
};

module.exports = {
    createReviewService,
    getAllReviewService,
    getReviewByIdService,
    updateReviewService,
    deleteReviewService,
};
