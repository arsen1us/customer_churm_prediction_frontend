import React, { useState, useEffect, useRef, useContext} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

import Popup from "../PopupComponent/Popup";
import NotificationList from "../ListComponents/NotificationList";

import "./Header.css"

import {AuthContext} from "../../AuthProvider"

const Header = () => {
    
    const {user, ownedCompany} = useContext(AuthContext);
    const [notificationsCount, setNotificationsCount] = useState(5);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    
return(
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">

                {/* Логотип */}
                <Link className="navbar-brand" to="/">
                    <img src="/logo.png" alt="Логотип" style={{ height: '40px' }} />
                </Link>

                {/* Кнопка для мобильного меню */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Навигация */}
                <div className="collapse navbar-collapse" id="navbarContent">

                    {/* Левая часть меню */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">О нас</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalog">Каталог</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/promotions">Акции</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacts">Контакты</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/personal-order">Персональный заказ</Link>
                        </li>
                    </ul>

                    {/* Правая часть меню */}
                    <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">

                        {/* Заказы */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Список заказов</Link>
                        </li>

                        {/* Уведомления */}
                        <li className="nav-item position-relative me-3">
                            <button 
                                onClick={openPopup}
                                className="btn btn-link nav-link p-0"
                                style={{ position: "relative" }}
                            >
                                <img 
                                    src="https://localhost:7299/icons/notification.png" 
                                    alt="Уведомления" 
                                    style={{ width: "24px", height: "24px" }}
                                />
                                {notificationsCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {notificationsCount}
                                    </span>
                                )}
                            </button>

                            {isPopupOpen && (
                                <Popup isOpen={isPopupOpen} onClose={closePopup} title="Список уведомлений">
                                    <div>
                                        <NotificationList />
                                    </div>
                                </Popup>
                            )}
                        </li>

                        {/* Корзина */}
                        <li className="nav-item me-3">
                            <Link className="nav-link p-0" to="/cart">
                                <img src="https://localhost:7299/icons/cart.png" alt="Корзина" style={{ width: "24px", height: "24px" }} />
                            </Link>
                        </li>

                        {/* Профиль или регистрация/вход */}
                        {user?.id ? (
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle d-flex align-items-center" to="/profile" role="button">
                                    {user?.imageSrcs ? (
                                        <img 
                                            src={`https://localhost:7299/uploads/${user.imageSrcs[0]}`} 
                                            alt="User Avatar" 
                                            className="rounded-circle me-2" 
                                            style={{ width: "32px", height: "32px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span className="default-avatar me-2">👤</span>
                                    )}
                                    <span>{user?.firstName} {user?.lastName}</span>
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/reg">Регистрация</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth">Вход</Link>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    </header>
);
};

export default Header;