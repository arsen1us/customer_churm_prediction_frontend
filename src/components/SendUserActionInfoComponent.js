// Компонент для отправки информации о действиях пользователя 

import React from "react"
import axios from "axios"

import "../RetentionAction.css"

/// <summary>
/// Компонент для отправки информации о действиях пользователя
/// </summary>
// acitonType - тип дейсвтия
// userId - id пользователя 
// targetId - id сущности
const SendUserActionInfoComponent = ({actionType, userId, targetId}) => {

    const SendData = async () => {
        const response = await axios.post("", {
            actionType: actionType,
            userId: userId,
            targetId: targetId
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
    }

}