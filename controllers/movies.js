// movies.js
const MovieDb = require('moviedb-promise');
const Review = require('../models/review');
require('dotenv').config();

const moviedb = new MovieDb(process.env.movieDB_APIKEY);
module.exports = (app) => {
  // home
  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then((response) => {
      res.render('movies-index', { movies: response.results });
    }).catch(console.error);
  });

  // SHOW
  app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then((movie) => {
      moviedb.movieTrailers({ id: req.params.id }).then((videos) => {
        const mov = movie;
        mov.trailer_youtube_id = videos.youtube[0].source;
        // FIND THIS MOVIE'S REVIEWS
        Review.find({ movieId: req.params.id }).then((reviews) => {
          // THEN RENDER THE MOVIES-SHOW TEMPLATE
          res.render('movies-show', { movie, reviews });
        }).catch(console.error);
      }).catch(console.error);
    }).catch(console.error);
  });
};
