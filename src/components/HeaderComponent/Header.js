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
        <div>
            <nav className="header-nav">
              {/* Левая часть */}
              <ul className="nav-links nav-links-left">

                <li>
                  <Link to="/">Главная</Link>
                </li>

                <li>
                  <Link to="/category">Категории</Link>
                </li>

                <li>
                  <Link to="/churn-prediction">Управление пользователями</Link>
                </li>
              </ul>

              {/* Правая часть */}
              <ul className="nav-links nav-links-right">

                <li>
                    {ownedCompany ? (
                      <Link to="/company">Моя компания</Link>
                    ):(
                      <Link to="/company">Профиль компании</Link>
                    )}
                </li>

                <li>
              
                <div style={{ position: "relative", display: "inline-block" }}>
                    <button 
                        onClick={openPopup} 
                        style={{
                            background: "none", // Убираем фон кнопки
                            border: "none", // Убираем границу
                            padding: 0, // Убираем отступы
                            cursor: "pointer", // Указываем, что это кликабельный элемент
                        }}
                    >
                        <img 
                            src="https://localhost:7299/icons/notification.png" 
                            alt="Уведомления" 
                            style={{ width: "24px", height: "24px" }} 
                        />
                    </button>
                    {notificationsCount > 0 && (
                        <span
                            style={{
                                position: "absolute",
                                top: "-5px",
                                right: "-10px", 
                                backgroundColor: "red",
                                color: "white", 
                                borderRadius: "50%", 
                                padding: "4px 8px", 
                                fontSize: "12px", 
                                fontWeight: "bold", 
                                minWidth: "20px", 
                                textAlign: "center", 
                                zIndex: 1, 
                            }}
                        >
                            {notificationsCount}
                        </span>
                    )}
                </div>
                  
                {isPopupOpen && (
                    <Popup isOpen={isPopupOpen} onClose={closePopup} title="Список уведомлений">
                        <div>
                            <NotificationList />
                        </div>
                    </Popup>
                )}

              
                </li>
                <li>
                  <Link to="/cart">
                    <img src="https://localhost:7299/icons/cart.png" alt="Корзина" />
                  </Link>
                </li>
                {user?.id ? (
                  <li className="profile-link">
                    <Link to="/profile">
                      {user && user.imageSrcs ? (
                        <img
                          src={`https://localhost:7299/uploads/${user.imageSrcs[0]}`}
                          alt="User Avatar"
                          className="profile-avatar"
                        />
                      ) : (
                        <span className="default-avatar">👤</span>
                      )}
                      <span className="user-name">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/reg">Регистрация</Link>
                    </li>
                    <li>
                      <Link to="/auth">Вход</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
        </div>
    );
};

export default Header;