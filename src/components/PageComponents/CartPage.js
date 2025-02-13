import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProductItem from "../ListItemComponents/ProductItemComponent/ProductItem";

/// <summary>
/// Компонент для отображения корзины пользователя
/// </summary>
const CartPage = () => {

    const [productList, setProductList] = useState([]);

    /// <summary>
    /// Обновить токен
    /// </summary>
    const UpdateToken = async () => {
        try{
            const response = await axios.get("https://localhost:7299/api/token/update", {
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

    /// <summary>
    /// Получить корзину
    /// </summary>
    const GetCartAsync = async () => {
        try{
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);

                if(decodedToken.Id){
                    const response = await axios.get(`https://localhost:7299/api/cart/${decodedToken.Id}`, {
                        headers:{
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });

                    if(response && response.status === 200){
                        if(response.data && response.data.productList){
                            setProductList(response.data.productList);

                            setCartItems(response.data.productList.map(product => ({
                                product,
                                quantity: 0,
                                isSelected: false
                            })));
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
                    // Данные для тела запроса
                    const orderList = cartItems.map((item) => ({
                        productId: item.product.id,
                        quantity: item.quantity
                    }));

                    const response = await axios.post("https://localhost:7299/api/order", {
                        userId: decodedToken.Id,
                        orderList: orderList
                    }, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    
                    if(response && response.status === 200)
                    {
                        // обработать успешное создание заказа
                        if(response.data && response.data.orderStatus) {
                            // setOrderStatus(response.data.orderStatus)
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

    useEffect(() => {
        GetCartAsync();
    }, [])

    // Чекбоксы и отображение итоговой суммы заказа ==================================================

    /// <summary>
    /// Состояние для хранения выбранных продуктов и их количества
    /// </summary>
    const [cartItems, setCartItems] = useState(
        productList.map(product => ({
            product: product,
            quantity: 0,
            isSelected: false
        }))
    );

    /// <summary>
    // Итоговая сумма заказа
    /// </summary>
    const [totalPrice, setTotalPrice] = useState(0);

    /// <summary>
    /// Обработчик для изменения количества продукта
    /// </summary>
    const handleQuantityChange = (index, value) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = Math.max(0, value); // Количество не может быть отрицательным
        setCartItems(updatedCartItems);
    };

    /// <summary>
    /// Обработчик для переключения выбора одного продукта
    /// </summary>
    const handleSelectChange = (index, isSelected) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].isSelected = isSelected;
        setCartItems(updatedCartItems);
    };

    /// <summary>
    /// Обработчик для выбора/снятия выбора со всех продуктов
    /// </summary>
    const handleSelectAll = (isSelected) => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            isSelected
        }));
        setCartItems(updatedCartItems);
    };

    /// <summary>
    /// Подсчет общей стоимости заказа
    /// </summary>
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.isSelected) {
                return total + item.product.price * item.quantity;
            }
            return total;
        }, 0);
    };

    // Чекбоксы и отображение итоговой суммы заказа ==================================================

    return (
        <div>
            <div>
                <div>
                    <h3> Корзина </h3>
                </div>
                <div>
                    <div>
                        {/* Чекбокс для выбора всех продуктов */}
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    checked={cartItems.every(item => item.isSelected)}
                                />
                                Выбрать все
                            </label>
                        </div>
                    </div>
                    <div>
                        {/* Список продуктов */}
                        <ul>
                            {cartItems.map((cartItem, index) => (
                                <li key={cartItem.product.id}>
                                    <div>
                                        {/* Отображение компонента продукта */}
                                        <ProductItem product={cartItem.product} />
                            
                                        {/* Указание количества */}
                                        <div>
                                            <label>Количество:</label>
                                            <input
                                                type="number"
                                                placeholder="0"
                                                value={cartItem.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        index,
                                                        parseInt(e.target.value, 10) || 0
                                                    )
                                                }
                                            />
                                        </div>
                                            
                                        {/* Чекбокс для выбора продукта */}
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={cartItem.isSelected}
                                                    onChange={(e) =>
                                                        handleSelectChange(index, e.target.checked)
                                                    }
                                                />
                                                {cartItem.isSelected === true ? (<>Выбрано</>) : (<>Выбрать</>)}
                                            </label>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Итоговая сумма */}
                        <div>
                            <strong>Итоговая стоимость: {calculateTotal()} ₽</strong>
                        </div>
                        
                        {/* Кнопка для оформления заказа */}
                        <button
                            onClick={(e) => {
                                OrderProductAsync(e);
                                alert(`Оформление заказа на сумму ${calculateTotal()} ₽`);
                            }}
                            disabled={!cartItems.some(item => item.isSelected && item.quantity > 0)}
                        >
                        Оформить заказ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage;