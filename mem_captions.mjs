import db from "./server.mjs";



/*
function meme_caption() {
    constructor(id, meme_id, caption_id, score);
    {
      this.id = id;
      this.meme_id = meme_id;
      this.caption_id = caption_id;
      this.score = score;
    }*/
export function addMemeCaption(db, meme_id, caption_id, score){
      const sql = `INSERT INTO memeCaptions (meme_id, caption_id, score) VALUES (?, ?, ?)`;
      db.run(sql, [meme_id, caption_id, score], function (err) {
        if (err) {
          console.error("Error adding meme-caption relationship:", err.message);
        } else {
          console.log(`Meme-Caption relationship added successfully with ID: ${this.lastID}`);
        }
      });
    }
  
