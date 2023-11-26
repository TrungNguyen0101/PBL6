const express = require('express');
const router = express.Router();
const userRouter = require('./user.js')
const bookRouter = require('./book.js')
const categoryRouter = require('./category.js')
const comentRouter = require('./comment.js')
const middleware = require('../utils/middleware.js')
const initWebRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/book', bookRouter)
    app.use('/api/book', comentRouter)
    app.use('/api/category', categoryRouter)
    return app.use("/", router);
};

module.exports = initWebRoutes;
