const express = require('express')
const router = express.Router()
const { getAllWizards, getWizardById, addWizard } = require('../data/database')

// GET + '/'
// /wizards/
// /wizards?house=Gryffindor (search for wizard)
router.get('/', (req, res) => {    
    // fetch the data from the database
    const result = getAllWizards()
    const houseSearchString = req.query.house || ""
    
    if (houseSearchString.length > 0) {
        let filteredList = result.data.filter(w => w.house.includes(houseSearchString))
        res.status(result.code).json(filteredList)
        res.end()
        return
    }

    res.status(result.code).json(result.data)
    res.end()
})


// /wizards/5
router.get('/:id', (req, res) => {
    const wizardId = req.params.id // a great feature from Express, getting parameters from the URL is easy!
    
    const result = getWizardById(wizardId)
    
    console.log(result.message)
    res.status(result.code).json(result.data)
    res.end()
})

// add a new wizard
router.post('/', (req, res) => {
    // get the new wizard data from the body of the request
    const newWizardData = req.body

    // use that wizard data with addWizard() function
    const result = addWizard(newWizardData)

    console.log(result.message)
    // generate appropriate response for client
    res.status(result.code).json(result.data)
    res.end()
})

// TODO: Add other endpoints
router.delete('/', (req, res) => { })
router.put('/', (req, res) => { })

module.exports = router