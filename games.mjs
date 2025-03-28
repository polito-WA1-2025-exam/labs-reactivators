import db from "./server.mjs";

/*
class games{
    constructor(id, user_id, completed, total_score, created_at)
    {
      this.id = id;
      this.user_id = user_id;
      this.completed = completed;
      this.total_score = total_score;
      this.created_at = created_at;
    }
      */
export function addGame(db, user_id, completed = false, total_score = 0) {
  const sql = `INSERT INTO games (user_id, completed, total_score, created_at)
                   VALUES (?, ?, ?, CURRENT_TIMESTAMP)`;
  db.run(sql, [user_id, completed, total_score], function (err) {
    if (err) {
      console.error("Error adding game:", err.message);
    } else {
      console.log(`Game added successfully with ID: ${this.lastID}`);
    }
  });
}
export function deleteGameById(db, id) {
  const sql = `DELETE FROM Games WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting the game:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Successfully deleted game with ID: ${id}`);
      } else {
        console.log(`No game found with ID: ${id}`);
      }
    }
  });
}
export function updateGameCompletionById(db, id, completed) {
  const sql = `UPDATE Games SET completed = ? WHERE id = ?`;
  db.run(sql, [completed, id], function (err) {
    if (err) {
      console.error(
        "Error updating the game's completion status:",
        err.message
      );
    } else {
      if (this.changes > 0) {
        console.log(`Successfully updated game with ID: ${id}`);
      } else {
        console.log(`No game found with ID: ${id}`);
      }
    }
  });
}

export function getGameHistory(db, user_id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT g.id, g.completed, g.total_score, g.created_at,
             COUNT(r.id) as rounds_played
      FROM games g
      LEFT JOIN rounds r ON g.id = r.game_id
      WHERE g.user_id = ?
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `;
    db.all(sql, [user_id], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getUserTotalScore(db, user_id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COALESCE(SUM(total_score), 0) as total_score
      FROM games
      WHERE user_id = ? AND completed = 1
    `;
    db.get(sql, [user_id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.total_score);
      }
    });
  });
}

export function isGameComplete(db, game_id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) as round_count
      FROM rounds
      WHERE game_id = ?
    `;
    db.get(sql, [game_id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        // For logged-in users, game is complete after 3 rounds
        resolve(row.round_count >= 3);
      }
    });
  });
}

export function getCurrentGameStatus(db, game_id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT g.*, COUNT(r.id) as rounds_played
      FROM games g
      LEFT JOIN rounds r ON g.id = r.game_id
      WHERE g.id = ?
      GROUP BY g.id
    `;
    db.get(sql, [game_id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
