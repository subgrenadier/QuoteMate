const Item = require('../models/itemModel');

exports.handler = async function(event, context) {
  try {
    const keyword = event.queryStringParameters.keyword;

    if (!keyword) {
      const items = await Item.find();
      return {
        statusCode: 200,
        body: JSON.stringify(items),
      };
    } else {
      const items = await Item.find({
        $or: [
          { itemName: { $regex: new RegExp(keyword, 'i') } },
          { itemBrand: { $regex: new RegExp(keyword, 'i') } },
          // Add more fields if needed
        ]
      });
      return {
        statusCode: 200,
        body: JSON.stringify(items),
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
