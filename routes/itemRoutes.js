const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  // Implementation for adding a new item
  const { itemName, manufacturer, specification, price, previousPrice } = req.body;

  try {
    const newItem = new Item({
      itemName,
      manufacturer,
      specification,
      price,
      previousPrice
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit an existing item
router.put('/:id', async (req, res) => {
  // Implementation for editing an existing item
  const { itemName, manufacturer, specification, price, previousPrice } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { itemName, manufacturer, specification, price, previousPrice },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  // Implementation for deleting an item
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
