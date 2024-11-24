import React, {useState, useEffect} from "react";
import axios from "axios";

// Надо откуда-то достать id компании

const CompanyProfileComponent = () => {
    
    // Надо откуда-то достать id компании 
    const [companyId, setCompanyId] = useState("");
    const [company, setCompany] = useState(null);


    /// summary
    /// Получить список заказов
    /// summary
    const GetOrderListAsync = async () => {
        try{

        }
        catch (error){
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
    /// Получить список продуктов по id компании
    /// summary
    const GetProductListByCompanyIdAsync = async () => {
        try{

        }
        catch (error){
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

    return (
        <div>
            Страница компании (будет отображаться обычная страница если роль пользователя 
            - обычный юзер или авторизированный пользоавтель, или страница админа компании, если пользователь Имеет роль админа)
        </div>
    );
}

export default CompanyProfileComponent;