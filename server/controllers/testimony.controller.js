const {
    createTestimonyService,
    getAllTestimoniesService,
    getTestimonyByIdService,
    updateTestimonyService,
    deleteTestimonyService,
} = require('../services/testimony.services');

const createTestimony = async (req, res) => {
    const { name, comment } = req.body;

    try {
        const testimony = await createTestimonyService(name, comment);
        res.json(testimony);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTestimonies = async (req, res) => {
    try {
        const testimonies = await getAllTestimoniesService();
        res.json(testimonies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTestimonyById = async (req, res) => {
    const testimonyId = req.params.id;

    try {
        const testimony = await getTestimonyByIdService(testimonyId);
        if (!testimony) {
            return res.status(404).json({ error: 'Testimonio no encontrado' });
        }
        res.json(testimony);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTestimony = async (req, res) => {
    const testimonyId = req.params.id;
    const { name, comment } = req.body;

    try {
        const testimony = await getTestimonyByIdService(testimonyId);
        if (!testimony) {
            return res.status(404).json({ error: 'Testimonio no encontrado' });
        }

        // Actualizar el usuario
        const updatedTestimony = await updateTestimonyService(
            testimonyId,
            name,
            comment
        );
        res.json(updatedTestimony);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTestimony = async (req, res) => {
    const testimonyId = req.params.id;

    try {
        const testimony = await getTestimonyByIdService(testimonyId);
        if (!testimony) {
            return res.status(404).json({ error: 'Testimonio no encontrado' });
        }

        await deleteTestimonyService(testimonyId);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createTestimony,
    getAllTestimonies,
    getTestimonyById,
    updateTestimony,
    deleteTestimony,
};
