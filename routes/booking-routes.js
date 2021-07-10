const express = require('express');
const {checkBooking,addBooking} = require('../controllers/bookingController');

const router = express.Router();
router.post('/booking/check', checkBooking);
router.post('/booking/add', addBooking);
module.exports = {
    routes: router
}