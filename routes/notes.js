const express = require('express');
const notes = express.Router();
const {readFromFile, readAndAppend} = require('../helpers/fsutils.js');


notes.get('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    readFromFile('./db/notes.json').then((data => res.json(JSON.parse(data))));
})

notes.post('/', (req, res) => {
    console.log(`A ${req.method} request was made`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text
        };

        readAndAppend(newNote, './db/notes.json');
        res.json('Note added successfully')
    } else {
        res.error('Error adding Note')
    }
})

notes.delete('/', (req, res) => {
    console.log(`A ${req.method} request has been made`)

    const { title, text} = req.body;

    if (req.body) {

    } else {
        res.error('Error removing Note');
    }
})

module.exports = notes;