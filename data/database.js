// global list of wizards from .json file
const wizards = require('./wizards.json')

function getAllWizards() {
    return {
        code: 200, // Successful GET
        data: wizards
    }
}

function getWizardByName(searchName) {
    if (!searchName) {
        return { code: 400, message: "Invalid search query.", data: [] }
    }

    const matches = wizards.filter(w => w.name.includes(searchName))

    return { code: 200, message: "Success!", data: matches }
}

function getWizardById(id) {
    const wizard = wizards.filter(w => w.id == id)
    
    // check for 404
    if (wizard.length == 0)
        return { code: 404, message: "404: Wizard not found!", data: []}
    
    return { code: 200, message: "Successfully retrieved wizard.", data: wizard[0]}
}

function addWizard(newWizard) {
    if (!newWizard)
        return { code: 400, message: "Invalid wizard data." }

    const wizardMatches = wizards.filter(w => w.id == newWizard.id)

    // if the new wizard data is empty, or has the same id as an existing wizard
    if (wizardMatches.length > 0)
        return { code: 400, message: "Wizard ID already exists." }

    // add the new wizard into the DB
    wizards.push(newWizard)
    // retrieve the newly added wizard from the DB
    const theNewWizardFromDB = getWizardById(newWizard.id).data
    // return an object with code, message, and data
    return { code: 201, message: "Wizard added successfully!", data: theNewWizardFromDB }
}

function deleteWizard(id) {

}

function updateWizard(id, updatedWizard) {

}


// maybe we should move spell stuff into a different file?
function getAllSpells() {
    const spells = require('./spells.json')
    return {
        code: 200, // Successful GET
        data: spells
    }
}

// export the functions from this file:
module.exports = {
    getAllWizards,
    getAllSpells,
    getWizardById,
    addWizard,
    getWizardByName,
}