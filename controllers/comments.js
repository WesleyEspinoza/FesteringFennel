// comments.js
const Comment = require('../models/comment');

module.exports = (app) => {
<<<<<<< HEAD

  // DELETE
=======
  // CREATE Comment
  app.post('/movies/:movieid/reviews/:reviewId/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      res.status(200).send({ comment });
    }).catch((err) => {
      res.status(400).send({ err });
    });
  });
  // delete
>>>>>>> ajax
  app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', (req, res) => {
    console.log('DELETE comment');
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.status(200).send(comment);
    }).catch((err) => {
      console.log(err.message);
      res.status(400).send(err);
    });
  });
  // CREATE Comment
  app.post('/movies/:movieId/reviews/:reviewId/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      console.log(comment);
      res.redirect(`/movies/${req.body.movieId}/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
