const mongoose = require('mongoose');

const qualitySchema = new mongoose.Schema({
  _id: String,
  name: String,
  color: String,
});

module.exports = mongoose.model('Quality', qualitySchema);
