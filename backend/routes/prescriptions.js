const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const Prescription = require('../models/Prescription');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Upload prescription
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Convert to base64 for storage (or upload to cloud storage like AWS S3)
    const imageBase64 = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`;

    const prescription = new Prescription({
      user_id: req.userId,
      image_url: imageUrl,
      original_filename: req.file.originalname
    });

    await prescription.save();

    res.status(201).json({
      id: prescription._id,
      image_url: prescription.image_url,
      original_filename: prescription.original_filename,
      created_at: prescription.createdAt
    });
  } catch (error) {
    console.error('Upload prescription error:', error);
    res.status(500).json({ error: 'Failed to upload prescription' });
  }
});

// Get user prescriptions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ user_id: req.userId })
      .sort({ createdAt: -1 })
      .lean();

    res.json(prescriptions.map(p => ({
      id: p._id,
      image_url: p.image_url,
      original_filename: p.original_filename,
      analysis_results: p.analysis_results,
      created_at: p.createdAt,
      updated_at: p.updatedAt
    })));
  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({ error: 'Failed to get prescriptions' });
  }
});

// Update prescription analysis
router.put('/:id/analysis', authMiddleware, async (req, res) => {
  try {
    const { analysis_results } = req.body;

    const prescription = await Prescription.findOneAndUpdate(
      { _id: req.params.id, user_id: req.userId },
      { analysis_results, updatedAt: Date.now() },
      { new: true }
    );

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json({
      id: prescription._id,
      analysis_results: prescription.analysis_results
    });
  } catch (error) {
    console.error('Update analysis error:', error);
    res.status(500).json({ error: 'Failed to update analysis' });
  }
});

// Delete prescription
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const prescription = await Prescription.findOneAndDelete({
      _id: req.params.id,
      user_id: req.userId
    });

    if (!prescription) {
      return res.status(404).json({ error: 'Prescription not found' });
    }

    res.json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error('Delete prescription error:', error);
    res.status(500).json({ error: 'Failed to delete prescription' });
  }
});

module.exports = router;
