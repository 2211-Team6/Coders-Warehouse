const client = require('../client');


async function createReview(username, productId, rating, description) {
    try {
        const { rows: [newReview] } = await client.query(`
        INSERT INTO reviews ("username", "productId", rating, description)
        VALUES ($1, $2, $3, $4)
      RETURNING *;
      `, [username, productId, rating, description]);

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