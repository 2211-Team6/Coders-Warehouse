const client = require('../client');


async function createReview({name, userName, productId, rating, description}) {
console.log("here is name in db", name)
try {
        const { rows: [newReview] } = await client.query(`
        INSERT INTO reviews (name, "userName", "productId", rating, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `, [name, userName, productId, rating, description]);

        return newReview
    } catch (error) {
        throw error;
    }
}


async function getAllReviews() {
    const { rows } = await client.query(`
    SELECT * FROM reviews;
    `)
    return rows;
}


async function getReviewsByProductId(id) {
const { rows } = await client.query(`
SELECT * FROM reviews
WHERE "productId" = ${id};
`)
return rows;
}


async function getReviewsByTags() {

}

module.exports = {
    createReview,
    getAllReviews,
    getReviewsByProductId
}