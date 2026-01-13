const express = require('express')
const wizardRoute = express.Router()


// GET + '/wizards'
wizardRoute.get('/wizards', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    // fetch the data from the database
    const result = getAllWizards()

    res.status(result.code).json(result.data)
    res.end()
})

// TODO: implement this:
wizardRoute.get()
wizardRoute.post()
wizardRoute.put()
wizardRoute.delete()

module.exports = wizardRoute