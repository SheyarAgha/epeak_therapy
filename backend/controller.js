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
    const { date_of_birthInput, genderInput, emailInput } = req.body;
    // const pt_name = "Izzy";

    db.pool.query(
        'DELETE FROM patients WHERE pt_id = ?',
        [pt_id],
        (error, result, fields) => {
            if (error) {
                console.error('Error deleting data: ', error);
                res.status(500).send('Error deleting data');
                return;
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

//update a therapist--not needed
// app.put('/therapists/:therapist_name', (req, res) => {
//     // const { pt_name } = req.params;
//     // const { date_of_birthInput, genderInput, emailInput } = req.body;
//     const pt_name = req.body.name;
//     const date_of_birthInput = req.body.date;
//     const genderInput = req.body.gender;
//     const emailInput = req.body.email;
//     const phone_numberInput = req.body.num;

//     db.pool.query(
//         'UPDATE patients SET date_of_birth = ?, gender = ?, email = ?, phone_number = ? WHERE pt_name = ?',
//         [date_of_birthInput, genderInput, emailInput, phone_numberInput, pt_name]
//     )
//         .then((results) => {
//             res.status(200).send('Therapist updated successfully');
//         })
//         .catch((error) => {
//             console.error('Error updating therapist', error);
//             res.status(500).send('Error updating therapist');
//         });
// });
//         ,
//         (error, results) => {
//             if (error) {
//                 console.error('Error updating data: ', error);
//                 res.status(500).send('Error updating data');
//                 return;
//             }

//             res.status(201).send();
//         }
//     );
// });


//delete a therapist
app.delete('/therapists/:therapist_name', (req, res) => {
    const { therapist_name } = req.params;

    db.pool.query(
        'DELETE FROM therapists WHERE therapist_id = (SELECT therapist_id FROM therapists WHERE therapist_name = ?)',
        [therapist_name],
        (error, results) => {
            if (error) {
                console.error('Error deleting therapist: ', error);
                res.status(500).send('Error deleting therapist');
                return;
            }

            res.status(200).send('Therapist deleted successfully');
        }
    );
});
//     )
//         .then((results) => {
//             res.status(200).send('Therapist deleted successfully');
//         })
//         .catch((error) => {
//             console.error('Error deleting therapist', error);
//             res.status(500).send('Error deleting therapist');
//         });
// });





app.get('/therapy_orders', (req, res) => {
    db.pool.query('SELECT * FROM therapy_orders', function (err, results) {
        res.status(200).send(results);
    });
});

//create a therapy order
app.post('/therapy_orders', (req, res) => {
    const { order_id_from_dropdown, pt_name_from_dropdown, therapist_name_from_dropdown, order_dateInput, completedInput } = req.body;

    db.pool.query(
        'INSERT INTO therapy_orders (pt_id, associated_dx, ordered_date, therapist_id) VALUES ((SELECT pt_id FROM patients WHERE pt_name = ?),?, ?,(SELECT therapist_id FROM therapists WHERE therapist_name = ?))',
        [order_id_from_dropdown, pt_name_from_dropdown, therapist_name_from_dropdown, order_dateInput, completedInput],
        (error, results, fields) => {
            if (error) {
                console.error('Error creating order', error);
                restart.status(500).send('Error creating therapy order');
                return;
            }

            res.status(200).send('Therapy order created successfully');
        }
    );
});
//     )
//         .then((results) => {
//             res.status(200).send('Therapy order created successfully');
//         })
//         .catch((error) => {
//             console.error('Error creating therapy order', error);
//             res.status(500).send('Error creating therapy order');
//         });
// });


//update a therapy order
app.put('/therapy_orders/:id', (req, res) => {
    const therapyOrderId = req.params.id;
    const { associated_dxInput, order_idInput, pt_name_from_dropdown, therapist_name_from_dropdown } = req.body;

    db.pool.query(
        'UPDATE therapy_orders ' +
        'SET associated_dx = ?, ordered_date = ? ' +
        'WHERE pt_id = (SELECT pt_id FROM patients WHERE pt_name = ?) ' +
        'AND therapist_id = (SELECT therapist_id FROM therapists WHERE therapist_name = ?)',
        [associated_dxInput, order_idInput, pt_name_from_dropdown, therapist_name_from_dropdown],
        (error, results, fields) => {
            if (error) {
                console.error('Error updating order', error);
                restart.status(500).send('Error updating therapy order');
                return;
            }

            res.status(200).send('Therapy order updated successfully');
        }
    );
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


app.delete('/therapy_orders/:id', (req, res) => {
    const order_idInput = req.params.id;

    db.pool.query(
        'DELETE FROM therapy_orders WHERE order_id = ?',
        [order_idInput],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting order', error);
                restart.status(500).send('Error deleting therapy order');
                return;
            }

            res.status(200).send('Therapy order deleted successfully');
        }
    );
});
//     )
//         .then((results) => {
//             res.status(200).send('Therapy order deleted successfully');
//         })
//         .catch((error) => {
//             console.error('Error deleting therapy order', error);
//             res.status(500).send('Error deleting therapy order');
//         });
// });



app.get('/therapy_sessions', (req, res) => {
    db.pool.query('SELECT * FROM therapy_sessions', function (err, results, fields) {
        res.status(200).send(results);
    });
});
//create a therapy session
app.post('/therapy_sessions', (req, res) => {
    const { order_id_from_dropdown, pt_name_from_dropdown, therapist_name_from_dropdown, session_dateInput, session_summaryInput } = req.body;

    db.pool.query('INSERT INTO therapy_sessions (order_id, pt_id, therapist_id, session_date, session_summary) VALUES ((SELECT order_id FROM therapy_orders WHERE order_id = ?), (SELECT pt_id  FROM patients WHERE pt_name = ?), (SELECT therapist_id FROM therapists WHERE therapist_name = ?),?,?))',
        [order_id_from_dropdown, pt_name_from_dropdown, therapist_name_from_dropdown, session_dateInput, session_summaryInput]
        ,
        (error, results, fields) => {
            if (error) {
                console.error('Error creating session', error);
                restart.status(500).send('Error creating therapy session');
                return;
            }

            res.status(200).send('Therapy session created successfully');
        }
    );
});
//         )
//         .then((results) => {
//             res.status(200).send('Therapy session created successfully');
//         })
//         .catch((error) => {
//             console.error('Error creating therapy session', error);
//             res.status(500).send('Error creating therapy session');
//         });
// });

//update a therapy session
app.put('/therapy-sessions', (req, res) => {
    // Extract the necessary data from the request body or query parameters
    const { order_id_from_dropdown, pt_name_from_dropdown, therapist_name_from_dropdown, session_dateInput, session_summaryInput } = req.body;

    // Execute the MySQL query to update the therapy session
    const query = `UPDATE therapy_sessions
                   SET session_date = ?, session_summary = ?
                   WHERE (
                      order_id = (SELECT order_id FROM therapy_orders WHERE order_id = ?),
                      pt_id = (SELECT pt_id FROM patients WHERE pt_name = ?),
                      therapist_id = (SELECT therapist_id FROM therapists WHERE therapist_name = ?)
                   );`;

    const values = [session_dateInput, session_summaryInput, order_id_from_dropdown, pt_name_from_dropdown, therapist_name_from_dropdown];

    db.pool.query(query, values)
        .then(() => {
            res.status(200).send('Therapy session updated successfully.');
        })
        .catch((error) => {
            console.error('Error updating therapy session:', error);
            res.status(500).send('An error occurred while updating the therapy session.');
        });
});



app.put('/therapy_orders/:id', (req, res) => {
    const therapyOrderId = req.params.id;
    const { associated_dxInput, order_idInput, pt_name_from_dropdown, therapist_name_from_dropdown } = req.body;

    db.pool.query(
        'UPDATE therapy_orders ' +
        'SET associated_dx = ?, ordered_date = ? ' +
        'WHERE pt_id = (SELECT pt_id FROM patients WHERE pt_name = ?) ' +
        'AND therapist_id = (SELECT therapist_id FROM therapists WHERE therapist_name = ?)',
        [associated_dxInput, order_idInput, pt_name_from_dropdown, therapist_name_from_dropdown],
        (error, results, fields) => {
            if (error) {
                console.error('Error creating order', error);
                restart.status(500).send('Error creating therapy order');
                return;
            }

            res.status(200).send('Therapy order created successfully');
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
                restart.status(500).send('Error deleting therapy session');
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
