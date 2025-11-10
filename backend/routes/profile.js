const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');

// Get user profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      full_name: user.full_name,
      sex: user.sex,
      age: user.age,
      height: user.height,
      weight: user.weight,
      medical_information: user.medical_information,
      date_of_birth: user.date_of_birth,
      avatar_url: user.avatar_url
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/', authMiddleware, [
  body('full_name').optional().trim().isLength({ max: 100 }),
  body('sex').optional().isIn(['male', 'female', 'other']),
  body('age').optional().isInt({ min: 0, max: 150 }),
  body('height').optional().isFloat({ min: 0 }),
  body('weight').optional().isFloat({ min: 0 }),
  body('medical_information').optional().trim().isLength({ max: 5000 }),
  body('date_of_birth').optional().isISO8601(),
  body('avatar_url').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const updates = {};
    const allowedFields = ['full_name', 'sex', 'age', 'height', 'weight', 'medical_information', 'date_of_birth', 'avatar_url'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    updates.updatedAt = Date.now();

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json({
      id: user._id,
      email: user.email,
      full_name: user.full_name,
      sex: user.sex,
      age: user.age,
      height: user.height,
      weight: user.weight,
      medical_information: user.medical_information,
      date_of_birth: user.date_of_birth,
      avatar_url: user.avatar_url
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
