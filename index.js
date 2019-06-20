/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const bodyPasrer = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const app = express();


app.use(bodyPasrer.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

// mock Array
// let reviews = [{
// title: "great reviews", movieTitle: "IronManII"}, {title: "bad reviews", movieTitle: "BatManII"},
// {title: "great reviews", movieTitle: "BatManI"}, {title: "bad reviews", movieTitle: "IronManI"}]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

module.exports = app.listen(port);
