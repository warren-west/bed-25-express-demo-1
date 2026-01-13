// GET + '/spells'
server.get('/spells', (req, res) => {
    console.log(req.url)
    console.log(req.method)

    // fetch the data from the database
    const result = getAllSpells()

    res.status(result.code).json(result.data)
    res.end()
})