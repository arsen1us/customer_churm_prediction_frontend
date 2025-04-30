import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./Footer.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return(
        <footer className="bg-light py-5">
            <div className="container">
                <div className="row text-center text-md-start">
                    {/* Левая часть: логотип и копирайт */}
                    <div className="col-md-4 mb-4">
                        <img src="/logo.png" alt="Жигулевское лукоморье" className="mb-3" style={{ maxWidth: '150px' }} />
                        <div>© 2020 Жигулевское лукоморье.</div>
                    </div>
                    {/* Центральная часть: информация */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">Информация</h5>
                        <div>Время работы: Пн-Вс 9:00 - 21:00</div>
                        <div>Адрес: г. Самара, ул. Примерная, д. 1</div>
                        <div>Почта: info@zhigulevskluk.ru</div>
                        <div>Телефон: +7 (987) 654-32-10</div>
                        <div>
                            <Link to="/confidentiality" className="text-decoration-none">
                            Политика обработки персональных данных
                            </Link>
                        </div>
                    </div>
                    {/* Правая часть: навигация */}
                    <div className="col-md-4 mb-4">
                        <h5 className="mb-3">Навигация</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-decoration-none">Главная</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/about" className="text-decoration-none">О нас</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/catalog" className="text-decoration-none">Каталог</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/sales" className="text-decoration-none">Акции</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contacts" className="text-decoration-none">Контакты</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;