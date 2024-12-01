import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

/// <summary>
/// Компонент для настройки администраторов компании
/// </summary>
const CompanyAdminsSettingsComponent = () => {

    const {companyId} = useParams();
    const [userList, setUserList] = useState([]);
    // Роль пользователя
    const [role, setRole] = useState("");
    /// <summary>
    /// Обновить токен
    /// </summary>
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
        catch (error){

            if(error.response){
                const status = error.response.status;

                switch(status) {
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
    }

    /// <summary>
    /// Получить список пользователей по id компании
    /// </summary>
    const GetUserListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/user/company/${companyId}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200)
            {
                if(response.data && response.data.userList){
                    setUserList(response.data.userList);
                }
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        await GetCompanyByIdAsync();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
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
    }

    /// <summary>
    /// Добавить пользователя в работники компании
    /// </summary>
    // Пользователь будет передаваться из списка пользователей 
    const AddUserToCompanyEmployeesAsync = async (user) => {
        try{
            if(user)
            {
                const response = await axios.post(`https://localhost:7299/api/user/company/${companyId}`, {
                    user: user
                }, {
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if(response && response.status){
                    if(response.data && response.data.user){
                        setUserList(list => [...list, response.data.user])
                    }
                }
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        await GetCompanyByIdAsync();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
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
    }

    /// <summary>
    /// Обновить роль пользвателя
    /// </summary>
    // Пользователь будет передаваться из списка пользователей 
    const UpdateUserRoleAsync = async (user) => {
        try{
            if(user)
            {
                const response = await axios.post(`https://localhost:7299/api/token/update-role/${user.id}`, {
                    user: user
                }, {
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if(response && response.status){
                    if(response.data && response.data.user){
                        setUserList(list => [...list, response.data.user])
                    }
                }
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        await GetCompanyByIdAsync();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
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
    }
    
    /// <summary>
    /// Добавить пользователя в работники компании
    /// </summary>
    // Пользователь будет передаваться из списка пользователей 
    const DeleteUserFromCompanyEmployeesAsync = async (userId) => {
        try{
            if(user)
            {
                const response = await axios.post(`https://localhost:7299/api/user/company/${companyId}`, {
                    userId: userId,
                    companyId: companyId
                }, {
                    headers:{
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if(response && response.status){
                    if(response.data && response.data.user){
                        setUserList(list => list.filter(user => user.id !== userId))
                    }
                }
            }
        }
        catch (error){
            if(error.response){
                const status = error.response.status;

                switch(status) {
                    case 401:
                        await UpdateToken();
                        await GetCompanyByIdAsync();
                        break;
                    case 403:
                        alert("У вас недостаточно прав для доступа к ресурсу!")
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
    }

    useEffect(() => {
        GetUserListByCompanyIdAsync();
      }, []);

    return (
        <div>

        </div>
    )
}

export default CompanyAdminsSettingsComponent;