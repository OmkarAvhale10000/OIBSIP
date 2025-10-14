const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const { adminAuth } = require('../middleware/auth');

// Get inventory
router.get('/', adminAuth, async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update inventory
router.patch('/:category/:item', adminAuth, async (req, res) => {
  try {
    const { category, item } = req.params;
    const { quantity } = req.body;

    let inventory = await Inventory.findOne({ category });
    
    if (!inventory) {
      inventory = new Inventory({ category, items: new Map() });
    }

    inventory.items.set(item, quantity);
    inventory.lastUpdated = Date.now();
    await inventory.save();

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;