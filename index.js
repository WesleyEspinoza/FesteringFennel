/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyPasrer = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });
const app = express();

app.use(bodyPasrer.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number,
});

// mock Array
// let reviews = [{
// title: "great reviews", movieTitle: "IronManII"}, {title: "bad reviews", movieTitle: "BatManII"},
// {title: "great reviews", movieTitle: "BatManI"}, {title: "bad reviews", movieTitle: "IronManI"}]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (_req, res) => {
  Review.find()
    .then((reviews) => {
      res.render('reviews-index', { reviews });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a review
app.get('/reviews/new', (_req, res) => {
  res.render('reviews-new', { title: 'New Review' });
});

// got to unique review
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review });
  }).catch((err) => {
    console.log(err.message);
  });
});

app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id).then((review) => {
    res.redirect(`review/${review._id}`);
  });
});

// edit review
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, (_err, review) => {
    res.render('reviews-edit', { review, title: 'Edit Review' });
  });
});


// all reviews
app.get('/reviews', (_req, res) => {
  res.render('/');
});

// post reviews
app.post('/reviews', (req, res) => {
  Review.create(req.body)
    .then((review) => {
      res.redirect(`/reviews/${review._id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
// delete a review route
app.delete('/reviews/:id', (req, res) => {
  Review.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

app.listen(9000, () => {
  console.log('Listening on http://localhost:9000!');
});
