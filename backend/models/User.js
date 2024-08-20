const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true
  },
  UserType: {
    type: String,
    required: true
  },
  selectedInstitute: {
    type: String
  },
  subject: {
    type: String, 
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
