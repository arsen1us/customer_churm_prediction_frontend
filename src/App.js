// import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import AuthenticateForm from './components/AuthenticateForm';
import UpdateTokenComponent from './components/UpdateTokenComponent';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Header/>
        <div>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/reg">Зарегистрироваться</Link>
                    </li>
                    <li>
                        <Link to="/auth">Войти</Link>
                    </li>
                </ul>
            </nav>
              <UpdateTokenComponent/>
        </div>
      </header>
        <Routes>
          <Route path="/reg" element={<RegisterForm/>}/>
          <Route path="/auth" element={<AuthenticateForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
