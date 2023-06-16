const express = require('express');
const router = express.Router();
const upload = require('../multer');
const cloudinaryService = require('../services/cloudinaryService');

router.post(
    '/upload-image',
    upload.single('image'),
    cloudinaryService.uploadImage
);
router.post(
    '/upload-video',
    upload.single('video'),
    cloudinaryService.uploadVideo
);
router.delete('/delete-image/:publicId', cloudinaryService.deleteImage);
router.delete('/delete-video/:publicId', cloudinaryService.deleteVideo);

module.exports = router;
