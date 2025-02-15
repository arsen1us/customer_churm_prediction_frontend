import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"
import useTracking from "../../hooks/useTracking";
import ProductItem from "../ListItemComponents/ProductItemComponent/ProductItem";

/// <summary>
/// Компонент для отображения корзины пользователя
/// </summary>
const CartPage = () => {

    const [productList, setProductList] = useState([]);
    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);
    const {trackUserAction} = useTracking();

    /// <summary>
    /// Получить корзину
    /// </summary>
    const getCartAsync = async () => {
        try{ 
            const response = await axios.get(`https://localhost:7299/api/cart/${user.id}`, {
                headers:{
                    "Authorization": "Bearer " + token
                }
            })
            if(response && response.status === 200){
                if(response.data && response.data.productList){
                    setProductList(response.data.productList)
                    setCartItems(response.data.productList.map(product => ({
                        product,
                        quantity: 0,
                        isSelected: false
                    })));
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    /// summary
    /// Заказать товар
    /// summary
    const orderProductAsync = async (e) => {
        e.preventDefault();
        try{
            const orderList = cartItems.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity
            }));

            const response = await axios.post("https://localhost:7299/api/order", {
                userId: user.id,
                orderList: orderList
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if(response && response.status === 200){
                if(response.data && response.data.orderStatus) {
                    alert(`Заказ успешно создан. Статус заказа - ${response.data.orderStatus}`)

                    await trackUserAction("createOrder", {
                        orderList: JSON.stringify(orderList)
                    });
                }
            }
        }
        catch (error){
            await handleRequestError(error);
        }
    }

    useEffect(() => {
        getCartAsync();
    }, [])

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
    /// Обработчик для изменения количества продукта
    /// </summary>
    const handleQuantityChange = (index, value) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = Math.max(0, value);
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
                                orderProductAsync(e);
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