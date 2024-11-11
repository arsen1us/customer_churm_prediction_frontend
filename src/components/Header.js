import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UpdateTokenComponent from './UpdateTokenComponent';
import Profile from "./Profile";

const Header = () => {
    return(
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
                    <li>
                        <Link to="/profile">Профиль</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;