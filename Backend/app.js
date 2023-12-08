const db = require('./src/config/database/index')
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


const corsOptions = {
    origin: 'http://localhost:3000', // Hoặc có thể là một mảng ['http://localhost:3000', 'https://example.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
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
app.use(express.static(path.join(__dirname, 'public')));


initWebRoutes(app);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');
const port = process.env.PORT || 3030;
app.listen(port, async () => {
    await db.connect();
    console.log(`Api is running on port ${port}`)
})