const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

// drop tables in correct order
async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`
  DROP TABLE IF EXISTS users;
  `);
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
  console.log("All Tables Dropped!")
}

// create all tables, in the correct order
async function createTables() {
  console.log("Starting to build tables...")
  try {
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    `);
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
  console.log("All Tables created!")
};

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const usersToCreate = [
      { username: "albert", password: "bertie99" },
      { username: "sandra", password: "sandra123" },
      { username: "glamgal", password: "glamgal123" },
    ];
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log('Users created');
    console.log(users);
    console.log("Finished creating users!")
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables()
    await createTables()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}


rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
