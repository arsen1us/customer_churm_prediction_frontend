import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();
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

    useEffect(() => {
        CheckToken();
    }, [])

    return(
        <div>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    {userId ? (
                        <>
                            <li>
                                <Link to="/profile">Профиль</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/reg">Зарегистрироваться</Link>
                            </li>

                            <li>
                                <Link to="/auth">Войти</Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/category">Категории</Link>
                    </li>
                    <li>
                        <Link to="/cart">Корзина</Link>
                    </li>
                    {companyId ? (
                        <>
                            <li>
                                <Link to="/company-profile">Профиль компании</Link>
                            </li>
                        </>
                    ) : (
                    <>
                        <li>
                            <Link to="/company-add">Стать продавцом</Link>
                        </li>
                    </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Header;