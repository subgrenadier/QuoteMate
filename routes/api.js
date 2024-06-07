const express = require('express');
const router = express.Router();

// Import supplier routes
const supplierRoutes = require('./supplierRoutes');

// Import item routes
const itemRoutes = require('./itemRoutes');

// Mount supplier routes
router.use('/suppliers', supplierRoutes);

// Mount item routes
router.use('/items', itemRoutes);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Supplier = require('../models/supplierModel');
// const supplierController = require('../controllers/supplierController');
// const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');

// // Middleware to check API key
// // router.use(apiKeyMiddleware);

// // CRUD routes
// router.get('/suppliers', supplierController.getAllSuppliers);
// // Add other CRUD routes for suppliers as needed


// // Create a new supplier
// router.post('/suppliers', async (req, res) => {
//     try {
//       const { name, address, phone, website, person, personPhone, personEmail, items } = req.body;
  
//       // Create a new supplier document
//       const newSupplier = new Supplier({
//         name,
//         address,
//         phone,
//         website,
//         person,
//         personPhone,
//         personEmail,
//         items
//       });
  
//       // Save the new supplier to the database
//       const savedSupplier = await newSupplier.save();
  
//       res.status(201).json(savedSupplier);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  

// module.exports = router;


// const supplierId = '...'; // ObjectId of the supplier document
// const newItemId = '...'; // ObjectId of the newly created item document

// Supplier.findById(supplierId, (err, supplier) => {
//   if (err) {
//     // Handle error
//   } else {
//     supplier.items.push(newItemId);
//     supplier.save((err, updatedSupplier) => {
//       if (err) {
//         // Handle error
//       } else {
//         console.log('Item added to supplier:', updatedSupplier);
//       }
//     });
//   }
// });
