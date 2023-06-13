import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function TherapyOrders() {

    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);

    const [orders, setOrders] = useState([]);
    const [patient, setPatient] = useState('');
    const [patients, setPatients] = useState([]);
    const [diagnosis, setDiagnosis] = useState('');
    const [date, setDate] = useState('');
    const [therapist, setTherapist] = useState('');
    const [therapists, setTherapists] = useState([]);
    const [num, setNum] = useState('');

    const [editorder, editOrder] = useState('');
    const [editpatient, editPatient] = useState('');
    const [editassociateddx, editAssociatedDx] = useState('');
    const [editorderdate, editOrderDate] = useState('');
    const [edittherapist, editTherapist] = useState('');
    const [editcompletion, editCompletion] = useState('');

    const navigate = useNavigate();

    const fetchTherapists = async () => {
        const response = await fetch('http://flip2.engr.oregonstate.edu:6573/therapists');
        const therapists = await response.json();
        setTherapists(therapists);
    };

    const fetchPatients = async () => {
        const response = await fetch('http://flip2.engr.oregonstate.edu:6573/patients');
        const patients = await response.json();
        setPatients(patients);
    };

    const fetchOrders = async () => {
        const response = await fetch('http://flip2.engr.oregonstate.edu:6573/therapy_orders');
        const orders = await response.json();
        setOrders(orders);
    };

    const addRecord = async () => {
        const newRecord = { patient, diagnosis, date, therapist, num };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_orders", {
            method: 'POST',
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the order");
            loadTherapyOrders();
        } else {
            alert("Failed to add the order");
        }
    };

    // const onDelete = async record => {
    //     // const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/patients/${record.pt_id}`,
    //     //     { method: 'DELETE' });
    //     // if (response.status === 204) {
    //     //     navigate("/patients");
    //     // } else {
    //     //     console.error('Failed');
    //     // }
    // }

    const onDelete = async record => {
        const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/therapy_orders/${record.order_id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            loadTherapyOrders();
        } else {
            console.error('Failed to delete order');
        }
    };

    // const onEdit = async record => {
    //     // setRecordToEdit(record);
    //     // navigate("/EditExercise");
    // }
    const onEdit = async record => {
        const editedRecord = { editorder, editpatient, editassociateddx, editorderdate, edittherapist, editcompletion };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_orders", {
            method: 'PUT',
            body: JSON.stringify(editedRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 202) {
            alert("Successfully updated the order record");
            loadTherapyOrders();
        } else {
            alert("Failed to update the order record");
        }
    };

    const loadTherapyOrders = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_orders");
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        loadTherapyOrders();
        fetchTherapists();
        fetchPatients();
        fetchOrders();
    }, []);


    return (
        <>
            <h2>Therapy Orders</h2>
            <table>
                <thead>
                    <th>Order ID</th>
                    <th>Patient ID</th>
                    <th>Associated Dx</th>
                    <th>Therapist ID</th>
                    <th>Ordered Date</th>
                    <th>Completed?</th>
                </thead>
                <tbody>
                    {data.map((record) => <TableRow
                        datarow={record}
                        record={record}
                        onEdit={onEdit}
                        onDelete={onDelete} />)}
                </tbody>
            </table>
            <div>
                <h2>Add an Order</h2>

                {/* <select value={order} onChange={e => setOrder(e.target.value)}>
                    <option value=''>Select Order</option>
                    {orders.map((order) => (
                        <option key={order.order_id} value={order.order_id}>
                            {order.order_}
                        </option>
                    ))}
                </select> */}
                <select value={patient} onChange={e => setPatient(e.target.value)}>
                    <option value=''>Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.pt_id} value={patient.pt_id}>
                            {patient.pt_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter diagnosis"
                    value={diagnosis}
                    onChange={e => setDiagnosis(e.target.value)} />
                <input
                    type="text"
                    placeholder="ordered date: yyyy-mm-dd"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <select value={therapist} onChange={e => setTherapist(e.target.value)}>
                    <option value=''>Select Therapist</option>
                    {therapists.map((therapist) => (
                        <option key={therapist.therapist_id} value={therapist.therapist_id}>
                            {therapist.therapist_name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Enter 0 for yes, 1 for no"
                    value={num}
                    onChange={e => setNum(e.target.value)} />
                <button
                    onClick={addRecord}
                >Add Order</button>
            </div>
            <div>
                <h2>Update an Order</h2>

                <select value={editorder} onChange={e => editOrder(e.target.value)}>
                    <option value=''>Select Order</option>
                    {orders.map((order) => (
                        <option key={order.order_id} value={order.order_id}>
                            {order.order_id}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter diagnosis"
                    value={editassociateddx}
                    onChange={e => editAssociatedDx(e.target.value)} />
                <input
                    type="text"
                    placeholder="ordered date: yyyy-mm-dd"
                    value={editorderdate}
                    onChange={e => editOrderDate(e.target.value)} />
                <select value={edittherapist} onChange={e => editTherapist(e.target.value)}>
                    <option value=''>Select Therapist</option>
                    {therapists.map((therapist) => (
                        <option key={therapist.therapist_id} value={therapist.therapist_id}>
                            {therapist.therapist_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Enter 0 for yes, 1 for no"
                    value={editcompletion}
                    onChange={e => editCompletion(e.target.value)} />
                <button
                    onClick={onEdit}
                >Update Order</button>
            </div>
        </>
    );
}

export default TherapyOrders;
