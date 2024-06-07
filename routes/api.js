const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');

// Middleware to check API key
router.use(apiKeyMiddleware);

// CRUD routes
router.get('/suppliers', supplierController.getAllSuppliers);
// Add other CRUD routes for suppliers as needed

module.exports = router;
