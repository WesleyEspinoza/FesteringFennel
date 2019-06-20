const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number,
  movieId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Review;
