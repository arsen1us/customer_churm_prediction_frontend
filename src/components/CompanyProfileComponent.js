import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProductItemComponent from "./ListItemComponents/ProductItemComponent";

// Надо откуда-то достать id компании

const CompanyProfileComponent = () => {
    
    // const {companyId} = useParams();

    const [companyId, setCompanyId] = useState("");

    const [company, setCompany] = useState(null);

    const [orderList, setOrderList] = useState([]);

    const [productList, setProductList] = useState([]);

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


    // Скорее всего надо делать fetch для получения списка самых посследних заказов
    /// <summary>
    /// Получить список заказов
    /// </summary>
    const GetOrderListByCompanyIdAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId)
                    {
                        const response = await axios.get(`https://localhost:7299/api/order/company/${decodedToken.CompanyId}`, {
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
                        await GetCompanyByIdAsync();
                        await GetOrderListByCompanyIdAsync();
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

    // !Добавить join запрос на получение списка заказов 


    // Скорее всего надо делать fetch для получения части продуктов (первой страницы)
    /// <summary>
    /// Получить список продуктов по id компании
    /// </summary>
    const GetProductListByCompanyIdAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId)
                    {
                        const response = await axios.get(`https://localhost:7299/api/product/company/${decodedToken.CompanyId}`, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
            
                        if(response && response.status === 200){
                            if(response.data.productList){
                                setProductList(response.data.productList);
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
    /// Получить компанию по id
    /// </summary>
    const GetCompanyByIdAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token){
                const decodedToken = jwtDecode(token);
                if(decodedToken){
                    if(decodedToken.CompanyId)
                    {
                        const response = await axios.get(`https://localhost:7299/api/company/${decodedToken.CompanyId}`, {
                            headers:{
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        });
            
                        if(response && response.status === 200) {
                            if(response.data.company) {
                                setCompany(response.data.company);
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
    /// Декодировать компанию из jwt-токена
    /// </summary>
    const GetCompanyIdFromToken = () => {
        const token = localStorage.getItem("token");
        if(token){
            const decodedToken = jwtDecode(token);
            if(decodedToken){
                if(decodedToken.CompanyId){
                    setCompanyId(decodedToken.CompanyId);
                }
            }
        }
    }

    useEffect(() => {
        GetCompanyIdFromToken();
        GetCompanyByIdAsync();
        GetProductListByCompanyIdAsync();
        GetOrderListByCompanyIdAsync();
    }, [])

    return (
        <div>
            <div>
            Страница компании (будет отображаться обычная страница если роль пользователя 
            - обычный юзер или авторизированный пользоавтель, или страница админа компании, если пользователь Имеет роль админа)
            </div>
            <div>
                <div>
                    <div>
                        <Link to={`/company-settings/${companyId}`}>Настройки компании</Link>
                    </div>
                    <div>
                        <h3>Управление рекламой</h3>
                    </div>
                    <div>
                        <Link to={`/promotion/${companyId}`}>
                            Перейти к настройке рекламы
                        </Link>
                    </div>
                    <div>
                        <Link to={`/coupon/${companyId}`}>
                            Перейти к настройке купонов
                        </Link>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Список заказов</h3>
                    </div>
                    <div>
                        <ul>
                            {orderList.map((order, index) => (
                                <li key={index}>
                                    <div>
                                        <div>
                                            Список ордеров
                                        </div>
                                        <div>
                                            {order.id}
                                        </div>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Список продуктов</h3>
                    </div>
                    <div>
                        <div>
                            <Link to="/addproduct">Добавить продукт</Link>
                        </div>
                        <ul>
                            {productList.map((product, index) => (
                                <li key={index}>
                                    <div>
                                        <ProductItemComponent product={product}/>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyProfileComponent;