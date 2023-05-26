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

//create a patient
app.post('/patients', (req, res) => {
    // const { pt_nameInput, date_of_birthInput, genderInput, emailInput, phone_numberInput } = req.body;
    const pt_nameInput = req.body.name;
    const date_of_birthInput = req.body.date;
    const genderInput = req.body.gender;
    const emailInput = req.body.email;
    const phone_numberInput = req.body.num;
    db.pool.query(
        'INSERT INTO patients (pt_name, date_of_birth, gender, email, phone_number) VALUES (?, ?, ?, ?, ?)',
        [pt_nameInput, date_of_birthInput, genderInput, emailInput, phone_numberInput],
        (error, results, fields) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data');
                return;
            }

            res.status(201).send();
        }
    );
});

//update a patient
app.put('/patients/:pt_name', (req, res) => {
    // const { pt_name } = req.params;
    // const { date_of_birthInput, genderInput, emailInput } = req.body;
    const pt_name = req.body.name;
    const date_of_birthInput = req.body.date;
    const genderInput = req.body.gender;
    const emailInput = req.body.email;
    const phone_numberInput = req.body.num;

    db.pool.query(
        'UPDATE patients SET date_of_birth = ?, gender = ?, email = ?, phone_number = ? WHERE pt_name = ?',
        [date_of_birthInput, genderInput, emailInput, phone_numberInput, pt_name],
        (error, results, fields) => {
            if (error) {
                console.error('Error updating data: ', error);
                res.status(500).send('Error updating data');
                return;
            }

            res.status(201).send();
        }
    );
});

//delete a patient
app.delete('/patients/:pt_id', (req, res) => {
    const { pt_id } = req.params;
    const { date_of_birthInput, genderInput, emailInput } = req.body;
    // const pt_name = "Izzy";

    db.pool.query(
        'DELETE FROM patients WHERE pt_id = ?',
        [pt_id],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting data: ', error);
                res.status(500).send('Error deleting data');
                return;
            }

            res.status(204).send();
        }
    );
});



app.get('/therapists', (req, res) => {
    db.pool.query('SELECT * FROM therapists', function (err, results, fields) {
        res.status(200).send(results);
    });
});

app.get('/therapy_orders', (req, res) => {
    db.pool.query('SELECT * FROM therapy_orders', function (err, results, fields) {
        res.status(200).send(results);
    });
});
app.get('/therapy_sessions', (req, res) => {
    db.pool.query('SELECT * FROM therapy_sessions', function (err, results, fields) {
        res.status(200).send(results);
    });
});

app.get('/departments', (req, res) => {
    db.pool.query('SELECT * FROM departments', function (err, results, fields) {
        res.status(200).send(results);
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
