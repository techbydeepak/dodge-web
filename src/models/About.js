const mongoose = require('mongoose');

const About = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  description2: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('about', About);
