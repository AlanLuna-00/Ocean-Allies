const { Router } = require('express');

const productRoute = require('./productRoute');
const reviewRoute = require('./reviewRoute');
const testimonyRoute = require('./testimonyRoute');
const userRoute = require('./userRoute');

const router = Router();

router.use('/product', productRoute);
router.use('/review', reviewRoute);
router.use('/testimony', testimonyRoute);
router.use('/user', userRoute);

module.exports = router;
