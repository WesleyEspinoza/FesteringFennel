// movies.js
const MovieDb = require('moviedb-promise');
require('dotenv').config();

const moviedb = new MovieDb(process.env.movieDB_APIKEY);
module.exports = (app) => {
  app.get('/', (req, res) => {
    moviedb.miscNowPlayingMovies().then((response) => {
      res.render('movies-index', { movies: response.results });
    }).catch(console.error);
  });
};
