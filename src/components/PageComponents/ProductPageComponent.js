import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// Компонент для отображения страницы с продуктом
const ProductPageComponent = () => {

    const {productId} = useParams();
    const [product, setProduct] = useState(null);

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
    /// Получить продукт по id
    /// summary
    const GetProductByIdAsync = async (productId) => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/${productId}`, {
                headers:{
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if(response && response.status === 200) {
                if(response.data.product) {
                    console.log(response.data.product);
                    setProduct(response.data.product);
                }
            }
        }
        catch(error){
            if(error.response && error.response.status === 401)
                {
                    await UpdateToken();
                    await GetProductByIdAsync(productId);
                }
        }
    }

    useEffect(() => {
        if(productId){
            GetProductByIdAsync(productId);
        }
    }, [productId])
    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.name}</h1>
                    <p><strong>Описание:</strong> {product.description || "Нет описания"}</p>
                    <p><strong>Цена:</strong> {product.price} ₽</p>
                    <p><strong>Категория ID:</strong> {product.categoryId}</p>
                    <p><strong>Скидка:</strong> {product.discount || "Нет скидки"}</p>
                    <p><strong>Количество покупок:</strong> {product.purchaseCount}</p>
                    <p><strong>Частота покупок:</strong> {product.purchaseFrequency}</p>
                    <p><strong>Среднее количество заказов:</strong> {product.averageOrderValue}</p>
                </div>
            ) : (
                <p>Загрузка продукта...</p>
            )}
        </div>
    );
}

export default ProductPageComponent;