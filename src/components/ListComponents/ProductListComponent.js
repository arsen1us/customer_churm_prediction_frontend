import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductListComponent = () => {

    const {categoryId} = useParams();
    const [productList, setProductList] = useState([]);

    // Обновить токен
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

    // Получить список категорий 
    const GetProductListAsync = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/product", {
                headers: {
                    "Authorization": "Bearer" + localStorage.getItem("token")
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
        catch(error)
        {
            // Если токен истёк или не зарегистировался/вошёл
            if(error.response && error.response.status === 401)
            {
                await UpdateToken();
                await GetProductListAsync();
            }
        }
    }

    // Получить список категорий по id категории
    const GetProductListByCategoryIdAsync = async () => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/category/${categoryId}`, {
                headers: {
                    "Authorization": "Bearer" + localStorage.getItem("token")
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
                    await UpdateToken();
                    await GetProductListByCategoryIdAsync();
                }
            }
        }
    }
    // Получить список продуктов при загрузке страницы
    useEffect(() => {
        if(categoryId){
            GetProductListByCategoryIdAsync();
        }
        else{
            GetProductListAsync();
        }
      }, []);

    return (
        <div>
            <div>
                <h3>
                    Список Продуктов
                </h3>
            </div>
            <div>
                <ul>
                    {productList.map((product, index) => (
                        <li key={index}>
                            <div>
                                <p>{product.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductListComponent;