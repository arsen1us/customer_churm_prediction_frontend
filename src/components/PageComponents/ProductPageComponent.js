import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Компонент для отображения страницы с продуктом
const ProductPageComponent = () => {

    const {productId} = useParams();
    const [product, setProduct] = useState(null);

    const [productCount, setProductCount] = useState(0);

    // Статус заказа (успешно/не успешно создан)
    const [orderStatus, setOrderStatus] = useState(false);

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
    /// Заказать товар
    /// summary
    // Цена товара 
    // Количество товара => цена товара 
    // Создать и отправить запрос на сервак => отобразить инфу о заказе на странице компании (послать уведомление о том, что заказали продукт)
    // Списать кэш с баланса юзера 
    const OrderProductAsync = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.post("https://localhost:7299/api/order", {
                        productId: product.id,
                        productCount: productCount,
                        companyId: product.companyId, //product.companyId,
                        userId: decodedToken.Id,
                        price: product.price
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    
                    if(response && response.status === 200)
                    {
                        // обработать успешное создание заказа
                        if(response.data && response.data.orderStatus) {
                            setOrderStatus(response.data.orderStatus)
                            alert(`Заказ успешно создан. Статус заказа - ${response.data.orderStatus}`)
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
    /// Добавить продукт в корзину
    /// </summary>
    const AddProductToCartAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.post("https://localhost:7299/api/cart", {
                        userId: decodedToken.Id,
                        productId: productId
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    if(response && response.status === 200){
                        if(response.data && response.data.cart){
                            alert("Продукт успешно добавлен в корзину");
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

    useEffect(() => {
        if(productId){
            GetProductByIdAsync(productId);
        }
    }, [productId])
    return (
        <div>
            {product ? (
                <div>
                    <div>
                        <div>
                            <h1>{product.name}</h1>
                        </div>
                        <div>
                            <p><strong>Описание:</strong> {product.description || "Нет описания"}</p>
                        </div>
                        <div>
                            <p><strong>Цена:</strong> {product.price} ₽</p>
                        </div>
                        <div>
                            <p><strong>Категория ID:</strong> {product.categoryId}</p>
                        </div>
                        <div>
                            <p><strong>Категория ID:</strong> {product.categoryId}</p>
                        </div>
                        <div>
                            <p><strong>Количество покупок:</strong> {product.purchaseCount}</p>
                        </div>
                        <div>
                            <p><strong>Частота покупок:</strong> {product.purchaseFrequency}</p>
                        </div>
                        <div>
                        <p><strong>Среднее количество заказов:</strong> {product.averageOrderValue}</p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <form method="post" onSubmit={OrderProductAsync}>
                                <div>
                                    <label>Количество продукта</label>
                                    <input 
                                        text="number"
                                        value={productCount}
                                        onChange={(e) => setProductCount(e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <button type="submit">Заказать</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <button onClick={AddProductToCartAsync}>Добавить в корзину</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Загрузка продукта...</p>
            )}
        </div>
    );
}

export default ProductPageComponent;