import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function Departments() {

    const [data, setData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departmentLocation, setDepartmentLocation] = useState("");
    const navigate = useNavigate();

    // const onDelete = async record => {
    //     const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/departments/${record.dept_id}`,
    //         { method: 'DELETE' });
    //     if (response.status === 204) {
    //         loadDepartments();
    //     } else {
    //         console.error('Failed');
    //     }
    // };

    // const onEdit = async record => {
    //     const editedRecord = {  };
    //     const response = await fetch("http://flip2.engr.oregonstate.edu:6573/departments", {
    //         method: 'PUT',
    //         body: JSON.stringify(editedRecord),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     if (response.status === 202) {
    //         alert("Successfully updated the department");
    //         loadTherapyOrders();
    //     } else {
    //         alert("Failed to update the department");
    //     }
    // };

    const updateRecord = async () => {
        const departmentId = data.find(
            (record) => record.dept_name === selectedDepartment
        ).dept_id;

        const updatedRecord = {
            dept_id: departmentId,
            dept_location: departmentLocation,
        };

        const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/departments/${updatedRecord.dept_id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 202) {
            alert("Successfully edited the dept");
            loadDepartments();
        } else {
            alert("Failed to edit dept");
        }
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
                        record={record}
                        key={record.dept_id}
                        editButton={false}
                        deleteButton={false}
                    />)}
                </tbody>
            </table>
            <div>
                <h2>Edit a Department</h2>
                <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                    <option value="">Select Department</option>
                    {data.map((record) => (
                        <option value={record.dept_name} key={record.dept_id}>
                            {record.dept_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter location"
                    value={departmentLocation}
                    onChange={e => setDepartmentLocation(e.target.value)} />
                <button
                    onClick={updateRecord}>Edit department location</button>
            </div>
        </>
    );
}

export default Departments;
