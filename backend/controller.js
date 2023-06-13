/*
    SETUP
*/
// Express
const express = require('express');
const app = express();
PORT = 6573;
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Database
var db = require('./database/db-connector');

/*
    ROUTES
*/

app.get("/patients", (req, res) => {
    db.pool.query('SELECT * FROM patients', (err, result, fields) => {
        res.status(200).send(result);
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
        (error, result, fields) => {
            if (error) {
                console.error('Error inserting data: ', error);
                res.status(500).send('Error inserting data');
            } else {
                res.status(201).send(result);
            }
        }
    );
});


//update a patient
app.put('/patients', (req, res) => {
    // const { pt_name } = req.params;
    // const { date_of_birthInput, genderInput, emailInput } = req.body;
    const pt_name = req.body.editname;
    const date_of_birthInput = req.body.editdate;
    const genderInput = req.body.editgender;
    const emailInput = req.body.editemail;
    const phone_numberInput = req.body.editnum;

    db.pool.query(
        'UPDATE patients SET date_of_birth = ?, gender = ?, email = ?, phone_number = ? WHERE pt_name = ?',
        [date_of_birthInput, genderInput, emailInput, phone_numberInput, pt_name],
        (error, result, fields) => {
            if (error) {
                console.error('Error updating data: ', error);
                res.status(500).send('Error updating data');
            } else {
                res.status(202).send(result);
            }
        }
    );
});


//delete a patient
app.delete('/patients/:pt_id', (req, res) => {
    const { pt_id } = req.params;

    db.pool.query(
        'DELETE FROM patients WHERE pt_id = ?',
        [pt_id],
        (error, result, fields) => {
            if (error) {
                console.error('Error deleting data: ', error);
                res.status(500).send('Error deleting data');
            } else {
                res.status(204).send();
            }
        }
    );
});



app.get('/therapists', (req, res) => {
    db.pool.query('SELECT * FROM therapists', function (err, result, fields) {
        res.status(200).send(result);
    });
});


//create a therapist
app.post('/therapists', (req, res) => {
    const therapist_nameInput = req.body.name;
    const dept_id_from_dropdown = req.body.department;

    db.pool.query(
        'INSERT INTO therapists (therapist_name, dept_id) VALUES (?, (SELECT dept_id FROM departments WHERE dept_id = ?))',
        [therapist_nameInput, dept_id_from_dropdown],
        (error, result, fields) => {
            if (error) {
                console.error('Error creating therapist: ', error);
                res.status(500).send('Error creating therapist');
            } else {
                res.status(201).send('Therapist created successfully');
            }
        }
    );
});



//delete a therapist
app.delete('/therapists/:therapist_id', (req, res) => {
    const { therapist_id } = req.params;

    db.pool.query(
        'DELETE FROM therapists WHERE therapist_id = ?',
        [therapist_id],
        (error, result) => {
            if (error) {
                console.error('Error deleting therapist: ', error);
                res.status(500).send('Error deleting therapist');
            } else {
                res.status(204).send('Therapist deleted successfully');
            }
        }
    );
});



app.get('/therapy_orders', (req, res) => {
    db.pool.query('SELECT * FROM therapy_orders', function (err, results) {
        res.status(200).send(results);
    });
});


//create a therapy order
app.post('/therapy_orders', (req, res) => {
    const patient = req.body.patient;
    const diagnosis = req.body.diagnosis;
    const date = req.body.date;
    const therapist = req.body.therapist;
    const completed = req.body.num;

    db.pool.query(
        'INSERT INTO therapy_orders (pt_id, associated_dx, ordered_date, therapist_id, completed) VALUES (?, ?, ?, ?, ?)',
        [patient, diagnosis, date, therapist, completed],
        (error, result, fields) => {
            if (error) {
                console.error('Error creating order', error);
                res.status(500).send('Error creating therapy order');
            } else {
                res.status(201).send(result);
            }
        }
    );
});


//update a therapy order
app.put('/therapy_orders', (req, res) => {
    const order = req.body.editorder;
    const patient = req.body.editpatient;
    const diagnosis = req.body.editassociateddx;
    const date = req.body.editorderdate;
    const therapist = req.body.edittherapist;
    const completed = req.body.editcompletion;

    db.pool.query(
        'UPDATE therapy_orders ' +
        'SET associated_dx = ?, ordered_date = ?, therapist_id = ?, completed = ? ' +
        'WHERE order_id = ? ',
        [diagnosis, date, therapist, completed, order],
        (error, result, fields) => {
            if (error) {
                console.error('Error updating order', error);
                res.status(500).send('Error updating therapy order');
            } else {
                res.status(202).send(result);
            }
        }
    );
});


app.delete('/therapy_orders/:id', (req, res) => {
    const order_idInput = req.params.id;

    db.pool.query(
        'DELETE FROM therapy_orders WHERE order_id = ?',
        [order_idInput],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting order', error);
                res.status(500).send('Error deleting therapy order');
            } else {
                res.status(204).send('Therapy order deleted successfully');
            }
        }
    );
});



