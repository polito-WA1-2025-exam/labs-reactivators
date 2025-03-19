import db from "./server.mjs";

function get_users() {
  return new Promise((resolve, reject) => {
    db.all("select * from user", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function fetchUsers() {
  try {
    const users = await get_users();
    console.log(users);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

fetchUsers();
