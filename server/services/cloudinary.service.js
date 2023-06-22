const cloudinaryController = require('../controllers/cloudinaryController');
const upload = require('../multer');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No se ha proporcionado ningún archivo');
        }

        const result = await cloudinaryController.uploadImage(req.file.path);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadVideo = async (req, res) => {
    try {
        if (!req.file) {
            throw new Error('No se ha proporcionado ningún archivo');
        }

        const result = await cloudinaryController.uploadVideo(req.file.path);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteImage = async (req, res) => {
    try {
        const result = await cloudinaryController.deleteImage(
            req.params.publicId
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const result = await cloudinaryController.deleteVideo(
            req.params.publicId
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadImage, uploadVideo, deleteImage, deleteVideo };
