import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Patients from './pages/Patients';
import Therapists from './pages/Therapists';
import Therapy_Orders from './pages/Therapy_Orders';
import Therapy_Sessions from './pages/Therapy_Sessions';
import Departments from './pages/Departments';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ePeak Therapy Systems</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/patient" element={<Patients/>}></Route>
            <Route path="/therapists" element={<Therapists/>}></Route>
            <Route path="/therapy_orders" element={<Therapy_Orders/>}></Route>
            <Route path="/therapy_sessions" element={<Therapy_Sessions/>}></Route>
            <Route path="/departments" element={<Departments/>}></Route>
          </Routes>
        </Router>
        <br></br>
        <footer className="App-footer">
          <p>© 2023 Maricon Valdez & Sheyar Abdullah</p>
        </footer>
      </header>
    </div>
  );
}

export default App;
