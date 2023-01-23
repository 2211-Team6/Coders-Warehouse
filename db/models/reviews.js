const client = require('../client');


async function createReview(userName, productId, rating, description) {
    try {
        const { rows: [newReview] } = await client.query(`
        INSERT INTO reviews ("userName", "productId", rating, description)
        VALUES ($1, $2, $3, $4)
      RETURNING *;
      `, [userName, productId, rating, description]);

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


async function getReviewsByProductId() {

}


async function getReviewsByTags() {

}

module.exports = {
    createReview,
    getAllReviews
}