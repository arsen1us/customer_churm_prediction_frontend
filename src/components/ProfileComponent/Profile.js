import React, {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import OrderItem from "../ListItemComponents/OrderItem";
import { Link } from "react-router-dom";

import "./Profile.css"

const Profile = () => {

    const [user, setUser] = useState(null);
    // Заменил на decodedToken.Id, так как userId обновляется async и не успевает обновиться
    // const[userId, setUserId] = useState("");

    const [orderList, setOrderList] = useState([]);

    /// summary
    /// Обновить токен
    /// summary
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken != null || authToken != undefined || authToken != "")
                {
                    const token = authToken.replace("Bearer", "");
                    localStorage.removeItem("token");
                    localStorage.setItem("token", token);
                }
            }
        }
        catch(error)
        {
            console.log(error);
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

    // Скорее всего надо делать fetch для получения списка самых последних заказов
    /// summary
    /// Получить список заказов по id пользователя
    /// summary
    const GetOrderListByUserIdAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id)
                    {
                        const response = await axios.get(`https://localhost:7299/api/order/user/${decodedToken.Id}`, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        if(response && response.status === 200){
                            if(response.data.orderList){
                                setOrderList(response.data.orderList);
                            }
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
    /// Выйти из аккаунта
    /// </summary>
    const LogOut = () => {
        localStorage.removeItem("token");
    }

    useEffect(() => {
        GetUserInfo();

        GetOrderListByUserIdAsync();
    }, [])

    return (
        <div>
            <div className="profile-container">
              {/* Левая часть: Информация о пользователе */}
              <div className="profile-info">
                {user ? (
                  <>
                    {/* Аватар пользователя */}
                    <div className="avatar-container">
                      {user.imageSrcs.length > 0 ? (
                        <img
                          src={`https://localhost:7299/uploads/${user.imageSrcs[0]}`}
                          alt="User Avatar"
                          className="avatar-img"
                        />
                      ) : (
                        <span className="default-avatar">👤</span>
                      )}
                    </div>
                  
                    {/* Имя пользователя */}
                    <h4>{user.firstName} {user.lastName}</h4>
                  
                    {/* Ссылка на редактирование */}
                    <div>
                      <Link to="/edit-profile" className="edit-link">Редактировать</Link>
                    </div>
                  
                    {/* Кнопка выхода */}
                    <div>
                      <button onClick={LogOut} className="logout-button">Выйти</button>
                    </div>
                  </>
                ) : (
                  <p>Не удалось получить информацию о пользователе</p>
                )}
              </div>
            
              {/* Правая часть: Список заказов */}
              <div className="order-list">
                <h4>Список заказов</h4>
                <ul>
                  {orderList.length > 0 ? (
                    orderList.map((order, index) => (
                      <OrderItem key={index} order={order} />
                    ))
                  ) : (
                    <p>Заказы отсутствуют</p>
                  )}
                </ul>
              </div>
            </div>

        </div>
    );
}

export default Profile;

