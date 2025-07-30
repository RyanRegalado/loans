// services/loanService.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const addLoan = async (loanData) => {
  const { name, amount, interestRate, termMonths, gracePeriod } = loanData;

  const { data, error } = await supabase
    .from('loans_table')
    .insert([{ name, amount, interestRate, termMonths, gracePeriod }]);

  if (error) throw error;
  console.log('Loan added:')
  // Return the newly created loan object
  return data[0];
};

const getLoans = async () => {
  const { data, error } = await supabase.from('loans_table').select('*');
  if (error) throw error;
  return data;
};

module.exports = { addLoan, getLoans };