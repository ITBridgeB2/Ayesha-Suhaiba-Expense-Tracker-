import axios from 'axios';

const API_URL = 'http://localhost:9097'; // Backend API URL

const expenseService = {
  // ✅ Get all expenses
  getAllExpenses: () => {
    return axios.get(`${API_URL}/expenses`);
  },

  // ✅ Add a new expense
  addExpense: (amount, category, date) => {
    return axios.post(`${API_URL}/expenses`, { amount, category, date });
  },

  // ✅ Update an existing expense by ID
  updateExpense: (id, amount, category, date) => {
    return axios.put(`${API_URL}/expenses/${id}`, { amount, category, date });
  },

  // ✅ Delete an expense by ID
  deleteExpense: (id) => {
    return axios.delete(`${API_URL}/expenses/${id}`);
  },

  // ✅ Get total expense amount
  getTotalExpenses: () => {
    return axios.get(`${API_URL}/expenses/total`);
  },

  // ✅ Get expense by ID
getExpenseById: (id) => {
  return axios.get(`${API_URL}/expenses/${id}`);
}

};

export default expenseService;
