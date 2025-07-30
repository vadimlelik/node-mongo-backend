const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, sparse: true },
  password: String,
  profession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profession',
  },
  qualities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quality',
    },
  ],
  age: Number,
  refreshToken: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

module.exports = mongoose.model('User', userSchema);
