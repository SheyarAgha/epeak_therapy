/*
    SETUP
*/
// Express
const express = require('express');
<<<<<<< HEAD
const app     = express();
PORT          = 6573;
app.use(express.json());
const cors = require('cors');
app.use(cors());
=======
const app = express();
PORT = 6573;
>>>>>>> e329b7caf7a4a8b2f7ca987d270a0ef2c0ce7a55

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/
<<<<<<< HEAD

app.get("/patients", (req, res) => {
    db.pool.query('SELECT * FROM patients', function(err, results, fields){
        res.status(200).send(results);
=======
app.get('/patients', (req, res) => {
    db.pool.query('SELECT * FROM patients', function (err, results, fields) {
        res.send(JSON.stringify(results));
>>>>>>> e329b7caf7a4a8b2f7ca987d270a0ef2c0ce7a55
    });
});

//create a patient
app.post('/patients', (req, res) => {
    const { pt_nameInput, date_of_birthInput, genderInput, emailInput, phone_numberInput } = req.body;
    //const pt_nameInput = "Izzy";
    //const date_of_birthInput = "2023-12-22";
    //const genderInput = "Female";
    // const emailInput = "izzy@gmail.com";
    // const phone_numberInput = 2019921212;
    db.pool.query(
        'INSERT INTO patients (pt_name, date_of_birth, gender, email, phone_number) VALUES (?, ?, ?, ?, ?)',
        [pt_nameInput, date_of_birthInput, genderInput, emailInput, phone_numberInput],
        (error, results, fields) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data');
                return;
            }

            res.status(200).send('Data inserted successfully');
        }
    );
});

//update a patient
app.put('/patients/:pt_name', (req, res) => {
    const { pt_name } = req.params;
    const { date_of_birthInput, genderInput, emailInput } = req.body;
    // const pt_name = "Izzy";
    // const date_of_birthInput = "2019-12-22";
    // const genderInput = "male";
    // const emailInput = "dizzyizzy@gmail.com";

    db.pool.query(
        'UPDATE patients SET date_of_birth = ?, gender = ?, email = ? WHERE pt_name = ?',
        [date_of_birthInput, genderInput, emailInput, pt_name],
        (error, results, fields) => {
            if (error) {
                console.error('Error updating data: ', error);
                res.status(500).send('Error updating data');
                return;
            }

            res.status(200).send('Data updated successfully');
        }
    );
});

//delete a patient
app.delete('/patients/:pt_name', (req, res) => {
    const { pt_name } = req.params;
    const { date_of_birthInput, genderInput, emailInput } = req.body;
    // const pt_name = "Izzy";

    db.pool.query(
        'DELETE FROM patients WHERE pt_name = ?',
        [pt_name],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting data: ', error);
                res.status(500).send('Error deleting data');
                return;
            }

            res.status(200).send('Data deleted successfully');
        }
    );
});



app.get('/therapists', (req, res) => {
    db.pool.query('SELECT * FROM therapists', function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

app.get('/therapy_orders', (req, res) => {
    db.pool.query('SELECT * FROM therapy_orders', function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
});
app.get('/therapy_sessions', (req, res) => {
    db.pool.query('SELECT * FROM therapy_sessions', function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
});

app.get('/departments', (req, res) => {
    db.pool.query('SELECT * FROM departments', function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
