import React, {createContext, useEffect, useState, useRef, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const useApi = () => {

    const { refreshToken } = useContext(AuthContext);

    /**
     * Обрабатывает ошибки HTTP-запросов
     */
    const handleRequestError = async (error) => {
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

    /**
     * Выполняет GET-запрос.
     */
    const getAsync = async() => {}

    /**
     * Выполняет POST-запрос.
     */
    const postAsync = async() => {}

    /**
     * Выполняет PUT-запрос.
     */
    const putAsync = async() => {}

    /**
     * Выполняет DELETE-запрос.
     */
    const deleteAsync = async() => {}

    return{
        getAsync,
        postAsync,
        putAsync,
        deleteAsync,
        handleRequestError}
};

export default useApi;