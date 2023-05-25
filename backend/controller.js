/*
    SETUP
*/
// Express
const express = require('express');
const app     = express();
PORT          = 6572;

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/
app.get('/', (req, res) => {
    res.send('SMc');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
