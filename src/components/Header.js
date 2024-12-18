import React, { useState, useEffect, useRef} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NotificationSystem from "./Notification";

import "../Header.css"

const Header = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    /// <summary>
    /// Обновить токен
    /// </summary>
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken)
                {
                    const token = authToken.replace("Bearer");
                    localStorage.setItem(token);
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        navigate("/auth")
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
                        await UpdateToken();
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
                        await UpdateToken();
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
                            sessionTimeStart: new Date().toISOString()
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
                        await UpdateToken();
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
                            time: "2024-12-14T12:00:00Z" // new Date().toISOString(),
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
                        await UpdateToken();
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

        window.addEventListener("mousemove", handleMouseMove);
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
      <Link to="/notifications">
        <img src="https://localhost:7299/icons/notification.png" alt="Уведомления" />
      </Link>
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