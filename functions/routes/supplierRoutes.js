const express = require('express');
const router = express.Router();
const Supplier = require('../functions/models/supplierModel');

// Get all suppliers
router.get('/', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new supplier
router.post('/', async (req, res) => {
    // Implementation for adding a new supplier
    try {
        // const { name, email, phone, website, person, personPhone, personEmail, items } = req.body;
        const { supplierName, supplierEmail, supplierItem } = req.body;
        // Create a new supplier document
        const newSupplier = new Supplier({
            supplierName,
            supplierEmail,
            supplierItem
        });

        // Save the new supplier to the database
        const savedSupplier = await newSupplier.save();

        res.status(201).json(savedSupplier);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit an existing supplier
router.put('/:id', async (req, res) => {
    // Implementation for editing an existing supplier
    // const { name, address, contactNumber, pic, picContactNumber, picEmailAddress, items } = req.body;
    const { supplierName, supplierEmail, supplierItem } = req.body;
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { supplierName, supplierEmail, supplierItem },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a supplier
router.delete('/:id', async (req, res) => {
    // Implementation for deleting a supplier
    try {
        const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    
        if (!deletedSupplier) {
          return res.status(404).json({ message: 'Supplier not found' });
        }
    
        res.json({ message: 'Supplier deleted' });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

module.exports = router;
