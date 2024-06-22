const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const serverless = require('serverless-http');

require('dotenv').config()

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('tiny'));

exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Index"
      })
    }
  }

module.exports.handler = serverless(app);

