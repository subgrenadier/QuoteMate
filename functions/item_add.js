const Item = require('../models/itemModel');

exports.handler = async function(event, context) {
  try {
    const { itemName, itemBrand, itemSpecification, itemPrice } = JSON.parse(event.body);

    const newItem = new Item({
      itemName,
      itemBrand,
      itemSpecification,
      itemPrice,
    });

    const savedItem = await newItem.save();

    return {
      statusCode: 201,
      body: JSON.stringify(savedItem),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
