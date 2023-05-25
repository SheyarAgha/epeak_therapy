import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="App-nav">
            <Link className="Link" to="/">Home</Link>
            <span>&nbsp;&nbsp;</span>
            <Link className="Link" to="/patient">Patients</Link>
            <span>&nbsp;&nbsp;</span>
            <Link className="Link" to="/therapists">Therapists</Link>
            <span>&nbsp;&nbsp;</span>
            <Link className="Link" to="/therapy_orders">Therapy Orders</Link>
            <span>&nbsp;&nbsp;</span>
            <Link className="Link" to="/therapy_sessions">Therapy Sessions</Link>
            <span>&nbsp;&nbsp;</span>
            <Link className="Link" to="/departments">Departments</Link>
        </nav>
    );
}

export default Navigation;
