import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import expenseService from "./expenseService";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const all = await expenseService.getAllExpenses();
      const totalRes = await expenseService.getTotalExpenses();
      setExpenses(all.data);
      setTotal(Number(totalRes.data.total));
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  }

  async function handleDelete(event, id) {
    event.preventDefault();
    try {
      await expenseService.deleteExpense(id);
      loadData();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  }

  function handleView(event, id) {
    event.preventDefault();
    navigate(`/expenses/${id}`);
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h2 style={styles.title}>Expense Tracker</h2>
        <button style={styles.navButton} onClick={() => navigate("/add")}>
          Add Expense
        </button>
      </div>

      <div style={styles.container}>
        <h3 style={styles.totalText}>Total Spent: ${Number(total).toFixed(2)}</h3>

        {expenses.map((e) => (
          <div key={e.id} style={styles.expenseRow}>
            <div style={styles.expenseText}>
              ${Number(e.amount).toFixed(2)} - {e.category} - {e.date}
            </div>
            <div>
              <button
                style={styles.viewButton}
                onClick={(event) => handleView(event, e.id)}
              >
                View
              </button>
              <button
                style={styles.deleteButton}
                onClick={(event) => handleDelete(event, e.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    paddingBottom: "20px",
  },
  header: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    margin: 0,
    flexGrow: 1,
    textAlign: "center",
  },
  navButton: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  container: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    margin: "20px",
  },
  totalText: {
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
  },
  expenseRow: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  expenseText: {
    color: "black",
    fontWeight: "bold",
  },
  viewButton: {
    color: "#007BFF",
    background: "none",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "500",
  },
  deleteButton: {
    color: "red",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default ExpenseList;
