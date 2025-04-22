import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    /** jwt-токен */
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    /** пользователь*/
    const [user, setUser] = useState(null);
    
    /** Компания, которой владеет или которую администрирует текущий пользователь */
    const [ownedCompany, setOwnedCompany] = useState(null);
    /** обновлён ли токен или нет*/
    const [isRefreshing, setIsRefreshing] = useState(false);


    /**
     * Аутентификация пользователя
     * @param {*} email 
     * @param {*} password 
     */
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
                window.location.reload();
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    };

    /**
     * Выйти из аккаунта
     */
    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    }

    /**
     * Регистрация пользователя
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} email 
     * @param {*} password 
     */
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
                window.location.reload();
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    };

    /**
     * Получить информацию о пользователе
     */
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
            await handleRequestError(error);
        }
    }   

    /**
     * Обновить информацию о пользователе
     * @param {*} firstName 
     * @param {*} lastName 
     * @param {*} email 
     * @param {*} password 
     * @param {*} selectedFiles 
     */
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
            await handleRequestError(error);
        }
    }

    /**
     * Обновить jwt-токен
     */
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
            // await handleRequestError(error);
            await logout();
        }
        finally{
            setIsRefreshing(false);
        }
    };

    /**
     * Загрузить пользователя при изменении токена
     */
    useEffect(() =>{
        getUser();
    }, [token]);


    /**
     * Загрузить компанию по id пользователя 
     */
    const getCompany = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/company/user/${user.id}`,
            {
                headers: {
                    "Authorization": "Bearer "+ token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.company){
                    setOwnedCompany(response.data.company);
                }
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;
                // Обработать только 404 ошибку
                switch (status){
                    case 404:
                        alert("Вы не создали компанию (AuthProvider)!")
                    break;

                    default:
                        await handleRequestError(error);
                        break;
                }
            }
            else{
                alert("Ошибка сети или нет ответа от сервера. Проверьте ваше соединение!");
            }
        }
        
        
    }

    /**Загрузка компании при изменении пользователя. Если объект user не определён, то загрузка не происходит */
    useEffect(() => {
        /*так как данный метод вызывается при изменении user, то добавлю проверку*/
        if(user)
            getCompany();
    }, [user])
    /**
     * Обработка ошибок запроса
     * @param {*} error 
     */
    const handleRequestError = async (error) => {
        if(error.response){
            const status = error.response.status;

            switch(status) {
                case 401:
                    if(!isRefreshing){
                        setIsRefreshing(true);
                        try{
                            await refreshToken();
                            setIsRefreshing(false);
                        }
                        catch(refreshError){
                            setIsRefreshing(false);
                            await logout();
                        }
                    }
                    else{
                        await logout();
                    }

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

    return (
        <AuthContext.Provider value={{
            user,
            ownedCompany,
            token, 
            refreshToken,
            login,
            register,
            logout,
            updateUser,
            handleRequestError}}>
            {children}
        </AuthContext.Provider>
    );
};