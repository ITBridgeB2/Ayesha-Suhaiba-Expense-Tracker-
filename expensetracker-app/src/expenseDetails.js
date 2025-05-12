import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import expenseService from "./expenseService";

function ExpenseDetails() {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await expenseService.getExpenseById(id);
        console.log(res.data); // Log the response to check the structure
        setExpense(res.data);
      } catch (err) {
        console.error("Error loading expense:", err);
      }
    }
    fetchData();
  }, [id]);

  async function handleDelete() {
    try {
      await expenseService.deleteExpense(id);
      navigate("/");
    } catch (err) {
      console.error("Error deleting:", err);
    }
  }

  if (!expense) return <p>Loading...</p>;

  // Ensure expense.amount is a number before calling .toFixed()
  const amount = isNaN(expense.amount) ? 0 : parseFloat(expense.amount).toFixed(2);

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>Expense Tracker</h2>
        <button style={styles.navButton} onClick={() => navigate("/")}>Home</button>
      </div>
      
      <div style={styles.card}>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Category:</strong> {expense.category}</p>
        <p><strong>Date:</strong> {expense.date}</p>
        <p><strong>Added:</strong> {expense.created_at}</p>
        <div style={styles.actions}>
          <Link to={`/expenses/${id}/edit`} style={styles.editLink}>Edit Expense</Link>
          <button onClick={handleDelete} style={styles.deleteLink}>Delete Expense</button>
        </div>
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
    justifyContent: "space-between",
    alignItems: "center"
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
  card: {
    backgroundColor: "#E1F1FF", // Light blue shade for the card
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "450px",
    margin: "40px auto",
    transition: "transform 0.2s ease-in-out",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  editLink: {
    color: "#007BFF",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 12px",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
  },
  deleteLink: {
    color: "red",
    background: "none",
    border: "none",
    padding: "8px 12px",
    font: "inherit",
    cursor: "pointer",
    fontWeight: "500",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
  }
};

export default ExpenseDetails;
