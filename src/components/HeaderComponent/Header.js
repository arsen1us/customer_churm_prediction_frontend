import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../AuthProvider";
import Popup from "../PopupComponent/Popup";
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const { user } = useContext(AuthContext);
    const [notificationsCount, setNotificationsCount] = useState(5);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <header className="bg-light">
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
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Основное меню */}
                    <div className="collapse navbar-collapse" id="navbarContent">
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
                        </ul>

                        {/* Правая часть */}
                        <div className="d-flex align-items-center">
                            {/* Уведомления */}
                            <div className="position-relative mx-3">
                                <button 
                                    className="btn btn-link p-0 border-0"
                                    onClick={() => setIsPopupOpen(true)}
                                >
                                    <img src="https://localhost:7299/icons/notification.png" 
                                        alt="Корзина" 
                                        className="bi bi-cart fs-5"
                                        style={{ width: "24px", height: "24px" }}
                                    />
                                    {notificationsCount > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {notificationsCount}
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Корзина */}
                            <Link to="/cart" className="mx-3">
                                <img src="https://localhost:7299/icons/cart.png" 
                                    alt="Корзина" 
                                    className="bi bi-cart fs-5"
                                    style={{ width: "24px", height: "24px" }}
                                />
                            </Link>

                            {/* Профиль */}
                            {user ? (
                                <div className="dropdown">
                                    <button 
                                        className="btn dropdown-toggle d-flex align-items-center" 
                                        data-bs-toggle="dropdown"
                                    >
                                        {user.imageSrcs ? (
                                            <img 
                                                src={`https://localhost:7299/uploads/${user.imageSrcs[0]}`} 
                                                className="rounded-circle me-2" 
                                                width="32" 
                                                height="32" 
                                                alt="Profile"
                                            />
                                        ) : (
                                            <i className="bi bi-person-circle me-2 fs-5"></i>
                                        )}
                                        <span>{user.firstName}</span>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to="/profile">Профиль</Link></li>
                                        <li><Link className="dropdown-item" to="/orders">Мои заказы</Link></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><Link className="dropdown-item" to="/logout">Выйти</Link></li>
                                    </ul>
                                </div>
                            ) : (
                                <>
                                    <Link to="/auth" className="btn btn-outline-primary me-2">Вход</Link>
                                    <Link to="/reg" className="btn btn-primary">Регистрация</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Попап уведомлений */}
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="Уведомления">
                <div className="p-3">
                    Здесь будут ваши уведомления
                </div>
            </Popup>
        </header>
    );
};

export default Header;