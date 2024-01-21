const express = require('express');
const pantry = express.Router();
const {readFromFile, readAndAppend} = require('../helpers/fsutils.js');


pantry.get('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    readFromFile('./db/pantry.json').then((data => res.json(JSON.parse(data))));
})

pantry.post('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newPantry = {
            title,
            text
        };

        readAndAppend(newPantry, './db/pantry.json');
        res.json('Pantry added successfully')
    } else {
        res.error('Error adding Pantry')
    }
})

pantry.delete('/', (req, res) => {
    console.log(`A ${req.method} request has been made`)

    const { title, text} = req.body;

    if (req.body) {

    } else {
        res.error('Error removing Pantry');
    }
})

module.exports = pantry;