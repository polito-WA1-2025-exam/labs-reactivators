import db from './server.mjs';


/*
function user() {
    constructor(id, username, password, total_score);
    {
      this.id = id;
      this.username = username;
      this.password = password;
      this.total_score = total_score;
    }
    this.addUser =(db, username, password, total_score = 0) => {
      const sql = `INSERT INTO user (username, password_hash, total_score) VALUES (?, ?, ?)`;
      db.run(sql, [username, password, total_score], function (err) {
        if (err) {
          console.error("Error adding user:", err.message);
        } else {
          console.log(`User added successfully with ID: ${this.lastID}`);
        }
      });
    }
    this.deleteUserById=(db, id)=> {
      const sql = `DELETE FROM User WHERE id = ?`;
      db.run(sql, [id], function (err) {
        if (err) {
          console.error("Error deleting the user:", err.message);
        } else {
          if (this.changes > 0) {
            console.log(`Successfully deleted user with ID: ${id}`);
          } else {
            console.log(`No user found with ID: ${id}`);
          }
        }
      });
    }
    this.updateUserScoreById=(db, id, newScore)=>{
    const sql = `UPDATE User SET total_score = ? WHERE id = ?`;
    db.run(sql, [newScore, id], function (err) {
      if (err) {
        console.error("Error updating the user's score:", err.message);
      } else {
        if (this.changes > 0) {
          console.log(`Successfully updated user with ID: ${id}`);
        } else {
          console.log(`No user found with ID: ${id}`);
        }
      }
    });
  }
    
  }
  */
  export function addUser (db, username, password, total_score = 0) {
    const sql = `INSERT INTO user (username, password, total_score) VALUES (?, ?, ?)`;
    db.run(sql, [username, password, total_score], function (err) {
      if (err) {
        console.error("Error adding user:", err.message);
      } else {
        console.log(`User added successfully with ID: ${this.lastID}`);
      }
    });
  }
  export function deleteUserById(db, id) {
    const sql = `DELETE FROM User WHERE id = ?`;
    db.run(sql, [id], function (err) {
      if (err) {
        console.error("Error deleting the user:", err.message);
      } else {
        if (this.changes > 0) {
          console.log(`Successfully deleted user with ID: ${id}`);
        } else {
          console.log(`No user found with ID: ${id}`);
        }
      }
    });
  }
  export function updateUserScoreById(db, id, newScore){
  const sql = `UPDATE User SET total_score = ? WHERE id = ?`;
  db.run(sql, [newScore, id], function (err) {
    if (err) {
      console.error("Error updating the user's score:", err.message);
    } else {
      if (this.changes > 0) {
        console.log(`Successfully updated user with ID: ${id}`);
      } else {
        console.log(`No user found with ID: ${id}`);
      }
    }
  });
}
