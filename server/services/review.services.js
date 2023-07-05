const { Product, User, Review, Purchase } = require('../db');

const createReviewService = async (rating, comment, productId, userId) => {
    try {
        const product = await Product.findByPk(productId);
        const user = await User.findByPk(userId);

        if (!product || !user) {
            throw new Error('The product or user does not exist');
        }

        const existingReview = await Review.findOne({
            where: {
                productId,
                userId,
            },
        });

        if (existingReview) {
            throw new Error(
                'The user can only send a single review per product'
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
                'The user must buy the product before making a review'
            );
        }

        const review = await Review.create({
            rating,
            comment,
            name: user.name,
            image: user.image,
        });

        await review.setUser(user);
        await review.setProduct(product);

        return review;
    } catch (error) {
        console.log(error);
    }
};

const getAllReviewService = async () => {
    try {
        const reviews = await Review.findAll();
        return reviews;
    } catch (error) {
        throw new Error('Error getting reviews');
    }
};

const getReviewByIdService = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        return review;
    } catch (error) {
        throw new Error('Error getting review');
    }
};

const updateReviewService = async (reviewId, rating, comment) => {
    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        review.rating = rating;
        review.comment = comment;
        await review.save();
        return review;
    } catch (error) {
        throw new Error('Error updating review');
    }
};

const deleteReviewService = async (reviewId) => {
    try {
        const review = await Review.findByPk(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        await review.update({ active: false });
    } catch (error) {
        throw new Error('Error deleting review');
    }
};

module.exports = {
    createReviewService,
    getAllReviewService,
    getReviewByIdService,
    updateReviewService,
    deleteReviewService,
};
