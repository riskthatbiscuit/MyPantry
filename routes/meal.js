const express = require('express');
const meal = express.Router();
const {readFromFile, readAndAppend} = require('../helpers/fsutils.js');


meal.get('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    readFromFile('./db/meal.json').then((data => res.json(JSON.parse(data))));
})

meal.post('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    console.log(req.body);

    const { title} = req.body;

    if (req.body) {
        const newMeal = {
            title
        };

        readAndAppend(newMeal, './db/meal.json');
        res.json('Meal added successfully')
    } else {
        res.error('Error adding Meal')
    }
})

meal.delete('/', (req, res) => {
    console.log(`A ${req.method} request has been made`)

    const { title, text} = req.body;

    if (req.body) {

    } else {
        res.error('Error removing Meal');
    }
})

module.exports = meal;