const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  contactNumber: String,
  pic: String,
  picContactNumber: String,
  picEmailAddress: String,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item' // Assuming you have an Item model defined
  }]
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
