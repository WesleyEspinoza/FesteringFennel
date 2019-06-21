/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));

// This tells your app to allow parsing of JSON, which we'll need when we use Axios later
app.use(bodyParser.json());

// This tells your `Express.js` app to serve all
// client-side assets in its `public` folder, so that is where we'll put our JavaScript scripts.
app.use(express.static('public'));

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

module.exports = app.listen(port);
