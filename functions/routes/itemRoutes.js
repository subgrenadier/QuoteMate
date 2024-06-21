const express = require('express');
const router = express.Router();
const Item = require('../functions/models/itemModel');
const Supplier = require('../functions/models/supplierModel');

// Get all items
router.get('/', async (req, res) => {

  const keyword = req.query.keyword;

  if (!keyword) {
    try {
      const items = await Item.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      // Use a regex to find items where any field matches the keyword
      const items = await Item.find({
        $or: [
          { itemName: { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive search for itemName
          { itemBrand: { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive search for itemBrand
          // Add more fields here if needed
        ]
      });
  
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
 
});

// GET search for items by keyword
router.get('/search', async (req, res) => {
  const keyword = req.query.keyword;

  try {
    // Use a regex to find items where any field matches the keyword
    const items = await Item.find({
      $or: [
        { itemName: { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive search for itemName
        { itemBrand: { $regex: new RegExp(keyword, 'i') } }, // Case-insensitive search for itemBrand
        // Add more fields here if needed
      ]
    });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET item by ID
router.get('/:id', async (req, res) => {
  // try {
  //   const items = await Item.findById(req.params.id);
  //   res.json(items);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
  const itemId = req.params.id;

  try {
    // Find the item by its ID
    const item = await Item.findById(itemId);
    // res.json(item);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Find all suppliers that have this item
    const suppliers = await Supplier.find({ supplierItem: itemId }).select('supplierName supplierEmail');

    res.json({
      item,
      suppliers
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  // Implementation for adding a new item
  const { itemName, itemBrand, itemSpecification, itemPrice } = req.body;

  try {
    const newItem = new Item({
      itemName,
      itemBrand,
      itemSpecification,
      itemPrice,
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
  const { itemName, manufacturer, specification, price } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { itemName, manufacturer, specification, price},
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
