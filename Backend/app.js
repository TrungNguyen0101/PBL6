const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3030;
var bodyParser = require('body-parser')

const route = require('./src/routes')
const db = require('./src/config/database/index')
db.connect();

app.use('/', express.static(path.join(__dirname, 'lib')))

//middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(bodyParser.json())

route(app);

app.listen(port, () => {
    console.log(`Api is running on port ${port}`)
})

