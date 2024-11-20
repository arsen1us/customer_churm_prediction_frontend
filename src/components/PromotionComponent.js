// Компонент для получения рекламы на основе информации о пользователе

import React, {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const PromotionComponent = () => {

    const [promotion, setPromotion] = useState();

    // Обновить токен
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7777/api/token/update", {
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
        catch(error)
        {
            // Внутрянняя ошибка сервера (Internal server error)
            if(error.response && error.response.status === 500)
                console.log(error);

            // Not Found
            else if(error.response && error.response.status === 404)
                console.log(error);

            else
                console.log(error);
        }
    }

    // Получить таргетированную рекламу для пользователя
    const GetPromotionForCurrentUser = async () => {
        try{
            const response = await axios.get("");

            if(response.status === 200)
            {
                if(response.data.promotion)
                {
                    setPromotion(response.data.promotion)
                }
            }
        }
        catch(error)
        {
            // Если действия токена истекло
            if(error.response && error.response.status === 401)
            {
                await UpdateToken();
                await GetPromotionForCurrentUser();
            }
        }
    }

    // Получить таргетированную рекламу для пользователя
    const GetFirstPromotionAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/promotion/first", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response.status === 200)
            {
                if(response.data.promotion)
                {
                    setPromotion(response.data.promotion)
                }
            }
        }
        catch(error)
        {
            // Если действия токена истекло
            if(error.response && error.response.status === 401)
            {
                await UpdateToken();
                await GetPromotionForCurrentUser();
            }
        }
    }

    useEffect(() => {
        GetFirstPromotionAsync();
    }, [])

    return (
        <div>
            <div>
                <div>
                    <h3>Компонент с рекламой</h3>
                </div>
                {promotion == null ? (
                    <>
                        <p>Не удалось загрузить рекламу</p>
                    </>
                ) : (
                    <div>
                        <div>
                            <p>{promotion.title}</p>
                        </div>
                        <div>
                            <p>{promotion.content}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PromotionComponent;