app.get('/therapy_sessions', (req, res) => {
    db.pool.query('SELECT * FROM therapy_sessions', function (err, results, fields) {
        res.status(200).send(results);
    });
});


//create a therapy session
app.post('/therapy_sessions', (req, res) => {
    const order = req.body.order
    const patient = req.body.patient
    const therapist = req.body.therapist
    const date = req.body.date
    const summary = req.body.summary

    db.pool.query(
        'INSERT INTO therapy_sessions (order_id, pt_id, therapist_id, session_date, session_summary) VALUES (?, ?, ?, ?, ?))',
        [order, patient, therapist, date, summary],
        (error, results, fields) => {
            if (error) {
                console.error('Error creating session', error);
                res.status(500).send('Error creating therapy session');
            } else {
                res.status(201).send('Therapy session created successfully');
            }
        }
    );
});


//update a therapy session
app.put('/therapy-sessions', (req, res) => {
    const session = req.body.session_id
    const order = req.body.order
    const patient = req.body.patient
    const therapist = req.body.therapist
    const date = req.body.date
    const summary = req.body.summary

    // Execute the MySQL query to update the therapy session
    const query = `UPDATE therapy_sessions
                   SET session_date = ?, session_summary = ?
                   WHERE (
                      order_id ?,
                      pt_id = ?,
                      therapist_id = ?
                   );`;

    const values = [date, summary, order, patient, therapist];

    db.pool.query(query, values,
        (error, result, fields) => {
            if (error) {
                console.error('Error updating order', error);
                res.status(500).send('Error updating therapy order');
            } else {
                res.status(202).send(result);
            }
        }
    );
});


//delete a therapy session
app.delete('/therapy_sessions/:id', (req, res) => {
    const session_idInput = req.params.id;

    db.pool.query(
        'DELETE FROM therapy_sessions WHERE session_id = ?',
        [session_idInput],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting session', error);
                res.status(500).send('Error deleting therapy session');
                return;
            }

            res.status(200).send('Therapy session deleted successfully');
        }
    );
});


app.get('/departments', (req, res) => {
    db.pool.query('SELECT * FROM departments', function (err, results, fields) {
        res.status(200).send(results);
    });
});

//update a department
app.put('/departments/:dept_id', (req, res) => {
    const dept_id = req.body.dept_id;
    const dept_locationInput = req.body.dept_location;

    db.pool.query(
        'UPDATE departments SET dept_location = ? WHERE dept_id = ?',
        [dept_locationInput, dept_id],
        (error, result, fields) => {
            if (error) {
                console.error('Error updating department: ', error);
                res.status(500).send('Error updating department');
            } else {
                res.status(202).send('Department updated successfully');
            }
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
