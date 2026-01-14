// DESTRUCTURING OBJECTS
const person = { firstname: "Warren", lastname: "West", age: 33 }
const car = { make: "Toyota", model: "Yaris", year: 2011 }
const animal = { breed: "Tiger", weight: 133 }
function createNewHuman() {}

function printGreeting(personObject) {
    let { firstname, lastname } = personObject
    firstname = firstname.toUpperCase()
    lastname = lastname.toLowerCase()

    console.log(`Hello ${firstname} ${lastname}`)
}

printGreeting(person)
console.log(person)

// DESTRUCTURING ARRAYS
const numbers = [ 3, 5, 7, 9 ]
let [ a, b, c, d ] = numbers // destructuring
console.log(c)