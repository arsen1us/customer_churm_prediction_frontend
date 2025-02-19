import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"

/// <summary>
/// Компонент для настройки администраторов компании
/// </summary>
const CompanyAdminsSettings = () => {

    // Метод для обновления токена
    const {token, refreshToken, handleRequestError} = useContext(AuthContext);
    const {companyId} = useParams();
    const [userList, setUserList] = useState([]);
    // Роль пользователя
    const [role, setRole] = useState("");

    /// <summary>
    /// Получить список пользователей по id компании
    /// </summary>
    const GetUserListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/user/company/${companyId}`, {
                headers:{
                    "Authorization": "Bearer " + token
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
            await handleRequestError(error);
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
                        "Authorization": "Bearer " + token
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
            await handleRequestError(error);
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
                        "Authorization": "Bearer " + token
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
            await handleRequestError(error);
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
                        "Authorization": "Bearer " + token
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
            await handleRequestError(error);
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

export default CompanyAdminsSettings;