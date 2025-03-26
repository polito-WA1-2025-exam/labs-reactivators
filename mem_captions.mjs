import db from "./server.mjs";

export function addMemeCaption(db, meme_id, caption_id, score) {
  const sql = `INSERT INTO memeCaptions (meme_id, caption_id, score) VALUES (?, ?, ?)`;
  db.run(sql, [meme_id, caption_id, score], function (err) {
    if (err) {
      console.error("Error adding meme-caption relationship:", err.message);
    } else {
      console.log(
        `Meme-Caption relationship added successfully with ID: ${this.lastID}`
      );
    }
  });
}
