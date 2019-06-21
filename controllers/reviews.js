/* eslint-disable no-console */
// reviews.js
const moment = require('moment');
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {
  // Create a review
  app.get('/movies/:movieId/reviews/new', (req, res) => {
    res.render('reviews-new', { movieId: req.params.movieId });
  });

  // got to unique review

  app.put('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((review) => {
        res.redirect(`/movies/${review.movieId}/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // edit review
  app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
    Review.findById({ _id: req.params.id }, (err, review) => {
      if (err) {
        console.log(err);
        res.redirect(`/movies/${review.movieId}`);
      } else {
        res.render('reviews-edit', { review, title: 'Edit Review' });
      }
    });
  });

  // SHOW
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
    // find review
    Review.findById({ _id: req.params.id }).then((review) => {
      let { createdAt } = review.createdAt;
      createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
      const rev = review;
      rev.createdAtFormatted = createdAt;

      // fetch its comments
      Comment.find({ reviewId: req.params.id }).then((comments) => {
        // respond with the template with both values
        comments.reverse();
        console.log(review);
        res.render('reviews-show', { review, comments });
      });
    }).catch((err) => {
      // catch errors
      console.log(err.message);
    });
  });

  // delete a review route
  app.delete('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndRemove({ _id: req.params.id }, (err, review) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.redirect(`/movies/${review.movieId}`);
      }
    });
  });


  // post reviews
  app.post('/movies/:movieId/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      res.redirect(`/movies/${review.movieId}`); // Redirect to movies/:id
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
