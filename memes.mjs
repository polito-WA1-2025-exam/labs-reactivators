import db from "./server.mjs";
/*
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
          console.log(` Meme added successfully with ID: ${this.lastID}`);
        }
      });
    };
    this.deleteMemeById=(db, id)=>{
      const sql = `DELETE FROM Memes WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) {
          console.error(" Error deleting the meme:", err.message);
        } else {
          if (this.changes > 0) {
            console.log(`Successfully deleted meme with ID: ${id}`);
          } else {
            console.log(`No meme found with ID: ${id}`);
          }
        }
      });
    }
    this.updateMemeImageUrlById=(db, id, newImageUrl)=>{
      const sql = `UPDATE Memes SET image_url = ? WHERE id = ?`;
      db.run(sql, [newImageUrl, id], function (err) {
        if (err) {
          console.error("Error updating the meme:", err.message);
        } else {
          if (this.changes > 0) {
            console.log(`Successfully updated meme with ID: ${id}`);
          } else {
            console.log(`No meme found with ID: ${id}`);
          }
        }
      });
    }
  }
 */ 
  export function addMemes (db, imageUrl){
    const sql = `INSERT INTO Memes (image_url) VALUES (?)`;
    db.run(sql, [imageUrl], function (err) {
      if (err) {
        console.error("Error adding meme:", err.message);
      } else {
        console.log(` Meme added successfully with ID: ${this.lastID}`);
      }
    });
  };
  export function deleteMemeById(db, id){
    const sql = `DELETE FROM Memes WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        console.error(" Error deleting the meme:", err.message);
      } else {
        if (this.changes > 0) {
          console.log(`Successfully deleted meme with ID: ${id}`);
        } else {
          console.log(`No meme found with ID: ${id}`);
        }
      }
    });
  }
  export function updateMemeImageUrlById(db, id, newImageUrl){
    const sql = `UPDATE Memes SET image_url = ? WHERE id = ?`;
    db.run(sql, [newImageUrl, id], function (err) {
      if (err) {
        console.error("Error updating the meme:", err.message);
      } else {
        if (this.changes > 0) {
          console.log(`Successfully updated meme with ID: ${id}`);
        } else {
          console.log(`No meme found with ID: ${id}`);
        }
      }
    });
  }
