import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function TherapySessions() {

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

    const loadTherapySessions = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_sessions");
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        loadTherapySessions();
    }, []);

    return (
        <>
            <h2>Therapy Orders</h2>
            <table>
                <thead>
                    <th>Session ID</th>
                    <th>Order ID</th>
                    <th>Patient ID</th>
                    <th>Therapist ID</th>
                    <th>Session Date</th>
                    <th>Session Summary</th>
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

export default TherapySessions;
