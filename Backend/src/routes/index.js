const express = require('express');
const router = express.Router();
const userRouter = require('./user.js')
const bookRouter = require('./book.js')

const initWebRoutes = (app) => {
    app.use('/user',userRouter)
    app.use('/book',bookRouter)
    return app.use("/", router);
};

module.exports = initWebRoutes;
