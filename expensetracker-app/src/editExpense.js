import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import expenseService from "./expenseService";

function EditExpense() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadExpense() {
      try {
        const res = await expenseService.getExpenseById(id);
        const data = res.data;
        setAmount(data.amount);
        setCategory(data.category);
        setDate(data.date);
      } catch (err) {
        console.error("Error loading expense:", err);
      }
    }
    loadExpense();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await expenseService.updateExpense(id, amount, category, date);
      navigate("/");
    } catch (err) {
      console.error("Failed to update:", err);
    }
  }

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>Expense Tracker</h2>
        <button style={styles.navButton} onClick={() => navigate("/")}>Home</button>
      </div>
      <div style={styles.formContainer}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Health">Health</option>
          </select>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between"
  },
 title: { 
    margin: 0,
    flexGrow: 1,  // Ensures title is centered while the button stays at the right
    textAlign: "center"
   },
  navButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  formContainer: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px"
  },
  submitButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default EditExpense;
