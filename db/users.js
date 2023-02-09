const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const client = require("./client");

async function getAllUsers() {
  console.log("Made it to the database");
  try {
    const { rows: users } = await client.query(`
      SELECT * FROM users;
    `);
    console.log("Here are the rows:", users);
    return users;
  } catch (error) {
    console.log("Error getting all users");
    throw error;
  }
}

async function createUser({ username, password, email, fname, city, birthday, about }) {
  try {
    // const hashed = await hashPassword(password);
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email, fname, city, birthday, about)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (username, email) DO NOTHING
      RETURNING *;
      `,
      [username, password, email, fname, city, birthday, about]
    );
    delete user.password;
    console.log("It's me, the one and only!", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    console.log("This is username and password in the database:", username, password);
    const userData = await getUserByUsername(username);
    console.log("This is the user data:", userData);
    const hashedPassword = userData.password;
    let passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
      userData.password = null;
      return userData;
    }
    return null;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE id=$1
      `,
      [userId]
    );
    if (!user) {
      return null;
    }

    user.password = null;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
    `,
      [userName]
    );

    return user;
  } catch (error) {
    throw error;
  }
}


async function hashPassword(password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_COUNT, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  return hashedPassword;
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
};
