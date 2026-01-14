# Hogwarts API
An ExpressJS server to serve Harry Potter themed data to a client.

## Installation
Clone this project with the command:
```bash
git clone https://github.com/warren-west/bed-25-express-demo-1.git
```
## Explanation
### Setting up the server
Much like when we used the built-in `http` module from Node, we'll follow the 3 main steps to getting a server up and running.
1. Import the dependency. This time it's `express`, not `http`. For this we need to install the `express` package into our project with the command:
```bash
npm i express
```
Use the folllowing JavaScript code to import the installed `express` package from `node_modules`:
```javascript
// import 'express' which is a function we can call, that's what we'll do next
const express = require('express')
const server = express() // create the server object
```
2. Configure the server. With Express, not all of our server logic is contained within a single method. Express gives us `get()`, `.post()`, `.put()`, and `.delete()` helper methods on the `server` object to logically split endpoint logic. Each of these functions receive two parameters. The first parameter is a string - the URL, e.g. `'/'`.
The second parameter is a function like what we've seen before: `(req, res) => {...}`. It exposes the `request` and `response` objects to us. Keep in mind, our server determines what to do with a client request by loking at the `HTTP method` and the `url`. We can now add the following code:
```javascript
const express = require('express')
const server = express()

// Set up endpoints:
server.get('/', (req, res) => {
  // handle endpoint logic
  res.status(200).write("Hello") // we can chain the writing onto the setting of the response status code
  res.end()
)

// Other helper methods:
// server.post('/', (req, res) => {...})
// server.put('/', (req, res) => {...})
// server.delete('/', (req, res) => {...})
```
> As our server scales up, we will move this endpoint logic into `routes`. We touched a little on this today right at the end of the lesson, it's where we'll pick up from tomorrow.


3. To start the server listening for requests we write the following code:
```javascript
const express = require('express')
const server = express()

// Set up endpoints:
server.get('/', (req, res) => {
  // handle endpoint logic
  res.status(200).write("Hello from the server")
  res.end()
)

// some familiar code:
server.listen(8000, () => {
  console.log("Server is listening on port 8000...")
})
```
### The database
In this project we've created a `data` folder for the database logic to be housed inside. It contains a `database.js` file that will hold the code for database interactions. We also have `spells.json` and `wizards.json` files which replace our old JavaScript array from the quotes demo. This is a small step closer to real life. Each of the .json files holds an array of objects representing *wizards* and *spells*.
We have the following code in `database.js` that returns these arrays of objects:
```javascript
function getAllWizards() {
    const wizards = require('./wizards.json') // fetch the JSON data from the external file
    return {
        code: 200, // Successful GET
        data: wizards
    }
}

function getAllSpells() {
    const spells = require('./spells.json') // fetch the JSON data from the external file
    return {
        code: 200, // Successful GET
        data: spells
    }
}
/// exporting the functions our server will use:
module.exports = {
    getAllWizards,
    getAllSpells,
}
```

### Creating routes
We can image that as our project expands, `server.js` will get very big, which is one of the major drawbacks we noted from the previous quotes demo. So from the beginning of this project, we're going to implement a smarter project structure. We'll logically separate CRUD functionality for each "entity" (wizard / spell) into its own .js file. These files we'll put into a folder called `routes`.
Notice we have two files inside this folder called `wizards.js` and `spells.js`. We have configured these files to use routers (which is basically the same thing as the server object we have used up until now), and export these routers to use in server.js. Let's examine `wizards.js` in the `routes` folder.

```javascript
// we need to import express here because it provides us with the Router() function
const express = require('express')
// create a router for this wizards route
const router = express.Router()

// router logic...

// export the router we have created
module.exports = router
```
Once we've created a router object, we can configure it with endpoints:
```javascript
const express = require('express')
const router = express.Router()

// create endpoints with .get() / .post() / .put() / .delete()
router.get('/', (req, res) => {    
    // fetch the data from the database
    const result = getAllWizards()
    
    res.status(result.code).json(result.data)
    res.end()
})

module.exports = router
```
Once we have an endpoint that is working, we can test it out by connecting this router to our server in server.js:
```javascript
const express = require("express")

// import the router object we exported from /routes/wizards.js
const wizardsRouter = require('./routes/wizards')

// connect it to the server
server.use('/wizards', wizardsRouter)
// now incoming requests where URL = /wizards will be redirected into the router logic
```

> Note that any incoming requests with the URL = `localhost:8099/wizards` will be caught by the server, and the server will match `/wizards` to the `wizardsRouter`'s URL, and forward the request to the router in `/routes/wizards.js`.
>
> **Client request → Server (server.js) → Route (wizards.js)**
---
### Request body
The next thing to look at is how we handle getting data from the body of a request object. For example, when we want to add a new wizard to the database, the client provides us with some wizard data. When working with the `http` module before, we used the code:
```javascript
http.createServer((req, res) => {
    if (req.method == "POST" && req.url == "/wizards") {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })
        req.on("end", () => {
            // do something with data
            console.log(data)
        })
    }
})
```
Now we can use a piece of ExpressJS middleware to read data from the body of requests much easier:
```javascript
// routes/wizards.js
router.post('/', (req, res) => {
    // this single line of code replaces the code snippet above
    const data = req.body
    console.log(data)
})
```
Initially this will throw an error because `request.body` will be `undefined`. We need to configure our server to use ExpressJS middleware that does this, because it's not the default behavior. Notice the line of code in server.js:
```javascript
const express = require("express")

const wizardsRouter = require('./routes/wizards')
const spellsRouter = require('./routes/spells')

const server = express()

// middleware
// let's us read the body on incoming HTTP requests
// (new wizard data, updated wizard data, etc...)
server.use(express.json())
// without this middleware req.body = undefined
```
---
### Request query parameters
*we will continue with this tomorrow*