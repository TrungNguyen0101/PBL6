const db = require('./src/config/database/index')
const viewEngine =require("../Backend/src/config/viewEngine.js");
const express = require('express')
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const  swaggerJsdoc = require("swagger-jsdoc");
const  swaggerUi = require("swagger-ui-express");
const checkToken = require("./src/utils/middleware.js")
const initWebRoutes = require("./src/routes/index.js");
const cors = require("cors");
require("dotenv").config();
app.use(cors());


app.use('/', express.static(path.join(__dirname, 'lib')))


//middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// app.use(checkToken.checkToken); //shield
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

viewEngine(app);
initWebRoutes(app);
// route(app);
const port = process.env.PORT || 3030;  
app.listen(port,async () => {
    await db.connect();
    console.log(`Api is running on port ${port}`)
})

