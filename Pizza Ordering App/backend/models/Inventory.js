const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['bases', 'sauces', 'cheeses', 'veggies', 'meats']
  },
  items: {
    type: Map,
    of: Number,
    default: {}
  },
  threshold: {
    type: Number,
    default: 20
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);