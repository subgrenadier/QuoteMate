const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  manufacturer: String,
  specification: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  price: {
    type: String,
    default: '0.00',
    validate: {
      validator: function(v) {
        // Allow 0.00 or any positive number with up to two decimal places
        return /^0(\.00?)?$|^\d+(\.\d{1,2})?$/.test(v);
      },
      message: props => `${props.value} is not a valid price format. Must have two decimal places.`
    },
    required: true
  },
  previousPrice: [{
    price: {
      type: String,
      validate: {
        validator: function(v) {
          // Allow 0.00 or any positive number with up to two decimal places
          return /^0(\.00?)?$|^\d+(\.\d{1,2})?$/.test(v);
        },
        message: props => `${props.value} is not a valid price format. Must have two decimal places.`
      },
      required: false
    },
    date: {
      type: Date,
      default: Date.now,
      required: false
    }
  }]
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

// With this schema, you can store varying specifications for each item without enforcing a fixed structure. Each item can have its own set of attributes and values within the specification field.

// For example, you can create items with different specifications like this:
// const newItem1 = new Item({
//     itemName: 'Product A',
//     manufacturer: 'Manufacturer X',
//     specification: {
//       color: 'Blue',
//       size: 'Large',
//       weight: 500
//     }
//   });
  
//   const newItem2 = new Item({
//     itemName: 'Product B',
//     manufacturer: 'Manufacturer Y',
//     specification: {
//       material: 'Plastic',
//       dimensions: {
//         length: 10,
//         width: 5,
//         height: 3
//       },
//       features: ['Waterproof', 'Durable']
//     }
//   });
  