const Item = require('../models/itemModel');

exports.handler = async function(event, context) {
  try {
    const { itemName, manufacturer, specification, price } = JSON.parse(event.body);
    const itemId = event.pathParameters.id;

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { itemName, manufacturer, specification, price },
      { new: true }
    );

    if (!updatedItem) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Item not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedItem),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
