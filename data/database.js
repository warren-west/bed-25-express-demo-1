function getAllWizards() {
    const wizards = require('./wizards.json')
    return {
        code: 200, // Successful GET
        data: wizards
    }
}

function getAllSpells() {
    const spells = require('./spells.json')
    return {
        code: 200, // Successful GET
        data: spells
    }
}

module.exports = {
    getAllWizards,
    getAllSpells,
}