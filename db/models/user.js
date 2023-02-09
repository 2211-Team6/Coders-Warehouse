const client = require('../client');

async function getAllUsers() {
  try {
    const {rows: users} = await client.query(`
    SELECT * FROM users;
    `)
    return users;
  } catch (error) {
    console.error("Error getting all users: ", error);
    throw error;
  }
}

async function createUser({ username, password, email, fname, profile_image, city, birthday, about, isAdmin = false }) {
  try {
    const {rows: [user]} = await client.query(`
      INSERT INTO users(username, password, email, fname, profile_image, city, birthday, about, "isAdmin")
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (username, email) DO NOTHING
      RETURNING *;
    `, [username, password, email, fname, profile_image, city, birthday, about, isAdmin]);
    return user;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
  createUser
};
