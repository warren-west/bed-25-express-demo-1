// 1. Import Express, not HTTP module
// 2. Configure the server
// 3. Start the server (listen)

const express = require("express")

// Import Routes:
const wizardsRouter = require('./routes/wizards')
const spellsRouter = require('./routes/spells')
// import middleware
const warrenLogger = require('./middleware/logger')

const server = express()
const PORT = 8099 //uppercase variable names implies true constants (values that should never change)

// middleware
server.use(express.json()) // so that we can read the body on incoming requests (new wizard data, etc...)
server.use(warrenLogger) // my custom middleware

// Use the routes (wire it up):
server.use('/wizards', wizardsRouter)
server.use('/spells', spellsRouter)


// endpoints in server (not routes)
// usually just an index endpoint here
server.get('/', (req, res) => {
    res.status(200).json({
        endpoints: [{
            wizardEndpoints: [
                "/wizards",
                "/wizards/1",
            ]
        },
        {
            spellsEndpoints: [
                "/spells"
            ]
        }
        ]
    })
    res.end()
})

// let the server begin listening for requests
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})