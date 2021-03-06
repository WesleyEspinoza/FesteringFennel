// admin.js

const Review = require('../models/review');

module.exports = (app) => {
  // DELETE
  app.delete('/admin/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.status(200).send(review);
    }).catch((err) => {
      console.log(err.message);
      res.status(400).send(err);
    });
  });
  // INDEX
  app.get('/admin', (req, res) => {
    Review.find()
      .then((reviews) => {
        res.render('admin', { reviews });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
