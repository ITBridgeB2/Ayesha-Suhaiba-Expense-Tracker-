import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseList from "./expenseList";
import AddExpense from "./addExpense";
import ExpenseDetails from "./expenseDetails";
import EditExpense from "./editExpense";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/expenses/:id" element={<ExpenseDetails />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
      </Routes>
    </Router>
  );
}

export default App;
