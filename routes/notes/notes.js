// const noteModel = require('../models/Notes.js');
express = require('express');
const Notes = require('../../models/NotesModel'); 
const router = express.Router();


//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save

router.post('/notes', async (req, res) => {
    try {
        const notes = await Notes.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Notes created successfully.'
        });

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                message: 'Notes already exists.'
            });
        } else {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
});


 //TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find


router.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.find(); 
       
        res.status(200).json({
            success: true,
            notes: notes
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById

router.get('/notes/:noteId', async (req, res) => {

    try{
        const notes = await Notes.findById(req.params.noteId)

        if(!notes) {
            return res.status(404).json({message: `Note with the id ${req.params.noteId} doesn't exist`})
        }
       
        res.status(200).json({
            success:true,
            notes: notes
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate

router.put('/notes/:noteId', async (req, res) => {

    try{
        const deletedNotes = await Notes.findByIdAndUpdate(req.params.noteId, req.body, {new: true})

        if(!deletedNotes) {
            return res.status(404).json({
                message: `Notes with the id ${req.params.noteId} doesn't exist`})
        }
       
        res.status(200).json({
            success:true,
            message: "Notes details updated successfully.",
            // notes: notes
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});


//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove

router.delete('/notes/:noteId', async (req, res) => {

    try{

        const notes = await Notes.findByIdAndDelete(req.params.noteId)

        if(!notes) {
            return res.status(404).json({message: `Notes with the id ${req.params.noteId} doesn't exist`})
        }
       
        res.status(200).json({
            success:true,
            message: "Notes deleted successfully."
            
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});


module.exports = router;