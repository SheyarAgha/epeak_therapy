import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../components/Table";


function Patients() {

    const [data, setData] = useState([]);

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
            <Table data={data}></Table>
        </>
    );
}

export default Patients;
