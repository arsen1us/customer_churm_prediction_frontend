import React, {createContext, useEffect, useState, useRef} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    // jwt-токен
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    // пользователь
    const [user, setUser] = useState(null);
    // подключение к SignalR
    const [connection, setConnection] = useState(null);
    // информация о сессии пользователя
    const [session, setSession] = useState(null);

    ///<summary>
    /// Аутентификация пользователя
    ///</summary>
    const login = async (email,password) => {
        try{
            var response = await axios.post("https://localhost:7299/api/user/auth", 
                {
                    email: email,
                    password: password,
                 });
            if(response.status === 200)
            {
                const authToken = response.data.token;

                const token = authToken.replace("Bearer", "")
                localStorage.setItem("token", token)
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 400:
                        alert("Ошибка 400. Скорее всего не верно переданы данные в теле запроса!")
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

    ///<summary>
    /// Выйти из аккаунта
    ///</summary> 
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    }

    ///<summary>
    /// Регистрация пользователя
    ///</summary>
    const register = async (firstName, lastName, email, password) => {
        try{
            var response = await axios.post("https://localhost:7299/api/user/reg", 
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                 });
            if(response.status === 200)
            {
                const authToken = response.data.token;

                const token = authToken.replace("Bearer", "")
                localStorage.setItem("token", token)
            }
        }
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 400:
                        alert("Ошибка 400. Скорее всего не верно переданы данные в теле запроса!")
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

    /// summary
    /// Получить информацию о пользователе
    /// summary
    const getUser = async () => {
        try{
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id)
                    {
                        const response = await axios.get(`https://localhost:7299/api/user/${decodedToken.Id}`,
                        {
                            headers: {
                                "Authorization": "Bearer "+ token
                            }
                        });

                        if(response && response.status === 200){
                            if(response.data && response.data.user)
                            setUser(response.data.user);
                        }
                    }
                }
            }
        }
        catch (error){

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
    }

    ///<summary>
    /// Обновить информацию о пользователе
    ///</summary>
    const updateUser = async (
        firstName,
        lastName,
        email,
        password,
        selectedFiles) => {
        try{
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append("firstName",firstName);
            formData.append("lastName",lastName);
            formData.append("email",email);
            formData.append("password",password);

                const response = await axios.put(`https://localhost:7299/api/user/${user.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + token
                    }
                });

                if (response.status && response.status === 200) {
                    if (response.data.product) {
                        alert("Информация о пользователе успешно обновлена")
                    }
                }
        }
        catch (error){

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
    }


    ///<summary>
    /// Обновить jwt-токен
    ///</summary>
    const refreshToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", {
                headers:{
                    "Authorization": "Bearer " + token
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

    /// <summary>
    /// Установить соединение с хабом SignalR 
    /// </summary>
    const connectToSignalR = async () => {
        try{
            const newConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:7299/notification-hub", {
                    accessTokenFactory: token
                })
                .withAutomaticReconnect() // автоматическое переподключение
                .configureLogging(LogLevel.Information) // логирование
                .build();
            
            setConnection(newConnection);
        }
        catch(error){
            alert(`Произошла ошибка при подключении к SignalR. Детали ошибки:` + error);
        }
    }

    useEffect(() => {
        connectToSignalR();
    }, [token]);
    
    /// <summary>
    /// Подписка на получение уведомлений
    /// </summary>
    useEffect(() => {
        try{
            if(connection){
                connection.start()
                .then(() => {
    
                    connection.on("ReceiveNotification", () => {
                        
                    });
    
                    connection.on("ReceivePersonalNotification", () => {
                        
                    });
                })
                .catch((error) => alert("Connection failed", error));
    
                return () => {
                    if(connection){
                        connection.stop();
                    }
                };
            }
        }
        catch(error){
            alert("Не удалось подписаться на получение уведомлений. Детали: " + error)
        }
    }, [connection]);

    ///<summary>
    /// Создать сессию
    ///</summary>
    const createSession = async () => {
        try{
            const response = await axios.post("https://localhost:7299/api/session", {
                userId:user.id,
                // time: new Date().toISOString(),
            }, {
                headers: {
                    "Authorization": "Bearer "+ token
                }
            });

            if(response && response.status === 200){
                alert("session successfully created");
                startSendingData();
            }
        }
        catch (error){
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
    }

    ///<summary>
    /// Обновить сессию
    ///<summary>
    const updateSession = async () => {
        try{
            const response = await axios.put(`https://localhost:7299/api/session/${user.id}`, {
                userId: user.id,
                // sessionTimeStart: new Date().toISOString()
            }, {
                headers: {
                    "Authorization": "Bearer "+ token
                }
            });
            if(response && response.status === 200){
                console.log("session updated");
            }
        }
        catch (error){

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
    }

    const startSendingData = () => {
        // Если никакая вкладка не отправляет информацию о сессии
        if(!localStorage.getItem("sendingData")){
            localStorage.setItem("sendingData", true);

            setInterval(updateSession, 60000);
        }
    }

    const timeoutId = useRef(null);
    
    useEffect(() => {
        const handleMouseMove = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                console.log("mousemove after 3 seconds delay");
            }, 3000);
        };

        const handleClick = () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }

            timeoutId.current = setTimeout(() => {
                console.log("click after 3 seconds delay");
            }, 3000);
        };

        // Добавление слушателя на движение мышки
        window.addEventListener("mousemove", handleMouseMove);
        // Добавление слушателя на клик мышки
        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);

            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        };
    }, []);

    // Удалить переменную из localStorage, отвечающую за контроль сессии
    window.addEventListener("beforeunload", () => {
        localStorage.removeItem("sendingData");
    })


    // Отслеживание действий пользователя ===================================================

    useEffect(() => {
        // Начать отправку данных для сессии
        createSession();
    }, [])

    useEffect(() =>{
        getUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{
            user, 
            token, 
            refreshToken,
            login,
            register,
            logout,
            updateUser}}>
            {children}
        </AuthContext.Provider>
    );
};