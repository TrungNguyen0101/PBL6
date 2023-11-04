const express = require('express');
const router = express.Router();
const userRouter = require('./user.js')
const bookRouter = require('./book.js')
const middleware = require('../utils/middleware.js')
const initWebRoutes = (app) => {
    app.use('/api/user',userRouter)
    app.use('/api/book',bookRouter)
    return app.use("/", router);
};

module.exports = initWebRoutes;
