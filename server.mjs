import sqlite from 'sqlite3'

const db = new sqlite.Database('meme.sqlite', (err)=> {if (err) {console.log("Database connection error:", err);
 } else{ console.log("Databse connection successful!")
};
});

export default db;