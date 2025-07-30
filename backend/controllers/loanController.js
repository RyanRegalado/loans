// controllers/loanController.js
const { addLoan, getLoans } = require('../services/loanService');

createLoan = async (req, res) => {
  try {
    const loan = await addLoan(req.body);
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

fetchLoans = async (req, res) => {
  try {
    const loans = await getLoans();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLoan, fetchLoans };
