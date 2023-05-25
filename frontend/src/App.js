import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ePeak Therapy Systems</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <Router>
        <Navigation />
          <Routes>
            <Route path="/"></Route>
          </Routes>
      </Router>
      <footer className="App-footer">
        <p>© 2023 Maricon Valdez & Sheyar Abdullah</p>
      </footer>
      </header>
    </div>
  );
}

export default App;
