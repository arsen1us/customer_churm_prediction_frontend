import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UpdateTokenComponent from './UpdateTokenComponent';

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
                </ul>
            </nav>

            <UpdateTokenComponent/>

        </div>
    );
};

export default Header;