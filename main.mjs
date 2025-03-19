import db from "./server.mjs";

function Memes() {
  constructor(id, imageUrl);
  {
    this.id = id;
    this.imageUrl = imageUrl;
  }
  this.addMemes = (db, imageUrl) => {
    const sql = `INSERT INTO Memes (image_url) VALUES (?)`;
    db.run(sql, [imageUrl], function (err) {
      if (err) {
        console.error("Error adding meme:", err.message);
      } else {
        console.log(`✅ Meme added successfully with ID: ${this.lastID}`);
      }
    });
  };
}
function rounds() {
  constructor(id, game_id, meme_id, selected_caption_id, score, created_at);
  {
    this.id = id;
    this.game_id = game_id;
    this.meme_id = meme_id;
    this.selected_caption_id = selection_caption_id;
    this.score = score;
    this.created_at = created_at;
  }
}
function user() {
  constructor(id, username, password, total_score);
  {
    this.id = id;
    this.username = username;
    this.password = password;
    this.total_score = total_score;
  }
}
function meme_caption() {
  constructor(id, meme_id, caption_id, score);
  {
    this.id = id;
    this.meme_id = meme_id;
    this.caption_id = caption_id;
    this.score = score;
  }
}
function games() {
  constructor(id, user_id, completed, total_score, created_at);
  {
    this.id = id;
    this.user_id = user_id;
    this.completed = completed;
    this.total_score = total_score;
    this.created_at = created_at;
  }
}
function caption() {
  constructor(id, text);
  {
    this.id = id;
    this.text = text;
  }
}
