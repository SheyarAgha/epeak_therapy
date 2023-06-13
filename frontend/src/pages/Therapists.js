import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function Therapists() {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    // const onDelete = async record => {
    // const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/patients/${record.pt_id}`,
    //     { method: 'DELETE' });
    // if (response.status === 204) {
    //     navigate("/patients");
    // } else {
    //     console.error('Failed');
    // }
    // }

    const onEdit = async record => {
    };

    const onDelete = async record => {
        const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/therapists/${record.therapist_id}`,
            { method: 'DELETE' });
        if (response.status === 204) {
            loadTherapists();
        } else {
            console.error('Failed');
        }
    };

    const loadTherapists = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapists");
        const data = await response.json();
        setData(data);
    }

    const fetchDepartments = async () => {
        const response = await fetch('http://flip2.engr.oregonstate.edu:6573/departments');
        const departments = await response.json();
        setDepartments(departments);
    };

    const addRecord = async () => {
        const newRecord = { name, department };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapists", {
            method: 'POST',
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the therapist");
            loadTherapists();
        } else {
            alert("Failed to add the therapist");
        }
    };

    useEffect(() => {
        fetchDepartments();
        loadTherapists();
    }, []);

    return (
        <>
            <h2>Therapists</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Dept ID</th>
                </thead>
                <tbody>
                    {data.map((record) => <TableRow
                        record={record}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        editButton={false}
                        deleteButton={true}
                    />)}
                </tbody>
            </table>
            <div>
                <h2>Add a Therapist</h2>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <select value={department} onChange={e => setDepartment(e.target.value)}>
                    <option value=''>Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept.dept_id} value={dept.dept_id}>
                            {dept.dept_name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={addRecord}
                >Add Therapist</button>
            </div>
        </>

    );
}

export default Therapists;





