// middleware functions for express always have 3 parameters:
// (req, res, next)
// req and res are exactly what we've been using until now
// next is a method that says "now my middleware is done, continue the chain of events"

function warrenLogger(req, res, next) {
    console.log(`URL: ${req.url}`)
    console.log(`Method: ${req.method}`)

    next()
}

module.exports = warrenLogger