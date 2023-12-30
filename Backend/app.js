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
// const swaggerDocument = require('./swagger.json');
var debug = require('debug')('backend:server');
var http = require('http');
const session = require('express-session');
app.use(cors());

// app.use('/', express.static(path.join(__dirname, 'lib')))
app.use('/api-docs', express.static(path.join(__dirname, 'lib')), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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
app.use(session({
    secret: 'EXAMPLEkeyHERE1', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: true
}));

initWebRoutes(app);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');
var port = normalizePort(process.env.PORT || '3030');
app.set('port', port);
var server = http.createServer(app);
server.listen(port, async () => {
    await db.connect();
    console.log(`Api is running on port ${port}`)
})


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}