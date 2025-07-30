const express = require('express');
const router = express.Router();
const { analyzeLoan } = require('../controllers/analysisController');

//POST /api/analysis
router.post('/', analyzeLoan);

module.exports = router;