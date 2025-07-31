// controllers/loanController.js
const { addLoan, getLoans, deleter } = require('../services/loanService');

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
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

deleteLoan = async (req, res) => {
  try {
    const userID = req.query.userID;
    const loanID = req.query.id; // Ex ?userID=123&id=456
    const deleteResult = await deleter(userID, loanID);
    res.status(200).json({ message: 'Loan deleted successfully', result: deleteResult });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error('Error deleting loan:', error);
  }
}

module.exports = { createLoan, fetchLoans, deleteLoan };
