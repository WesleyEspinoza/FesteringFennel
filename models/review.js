const mongoose = require('mongoose');
const Comment = require('../models/comment');

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String,
  rating: Number,
});

module.exports = Review;
