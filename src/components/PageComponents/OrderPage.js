import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {AuthContext} from "../../AuthProvider"

const OrderPage = () => {

    const orderId = useParams();
    const [order, setOrder] = useState(null);
    // Метод для обновления токена
    const {refreshToken} = useContext(AuthContext);

    // Переделать на запрос, чтобы сразу получить и информацию о заказе и о продукте
    /// <summary>
    /// Получить информацию по заказу
    /// </summary>
    const GetOrderByIdAsync = async () => {
        try{

        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await refreshToken();
                        await GetCompanyByIdAsync();
                        await GetOrderListByCompanyIdAsync();
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

    return (
        <div>

        </div>
    )
}

export default OrderPage;