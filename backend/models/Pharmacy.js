const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  phone_number: String,
  latitude: Number,
  longitude: Number,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  operating_hours: mongoose.Schema.Types.Mixed,
  services: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);
