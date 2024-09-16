const express = require('express');
const { registerUser, authUser, getUserInfo, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/me', authUser, getUserInfo);
router.post('/logout', logoutUser);  

module.exports = router;

