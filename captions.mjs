import db from "./server.mjs";

/*
function caption() {
    constructor(id, text);
    {
      this.id = id;
      this.text = text;
    }*/
export function addCaption(db, text) {
  const sql = `INSERT INTO captions (text) VALUES (?)`;
  db.run(sql, [text], function (err) {
    if (err) {
      console.error("Error adding caption:", err.message);
    } else {
      console.log(`Caption added successfully with ID: ${this.lastID}`);
    }
  });
}
