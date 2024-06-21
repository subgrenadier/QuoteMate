const Item = require('../models/itemModel');
const Supplier = require('../models/supplierModel');

exports.handler = async function(event, context) {
  try {
    const itemId = event.pathParameters.id;

    const item = await Item.findById(itemId);

    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
      };
    }

    const suppliers = await Supplier.find({ supplierItem: itemId }).select('supplierName supplierEmail');

    return {
      statusCode: 200,
      body: JSON.stringify({
        item,
        suppliers
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
