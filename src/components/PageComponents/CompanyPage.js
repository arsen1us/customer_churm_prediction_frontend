import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {AuthContext} from "../../AuthProvider"

// Компонент для отображения страницы компании
const CompanyPage = () => {

    const {companyId} = useParams();
    const [company, setCompany] = useState(null);

    const [orderList, setOrderList] = useState([]);
    const [productList, setProductList] = useState([]);
    // Метод для обновления токена
    const {token, refreshToken} = useContext(AuthContext);

    /// summary
    /// Получить компанию по id
    /// summary
    const GetCompanyByIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/company/${companyId}`, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200) {
                if(response.data.company) {
                    setCompany(response.data.company);
                }
            }
        }
        catch(error){
            if(error.response && error.response.status === 401)
                {
                    await refreshToken();
                    await GetCompanyByIdAsync(companyId);
                }
        }
    }

    // Скорее всего надо делать fetch для получения списка самых посследних заказов
    /// summary
    /// Получить список заказов
    /// summary
    const GetOrderListAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/order/company/${companyId}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            if(response && response.status === 200){
                if(response.data.orderList){
                    setOrderList(response.data.orderList);
                }
            }
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

    // Скорее всего надо делать fetch для получения части продуктов (первой страницы)
    /// summary
    /// Получить список продуктов по id компании
    /// summary
    const GetProductListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/company/${companyId}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200){
                if(response.data.productList){
                    setProductList(response.data.productList);
                }
            }

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

    useEffect(() => {
        if(companyId){
            GetCompanyByIdAsync();
            GetProductListByCompanyIdAsync();
            GetOrderListAsync();
        }
    }, [companyId])
    return (
        <div>
            <div>
            Страница компании (будет отображаться обычная страница если роль пользователя 
            - обычный юзер или авторизированный пользоавтель, или страница админа компании, если пользователь Имеет роль админа)
            </div>
            <div>
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
                        <ul>
                            {productList.map((product, index) => (
                                <li key={index}>
                                    <div>
                                        <div>
                                            Список продуктов
                                        </div>
                                        <div>
                                            {product.id}
                                            {product.name}
                                            {product.description}
                                        </div>
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

export default CompanyPage;