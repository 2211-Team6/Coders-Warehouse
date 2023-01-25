const {
  client,
} = require('./');
const { createProduct } = require('./models/products');
const {createUser} = require("./models/user")

// drop tables in correct order
async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS product_tags;
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS cart_items;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  `);
  console.log("finishin dropTables")
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
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
    CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);
    CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);

    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE product_tags (
    "productId" INTEGER REFERENCES products(id), 
    "tagId" INTEGER REFERENCES tags(id),
    UNIQUE ("productId", "tagId")
);

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      "userName" VARCHAR(255) REFERENCES users(username),
      "productId" INTEGER REFERENCES products(id),
      rating INTEGER,
      description TEXT NOT NULL
    );
  `);
  }
   catch (error) {
    console.error("Error building tables!");
    throw error;
  }
  console.log("All Tables created!")
};

async function populateInitialData() {
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99", email: "albert9@hotmail.com" },
      { username: "sandra", password: "sandra123", email: "sandy3@MSN.com" },
      { username: "glamgal", password: "glamgal123", email:"glamgal@AOL.com" },
    ];
    const user = await Promise.all(usersToCreate.map(createUser))
    console.log('Users created');
    console.log(user);
    console.log("Finished creating users!")

    const productsToCreate = [
      { title: "Air Force 1", description: "Brand new pair of blue AF1", price: 180, quantity: 3},
      { title: "Coffee", description: "1lb bag of organic Colombian coffee beans", price: 16, quantity: 18},
      { title: "Pens", description: "Pack of 5 black ink pens", price: 7, quantity: 42},
    ]
    console.log("creating initial products")
    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log("Here are the products", products)
    console.log("Finished creating initial products")
    
  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect()
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