const express = require('express')
const actionModel = require('../data/helpers/actionModel.js')
const route = express.Router()


// GET ALL
route.get('/', (req, res) => {
    actionModel.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong!: ${err}`})
    })
})

// GET BY ID
route.get('/:id', (req, res) => {
    const {id} = req.params
    console.log(req.body)
    actionModel.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong!: ${err}`})
    })
})

// POST NEW
route.post('/', (req, res) => {
    const {notes, description, project_id} = req.body
    if (!notes || !description || !project_id) {
        return res.status(400).json({error: 'Please include description, notes and a project_id to add a new action.'})
    }
    actionModel.insert({notes, description, project_id})
    .then(action => {
        res.status(200).json(`Success! New action connected to project ID of ${action.project_id} added`)
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong!: ${err}`})
    })
})

// DELETE
route.delete('/:id', (req, res) => {
    const {id} = req.params
    actionModel.remove(id)
    .then(count => {
        if(count < 1) {
           return res.status(404).json({error: 'Project with specified ID does not exist.'})
        }
        res.status(200).json({message: `Success! You deleted ${count} action(s).`})
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong!: ${err}`})
    })
})

// UPDATE
route.put('/:id', (req, res) => {
    const {id} = req.params
    const {notes, description, project_id} = req.body
    if(!notes || !description || !project_id) {
        return res.status(400).json({message: 'You must include content in both the notes, description, and project_id fields to update an action.'})
    }
    actionModel.update(id, {notes, description, project_id})
    .then(changes => {
        if (changes < 1) {
            return res.status(404).json({error: 'Project with specified ID does not exist.'})
        }
        const newObj = JSON.stringify(changes);
        res.status(200).json({message: `Success! You updated this action: See your changes: ${newObj}`})
    })
    .catch(err => {
        res.status(500).json({message: `Something went wrong!: ${err}`})
    })
})





module.exports = route;