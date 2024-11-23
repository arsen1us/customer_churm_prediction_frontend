import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Компонент для отображения страницы компании
const CompanyPageComponent = () => {

    const {companyId} = useParams();
    const [company, setCompany] = useState(null);

    ///summary
    /// Обновить токен
    ///summary
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
        catch(error)
        {
            // Внутрянняя ошибка сервера (Internal server error)
            if(error.response && error.response.status === 500)
                console.log(error);

            // Not Found
            else if(error.response && error.response.status === 404)
                console.log(error);

            else
                console.log(error);
        }
    }

    /// summary
    /// Получить компанию по id
    /// summary
    const GetCompanyByIdAsync = async (companyId) => {
        try{
            const response = await axios.get(`https://localhost:7299/api/company/${companyId}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200) {
                if(response.data.company) {
                    console.log(response.data.company);
                    setCompany(response.data.company);
                }
            }
        }
        catch(error){
            if(error.response && error.response.status === 401)
                {
                    await UpdateToken();
                    await GetCompanyByIdAsync(companyId);
                }
        }
    }

    useEffect(() => {
        if(companyId){
            GetCompanyByIdAsync(companyId);
        }
    }, [companyId])
    return (
        <div>
            {company ? (
                <div>
                    <p>Загруженная компания</p>
                </div>
            ) : (
                <p>Загрузка продукта...</p>
            )}
        </div>
    );
}

export default CompanyPageComponent;