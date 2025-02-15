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
    const {user, refreshToken, handleRequestError} = useContext(AuthContext);

    // Переделать на запрос, чтобы сразу получить и информацию о заказе и о продукте
    /// <summary>
    /// Получить информацию по заказу
    /// </summary>
    const GetOrderByIdAsync = async () => {
        try{

        }
        catch (error){
            await handleRequestError(error);
        }
    }

    return (
        <div>

        </div>
    )
}

export default OrderPage;