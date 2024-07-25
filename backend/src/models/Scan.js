const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  chipNumber: String,
  date: { type: Date, default: Date.now },
  position: {
    latitude: String,
    longitude: String
  }
});

module.exports = mongoose.model('Scan', scanSchema);

