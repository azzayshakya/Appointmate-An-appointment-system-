const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
  ins_name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Institute', InstituteSchema);
