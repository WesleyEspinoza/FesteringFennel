/* eslint-disable no-console */
// reviews.js
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {
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
  // SHOW
  app.get('/reviews/:id', (req, res) => {
  // find review
    Review.findById(req.params.id).then((review) => {
    // fetch its comments
      Comment.find({ reviewId: req.params.id }).then((comments) => {
      // respond with the template with both values
        res.render('reviews-show', { review, comments });
      });
    }).catch((err) => {
    // catch errors
      console.log(err.message);
    });
  });

  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then((review) => {
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // edit review
  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById({ _id: req.params.id }, (err, review) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        res.render('reviews-edit', { review, title: 'Edit Review' });
      }
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
};
