const db = require('./src/config/database/index')
const createAdmin = require("./src/services/userService.js")
const express = require('express')
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const router = express.Router();
const checkToken = require("./src/utils/middleware.js")
const initWebRoutes = require("./src/routes/index.js");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use(cors());


app.use('/', express.static(path.join(__dirname, 'lib')))
// app.use('/', express.static(path.join(__dirname, 'lib')), swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// middleware test
app.use(
    express.urlencoded({
        extended: true,
    }),
);
// app.use(checkToken.checkToken); //shiel
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

initWebRoutes(app);
// route(app);
createAdmin.AutoCreateAcount();
const port = process.env.PORT || 3030;
app.listen(port, async () => {
    await db.connect();
    console.log(`Api is running on port ${port}`)
})