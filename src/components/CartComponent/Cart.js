import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../AuthProvider"
import useTracking from "../../hooks/useTracking";
import { Link } from "react-router-dom";

/**
 * Компонент для отображения корзины пользователя
 * @returns 
 */
const Cart = () => {

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
     * Загружает корзину пользователя
     */
    const GetCartAsync = async () => {
        try{ 
            const response = await axios.get(`https://localhost:7299/api/cart/${user.id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response && response.status === 200){
                if(response.data && response.data.teas){
                    setProductList(response.data.teas)
                    setCartItems(response.data.teas.map(tea => ({
                        tea,
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
     * Отправляет запрос на создание заказа
     */
    const OrderTeaAsync = async (e) => {
        e.preventDefault();
        try{
            const orderList = cartItems.map((item) => ({
                teaId: item.tea.id,
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
     * Загружает корзину при монтировании
     */
    useEffect(() => {
        GetCartAsync();
    }, [])

    /**
     * Обрабатывает изменения количества продукта
     */
    const handleQuantityChange = (index, value) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity = Math.max(0, value);
        setCartItems(updatedCartItems);
    };

    /**
     * Обрабатывает переключения выбора одного продукта
     */
    const handleSelectChange = (index, isSelected) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].isSelected = isSelected;
        setCartItems(updatedCartItems);
    };

    /**
     * Обрабатывает выбор/снятия выбора со всех продуктов
     */
    const handleSelectAll = (isSelected) => {
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            isSelected
        }));
        setCartItems(updatedCartItems);
    };

    /**
     * Подсчитывает общую стоимость заказа
     */
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            if (item.isSelected) {
                return total + item.tea.price * item.quantity;
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
                        {/* Список чаёв */}
                        <ul>
                            {cartItems.map((cartItem, index) => (
                                <li key={cartItem.tea.id}>
                                    <div>
                                        {/* Отображение чая */}
                                        <div className="col-md-4" key={index}>
                                            <div className="card h-100 shadow-sm">
                                                <Link to={`/tea/${cartItem.tea.id}`}>
                                                <img
                                                    src={`https://localhost:7299/uploads/${cartItem.tea.imageSrcs[0]}`}
                                                    alt={cartItem.tea.name}
                                                    className="card-img-top"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{cartItem.tea.name}</h5>
                                                    <p className="card-text">Цена: {cartItem.tea.price} ₽</p>
                                                </div>
                                                </Link>
                                                <div className="mt-auto d-flex justify-content-between">
                                                    <button className="btn btn-outline-secondary">
                                                        Добавить в корзину
                                                    </button>
                                                    <button className="btn btn-primary">
                                                        Заказать
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                            
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
                                OrderTeaAsync(e);
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

export default Cart;