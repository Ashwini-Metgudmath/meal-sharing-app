const express = require('express');
const mealsRouter = express.Router();

const knex = require("../database");

mealsRouter.get("/", async (request, response) => {
  try {
    const meals = await knex.select('*').table('meal');
    response.json(meals);
    //console.log(`meals: ${meals}`)
  } catch (error) {
    throw error;
  }
});

mealsRouter.get("/:id", async (request, response) => {
    try {
        const id = request.params.id;
      const meal = await knex.from('meal').select('*').where('id', id);
      response.json(meal);
      //console.log(`meals: ${meal}`)
    } catch (error) {
      throw error;
    }
  });

module.exports = mealsRouter;