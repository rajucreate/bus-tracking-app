const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "bus_user",          // your PostgreSQL user
  host: "localhost",
  database: "bus_app",       // your database
  password: "yourpassword",  // your PostgreSQL password
  port: 5432,
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch(err => console.error("Connection error", err.stack));

// ------------------ SIGN UP ------------------
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
  const values = [name, email, hashedPassword];

  try {
    const result = await pool.query(query, values);
    res.json({ message: "User registered successfully!", userId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
});

// ------------------ LOGIN ------------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));