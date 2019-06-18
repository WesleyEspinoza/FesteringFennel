
const Comment = require('../models/comment');

module.exports = (app) => {
  // CREATE Comment
  app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then((comment) => {
      console.log(comment);
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  app.delete('/reviews/comments/:id', (req, res) => {
    console.log('DELETE comment');
    Comment.findByIdAndRemove({ _id: req.params.id }, (err) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        res.redirect('back');
      }
    });
  });
};
