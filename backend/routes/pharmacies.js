const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');

// Get all pharmacies
router.get('/', async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find()
      .sort({ name: 1 })
      .lean();

    res.json(pharmacies.map(p => ({
      id: p._id,
      name: p.name,
      address: p.address,
      phone_number: p.phone_number,
      latitude: p.latitude,
      longitude: p.longitude,
      rating: p.rating,
      operating_hours: p.operating_hours,
      services: p.services
    })));
  } catch (error) {
    console.error('Get pharmacies error:', error);
    res.status(500).json({ error: 'Failed to get pharmacies' });
  }
});

module.exports = router;
