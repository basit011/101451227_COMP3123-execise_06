
//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({

    "noteTitle": {
        type: String,
        required: true,
        trim: true,
    },
    "noteDescription": {
        type: String,
        required: true,
        trim: true,
    },

     "priority": {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true
    },

    "dateAdded": {
        type: Date,
        default: Date.now
    },
    "dateUpdated": {
        type: Date,
        default: Date.now
    }
},  { timestamps: true }); 

const Notes = mongoose.model('notes', notesSchema);
module.exports = Notes;

