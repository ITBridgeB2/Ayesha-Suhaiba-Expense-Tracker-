import cors from 'cors';
import express from 'express';
import mysql from 'mysql2/promise';

const expenseapp = express();

expenseapp.use(express.json());
expenseapp.use(express.urlencoded({ extended: true }));
expenseapp.use(cors());

// Create DB connection
const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'itbridge',
});

// Connect to the database
console.log('Connecting to MySQL database...');
try {
  await db.connect();
  console.log('Connected to MySQL database.');
} catch (err) {
  console.error('Database connection failed:', err);
  process.exit(1); // Exit the process if the database connection fails
}

// API Routes

// Get all expenses
expenseapp.get('/expenses', async (req, res) => {
  try {
    const [results] = await db.execute('SELECT * FROM expenses ORDER BY created_at DESC');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving expenses.');
  }
});

// Add a new expense
expenseapp.post('/expenses', async (req, res) => {
  const { amount, category, date } = req.body;
  const query = 'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)';

  try {
    await db.execute(query, [amount, category, date]);
    res.status(201).send('Expense added successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding expense.');
  }
});

// Update an existing expense
expenseapp.put('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, category, date } = req.body;
  const query = 'UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?';

  try {
    await db.execute(query, [amount, category, date, id]);
    res.send('Expense updated successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating expense.');
  }
});

// Delete an expense
expenseapp.delete('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM expenses WHERE id = ?';

  try {
    await db.execute(query, [id]);
    res.send('Expense deleted successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting expense.');
  }
});

// Get total expense amount
expenseapp.get('/expenses/total', async (req, res) => {
  try {
    const [result] = await db.execute('SELECT SUM(amount) AS total FROM expenses');
    res.json(result[0]); // Return total amount
  } catch (err) {
    console.error(err);
    res.status(500).send('Error calculating total expenses.');
  }
});

// Get a single expense by ID
expenseapp.get('/expenses/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM expenses WHERE id = ?';

  try {
    const [results] = await db.execute(query, [id]);
    if (results.length === 0) {
      return res.status(404).send('Expense not found.');
    }
    res.json(results[0]); // Return the first (and only) expense
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving expense.');
  }
});


// Start the server
expenseapp.listen('9097')
  console.log('Server is running on port 9097');

