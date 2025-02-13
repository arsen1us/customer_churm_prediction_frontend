import React, {createContext, useState} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const refreshToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200)
            {
                if(response.data && response.data.token)
                {
                    const authToken = response.data.token.replace("Bearer");
                    localStorage.setItem(authToken);
                    setToken(authToken);
                }
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    // Если в ответе опять пришёл код 401, перенаправить на страницу входа
                    case 401:
                        alert("Ошибка 401. Попробуйве снова войти")
                        break;
                    case 404:
                        alert("Ошибка 404. Ресурс не найден (Надо добавить, что именно не найдено)!")
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
    };

    return (
        <AuthContext.Provider value={{token, setToken, refreshToken}}>
            {children}
        </AuthContext.Provider>
    );
};