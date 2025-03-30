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
