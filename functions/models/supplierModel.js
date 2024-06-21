const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  supplierEmail: {
    type: String,
    required: true
  },
  // phone: String,
  // website:String,
  person: String,
  // personPhone: String,
  // personEmail: String,
  supplierItem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item' // Assuming you have an Item model defined
  }]
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
