const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  phone: String,
  website:String,
  person: String,
  personPhone: String,
  personEmail: String,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item' // Assuming you have an Item model defined
  }]
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
