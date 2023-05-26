import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function TherapyOrders() {

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

    const loadTherapyOrders = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_orders");
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        loadTherapyOrders();
    }, []);

    return (
        <>
            <h2>Therapy Orders</h2>
            <table>
                <thead>
                    <th>Order ID</th>
                    <th>Patient ID</th>
                    <th>Associated Dx</th>
                    <th>Ordered Date</th>
                    <th>Therapist ID</th>
                    <th>Completed?</th>
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

export default TherapyOrders;
