// grab our db client connection to use with our adapters
const client = require('../client');



async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}

async function createUser({ username, password, email, isAdmin }) {
  
  try {
    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password, email, "isAdmin")
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `, [username, password, email, isAdmin]);
    
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}


//TESTING 1,2 1,2


module.exports = {
  // add your database adapter fns here
  getAllUsers, 
  createUser
};