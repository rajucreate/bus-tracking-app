const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Client } = require("pg");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 🔹 Connect to PostgreSQL
const client = new Client({
  user: "postgres",         // change if different
  host: "localhost",
  database: "hackathonDB",  // make sure this DB exists in Postgres
  password: "1234",// replace with your Postgres password
  port: 5432,
});

client.connect()
  .then(() => console.log("✅ PostgreSQL Connected"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

// 🔹 Ensure users table exists
const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL
);
`;

client.query(createTableQuery)
  .then(() => console.log("✅ Users table ready"))
  .catch(err => console.error("❌ Error creating table:", err));

// 🔹 Sign Up Route
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // Save new user
    await client.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPass]
    );

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.json({ success: false, message: "Error registering user" });
  }
});

// 🔹 Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userRes = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userRes.rows.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    const user = userRes.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Success
    res.json({
      success: true,
      message: "Login successful",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.json({ success: false, message: "Error logging in" });
  }
});

// 🔹 Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
