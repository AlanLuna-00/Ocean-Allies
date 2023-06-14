const { Testimony } = require('../db');

const createTestimonyService = async (name, comment) => {
    try {
        const testimony = await Testimony.create({ name, comment });
        return testimony;
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear testimonio');
    }
};

const getAllTestimoniesService = async () => {
    try {
        const testimonies = await Testimony.findAll();
        return testimonies;
    } catch (error) {
        throw new Error('Error al obtener los testimonios');
    }
};

const getTestimonyByIdService = async (testimonyId) => {
    try {
        const testimony = await Testimony.findByPk(testimonyId);
        return testimony;
    } catch (error) {
        throw new Error('Error al obtener el testimonio');
    }
};

const updateTestimonyService = async (testimonyId, name, comment) => {
    try {
        const testimony = await Testimony.findByPk(testimonyId);
        if (!testimony) {
            throw new Error('Testimonio no encontrado');
        }
        testimony.name = name;
        testimony.comment = comment;
        await testimony.save();
        return testimony;
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
};

const deleteTestimonyService = async (testimonyId) => {
    try {
        const testimony = await Testimony.findByPk(testimonyId);
        if (!testimony) {
            throw new Error('Testimonio no encontrado');
        }
        await testimony.destroy();
    } catch (error) {
        throw new Error('Error al eliminar el testimonio');
    }
};

module.exports = {
    createTestimonyService,
    getAllTestimoniesService,
    getTestimonyByIdService,
    updateTestimonyService,
    deleteTestimonyService,
};
