const client = require("./client");
const { getProductById } = require("./products")


async function createPostTag(productId, tagId) {
    try {
      await client.query(`
        INSERT INTO product_tags("productId", "tagId")
        VALUES ($1, $2)
        ON CONFLICT ("productId", "tagId") DO NOTHING;
      `, [productId, tagId]);
    } catch (error) {
      throw error;
    }
}

async function addTagsToProduct(productId, tagList) {
    try {
      const createProductTagPromises = tagList.map(
        tag => createPostTag(productId, tag.id)
      );
  
      await Promise.all(createProductTagPromises);
  
      return await getProductById(productId);
    } catch (error) {
      throw error;
    }
  }

async function createTags(tagList) {
    if (tagList.length === 0) { 
        return; 
      }
    const insertValues = tagList.map(
    (_, index) => `$${index + 1}`).join('), (');
    const selectValues = tagList.map(
    (_, index) => `$${index + 1}`).join(', ');
        try {
            console.log("time to make the tags", tagList)
            await client.query(`
            INSERT INTO tags(name)
            VALUES (${insertValues})
            ON CONFLICT (name) DO NOTHING;
            `, tagList);
            console.log("Time to select the tags")
            const {rows: tags} = await client.query(`
            SELECT * FROM tags
            WHERE name
            IN (${selectValues});
            `, tagList);
            console.log("these are the tags", tags);  
            return tags;
        } catch (error) {
         console.error("Error creating tags")
         throw error;
        }
}

async function getAllTags(){
    try{
        const{ rows } = await client.query(`
        SELECT * FROM tags`)
        return rows
    }catch(error) {
     throw error;
    }
  }

module.exports = {
    client, 
    getAllTags, 
    createTags,
    addTagsToProduct, 
    createPostTag
}
