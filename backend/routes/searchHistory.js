const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const SearchHistory = require('../models/SearchHistory');

// Save search history
router.post('/', authMiddleware, [
  body('query').trim().isLength({ min: 1, max: 500 }),
  body('results_count').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { query, results_count = 0 } = req.body;

    const searchHistory = new SearchHistory({
      user_id: req.userId,
      query,
      results_count
    });

    await searchHistory.save();

    res.status(201).json({
      id: searchHistory._id,
      query: searchHistory.query,
      results_count: searchHistory.results_count,
      created_at: searchHistory.createdAt
    });
  } catch (error) {
    console.error('Save search history error:', error);
    res.status(500).json({ error: 'Failed to save search history' });
  }
});

// Get user search history
router.get('/', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;

    const history = await SearchHistory.find({ user_id: req.userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json(history.map(h => ({
      id: h._id,
      query: h.query,
      results_count: h.results_count,
      created_at: h.createdAt
    })));
  } catch (error) {
    console.error('Get search history error:', error);
    res.status(500).json({ error: 'Failed to get search history' });
  }
});

// Clear user search history
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await SearchHistory.deleteMany({ user_id: req.userId });
    res.json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('Clear search history error:', error);
    res.status(500).json({ error: 'Failed to clear search history' });
  }
});

module.exports = router;
