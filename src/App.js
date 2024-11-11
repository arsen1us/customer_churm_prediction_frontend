// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import AuthenticateForm from './components/AuthenticateForm';
import Profile from './components/Profile';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Header/>
      </header>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/reg" element={<RegisterForm/>}/>
          <Route path="/auth" element={<AuthenticateForm/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
      <footer>
          <Footer/>
        </footer>
    </div>
  );
}

export default App;
