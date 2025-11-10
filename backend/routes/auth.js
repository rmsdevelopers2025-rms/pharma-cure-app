const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Sign Up
router.post('/signup', [
  body('email').isEmail().trim().normalizeEmail().isLength({ max: 255 }),
  body('password').isLength({ min: 6, max: 100 }),
  body('fullName').optional().trim().isLength({ max: 100 }),
  body('sex').optional().isIn(['male', 'female', 'other']),
  body('age').optional().isInt({ min: 0, max: 150 }),
  body('height').optional().isFloat({ min: 0 }),
  body('weight').optional().isFloat({ min: 0 }),
  body('medicalInformation').optional().trim().isLength({ max: 5000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, password, fullName, sex, age, height, weight, medicalInformation } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      password,
      full_name: fullName,
      sex,
      age,
      height,
      weight,
      medical_information: medicalInformation
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Sign In
router.post('/signin', [
  body('email').isEmail().trim().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name
      }
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        full_name: req.user.full_name,
        sex: req.user.sex,
        age: req.user.age,
        height: req.user.height,
        weight: req.user.weight,
        medical_information: req.user.medical_information,
        date_of_birth: req.user.date_of_birth,
        avatar_url: req.user.avatar_url
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

// Sign Out (client-side token removal)
router.post('/signout', (req, res) => {
  res.json({ message: 'Signed out successfully' });
});

module.exports = router;
