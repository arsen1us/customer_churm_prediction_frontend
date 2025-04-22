import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider";

/**
 * Компонент для отображения заказов пользователей
 * @returns 
 */
const Orders = () => {

    const [orders, setOrders] = useState([]);
    const {user, token, handleRequestError} = useContext(AuthContext);

    /**
     * Получает список заказов по id пользователя
     */
    const GetOrdersByUserIdAsync = async () => {
      try{
            if(user){
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
        } catch (error){
            await handleRequestError(error);
      }
    }

    useEffect(() => {
      GetOrdersByUserIdAsync();
    }, [])

    return (
        <div>
            <div>
              {/* Правая часть: Список заказов */}
              <h1>Список заказов</h1>
              <div className="order-list">
              {orders.length === 0 ? (
                <p>Заказов пока нет.</p>
              ) : (
                orders.map((orderDto, index) => (
                  <div key={index} >
                    <h3>Заказ #{orderDto.order.id}</h3>
                    <p>Статус: {orderDto.order.orderStatus}</p>
                    <p>Общая стоимость: {orderDto.totalPrice} ₽</p>
                    <div>
                      {orderDto.teas.map((item, index) => (
                        <div key={index}>
                          <img width="200px" src={`https://localhost:7299/uploads/${item.productImageUrl}`} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <p>{item.productName}</p>
                            <p>
                              {item.quantity} x {item.unitPrice} ₽ = {item.totalPrice} ₽
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
              </div>
            </div>
        </div>
    );
}

export default Orders;