import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Компонент для отображения страницы с продуктом
const ProductItemComponent = () => {

    const [product, setProduct] = useState();

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
    const GetProductByIdAsync = async (string productId) => {
        try{
            const response = await axios.get(`https://localhost:7299/api/product/${productId}`)
        }
        catch(error){

        }
    }
    return (
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}
{`/category/${category.id}`}
export default ProductItemComponent;