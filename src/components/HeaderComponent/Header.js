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

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [productIds, setProductIds] = useState([]);
    // Подлючение пользователя 
    const [connection, setConnection] = useState(null);
    // Список уведомлений
    const [notificationList, setNotificationList] = useState([]);
    const [notificationsCount, setNotificationsCount] = useState(5);

    // Метод для обновления токена
    const {refreshToken} = useContext(AuthContext);

    // Управление popup ===================================
    
        const [isPopupOpen, setIsPopupOpen] = useState(false);
        const openPopup = () => setIsPopupOpen(true);
        const closePopup = () => setIsPopupOpen(false);
    
    // Управление popup ===================================
    
    /// <summary>
    /// Проверить валидность токена
    /// <summary>
    const CheckToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/check", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        console.log("Check token method - 401 not authorized")
                        await refreshToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// <summary>
    /// Установить соединение с хабом SignalR 
    /// </summary>
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            const decodedToken = jwtDecode(token);
            if(decodedToken){
                if(decodedToken.Id){
                    const newConnection = new HubConnectionBuilder()
                    .withUrl("https://localhost:7299/notification-hub", {
                        accessTokenFactory: () => {
                            const token = localStorage.getItem("token");
                            // console.log(token);
                            return token;
                        } 
                    })
                    .withAutomaticReconnect() // автоматическое переподключение
                    .configureLogging(LogLevel.Information) // логирование
                    .build();
                
                    setConnection(newConnection);
                }
            }
        }
    }, []);

    /// <summary>
    /// Подписка на получение уведомлений при успешном подключении к хабу SignalR
    /// </summary>
    useEffect(() => {
        if(connection){
            connection.start()
            .then(() => {

                connection.on("ReceiveNotification", (message) => {
                    setNotificationList((prev) => [...prev, message]);
                });

                connection.on("ReceivePersonalNotification", (message, productIds) => {
                    setProductIds(productIds);
                    setNotificationList((prev) => [...prev, message]);
                });
            })
            .catch((error) => alert("Connection failed", error));

            return () => {
                if(connection){
                    connection.stop();
                }
            };
        }
    }, [connection]);
    /// summary
    /// Получить информацию о пользователе
    /// summary
    const GetUserInfo = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id)
                    {
                        const response = await axios.get(`https://localhost:7299/api/user/${decodedToken.Id}`,
                        {
                            headers: {
                                "Authorization": "Bearer "+ localStorage.getItem("token")
                            }
                        });

                        if(response && response.status === 200){
                            if(response.data && response.data.user)
                            setUser(response.data.user);
                        }
                    }
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 405:
                        alert("Ошибка 405. Method Not Allowed (Не могу пока это починить)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    // Временное решение (как обычно) =======================================================

    let userId = null;
    let companyId = null;

    const token = localStorage.getItem("token");

    if(token) {
        const decodedToken = jwtDecode(token);
        if(decodedToken.Id){
            userId = decodedToken.Id;
        }
        if(decodedToken.CompanyId){
            companyId = decodedToken.CompanyId;
        }
    }

    // Временное решение (как обычно) =======================================================


    // Отслеживание действий пользователя ===================================================


    const startSendingData = () => {
        // Если никакая вкладка не отправляет информацию о сессии
        if(!localStorage.getItem("sendingData")){
            localStorage.setItem("sendingData", true);

            setInterval(UpdateUserSession, 60000);
        }
    }

    /// <summary>
    /// Обновить информацию о сессии пользователя
    /// <summary>
    const UpdateUserSession = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id){
                        const response = await axios.put(`https://localhost:7299/api/session/${decodedToken.Id}`, {
                            userId:decodedToken.Id,
                            // sessionTimeStart: new Date().toISOString()
                        }, {
                            headers: {
                                "Authorization": "Bearer "+ localStorage.getItem("token")
                            }
                        });

                        if(response && response.status === 200){
                            console.log("session updated");
                        }
                    }
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 405:
                        alert("Ошибка 405. Method Not Allowed (Не могу пока это починить)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }

    /// <summary>
    /// Создать сессию
    /// </summary>
    const CreateUserSessionAsync = async () => {

        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id){
                        const response = await axios.post("https://localhost:7299/api/session", {
                            userId:decodedToken.Id,
                            // time: new Date().toISOString(),
                        }, {
                            headers: {
                                "Authorization": "Bearer "+ localStorage.getItem("token")
                            }
                        });

                        if(response && response.status === 200){
                            alert("session successfully created");
                            startSendingData();
                        }
                    }
                }
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
                        break;
                    case 405:
                        alert("Ошибка 405. Method Not Allowed (Не могу пока это починить)!")
                        break;
                    case 500:
                        alert("Произошла ошибка сервера!")
                        break;
                    default:
                        alert("Произошла непредвиденная ошибка. Попробуйте позже!")
                }
            }
            else {
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
    }


    const timeoutId = useRef(null);

    useEffect(() => {
        const handleMouseMove = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                console.log("mousemove after 3 seconds delay");
            }, 3000);
        };

        const handleClick = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                console.log("click after 3 seconds delay");
            }, 3000);
        };

        // Добавление слушателя на движение мышки
        window.addEventListener("mousemove", handleMouseMove);
        // Добавление слушателя на клик мышки
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);

            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    // Удалить переменную из localStorage, отвечающую за контроль сессии
    window.addEventListener("beforeunload", () => {
        localStorage.removeItem("sendingData");
    })


    // Отслеживание действий пользователя ===================================================

    useEffect(() => {
        CheckToken();
        GetUserInfo();

        // Начать отправку данных для сессии
        CreateUserSessionAsync();
    }, [])

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

    {companyId ? (
        <li>
          <Link to="/company-profile">Профиль компании</Link>
        </li>
    ) : (
        <li>
          <Link to="/company-add">Стать продавцом</Link>
        </li>
    )}

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
    {userId ? (
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