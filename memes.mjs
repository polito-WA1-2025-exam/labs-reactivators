import db from "./server.mjs";

export function addMemes(db, img_url) {
  const sql = `INSERT INTO memes (img_url) VALUES (?)`;
  db.run(sql, [img_url], function (err) {
    if (err) {
      console.error("Error adding meme:", err.message);
    } else {
      console.log(`Meme added successfully with ID: ${this.lastID}`);
    }
  });
}

export function deleteMemeById(db, meme_id) {
  const sql = `DELETE FROM memes WHERE meme_id = ?`;
  db.run(sql, [meme_id], function (err) {
    if (err) {
      console.error(" Error deleting the meme:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Successfully deleted meme with ID: ${meme_id}`);
      } else {
        console.log(`No meme found with ID: ${id}`);
      }
    }
  });
}
export function updateMemeImageUrlById(db, meme_id, newImageUrl) {
  const sql = `UPDATE Memes SET img_url = ? WHERE meme_id = ?`;
  db.run(sql, [newImageUrl, meme_id], function (err) {
    if (err) {
      console.error("Error updating the meme:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Successfully updated meme with ID: ${meme_id}`);
      } else {
        console.log(`No meme found with ID: ${meme_id}`);
      }
    }
  });
}
