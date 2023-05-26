/*
    SETUP
*/
// Express
const express = require('express');
const app     = express();
PORT          = 6573;
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/

app.get("/patients", (req, res) => {
    db.pool.query('SELECT * FROM patients', function(err, results, fields){
        res.status(200).send(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
