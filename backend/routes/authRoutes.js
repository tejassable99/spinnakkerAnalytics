
const express = require('express');
const { register, sendOTP, verifyOTP } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;
