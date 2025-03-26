import db from "./server.mjs"; // Import database connection

export function addRound(db, game_id, meme_id, selected_caption_id, score) {
  const sql = `INSERT INTO rounds (game_id, meme_id, selected_caption_id, score, created_at)
                 VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`;
  db.run(sql, [game_id, meme_id, selected_caption_id, score], function (err) {
    if (err) {
      console.error("Error adding round:", err.message);
    } else {
      console.log(`Round added successfully with ID: ${this.lastID}`);
    }
  });
}

export function deleteRoundById(db, id) {
  const sql = `DELETE FROM Rounds WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting the round:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Successfully deleted round with ID: ${id}`);
      } else {
        console.log(`No round found with ID: ${id}`);
      }
    }
  });
}

export function updateRoundScoreById(db, id, newScore) {
  const sql = `UPDATE Rounds SET score = ? WHERE id = ?`;
  db.run(sql, [newScore, id], function (err) {
    if (err) {
      console.error("Error updating the round's score:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Successfully updated round with ID: ${id}`);
      } else {
        console.log(`No round found with ID: ${id}`);
      }
    }
  });
}
