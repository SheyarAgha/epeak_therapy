/*
    SETUP
*/
// Express
const express = require('express');
const app     = express();
PORT          = 6573;

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/
app.get('/patients', (req, res) => {
    db.pool.query('SELECT * FROM patients', function(err, results, fields){
        res.send(JSON.stringify(results));
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
