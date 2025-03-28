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

import { addMemeCaption } from "./mem_captions.mjs";
import { addCaption } from "./captions.mjs";

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

// Route to add a meme-caption relationship
app.post("/api/memeCaptions", (req, res) => {
  const { meme_id, caption_id, score } = req.body;
  if (!meme_id || !caption_id || score === undefined) {
    return res.status(400).json({
      error: "meme_id, caption_id, and score are required",
    });
  }
  addMemeCaption(db, meme_id, caption_id, score);

  res.status(201).json({ message: "Meme-caption relationship creation in progress" });
});

// Route to get all meme-caption relationships
app.get("/api/memeCaptions", (req, res) => {
  const sql = "SELECT * FROM memeCaptions";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route to update the score of a meme-caption relationship
app.patch("/api/memeCaptions/:meme_id/:caption_id", (req, res) => {
  const { meme_id, caption_id } = req.params;
  const { score } = req.body;
  if (score === undefined) {
    return res.status(400).json({ error: "Score is required" });
  }

  const sql = `UPDATE memeCaptions SET score = ? WHERE meme_id = ? AND caption_id = ?`;
  db.run(sql, [score, meme_id, caption_id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: "Meme-caption score updated successfully" });
    } else {
      res.status(404).json({ error: "Meme-caption relationship not found" });
    }
  });
});

// Route to delete a meme-caption relationship
app.delete("/api/memeCaptions/:meme_id/:caption_id", (req, res) => {
  const { meme_id, caption_id } = req.params;

  const sql = `DELETE FROM memeCaptions WHERE meme_id = ? AND caption_id = ?`;
  db.run(sql, [meme_id, caption_id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: "Meme-caption relationship deleted successfully" });
    } else {
      res.status(404).json({ error: "Meme-caption relationship not found" });
    }
  });
});

// Route to add a new caption
app.post("/api/captions", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Caption text is required" });
  }
  addCaption(db, text);
  res.status(201).json({ message: "Caption creation in progress" });
});

// Route to retrieve all captions
app.get("/api/captions", (req, res) => {
  const sql = "SELECT * FROM captions";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route to retrieve a caption by ID
app.get("/api/captions/:caption_id", (req, res) => {
  const { caption_id } = req.params;

  const sql = "SELECT * FROM captions WHERE caption_id = ?";
  db.get(sql, [caption_id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: "Caption not found" });
    }
  });
});

// Route to update a caption by ID
app.put("/api/captions/:caption_id", (req, res) => {
  const { caption_id } = req.params;
  const { text } = req.body;

  // Validate the request body
  if (!text) {
    return res.status(400).json({ error: "Caption text is required" });
  }

  const sql = "UPDATE captions SET text = ? WHERE caption_id = ?";
  db.run(sql, [text, caption_id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: `Caption with ID ${caption_id} updated successfully` });
    } else {
      res.status(404).json({ error: "Caption not found" });
    }
  });
});

// Route to delete a caption by ID
app.delete("/api/captions/:caption_id", (req, res) => {
  const { caption_id } = req.params;

  const sql = "DELETE FROM captions WHERE caption_id = ?";
  db.run(sql, [caption_id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes > 0) {
      res.json({ message: `Caption with ID ${caption_id} deleted successfully` });
    } else {
      res.status(404).json({ error: "Caption not found" });
    }
  });
});

// Rounds API endpoints
app.get("/api/rounds", (req, res) => {
  const sql = "SELECT * FROM rounds";
  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.get("/api/rounds/game/:game_id", (req, res) => {
  const { game_id } = req.params;
  const sql = "SELECT * FROM rounds WHERE game_id = ?";
  db.all(sql, [game_id], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.get("/api/rounds/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM rounds WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) res.status(500).json({ error: err.message });
    else if (row) res.json(row);
    else res.status(404).json({ error: "Round not found" });
  });
});

app.post("/api/rounds", (req, res) => {
  const { game_id, meme_id, selected_caption_id, score } = req.body;
  if (!game_id || !meme_id || !selected_caption_id || score === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  const sql = "INSERT INTO rounds (game_id, meme_id, selected_caption_id, score, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)";
  db.run(sql, [game_id, meme_id, selected_caption_id, score], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID });
  });
});

app.put("/api/rounds/:id", (req, res) => {
  const { id } = req.params;
  const { game_id, meme_id, selected_caption_id, score } = req.body;
  
  if (!game_id || !meme_id || !selected_caption_id || score === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "UPDATE rounds SET game_id = ?, meme_id = ?, selected_caption_id = ?, score = ? WHERE id = ?";
  db.run(sql, [game_id, meme_id, selected_caption_id, score, id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes > 0) res.json({ message: "Round updated successfully" });
    else res.status(404).json({ error: "Round not found" });
  });
});

app.patch("/api/rounds/:id", (req, res) => {
  const { id } = req.params;
  const { score } = req.body;

  if (score === undefined) {
    return res.status(400).json({ error: "Score is required" });
  }

  const sql = "UPDATE rounds SET score = ? WHERE id = ?";
  db.run(sql, [score, id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes > 0) res.json({ message: "Round score updated successfully" });
    else res.status(404).json({ error: "Round not found" });
  });
});

// Games API endpoints
app.get("/api/games", (req, res) => {
  const sql = "SELECT * FROM games";
  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.get("/api/games/completed", (req, res) => {
  const sql = "SELECT * FROM games WHERE completed = 1";
  db.all(sql, [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.get("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM games WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    if (err) res.status(500).json({ error: err.message });
    else if (row) res.json(row);
    else res.status(404).json({ error: "Game not found" });
  });
});

app.post("/api/games", (req, res) => {
  const { user_id, completed, total_score } = req.body;
  if (!user_id || completed === undefined || total_score === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "INSERT INTO games (user_id, completed, total_score, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)";
  db.run(sql, [user_id, completed, total_score], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID });
  });
});

app.put("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const { user_id, completed, total_score } = req.body;
  
  if (!user_id || completed === undefined || total_score === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = "UPDATE games SET user_id = ?, completed = ?, total_score = ? WHERE id = ?";
  db.run(sql, [user_id, completed, total_score, id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes > 0) res.json({ message: "Game updated successfully" });
    else res.status(404).json({ error: "Game not found" });
  });
});

app.patch("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const { completed, total_score } = req.body;

  if (completed === undefined && total_score === undefined) {
    return res.status(400).json({ error: "At least one field to update is required" });
  }

  let sql = "UPDATE games SET";
  const params = [];
  
  if (completed !== undefined) {
    sql += " completed = ?,";
    params.push(completed);
  }
  if (total_score !== undefined) {
    sql += " total_score = ?,";
    params.push(total_score);
  }
  
  sql = sql.slice(0, -1) + " WHERE id = ?";
  params.push(id);

  db.run(sql, params, function(err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes > 0) res.json({ message: "Game updated successfully" });
    else res.status(404).json({ error: "Game not found" });
  });
});

app.delete("/api/games/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM games WHERE id = ?";
  db.run(sql, [id], function(err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes > 0) res.json({ message: "Game deleted successfully" });
    else res.status(404).json({ error: "Game not found" });
  });
});
