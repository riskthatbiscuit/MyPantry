const express = require('express');
const pantry = express.Router();
const {readFromFile, writeToFile, readAndAppend} = require("../helpers/fsutils.js");
const uuid = require('../helpers/uuid.js');


pantry.get('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    readFromFile('./db/pantry.json').then((data => res.json(JSON.parse(data))));
})

pantry.post('/', (req, res) => {
    console.log(`A ${req.method} request was made`);

    const { title, text } = req.body;

    if (req.body) {
        const newPantry = {
            title,
            text,
            id: uuid(),
        };

        console.log(newPantry)
        readAndAppend(newPantry, './db/pantry.json');
        res.json('Pantry added successfully')
    } else {
        res.error('Error adding Pantry')
    }
})

pantry.delete('/:id', (req, res) => {
    console.log(`A ${req.method} request has been made`)
    console.log(req.params)
    const pantryId = req.params.id;
    console.log(pantryId)
    if (pantryId) {
        readFromFile('./db/pantry.json')
            .then((data) => {
                const pantryArray = JSON.parse(data);
                console.log(pantryArray)
                const pantryIndex = pantryArray.findIndex((pantry) => pantry.id === pantryId);
                console.log(pantryIndex)
                if (pantryIndex !== -1) {
                    pantryArray.splice(pantryIndex,1);
                    writeToFile("./db/pantry.json",pantryArray)
                    res.status(200).json("Pantry item removed succesfully")
                } else {
                    res.status(400).json("Pantry item not found");
                }
            })
    } else {
        res.error('Error removing Pantry');
    }
})

module.exports = pantry;