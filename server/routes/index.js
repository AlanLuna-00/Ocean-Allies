const { Router } = require('express');

const productRoute = require('./productRoute');
const reviewRoute = require('./reviewRoute');
const testimonioRoute = require('./testimonioRoute');
const userRoute = require('./userRoute');

const router = Router();

router.use('/product', productRoute);
router.use('/review', reviewRoute);
router.use('/testimonio', testimonioRoute);
router.use('/user', userRoute);

module.exports = router;
