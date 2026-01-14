const express = require('express')
const router = express.Router()
const { getAllSpells } = require('../data/database')

// GET + '/spells'
router.get('/', (req, res) => {
    // fetch the data from the database
    const result = getAllSpells()

    res.status(result.code).json(result.data)
    res.end()
})

module.exports = router