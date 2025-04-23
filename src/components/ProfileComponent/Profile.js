import React, {useEffect, useState, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import OrderItem from "../ListItemComponents/OrderItem";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import "./Profile.css"
import OrderList from "../ListComponents/OrderList";
import OwnerCompanyProfile from "../CompanyProfileComponent/OwnerCompanyProfileComponent/OwnerCompanyProfile";

import PersonalUserBid from "../PersonalUserBidComponent/PersonalUserBid";
import NotAuthorizedComponent from "../NotAuthorizedComponent/NotAuthorizedComponent";

const Profile = () => {

    const [orders, setOrders] = useState([]);
    const {user, token, refreshToken, handleRequestError, logout} = useContext(AuthContext);

    /**
     * Получает список заказов по id пользователя
     */
    const GetOrdersByUserIdAsync = async () => {
      try{
        if(user)
        {
          const response = await axios.get(`https://localhost:7299/api/order/user/${user.id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
          });
          if(response && response.status === 200){
            console.log(response.data.orders);
              if(response.data.orders){
                  setOrders(response.data.orders);
              }
          }
        }
      }
      catch (error){
        await handleRequestError(error);
      }
    }

    /** Отменяет заказ */
    const CancelOrder = async (orderId) => {
      try{
        if(user)
        {
          const response = await axios.delete(`https://localhost:7299/api/order/${orderId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
          });
          if(response && response.status === 200){
            console.log(response.data.order);
              if(response.data.order){
                  alert("Заказ успешно отменён")
              }
          }
        }
      }
      catch (error){
        await handleRequestError(error);
      }
    }

    useEffect(() => {
      GetOrdersByUserIdAsync();
    }, [])

    return (
      <div>
        {user ? (
          <>
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
              <h1>Список заказов</h1>
              <div className="order-list">
              {orders.length === 0 ? (
                <p>Заказов пока нет.</p>
              ) : (
                orders.map((orderDto, index) => (
                  <div key={index} className="border p-4 rounded-lg mb-4 shadow-md">
                    <h3 className="text-lg font-semibold">Заказ #{orderDto.order.id}</h3>
                    <p className="text-sm text-gray-600">Статус: {orderDto.order.orderStatus}</p>
                    <p className="text-sm text-gray-600">Общая стоимость: {orderDto.totalPrice} ₽</p>
                    <div className="mt-2">
                      {orderDto.teas.map((item, index) => (
                        <div key={item.teaId} className="flex items-center gap-4 border-b py-2">
                          <img width="200px" src={`https://localhost:7299/uploads/${item.productImageUrl}`} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x {item.unitPrice} ₽ = {item.totalPrice} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <button onClick={() => CancelOrder(orderDto.order.id)}>Отменить заказ</button>
                    </div>
                  </div>
                ))
              )}
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
          </>
        ) : (
          <>
            <div>
              <NotAuthorizedComponent/>
            </div>
          </>)}
      </div>
    );
}

export default Profile;

