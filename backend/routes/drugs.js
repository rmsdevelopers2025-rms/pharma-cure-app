const express = require('express');
const router = express.Router();
const { query, validationResult } = require('express-validator');
const Drug = require('../models/Drug');

// Search drugs
router.get('/search', [
  query('q').trim().isLength({ min: 1, max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchQuery = req.query.q;
    const regex = new RegExp(searchQuery, 'i');

    const drugs = await Drug.find({
      $or: [
        { name: regex },
        { generic_name: regex },
        { brands: regex },
        { category: regex },
        { indications: regex },
        { 'composition.activeIngredient': regex }
      ]
    }).limit(50).lean();

    res.json(drugs);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search drugs' });
  }
});

// Get drug suggestions (autocomplete)
router.get('/suggestions', [
  query('q').trim().isLength({ min: 1, max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const searchQuery = req.query.q;
    const regex = new RegExp(`^${searchQuery}`, 'i');

    // Get drug names, generic names, and brands
    const drugs = await Drug.find({
      $or: [
        { name: regex },
        { generic_name: regex },
        { brands: regex }
      ]
    })
    .select('name generic_name brands')
    .limit(20)
    .lean();

    // Extract unique suggestions
    const suggestions = new Set();
    drugs.forEach(drug => {
      if (drug.name) suggestions.add(drug.name);
      if (drug.generic_name) suggestions.add(drug.generic_name);
      if (drug.brands) {
        drug.brands.forEach(brand => suggestions.add(brand));
      }
    });

    res.json(Array.from(suggestions).slice(0, 10));
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// Get autocorrect suggestion (find closest match)
router.get('/autocorrect', [
  query('q').trim().isLength({ min: 1, max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ suggestion: null });
    }

    const searchQuery = req.query.q;
    
    // Use text search to find similar drugs
    const drugs = await Drug.find(
      { $text: { $search: searchQuery } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(1)
    .lean();

    res.json({ 
      suggestion: drugs.length > 0 ? drugs[0].name : null 
    });
  } catch (error) {
    console.error('Autocorrect error:', error);
    res.json({ suggestion: null });
  }
});

module.exports = router;
