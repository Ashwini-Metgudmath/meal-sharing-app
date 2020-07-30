const express = require('express');
app = express();
const router = express.Router();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const mealsRouter = require('./apis/meals');
const reviewsRouter = require('./apis/reviews');
const reservationRouter = require('./apis/reservations');

const PORT = process.env.PORT || 3000;
//const connection = require('./database');

// For week4 no need to look into this!
// Serve the built client html
const buildPath = path.join(__dirname, "./../frontend");
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/meals', mealsRouter);
app.use('/reviews', reviewsRouter);
app.use('/reservations', reservationRouter);
app.use('/api', router);

app.get('/*', (req, res) =>{
    res.sendFile(path.join(__dirname, "./../frontend/index.html"), function (
        err
      ) {
        if (err) {
          res.status(500).send(err);
        }
      });
})








app.listen(PORT, ()=>{
    console.log(`server started at port: ${PORT}`)
})