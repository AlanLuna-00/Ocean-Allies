const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'duozr9abd',
    api_key: '249639979959491',
    api_secret: 'IYC4Whyf9oHsrb4FKtgeS6yOXSA',
});

const uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload_large(file, {
            upload_preset: 'ocean_alisse',
        });
        return result;
    } catch (error) {
        throw new Error('Error al cargar la imagen');
    }
};

const uploadVideo = async (file) => {
    try {
        const result = await cloudinary.uploader.upload_large(file, {
            upload_preset: 'ocean_alisse',
            resource_type: 'video',
        });
        return result;
    } catch (error) {
        throw new Error('Error al cargar el video');
    }
};

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

module.exports = { uploadImage, uploadVideo, deleteImage, deleteVideo };
