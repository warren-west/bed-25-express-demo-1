/** CALLBACKS
 * Asynchronous mechanics in JavaScript are built on callbacks.
 * Here's an example of a callback being used:
 */
function sum(a, b, completed) {
    const result = a + b
    //invoke the callback function
    completed(result)
}

// Call sum, and provide a callback function as 3rd argument
sum(1, 4, function (result) {
    console.log('The result is: ', result)
    //Output: 5
})

/** What’s the problem with callbacks?​
 * When asynchronous functions start depending on one another, JavaScript's callback system works well for one or two instances.
 * Adding more functions creates what was dubbed "Callback Hell".
 * Which makes JavaScript code incredibly hard to read and maintain.
 * See below:
 */

// Callback hell
doSomething(function () {
    doSomethingElse(function () {
        doAnotherThing(function () {
            doOneMoreThing(function () {
                okImDone()
            })
        })
    })
})

/** PROMISES
 * The ES6 update to JavaScript introduced Promises to us.
 * A promise allows us to request information and only handle the result once the information is available​.
 * A perfect scenario is to request information from a Rest API​.
 * Getting a list of todos might take x number of seconds, and using a promise, you can render the todos once you have received the information.
 */
// Promise syntax

new Promise(function (resolve, reject) {
    try {
        const result = someProcess()
        //successfully complete
        resolve(result)
    }
    catch (error) {
        // something went wrong
        reject(error)
    }
})

// Using the fetch method and chaining Promises:
fetch('https://my-json-server.typicode.com/warren-west/coffee-api/coffees')
    .then(function (response) {
        return response.json() // Return value for next .then()
    })
    .then(function (posts) {
        // Posts is the returned value from previous .then() method
        console.log('Completed: ', posts)
    })
    .catch(function (error) {
        console.error('Something went wrong', error)
    })

/** Async/Await
 * The ES7 update to JavaScript introduced the async & await syntax to us.
 * Simplify the writing of promises​
 * Why Async / Await?
 * Promises are a great alternative to using callbacks and provide code that is easier to read and understand.
 * However, chaining too many Promises can result in confusing code.
 * Async/Await remedies this problem by adding "syntactical sugar" that makes code much easier to follow.
 * They saved humanity from callback hell​.
 */

async function fetchCoffeeData() {
    try {
        // Use await to "Wait" for the request to finish
        const resp = await fetch('https://my-json-server.typicode.com/warren-west/coffee-api/coffees')
        const coffeeData = await resp.json()
        return coffeeData
    }
    catch (error) {
        console.error('Something went wrong', error)
    }
}

//Invoke async function
const coffeeData = await fetchCoffeeData()

/** IMPORTANT RULES:
 * Async/Await can ONLY be used with Promises, nothing else.
 * Any function can be defined with async in front of it​.
 * Only async functions may have statements with await​ keyword.
 * All async functions return a void Promise if called without await​.
 * All functions that return Promises can be resolved using await​.
 * Async / Await is just Promises with a different name​.
 * Always use try...catch!
 */