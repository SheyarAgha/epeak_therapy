import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";


function TherapySessions() {

    const [data, setData] = useState([]);

    const [order, setOrder] = useState([]);

    const [orders, setOrders] = useState([]);
    const [patient, setPatient] = useState('');
    const [patients, setPatients] = useState([]);
    const [summary, setSummary] = useState('');
    const [date, setDate] = useState('');
    const [therapist, setTherapist] = useState('');
    const [therapists, setTherapists] = useState([]);
    const [num, setNum] = useState('');

    const [editsession, editSession] = useState('');
    const [editorder, editOrder] = useState('');
    const [editpatient, editPatient] = useState('');
    const [editsummary, editSummary] = useState('');
    const [editdate, editDate] = useState('');
    const [edittherapist, editTherapist] = useState('');

    const fillEdit = (record) => {
        editSession(record.session_id)
        editOrder(record.order_id)
        editDate(record.session_date)
        editTherapist(record.therapist_id)
        editSummary(record.session_summary)
    };

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
        const newRecord = { order, patient, therapist, date, summary };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_sessions", {
            method: 'POST',
            body: JSON.stringify(newRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added the order");
            loadTherapySessions();
        } else {
            alert("Failed to add the order");
        }
    };


    const onDelete = async record => {
        const response = await fetch(`http://flip2.engr.oregonstate.edu:6573/therapy_orders/${record.session_id}`, {
            method: 'DELETE'
        });
        if (response.status === 204) {
            loadTherapySessions();
        } else {
            console.error('Failed to delete order');
        }
    };

    const onEdit = async record => {
        const editedRecord = { editsession, editorder, editpatient, edittherapist, editdate, editsummary };
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_sessions", {
            method: 'PUT',
            body: JSON.stringify(editedRecord),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 202) {
            alert("Successfully updated the order record");
            loadTherapySessions();
        } else {
            alert("Failed to update the order record");
        }
    };

    const loadTherapySessions = async () => {
        const response = await fetch("http://flip2.engr.oregonstate.edu:6573/therapy_sessions");
        const data = await response.json();
        setData(data);
    }

    useEffect(() => {
        loadTherapySessions();
        fetchTherapists();
        fetchPatients();
        fetchOrders();
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
                        record={record}
                        fillEdit={fillEdit}
                        onDelete={onDelete}
                        editButton={true}
                        deleteButton={true}/>)}
                </tbody>
            </table>
            <div>
                <h2>Add a Session</h2>

                <select value={order} onChange={e => setOrder(e.target.value)}>
                    <option value=''>Select Order</option>
                    {orders.map((order) => (
                        <option key={order.order_id} value={order.order_id}>
                            {order.order_id}
                        </option>
                    ))}
                </select>
                <select value={patient} onChange={e => setPatient(e.target.value)}>
                    <option value=''>Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.pt_id} value={patient.pt_id}>
                            {patient.pt_name}
                        </option>
                    ))}
                </select>
                <select value={therapist} onChange={e => setTherapist(e.target.value)}>
                    <option value=''>Select Therapist</option>
                    {therapists.map((therapist) => (
                        <option key={therapist.therapist_id} value={therapist.therapist_id}>
                            {therapist.therapist_name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="session date: yyyy-mm-dd"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter summary"
                    value={summary}
                    onChange={e => setSummary(e.target.value)} />
                <button
                    onClick={addRecord}
                >Add Session</button>
            </div>
            <div>
                <h2>Update a Session</h2>

                <select value={editsession} onChange={e => editSession(e.target.value)}>
                    <option value=''>Select Session</option>
                    {data.map((session) => (
                        <option key={session.session_id} value={session.session_id}>
                            {session.session_id}
                        </option>
                    ))}
                </select>
                <select value={editorder} onChange={e => editOrder(e.target.value)}>
                    <option value=''>Select Order</option>
                    {orders.map((order) => (
                        <option key={order.order_id} value={order.order_id}>
                            {order.order_id}
                        </option>
                    ))}
                </select>
                <select value={editpatient} onChange={e => editPatient(e.target.value)}>
                    <option value=''>Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient.pt_id} value={patient.pt_id}>
                            {patient.pt_name}
                        </option>
                    ))}
                </select>
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
                    placeholder="session date: yyyy-mm-dd"
                    value={editdate}
                    onChange={e => editDate(e.target.value)} />
                <input
                    type="text"
                    placeholder="Enter summary"
                    value={editsummary}
                    onChange={e => editSummary(e.target.value)} />
                <button
                    onClick={onEdit}
                >Update Session</button>
            </div>
        </>
    );
}

export default TherapySessions;
