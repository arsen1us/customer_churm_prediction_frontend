import React, {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import OrderItem from "../../ListItemComponents/OrderItem";
import { Link } from "react-router-dom";

const ProfileEditForm = () => {

    const [user, setUser] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [orderList, setOrderList] = useState([]);

    /// summary
    /// Обновить токен
    /// summary
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status === 200)
            {
                const authToken = response.data.token;
                if(authToken != null || authToken != undefined || authToken != "")
                {
                    const token = authToken.replace("Bearer", "");
                    localStorage.removeItem("token");
                    localStorage.setItem("token", token);
                }
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    /// summary
    /// Получить информацию о пользователе
    /// summary
    const GetUserInfo = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id)
                    {
                        const response = await axios.get(`https://localhost:7299/api/user/${decodedToken.Id}`,
                        {
                            headers: {
                                "Authorization": "Bearer "+ localStorage.getItem("token")
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
                        await UpdateToken();
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

    // Скорее всего надо делать fetch для получения списка самых последних заказов
    /// summary
    /// Получить список заказов по id пользователя
    /// summary
    const GetOrderListByUserIdAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.Id)
                    {
                        const response = await axios.get(`https://localhost:7299/api/order/user/${decodedToken.Id}`, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
                        if(response && response.status === 200){
                            if(response.data.orderList){
                                setOrderList(response.data.orderList);
                            }
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
                        await UpdateToken();
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

    const UpdateUserInfoAsync = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
    
            if (decodedToken.Id) {

            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }

            formData.append("firstName",firstName);
            formData.append("lastName",lastName);
            formData.append("email",email);
            formData.append("password",password);

                const response = await axios.put(`https://localhost:7299/api/user/${decodedToken.Id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });

                if (response.status && response.status === 200) {
                    if (response.data.product) {
                        alert("Информация о пользователе успешно обновлена")
                    }
                }
            }
        }
        catch(error){

        }
    }

    useEffect(() => {
        GetUserInfo();

        GetOrderListByUserIdAsync();
    }, [])

    // =====================================================================

    const [selectedFiles, setSelectedFiles] = useState(null);
  
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // Сохраняем все выбранные файлы
    };

    // =====================================================================

    return (
        <div>
            <div>
                {user ? (
                    <>
                        <form method="post" onSubmit={UpdateUserInfoAsync}>
                
                        <div>
                            <h2>Загрузить аватарку (для нескольких)</h2>
                            <input 
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange} 
                                required
                                />
                        </div>

                        <div>
                            <label>FirstName</label>
                            <input 
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={user.firstName}
                                required
                            />
                        </div>

                        <div>
                            <label>LastName</label>
                            <input 
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder={user.lastName}
                                required
                            />    
                        </div>

                        <div>
                            <label>Email</label>
                            <input 
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={user.email}
                                required
                            />
                        </div>

                        <div>
                            <label>Password</label>
                            <input 
                                type="password"
                                value={password}    
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={user.password}
                                required
                            />
                        </div>

                        <div>
                            <button type="submit">Сохранить изменения</button>
                        </div>
                    </form>
                    </>
                ) : (
                    <>
                    Не удалось получить информацию о пользователе
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfileEditForm;
