// services/loanService.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const addLoan = async (loanData) => {
  const { userID, name, yearsTillGraduation, amount, interestRate, termYears, gracePeriod, subsidized } = loanData;

  const { data, error } = await supabase
    .from('loans_table')
    .insert([{ userID, name, yearsTillGraduation, amount, interestRate, termYears, gracePeriod, subsidized }]);

  if (error) throw error;

  // Return the newly created loan object
  return data[0];
};

const getLoans = async (userID) => {
    const { data, error } = await supabase
  .from('loans_table')
  .select('*')
  .eq('userID', userID)
  .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

const deleter = async (userID, loanID) => {
  const { data, error } = await supabase
  .from('loans_table')
  .delete()
  .match({'userID' : userID, 'id' : loanID});
  if (error) throw error;

  return data;
};

module.exports = { addLoan, getLoans, deleter };