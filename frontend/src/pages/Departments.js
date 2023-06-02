import React, { useState, useEffect } from "react";
import { Link, useNavigate, useHistory } from "react-router-dom";
import TableRow from "../components/TableRow";


function Departments() {

    const [data, setData] = useState([]);
    const [location, setLocation] = useState([]);
    const [recordToEdit, setRecordToEdit] = useState([]);
    const navigate = useNavigate();

    const onDelete = async record => {
        // const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/patients/${record.pt_id}`,
        //     { method: 'DELETE' });
        // if (response.status === 204) {
        //     navigate("/patients");
        // } else {
        //     console.error('Failed');
        // }
    }

    const onEdit = async record => {
        console.log(record)
        setRecordToEdit(record);
        // navigate(`/department_location/${record.dept_name}`);
    }

    const updateRecord = async () => {
        const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/departments/${recordToEdit.dept_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                dept_name: recordToEdit.dept_name,
                dept_locationInput: recordToEdit.dept_location
            }),
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
    }

    const loadDepartments = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/departments");
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        loadDepartments();
    }, []);

    return (
        <>
            <h2>Departments</h2>
            <table>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Dept Location</th>
                </thead>
                <tbody>
                    {data.map((record) => <TableRow
                        datarow={record}
                        record={record}
                        onEdit={onEdit}
                    />)}
                </tbody>
            </table>
            <div>
                <h2>Edit a Department</h2>
                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={e => setLocation(e.target.value)} />
                <button
                    onClick={updateRecord}
                >Edit department location</button>
            </div>
        </>
    );
}

export default Departments;
