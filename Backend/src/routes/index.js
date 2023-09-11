const testRoute = require('./testRoute')

function route(app) {
    app.use('/api/test', testRoute)
}

module.exports = route;