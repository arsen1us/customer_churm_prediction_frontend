import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import CategoryList from "./CategoryList";
import {AuthContext} from "../../AuthProvider"

// special for drop down
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Promotion from "../PromotionComponent/Promotion";
import ProductItem from "../ListItemComponents/ProductItemComponent/ProductItem";

const ProductList = () => {

    // Метод для обновления токена
    const {user,token, refreshToken} = useContext(AuthContext);

    const {categoryId} = useParams();
    const [productList, setProductList] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    // Номер страницы
    const[pageNumber, setPageNumber] = useState(0);
    // Количество продуктов на странице
    const[pageSize, setPageSize] = useState(15);

    // Список объектов со всеми сущностями
    const [entityList, setEntityList] = useState([]);

    const [input, setInput] = useState("");
    const [debouncedInput, setDebouncedInput] = useState("");

    ///summary
    /// Получить список из 15 продуктов и рекламу при нажатии на кнопку
    ///summary
    const LoadProductAsync = async () => {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        // Получаю 15 продуктов
        await FetchProductsAsync();
        // Получаю рекламу 
        await GetPromotionAsync(); 
    }

    ///summary
    /// Получить список из 15 продуктов
    ///summary
    const FetchProductsAsync = async () => {
        try{
            // fixme исопльзовался данный запрос: `https://localhost:7299/api/product/${pageNumber}/${pageSize}`
            const response = await axios.get(`https://localhost:7299/api/product`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if(response.status === 200)
            {
                if(response.data.productList) {
                    setEntityList(entityList => [...entityList, ...response.data.productList]);   
                }
            }
        }
        catch(error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401) {
                await refreshToken();
                await FetchProductsAsync();
            }

            // Ошибка сервера
            if(error.response && error.response.status === 500)
            {

            }
        }
    }

    ///summary
    /// Получить первый рекламный пост (тестовый метод)
    ///summary
    const GetPromotionAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/promotion/first", {
                headers:{
                    "Authorization": "Bearer " + token
                }
            });

            if(response.status === 200)
            {
                if(response.data.promotion)
                {
                    setEntityList(entityList => [...entityList, response.data.promotion])
                }
            }
        }
        catch(error)
        {
            // Если действия токена истекло
            if(error.response && error.response.status === 401)
            {
                await refreshToken();
                await GetPromotionAsync();
            }
        }
    }

    ///summary
    /// Получить список категорий по id категории
    ///summary
    const GetProductListByCategoryIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/category/${categoryId}`, {
                headers: {
                    "Authorization": "Bearer" + token
                }
            });
            
            if(response.status === 200)
            {
                const responseData = response.data.productList;
                if(response.data.productList)
                {
                    setProductList(responseData);
                }
            }
        }
        catch (error)
        {
            if(categoryId != null && categoryId != "")
            {
                // Если токен истёк или не зарегистировался/вошёл
                if(error.response && error.response.status === 401)
                {
                    await refreshToken();
                    await GetProductListByCategoryIdAsync();
                }
            }
        }
    }

    ///summary
    /// Выбрать текущую категорию
    ///summary
    const ChangeCurrentCategory = (name) => {
        if(name)
            setCategoryName(name);
        console.log(name);
    }

    ///summary
    /// Получить список продуктов при загрузке страницы
    ///summary
    useEffect(() => {
        if(categoryId){
            GetProductListByCategoryIdAsync();
        }
        else{
                FetchProductsAsync();
                // Запрос для получения рекламы
                // GetPromotionAsync();
            }
    }, []);

    // Обновляем `debouncedInput` через 1 секунду после последнего ввода
    useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    // Очищаем таймер при новом вводе
    return () => {
      clearTimeout(handler);
    };
    }, [input]);

    // Выполняем запрос на сервер при изменении `debouncedInput`
    useEffect(() => {
    if (debouncedInput.trim() === "") {
      setProductList([]);
      return;
    }
    

    ///summary
    /// Получить список продуктов по названию или описанию
    ///summary
    const SearchProductAsync = async () => {
        if(input)
        {
            try {
                const response = await axios.get(`https://localhost:7299/api/product/search/${input}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });

                if(response && response.status === 200){
                    if(response.data.productList)
                        setEntityList(response.data.productList);
                }
            }
            catch(error) {
                // Если действия токена истекло
                if(error.response && error.response.status === 401)
                    {
                        await refreshToken();
                        await SearchProductAsync();
                    }
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
    }

    SearchProductAsync();
    }, [debouncedInput]);

    return (
        <div>
            <div>
            <div className="search-container">
                <input
                    type="text"
                    value={input}
                    placeholder="Найти продукт"
                    onChange={(e) => setInput(e.target.value)}
                    className="search-input"
                />
            </div>
                
                <div>
                    <ul>
                        <div
                            style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 
                                'repeat(auto-fill, minmax(200px, 1fr))', 
                                gap: '20px', margin: '20px 30px 0px 0px' }}>
                        {entityList.map((entity, index) => {
                            return (
                                <li key={index}>
                                    {entity.name && (
                                        <ProductItem product={entity}/>
                                    )}
                                </li>
                            );
                        })}
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductList;