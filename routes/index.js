const express = require('express')

const pantryRouter = require('./pantry');

const app = express();

app.use('/pantry', pantryRouter);

module.exports = app;