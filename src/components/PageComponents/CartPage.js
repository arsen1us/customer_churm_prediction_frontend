import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"
import useTracking from "../../hooks/useTracking";
import ProductItem from "../ListItemComponents/ProductItemComponent/ProductItem";

/**
 * Компонент для отображения корзины пользователя
 * @returns 
 */
const CartPage = () => {

    const {user, token, refreshToken, handleRequestError} = useContext(AuthContext);
    const {trackUserAction} = useTracking();

    const [productList, setProductList] = useState([]);
    const [cartItems, setCartItems] = useState(
        productList.map(product => ({
            product: product,
            quantity: 0,
            isSelected: false
        }))
    );

    /**
     * Загрузить корзину пользователя
     */
    const getCart = async () => {
        try{ 
            const response = await axios.get(`https://localhost:7299/api/cart/${user.id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
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

    /**
     * Заказать товар
     */
    const orderProductAsync = async (e) => {
        e.preventDefault();
        try{
            const orderList = cartItems.map((item) => ({
                productId: item.product.id,
                quantity: item.quantity,
                companyId: item.companyId
            }));

            const response = await axios.post("https://localhost:7299/api/order", {
                userId: user.id,
                items: orderList
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
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

    /**
     * Загрузить корзину при монтировании
     */
    useEffect(() => {
        getCart();
    }, [])

    /**
     * Обработчик для изменения количества продукта
     */
    const handleQuantityChange = (index, value) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = Math.max(0, value);
        setCartItems(updatedCartItems);
    };

    /**
     * Обработчик для переключения выбора одного продукта
     */
    const handleSelectChange = (index, isSelected) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].isSelected = isSelected;
        setCartItems(updatedCartItems);
    };

    /**
     * Обработчик для выбора/снятия выбора со всех продуктов
     */
    const handleSelectAll = (isSelected) => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            isSelected
        }));
        setCartItems(updatedCartItems);
    };

    /**
     * Подсчет общей стоимости заказа
     */
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