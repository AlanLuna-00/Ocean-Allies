const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dp3j8dfa7',
    api_key: '238265935755577',
    api_secret: '***************************'
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
            upload_preset: 'ocean_allies',
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
