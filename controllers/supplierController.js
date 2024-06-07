const Supplier = require('../models/supplierModel');

// Controller functions
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add other CRUD functions as needed (create, read by ID, update, delete)
