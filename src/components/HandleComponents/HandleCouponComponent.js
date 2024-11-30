import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductItemComponent from "../ListItemComponents/ProductItemComponent"; 
import CouponItemComponent from "../ListItemComponents/CouponItemComponent";  

const HandleCouponComponent = () => {

    const {companyId} = useParams();

    // Список продуктов
    const [productList, setProductList] = useState([]);
    // Список купонов
    const [couponList, setCouponList] = useState([]);

    // Создание
    const[key, setKey] = useState("");
    const[productIds, setProductIds] = useState([]);
    const[categoriesIds, setCategoriesIds] = useState([]);

    // Изменение
    const[updateKey, setUpdateKey] = useState("");
    const[updateProductIds, setUpdateProductIds] = useState([]);
    const[updateCategoriesIds, setUpdateCategoriesIds] = useState([]);

    const [company, setCompany] = useState(null);

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

    /// <summary>
    /// Получить список продуктов по id компании
    /// </summary>
    // По этомиу списку будет распределяться, на какие продукты будет действителен купон
    const GetProductListByCompanyIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/company/${companyId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.productList){
                    setProductList(response.data.productList);
                }
            }
        }
        catch (error) {
            // Если токен устарел
            if(error.response || error.response.status === 401) {
                await UpdateToken();
                await GetProductListByCompanyIdAsync();
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
        catch (error) {
            if(error.response && error.response.status === 401){
                await UpdateToken();
                await GetCouponListByCompanyIdAsync();
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
                productIds: productIds, 
                categoriesIds: categoriesIds, 
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
        catch (error) {
            // Если токен устарел
            if(error.response || error.response.status === 401) {
                await UpdateToken();
                await GetProductListByCompanyIdAsync();
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
        catch (error) {
            // Если токен устарел
            if(error.response || error.response.status === 401) {
                await UpdateToken();
                await UpdateCouponAsync(couponId);
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
        catch (error) {
            // Если токен устарел
            if(error.response || error.response.status === 401) {
                await UpdateToken();
                await DeleteCouponAsync(couponId);
            }
        }
    }

    const ConsoleLog = () => {
        console.log(123);
    }

    useEffect(() => {
        GetCompanyByIdAsync();
        GetProductListByCompanyIdAsync();
        GetCouponListByCompanyIdAsync();
    }, [])

    return (
        <div>
            <div>
                <h3>Страница для работы с купонами</h3>
            </div>
            <div>
                <div>
                    <div>
                        <h3>Создание купона</h3>
                    </div>
                    <div>
                        <form method="post" onSubmit={AddCouponAsync}>
                            <div>
                                <label>Ключ </label>
                                <input 
                                    type="text"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="Введите ключ"
                                />
                            </div>
                            <div>
                                <label>Список продуктов </label>
                                <input 
                                    type="text"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="Введите ключ"
                                />
                            </div>
                            <div>
                                <label>Список категорий </label>
                                <input 
                                    type="text"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="Введите ключ"
                                />
                            </div>
                            <div>
                                <button type="submit">Создать</button>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3>Список созданных купонов</h3>
                    </div>
                    <div>
                        <ul>
                            {couponList.map((coupon, index) => (
                                <li key={index}>
                                    <div>
                                        <button onClick={ConsoleLog}>
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
                    <div>
                        <div>
                            <h3>Список продуктов для создание купона</h3>
                        </div>
                        <div>
                            <ul>
                                {productList.map((product, index) => (
                                    <li key={index}>
                                        <div>
                                            <button onClick={ConsoleLog}>
                                                <ProductItemComponent product={product}/>
                                            </button>
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

export default HandleCouponComponent
