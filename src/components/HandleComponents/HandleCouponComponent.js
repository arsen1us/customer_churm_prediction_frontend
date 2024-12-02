import React, { useEffect, useState } from "react";
import axios from "axios";

import ProductItemComponent from "../ListItemComponents/ProductItemComponent"; 
import CouponItemComponent from "../ListItemComponents/CouponItemComponent";  

import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button } from 'react-bootstrap';

const HandleCouponComponent = () => {

    const {companyId} = useParams();

    // Список продуктов
    const [productList, setProductList] = useState([]);
    // Список купонов
    const [couponList, setCouponList] = useState([]);

    // Создание
    const[key, setKey] = useState("");
    const [selectedProducts, setSelectedProducts] = useState([]);
    const[selectedCategories, setSelectedCategories] = useState([]);

    // Изменение
    const[updateKey, setUpdateKey] = useState("");
    const[updateProductIds, setUpdateProductIds] = useState([]);
    const[updateCategoriesIds, setUpdateCategoriesIds] = useState([]);

    const [company, setCompany] = useState(null);

    const [searchText, setSearchText] = useState("");

    /// summary
    /// Обновить токен
    /// summary
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
    const GetCompanyByIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/company/${companyId}`, {
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
    /// Добавить купон
    /// </summary>
    const GetCouponListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/coupon/company/${companyId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200) {
                if(response.data && response.data.couponList){
                    setCouponList(response.data.couponList);
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


    /// summary
    /// Добавить купон
    /// summary
    const AddCouponAsync = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("https://localhost:7299/api/coupon", {
                key: key,
                productIds: selectedProducts,  
                companyId: companyId
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.coupon){
                    setCouponList(list => [...list, response.data.coupon])
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

    /// summary
    /// Обновить купон
    /// summary
    const UpdateCouponAsync = async (couponId) => {
        try{
            const response = await axios.put(`https://localhost:7299/api/coupon/${couponId}`, {
                key: updateKey,
                productIds: updateProductIds, 
                categoriesIds: updateCategoriesIds, 
                companyId: companyId
            }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response && response.status === 200){
                if(response.data && response.data.coupon){
                    setCouponList(list => [...list, response.data.coupon]);
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

    /// summary
    /// Удалить купон
    /// summary
    const DeleteCouponAsync = async (couponId) => {
        try{
            const response = await axios.delete(`https://localhost:7299/api/coupon/${couponId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            if(response && response.status === 200)
            {
                if(response.data && response.data.deletedCount){
                    if(response.data.deletedCount){
                        setCouponList(list => list.filter(coupon => coupon.id !== couponId))
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

    const ConsoleLog = () => {
        console.log(123);
    }

    useEffect(() => {
        if(companyId){
            GetCompanyByIdAsync();
            GetProductListByCompanyIdAsync();
            GetCouponListByCompanyIdAsync();
        }
    }, [])

    const handleSelect = (id) => {
        setSelectedProducts((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
      console.log(id);
    };

    const isChecked = (id) => selectedProducts.includes(id);

    const filteredProducts = productList.filter((product) => 
        product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div>
                <h3>Страница для работы с купонами</h3>
            </div>
            <div>
                <div>
                    <div>
                        <Link to="/addcoupon">Добавить купон</Link>
                    </div>
                    
                    <div>
                        <h3>Список созданных купонов</h3>
                    </div>
                    <div>
                        <ul>
                            {couponList.map((coupon, index) => (
                                <li key={index}>
                                    <div>
                                        <button>
                                            <CouponItemComponent coupon={coupon}/>
                                        </button>
                                        <div>
                                            <button onClick={(async () => await UpdateCouponAsync(coupon.id))}> Изменить </button>
                                            <button onClick={(async () => await DeleteCouponAsync(coupon.id))} > Удалить </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HandleCouponComponent;
