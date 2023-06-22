const { Product, User, Review, Purchase } = require('../db');

const createReviewService = async (rating, comment, productId, userId) => {
    try {
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            throw new Error('El producto o el usuario no existen');
        }

        const existingReview = await Review.findOne({
            where: {
                productId,
                userId,
            },
        });

        if (existingReview) {
            throw new Error(
                'El usuario solo puede enviar una única review por producto'
            );
        }

        const purchase = await Purchase.findOne({
            where: {
                productId,
                userId,
            },
        });

        if (!purchase) {
            throw new Error(
                'El usuario debe comprar el producto antes de realizar una review'
            );
        }

        const review = await Review.create({
            rating,
            comment,
        });

        await review.setUser(user);
        await review.setProduct(product);

        return review;
    } catch (error) {
        throw error;
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
        await review.update({ active: false });
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
