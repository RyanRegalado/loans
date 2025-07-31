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
    const userID = req.query.userID;
    const loans = await getLoans(userID);
    console.log('Fetched loans for userID:', userID, 'Loans:', loans);
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLoan, fetchLoans };
