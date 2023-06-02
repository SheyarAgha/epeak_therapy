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
            setData(data.filter(e => e.pt_id != record.pt_id));
        } else {
            console.error('Failed');
        }
    }

    const onEdit = async record => {
        const editedRecord = { name, date, gender, email, num };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/patients", {
            method: 'PUT',
            body: JSON.stringify(editedRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully edited the exercise");
        } else {
            alert("Failed to edited the exercise");
        }
        navigate("/");
    };

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [num, setNum] = useState('');

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
            alert("Successfully added the pt");
        } else {
            alert("Failed to add the pt");
        }
        navigate("/");
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
                        onEdit={onEdit}
                        onDelete={onDelete} />)}
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
                <h2>Edit a Patient</h2>
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
                    onClick={onEdit}
                >Edit Patient</button>
            </div>
        </>
    );
}

export default Patients;
