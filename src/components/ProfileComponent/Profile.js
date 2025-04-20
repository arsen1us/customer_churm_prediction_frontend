import React, {useEffect, useState, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import OrderItem from "../ListItemComponents/OrderItem";
import { Link } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"
import "./Profile.css"
import OrderList from "../ListComponents/OrderList";
import OwnerCompanyProfile from "../CompanyProfileComponent/OwnerCompanyProfileComponent/OwnerCompanyProfile";

import PersonalUserBid from "../PersonalUserBidComponent/PersonalUserBid";

const Profile = () => {

    const [orderList, setOrderList] = useState([]);
    // Метод для обновления токена
    const {
      user, 
      token, 
      refreshToken, 
      logout, 
      handleRequestError,
      ownedCompany} = useContext(AuthContext);

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
          await handleRequestError(error);
        }
    }

    useEffect(() => {
        GetOrderListByUserIdAsync();
    }, [])

    return (
        <div>
          <div>
            <h1>Профиль пользователя</h1>
          </div>
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
                <h4>Нормальный список заказов</h4>
                <OrderList orders={orderList}/>
              </div>
            </div>
            
            {/* Работа с профилем продавца */}
            <div>
              <div>
                <h1>Профиль продавца</h1>
              </div>
              <div>
                <OwnerCompanyProfile/>
              </div>
            </div>
            {/* Работа с персональными заявками */}
            <div>
                <PersonalUserBid/>
            </div>
        </div>
    );
}

export default Profile;

