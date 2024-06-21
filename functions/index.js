const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const apiRoutes = require('../routes/api');
const serverless = require('serverless-http');

require('dotenv').config()

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));


// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URI, {dbName: 'QuoteMate'})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', apiRoutes);

// Start server
// const port = process.env.PORT || 3000;


module.exports.handler = serverless(app);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
