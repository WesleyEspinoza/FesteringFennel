/* eslint-disable no-console */
// reviews.js

module.exports = (app, Review) => {
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
    Review.findByIdAndUpdate({ _id: req.params.id }, (err, review) => {
      if (err) {
        console.log(err);
        res.redirect(`/review/${review.id}`);
      } else {
        res.redirect(`/review/${review.id}`);
      }
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
