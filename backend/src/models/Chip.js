const mongoose = require('mongoose');

const chipSchema = new mongoose.Schema({
  chipNumber: String,
  animalName: String,
  ownerName: String,
  contactInfo: String
});

module.exports = mongoose.model('Chip', chipSchema);
