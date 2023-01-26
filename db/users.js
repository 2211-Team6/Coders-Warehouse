const bcrypt = require("bcrypt");
const SALT_COUNT = 10;
const client = require("./client");

async function createUser({ username, password, email }) {
  try {
    const hashed = await hashPassword(password);
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, email)
      VALUES($1, $2, $3)
      RETURNING *;
      `,

      [username, hashed, email]
    );
    delete user.password;
    console.log("its me, the one and only!", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const userData = await getUserByUsername(username);
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
};
