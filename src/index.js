/*
 * LinKHU Backend API Server
 */
require('dotenv').config();

const config = require('./config');

const express = require('express');
const app = express();

const api = require('./api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.use((err, req, res, next) => {
  res.status(500).json({
    result: false,
    message: err.message,
  });
});

app.listen(config.port, () => {
  console.log(`!!! Server is now listening on port ${config.port}`);
});
