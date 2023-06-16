const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'duozr9abd',
    api_key: '249639979959491',
    api_secret: 'IYC4Whyf9oHsrb4FKtgeS6yOXSA',
});

const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error('Error al borrar la imagen');
    }
};

const deleteVideo = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video',
        });
        return result;
    } catch (error) {
        throw new Error('Error al borrar el video');
    }
};

module.exports = { deleteImage, deleteVideo };
