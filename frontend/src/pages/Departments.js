import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function Departments() {

    const [data, setData] = useState([]);

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
        // setRecordToEdit(record);
        // navigate("/EditExercise");
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
                    onEdit={onEdit} />)}
                </tbody>
            </table>
        </>
    );
}

export default Departments;
