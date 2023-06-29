const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'di8ocqpu1',
    api_key: '888444416473822',
    api_secret: 'i5CycR7GJHkEREdvb4O65jmxByM',
});

exports.uploads = (file, folder) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({
                    url: result.url,
                    id: result.public_id,
                });
            },
            {
                resource_type: 'auto',
                folder: folder,
            }
        );
    });
};
