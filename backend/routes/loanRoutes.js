// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const { createLoan, fetchLoans } = require('../controllers/loanController');
const { analyzeLoans } = require('../controllers/analysisController');

// POST /api/loans
router.post('/', createLoan);

// GET /api/loans
router.get('/', fetchLoans);

// POST /api/loans/analyze

// router.post('/analyze', analyzeLoans)

module.exports = router;
