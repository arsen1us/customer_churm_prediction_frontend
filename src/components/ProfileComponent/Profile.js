import React, {useEffect, useState, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import OrderItem from "../ListItemComponents/OrderItem";
import { Link } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"
import "./Profile.css"

const Profile = () => {

    const [orderList, setOrderList] = useState([]);
    // Метод для обновления токена
    const {user, token, refreshToken, logout} = useContext(AuthContext);

    // Скорее всего надо делать fetch для получения списка самых последних заказов
    /// summary
    /// Получить список заказов по id пользователя
    /// summary
    const GetOrderListByUserIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/order/user/${user.id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response && response.status === 200){
                if(response.data.orderList){
                    setOrderList(response.data.orderList);
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

    useEffect(() => {
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
                      <button onClick={logout} className="logout-button">Выйти</button>
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

