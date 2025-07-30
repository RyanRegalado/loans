const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the correct path for the loan routes
const loanRouter = require('./routes/loanRoutes');
app.use('/api/loans', loanRouter);

app.get('/', (req, res) => {
  res.send('College Loan API is running');
});

app.get('/testing', (req, res) => {
  console.log('Testing endpoint hit');
  res.send('Testing endpoint is working. Great job, Ryan');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});