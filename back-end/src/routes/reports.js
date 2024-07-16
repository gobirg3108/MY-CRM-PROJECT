const express = require('express');
const router = express.Router();
const { generateReports } = require('../controllers/reportController');
const auth = require('../middlewares/auth');

router.get('/', auth, generateReports);

module.exports = router;