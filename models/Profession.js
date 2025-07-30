const mongoose = require('mongoose');

const professionSchema = new mongoose.Schema({
  _id: String,
  name: String,
});

module.exports = mongoose.model('Profession', professionSchema);
