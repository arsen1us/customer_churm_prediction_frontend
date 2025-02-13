import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CompanyAddForm = () => {

    const [companyName, setCompanyName] = useState("");
    const [companyDescription, setCompanyDescription] = useState("");

    const navigate = useNavigate();
    /// <summary>
    /// Обновить токен
    /// </summary>
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", {
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
    /// Добавить компанию
    /// </summary>
    const AddCompanyAsync = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");

            if(token){
                // декодирование токена
                const decodedToken = jwtDecode(token);
                // id - пользователя
                if(decodedToken.Id){
                    const formData = new FormData();

                    for (let i = 0; i < selectedFiles.length; i++) {
                        formData.append('images', selectedFiles[i]);
                    }
        
                    formData.append("name", companyName);
                    formData.append("description", companyDescription);
                    formData.append("userId", decodedToken.Id);

                    const response = await axios.post("https://localhost:7299/api/company", formData, {
                        headers:{
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
    
                    if(response.status && response.status === 200) {
                       if(response.data && response.data.company) {
                            navigate(`/company-profile/${response.data.company.id}`)
                           
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
                        await AddCompanyAsync();
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

    // =====================================================================

    const [selectedFiles, setSelectedFiles] = useState(null);
  
    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files); // Сохраняем все выбранные файлы
    };

    // =====================================================================

    return (
        <div>
            <div>
                <div>
                    <h3>Стать продавцом</h3>
                </div>
                <div>
                    <form method="post" onSubmit={AddCompanyAsync}>

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
                            <label>Введите название</label>
                            <input 
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label>Введите описание</label>
                            <input 
                                type="text"
                                value={companyDescription}
                                onChange={(e) => setCompanyDescription(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <button type="submit">Добавить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanyAddForm;