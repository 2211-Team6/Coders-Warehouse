const { createProduct } = require('./models/products');
const {createUser} = require("./models/user")
const {createReview} = require("./models/reviews")
const {addProductToCart, getCartByUserId, deleteProductFromCart} = require("./models/cart")
const client = require("./client");


// drop tables in correct order
async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS product_tags;
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  `);
  console.log("finishing dropTables")
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
    password VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN DEFAULT FALSE
);
    CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    url TEXT NOT NULL
);
    CREATE TABLE cart (
    id INTEGER REFERENCES users(id),
    "productId" INTEGER REFERENCES products(id),
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
      rating NUMERIC,
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
      { username: "albert", password: "bertie99", email: "albert9@hotmail.com", isAdmin: false },
      { username: "sandra", password: "sandra123", email: "sandy3@MSN.com", isAdmin: false },
      { username: "glamgal", password: "glamgal123", email:"glamgal@AOL.com", isAdmin: false },
      { username: "admin", password: "team62022", email: "doesn'tmatter@yahoo.com", isAdmin: true}
    ];
    const user = await Promise.all(usersToCreate.map(createUser))
    console.log('Users created');
    console.log(user);
    console.log("Finished creating users!")

    const productsToCreate = [
      { title: "Air Force 1", description: "Brand new pair of blue AF1", price: 18099, quantity: 3, url: "https://www.sneakerfiles.com/wp-content/uploads/2021/08/air-jordan-1-high-dark-marina-blue-555088-404-release-info.jpeg"},
      { title: "Colombian Coffee", description: "1lb bag of organic Colombian coffee beans", price: 1601, quantity: 18, url: "https://i5.walmartimages.com/asr/f2c34a4f-8874-4ad1-bc83-8e733874a9b8_1.833a64e0f36e8bea5fbe1fc1b3e41ca0.jpeg"},
      { title: "Black Pens", description: "Pack of 8 black ink pens", price: 715, quantity: 42, url: "https://i5.walmartimages.com/asr/ccdd2273-3a13-4d2d-9123-c2b3fabdf396.23cbb880147069a22b93c92b86a9ca06.jpeg"},
      { title: "Coffee Mug", description: "Set of 5 blue ceramic coffee mugs", price: 5295, quantity: 89, url: "https://www.vicrays.com/wp-content/uploads/2021/06/1-mug-set-.jpg"},
      { title: "Whistlepig", description: "750 mL bottle of whistlepig whiskey. Aged 10 year. Small Batch Rye", price: 7499, quantity: 21, url: "https://www.abc.virginia.gov/library/product-images/july15-warehouse/whistle-pig-straight-rye-whiskey.jpg"},
      { title: "Iphone 14 Pro Max", description: "Apple's newest Iphone. Better than your android.", price: 119999, quantity: 50, url: "https://m.media-amazon.com/images/I/315eB2+GolL._AC_SY580_.jpg"},
      { title: "PS5", description: "Sony's next generation Playstation. In Stock soon!", price: 49999, quantity: 0, url: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"},
      { title: "XBox Series X", description: "Next generation XBox. In Stock! Inventory sells out quickly. Act now!!!", price: 49999, quantity: 1, url: "https://i5.walmartimages.com/asr/12870b37-2928-4748-8e87-868e44ed218d.89acba7601d9b7c641d3c880ce173893.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"},
      { title: "COLOMBIAN BLEND COFFEE", description: "Made with smooth arabica beans from the Sierra Nevada de Santa Marta Mountains of Colombia.", price: 1999, quantity: 32, url: "https://cdn.shopify.com/s/files/1/0271/7209/products/Death_Wish_Coffee_DarkRoast_1LB_Ground_Front.jpg?v=1630186442" },
      { title: "Ground Hair Bender", description: "This 12oz bag of coffee is pre-ground at our roastery on a setting the works for just about any drip brewer.", price: 1600, quantity: 5, url: "https://stumptown-shop.imgix.net/products/Hair_Bender_Ground_2.png?v=1644615747&auto=format,compress&w=375" },
      { title: "Bistro Blend", description: "A blend of South American, East African, and Indonesian coffees with a medium roast profile creating an approachable, balanced, and nuanced cup.", price: 1700, quantity: 10, url: "https://cdn.shopify.com/s/files/1/2097/8611/products/BistroFront_440x440.png?v=1614664155"}, 
      { title: "Sinatra Select", description: "Made with our unique “Sinatra Barrels” that have deep grooves specially carved into their staves to expose the whiskey to extra layers of toasted oak.", price: 29999, quantity: 6, url: "https://prnewswire2-a.akamaihd.net/p/1893751/sp/189375100/thumbnail/entry_id/0_s9i6fwmx/def_height/2700/def_width/2700/version/100012/type/1"},
      { title: "Jordan 6 Retro Black Infrared", description: "The Air Jordan 6 Retro 'Infrared' 2019 is a 2019 re-release of the OG colorway.", price: 23400, quantity: 9, url: "https://images.stockx.com/images/Air-Jordan-6-Retro-Black-Infrared-2019-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1606315701&q=75" }

    ]
    console.log("creating initial products")
    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log("Here are the products", products)
    console.log("Finished creating initial products")

    const reviewsToCreate = [
      {username: "glamgal", productId: 1, rating: 2, description: "This shoe runs too small"},
      {username: "sandra", productId: 4, rating: 10, description: "I got this as a gift and I absolutly love it!"},
      {username: "glamgal", productId: 2, rating: 5, description: "I usually dont drink coffee but this will have me addicted"},
    ]
    console.log("creating initial reviews")
    const reviews = await Promise.all(reviewsToCreate.map(createReview))
    console.log("Here are the reviews", reviews)
    console.log("Finished creating initial reviews")

    const cartStuffToCreate = [
      {id: 1, productId: 1, quantity: 3},
      {id: 2, productId: 4, quantity: 5},
      {id: 1, productId: 6, quantity: 1},
      {id: 2, productId: 5, quantity: 2},
      {id: 2, productId: 3, quantity: 6},
      {id: 3, productId: 7, quantity: 9},
    ]
    console.log("creating cart Stuff")
    const cartStuff = await Promise.all(cartStuffToCreate.map(addProductToCart))
    console.log("Here's the cart stuff", cartStuff)
    const myCart = await getCartByUserId(2)
    console.log("this is my Cart", myCart)
    deleteProductFromCart(5)
    const myNewCart = await getCartByUserId(2)
    console.log("Here's the cart post-delete", myNewCart)
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