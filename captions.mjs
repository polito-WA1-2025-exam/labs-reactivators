export function addCaption(db, text) {
  const sql = `INSERT INTO captions (caption_text) VALUES (?)`;
  db.run(sql, [text], function (err) {
    if (err) {
      console.error("Error adding caption:", err.message);
    } else {
      console.log(`Caption added successfully with ID: ${this.lastID}`);
    }
  });
}
