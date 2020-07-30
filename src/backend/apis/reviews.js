const express = require('express');
const reviewsRouter = express.Router();

const knex = require("../database");

reviewsRouter.get("/", async (request, response) => {
  try {
    const reviews = await knex.select('*').table('review');
    response.json(reviews);
    //console.log(`reviews: ${reviews}`)
  } catch (error) {
    throw error;
  }
});

reviewsRouter.get("/:id", async (request, response) => {
    try {
        const id = request.params.id;
      const review = await knex.from('review').select('*').where('meal_id', id);
      response.json(review);
      //console.log(`reviews: ${review}`)
    } catch (error) {
      throw error;
    }
  });

module.exports = reviewsRouter;