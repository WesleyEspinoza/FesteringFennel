// comments.js
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post('/movies/:movieid/reviews/:reviewId/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      res.status(200).send({ comment });
    }).catch((err) => {
      res.status(400).send({ err });
    });
  });
  // DELETE
  app.delete('/movies/:movieId/reviews/:reviewId/comments/:id', (req, res) => {
    console.log('DELETE comment');
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.redirect(`/movies/${req.params.movieId}/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });
};
