const Item = require('../models/itemModel');

exports.handler = async function(event, context) {
  try {
    const itemId = event.pathParameters.id;

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item deleted' }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
