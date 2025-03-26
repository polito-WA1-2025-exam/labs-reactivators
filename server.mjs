import sqlite from "sqlite3";

const db = new sqlite.Database("meme.sqlite", (err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("Database connection successful!");
  }
});
export default db;

import express from "express";
import { addUser } from "./users.mjs";
import { addMemes, deleteMemeById, updateMemeImageUrlById } from "./memes.mjs";

const app = express();
app.use(express.json());
app.listen(3001, () => console.log("Server is ready"));
app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.get("/api/users/search", (req, res) => {
  const score = req.query.score;
  const sql = "SELECT * FROM user WHERE total_score = 50";
  db.all(sql, [score], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});
//part c
app.get("/api/users/id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM user WHERE id =27";
  db.get(sql, [id], (err, row) => {
    if (err) res.status(500).json({ error: err.message });
    else if (row) res.json(row);
    else res.status(404).json({ error: "User not found" });
  });
});

app.post("/api/users", (req, res) => {
  const { username, password, total_score } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  addUser(db, username, password, total_score);
  res.status(201).json({ message: "User creation in progress" });
});

//part e
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id; // Get the user ID from the URL
  const { username, password, total_score } = req.body; // Get updated values from request body

  // Ensure all fields are provided
  if (!username || !password || total_score === undefined) {
    return res
      .status(400)
      .json({
        error: "All fields (username, password, total_score) are required",
      });
  }

  // SQL query to update user details (excluding the ID)
  const sql = `UPDATE user SET username = ?, password = ?, total_score = ? WHERE id = ?`;

  db.run(sql, [username, password, total_score, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (this.changes > 0) {
        res.json({ message: `User with ID ${id} updated successfully` });
      } else {
        res.status(404).json({ error: `No user found with ID ${id}` });
      }
    }
  });
});

//part f
app.patch("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { total_score } = req.body;
  const sql = "UPDATE user SET total_score = ? WHERE id = ?";
  db.run(sql, [total_score, id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ changes: this.changes });
  });
});

//part g

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM user WHERE id = ?";
  db.run(sql, [id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ deleted: this.changes > 0 });
  });
});

/*-----------------------------------------------------memes------------------------------------------------------ */

// GET all memes
app.get("/api/memes", (req, res) => {
  const sql = "SELECT * FROM memes";
  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// GET memes by specific image URL
app.get("/api/memes/search", (req, res) => {
  const imgUrl = req.query.img_url;
  const sql = "SELECT * FROM memes WHERE img_url = ?";
  db.all(sql, [imgUrl], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// GET meme by ID
app.get("/api/memes/:meme_id", (req, res) => {
  const meme_id = req.params.meme_id;
  const sql = "SELECT * FROM memes WHERE meme_id = ?";
  db.get(sql, [meme_id], (err, row) => {
    if (err) res.status(500).json({ error: err.message });
    else if (row) res.json(row);
    else res.status(404).json({ error: "Meme not found" });
  });
});

// POST: add meme
app.post("/api/memes", (req, res) => {
  const { img_url } = req.body;
  if (!img_url) {
    return res.status(400).json({ error: "Image URL is required" });
  }
  addMemes(db, img_url);
  res.status(201).json({ message: "Meme creation in progress" });
});

// PUT: update full meme
app.put("/api/memes/:meme_id", (req, res) => {
  const meme_id = req.params.meme_id;
  const { img_url } = req.body;
  if (!img_url) {
    return res.status(400).json({ error: "Image URL is required" });
  }
  const sql = `UPDATE memes SET img_url = ? WHERE meme_id = ?`;
  db.run(sql, [img_url, meme_id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes > 0)
      res.json({ message: `Meme with ID ${meme_id} updated successfully` });
    else res.status(404).json({ error: `No meme found with ID ${meme_id}` });
  });
});

// PATCH: update only image URL
app.patch("/api/memes/:meme_id", (req, res) => {
  const meme_id = req.params.meme_id;
  const { img_url } = req.body;
  const sql = "UPDATE memes SET img_url = ? WHERE meme_id = ?";
  db.run(sql, [img_url, meme_id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ changes: this.changes });
  });
});

// DELETE meme
app.delete("/api/memes/:meme_id", (req, res) => {
  const meme_id = req.params.meme_id;
  const sql = "DELETE FROM memes WHERE meme_id = ?";
  db.run(sql, [meme_id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ deleted: this.changes > 0 });
  });
});
