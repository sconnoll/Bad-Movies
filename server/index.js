var express = require("express");
var bodyParser = require("body-parser");
var db = require(".././db/sql/index.js");
var { createFavorite, deleteFavorite } = require("./models/movieModel.js");
var { getGenres, getMovies } = require("./helpers/apiHelpers.js");
var request = require("request");
var app = express();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
var apiHelpers = require("./helpers/apiHelpers.js");

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//TODO: Pick one of the two route options below:
//OPTION 1: Use regular routes, where endpoints are pre-defined on this page, you do NOT need to refer to /server/routes/movieRoutes.js file
//OPTION 2: Use Express Router, where the routes are defined under /server/routes/movieRoutes.js file

//***********************************************************************************************************************
//OPTION 1: Use regular routes;
//If you are using OPTION 1, you do not need routes>movieRoutes.js file

app.get("/genres", function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  getGenres()
    .then(({ data }) => {
      res.status(201).send({ data });
    })
    .catch(err => {
      console.log('there was an error getting the genres from the api', err);
      res.sendStatus(500);
    })
});

app.get("/search", function(req, res) {
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  console.log('here is the request params', req.query.genre);
  getMovies(req.query.genre)
    .then((results) => {
      res.status(201).send(results.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
});

app.post("/save", function(req, res) {
  //save movie as favorite into the database
  createFavorite(req.body.movie, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.post("/delete", function(req, res) {
  //remove movie from favorites into the database
  deleteFavorite(req.body.movie, (err, results) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  })
});

//***********************************************************************************************************************
//OPTION 2: Use Express Router

//IF you decide to go with this OPTION 2, delete OPTION 1 to continue


app.listen(3000, function() {
  console.log("listening on port 3000!");
});
