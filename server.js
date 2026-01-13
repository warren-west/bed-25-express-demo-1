// 1. Import Express, not HTTP module
// 2. Configure the server
// 3. Start the server (listen)

const express = require("express")
const { getAllWizards, getAllSpells } = require('./data/database')



const server = express()





















server.get('/', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    res.status(200).write(`You pinged ${req.method} + ${req.url}`)
    res.end()
})

server.post('/', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    res.status(200).write(`You pinged ${req.method} + ${req.url}`)
    res.end()
})

server.put('/', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    res.status(200).write(`You pinged ${req.method} + ${req.url}`)
    res.end()
})

server.delete('/', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    res.status(200).write(`You pinged ${req.method} + ${req.url}`)
    res.end()
})

server.listen(8099, () => {
    console.log(`Server is listening on port 8099...`)
})