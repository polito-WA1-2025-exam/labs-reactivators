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

// New functions needed for game requirements

export function getRoundsForGame(db, game_id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT r.*, m.img_url, c.caption_text
      FROM rounds r
      JOIN memes m ON r.meme_id = m.meme_id
      JOIN captions c ON r.selected_caption_id = c.caption_id
      WHERE r.game_id = ?
      ORDER BY r.created_at ASC
    `;
    db.all(sql, [game_id], (err, rows) => {
      if (err) {
        console.error("Error getting rounds for game:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function isMemeUsedInGame(db, game_id, meme_id) {
  const sql = `
    SELECT COUNT(*) as count
    FROM rounds
    WHERE game_id = ? AND meme_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [game_id, meme_id], (err, row) => {
      if (err) {
        console.error("Error checking meme usage:", err.message);
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
}

export function getBestMatchingCaptions(db, meme_id) {
  const sql = `
    SELECT c.id, c.text, mc.points
    FROM meme_captions mc
    JOIN captions c ON mc.caption_id = c.id
    WHERE mc.meme_id = ?
    ORDER BY mc.points DESC
  `;
  return new Promise((resolve, reject) => {
    db.all(sql, [meme_id], (err, rows) => {
      if (err) {
        console.error("Error getting best matching captions:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function validateRound(db, meme_id, selected_caption_id) {
  const sql = `
    SELECT points
    FROM meme_captions
    WHERE meme_id = ? AND caption_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [meme_id, selected_caption_id], (err, row) => {
      if (err) {
        console.error("Error validating round:", err.message);
        reject(err);
      } else {
        resolve(row ? row.points : 0);
      }
    });
  });
}

export function getRoundSummary(db, game_id) {
  const sql = `
    SELECT 
      r.id,
      m.image_url,
      c.text as selected_caption,
      r.score,
      GROUP_CONCAT(mc.caption_id) as correct_captions
    FROM rounds r
    JOIN memes m ON r.meme_id = m.id
    JOIN captions c ON r.selected_caption_id = c.id
    LEFT JOIN meme_captions mc ON r.meme_id = mc.meme_id
    WHERE r.game_id = ?
    GROUP BY r.id
    ORDER BY r.created_at ASC
  `;
  return new Promise((resolve, reject) => {
    db.all(sql, [game_id], (err, rows) => {
      if (err) {
        console.error("Error getting round summary:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function getRoundCount(db, game_id) {
  const sql = `
    SELECT COUNT(*) as count
    FROM rounds
    WHERE game_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [game_id], (err, row) => {
      if (err) {
        console.error("Error getting round count:", err.message);
        reject(err);
      } else {
        resolve(row.count);
      }
    });
  });
}

export function getGameScore(db, game_id) {
  const sql = `
    SELECT COALESCE(SUM(score), 0) as total_score
    FROM rounds
    WHERE game_id = ?
  `;
  return new Promise((resolve, reject) => {
    db.get(sql, [game_id], (err, row) => {
      if (err) {
        console.error("Error getting game score:", err.message);
        reject(err);
      } else {
        resolve(row.total_score);
      }
    });
  });
}
