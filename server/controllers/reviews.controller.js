const {
    createReviewService,
    getAllReviewService,
    getReviewByIdService,
    updateReviewService,
    deleteReviewService,
} = require('../services/review.services');

const createReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const review = await createReviewService(rating, comment);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllReview = async (reqm, res) => {
    try {
        const reviews = await getAllReviewService();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviewById = async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await getReviewByIdService(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review no encontrado' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    try {
        const review = await getReviewByIdService(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review no encontrado' });
        }
        // Actualizar la review
        const updatedReview = await updateReviewService(
            reviewId,
            rating,
            comment
        );
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await getReviewByIdService(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review no encontrada' });
        }

        // Eliminar la review
        await deleteReviewService(reviewId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createReview,
    getAllReview,
    getReviewById,
    updateReview,
    deleteReview,
};
