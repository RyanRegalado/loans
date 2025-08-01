// routes/loanRoutes.js
const express = require('express');
const router = express.Router();
const { createLoan, fetchLoans, deleteLoan } = require('../controllers/loanController');

// POST /api/loans
router.post('/', createLoan);

// GET /api/loans
router.get('/', fetchLoans);

// DELETE /api/loans

router.delete('/', deleteLoan);

// POST /api/loans/analyze

// router.post('/analyze', analyzeLoans)

module.exports = router;
