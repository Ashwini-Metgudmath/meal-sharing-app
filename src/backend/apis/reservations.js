const express = require('express');
const reservationRouter = express.Router();

const knex = require("../database");

reservationRouter.get("/", async (request, response) => {
  try {
    const reservations = await knex.select('*').table('reservation');
    response.json(reservations);
    //console.log(`reservations: ${reservations}`)
  } catch (error) {
    throw error;
  }
});

reservationRouter.get("/:id", async (request, response) => {
    try {
      const id = request.params.id;
      const reservation = await knex.from('reservation').select('*').where('meal_id', id);
      response.json(reservation);
      //console.log(`reservation: ${reservation}`)
    } catch (error) {
      throw error;
    }
  });
  class Reservation {
    constructor(reservationObj) {
      if(!reservationObj.name)
        throw "reservation need to have name";
         else 
        this.name = reservationObj.name;
      if(!reservationObj.phone)
        throw "reservation need to have phone number";
        else
        this.phone = reservationObj.phone;
      if(!reservationObj.email)
        throw "reservation need to have email";
        else
        this.email = reservationObj.email;
    if(!reservationObj.meal_id)
        throw "reservation need to have mealId";
        else
        this.meal_id = reservationObj.meal_id;

    if(!reservationObj.number_of_guests)
        throw "reservation need to have numberOfGuest";
        else
        this.number_of_guests = reservationObj.number_of_guests;
    } 
  }

  reservationRouter.post('/add-reservation', async (req, res) =>{
    let reservation;
    try{
      reservationInput = new Reservation (req.body);
      //console.log(reservationInput);
      const reservation = await knex('reservation').insert(reservationInput);
      res.send("Thanks for reservation..!");
      //console.log(reservation);
    } catch(error){
      return res.json(error);
    } 
  })

module.exports = reservationRouter;