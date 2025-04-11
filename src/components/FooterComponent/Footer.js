import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./Footer.css"

const Footer = () => {
    return(
        <div>
            <img src="/logo.png" />
            <div>© 2020 Жигулевское лукоморье.</div>
            <div>Время работы</div>
            <div>Адрес</div>
            <div>Почта</div>
            <div>Телефон</div>
            <div>Политика обработки персональных данных</div>

            <nav className="header-nav">
                <ul className="nav-links nav-links-left">
                    <li>
                        <Link to="/">
                            <img src="/logo.png"/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">ГЛАВНАЯ</Link>
                    </li>
                    <li>
                        <Link to="/">О НАС</Link>
                    </li>
                    <li>
                        <Link to="/catalog">КАТАЛОГ</Link>
                    </li>
                    <li>
                        <Link to="/">АКЦИИ</Link>
                    </li>
                    <li>
                        <Link to="/">КОНТАКТЫ</Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
};

export default Footer;