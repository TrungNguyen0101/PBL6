const db = require('./src/config/database/index')
const viewEngine =require("../Backend/src/config/viewEngine.js");
const express = require('express')
const app = express()
const path = require('path');
const {userRouter,bookRouter} = require('./src/routes/index.js')
var bodyParser = require('body-parser')
require("dotenv").config();
const initWebRoutes = require("./src/routes/index.js");
const cors = require("cors");
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3030");
  
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    // Pass to next layer of middleware
    next();
  });





app.use('/', express.static(path.join(__dirname, 'lib')))



//middleware
app.use(
    express.urlencoded({
        extended: false,
    }),
);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

viewEngine(app);
initWebRoutes(app);
// route(app);
const port = process.env.PORT || 3030;  
app.listen(port,async () => {
    await db.connect();
    console.log(`Api is running on port ${port}`)
})

