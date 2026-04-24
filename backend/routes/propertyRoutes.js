const express = require('express');
const Property = require('../models/Property');
const { protect, protectAny } = require('../middleware/auth');

const router = express.Router();

// GET /api/properties — public, fetch all properties
router.get('/', async (req, res) => {
  try {
    const { category, type, status, search, featured } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { developer: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    if (type) query.type = { $regex: new RegExp(`^${type}$`, 'i') };
    if (status) query.status = { $regex: new RegExp(`^${status}$`, 'i') };
    if (featured === 'true') query.featured = true;

    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error('Fetch properties error:', error);
    res.status(500).json({ message: 'Server error fetching properties.' });
  }
});

// GET /api/properties/:id — public, fetch single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found.' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/properties — only signed-in users can post
router.post('/', protectAny, async (req, res) => {
  try {
    const property = new Property(req.body);
    const saved = await property.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(400).json({ message: error.message || 'Failed to create property.' });
  }
});

// PUT /api/properties/:id — admin only, update property
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Property not found.' });
    res.json(updated);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(400).json({ message: error.message || 'Failed to update property.' });
  }
});

// DELETE /api/properties/:id — admin only, delete property
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await Property.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Property not found.' });
    res.json({ message: 'Property deleted successfully.' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
