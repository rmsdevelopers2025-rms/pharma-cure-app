const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  generic_name: {
    type: String,
    trim: true,
    index: true
  },
  brands: [String],
  category: String,
  composition: [{
    activeIngredient: String,
    strength: String
  }],
  dosage: {
    adults: String,
    children: String,
    elderly: String
  },
  dosage_forms: [String],
  available_strengths: [String],
  indications: [String],
  contraindications: [String],
  side_effects: [String],
  drug_interactions: [String],
  warnings: [String],
  overdose: String,
  storage: String,
  disorders: [String],
  incompatibility: [String],
  is_premium: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Text indexes for search
drugSchema.index({ 
  name: 'text', 
  generic_name: 'text', 
  brands: 'text',
  category: 'text',
  indications: 'text'
});

module.exports = mongoose.model('Drug', drugSchema);
