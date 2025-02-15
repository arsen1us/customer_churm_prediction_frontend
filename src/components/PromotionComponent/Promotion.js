// Компонент для получения рекламы на основе информации о пользователе

import React, {useEffect, useState, useContext} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"

///<summary>
/// Компонент с рекламным постом
///</summary>
const Promotion = () => {

    const [promotion, setPromotion] = useState();

    // Метод для обновления токена
    const {token, refreshToken, handleRequestError} = useContext(AuthContext);

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
        catch(error){
            await handleRequestError(error);
        }
    }

    // Получить таргетированную рекламу для пользователя
    const GetFirstPromotionAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/promotion/first", {
                headers:{
                    "Authorization": "Bearer " + token
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
        catch(error){
            await handleRequestError(error);
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

export default Promotion;