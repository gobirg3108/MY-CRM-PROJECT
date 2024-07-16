const express = require('express');
const router = express.Router();
const { sendFollowUpEmail } = require('../controllers/emailController');
const auth = require('../middlewares/auth');

router.post('/send', auth, sendFollowUpEmail);

module.exports = router;