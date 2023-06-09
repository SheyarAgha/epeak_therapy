// Citation for some bits and peices of code throughout:
// Date: 05/26/2023
// Adapted from and Based on previous work done by Sheyar Abdullah (self)
//    in CS290
// Source URL: https://github.com/SheyarAgha/Full-Stack-MERN-App

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function Patients() {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const onDelete = async record => {
        const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/patients/${record.pt_id}`,
            { method: 'DELETE' });
        if (response.status === 204) {
            loadPatients();
        } else {
            console.error('Failed');
        }
    }

    const onEdit = async record => {
        const editedRecord = { editname, editdate, editgender, editemail, editnum };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/patients", {
            method: 'PUT',
            body: JSON.stringify(editedRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 202) {
            alert("Successfully updated the patient record");
            loadPatients();
        } else {
            alert("Failed to update the patient record");
        }
    };

    const fillEdit = (record) => {
        editName(record.pt_name)
        editDate(record.date_of_birth)
        editGender(record.gender)
        editEmail(record.email)
        editNum(record.phone_number)
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');

    const [editname, editName] = useState('');
    const [editdate, editDate] = useState('');
    const [editgender, editGender] = useState('');
    const [editemail, editEmail] = useState('');
    const [editnum, editNum] = useState('');

    const addRecord = async () => {
        const newRecord = { name, date, gender, email, num };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/patients", {
            method: 'POST',
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the patient");
            loadPatients();
        } else {
            alert("Failed to add the patient");
        }
    };

    const loadPatients = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/patients");
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        loadPatients();
    }, []);

    return (
        <>
            <h2>Patients</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                </thead>
                <tbody>
                    {data.map((record) => <TableRow
                        record={record}
                        fillEdit={fillEdit}
                        onDelete={onDelete}
                        editButton={true}
                        deleteButton={true} />)}
                </tbody>
            </table>
            <div>
                <h2>Add a Patient</h2>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="text"
                    placeholder="DOB: yyyy-mm-dd"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <select value={gender} onChange={e => setGender(e.target.value)}>
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input
                    type="number"
                    placeholder="Enter number"
                    value={num}
                    onChange={e => setNum(e.target.value)} />
                <button
                    onClick={addRecord}
                >Add Patient</button>
            </div>
            <div>
                <h2>Update a Patient</h2>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={editname}
                    onChange={e => editName(e.target.value)} />
                <input
                    type="text"
                    placeholder="DOB: yyyy-mm-dd"
                    value={editdate}
                    onChange={e => editDate(e.target.value)} />
                <select value={editgender} onChange={e => editGender(e.target.value)}>
                    <option value=''>Select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <input
                    type="text"
                    placeholder="Enter email"
                    value={editemail}
                    onChange={e => editEmail(e.target.value)} />
                <input
                    type="number"
                    placeholder="Enter number"
                    value={editnum}
                    onChange={e => editNum(e.target.value)} />
                <button
                    onClick={onEdit}
                >Update Patient</button>
            </div>
        </>
    );
}

export default Patients;
