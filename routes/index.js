const express = require('express')

const pantryRouter = require('./pantry');
const mealRouter = require('./meal.js')

const app = express();

app.use('/pantry', pantryRouter);
app.use('/meal', mealRouter);

module.exports = app;