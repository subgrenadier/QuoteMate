// netlify/functions/mongoConnection.js

const mongoose = require('mongoose');
require('dotenv').config();

let cachedConnection = null;

async function connectToDatabase() {
    if (cachedConnection) {
        return cachedConnection;
    }

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME;

    const connection = await mongoose.connect(uri, {
        dbName: dbName,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    cachedConnection = connection;
    console.log('Connected to MongoDB');
    return connection;
}

module.exports = {
    connectToDatabase,
};
