const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const path = require('path');
const root = path.join(__dirname, 'client', 'build');
const db = require('./api/db/index');
const api = require('./api/api');
const bodyParser = require('body-parser')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


app.use(session({
    secret: 'keyboard cat',
    store: new SequelizeStore({
        db: db.sequelize
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
    saveUninitialized: true,
    cookie: {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         sameSite: true,
     }
}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static(root));

app.use('/api', api)

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})

